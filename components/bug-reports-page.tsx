'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Bug, Lightbulb, Plus, Loader2, Trash2, CheckCircle2, XCircle, Clock, Settings } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import type { BugReportWithUser, BugReportType, BugReportStatus, BugReportPriority } from '@/types/bug-reports';

export function BugReportsPage() {
  const [reports, setReports] = useState<BugReportWithUser[]>([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [canViewAll, setCanViewAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reportsEnabled, setReportsEnabled] = useState(true);
  const [togglingSettings, setTogglingSettings] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterType, setFilterType] = useState<'all' | BugReportType>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | BugReportStatus>('all');
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  // Form state
  const [formType, setFormType] = useState<BugReportType>('bug');
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');

  useEffect(() => {
    fetchReports();
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings/bug-reports');
      const data = await response.json();
      setReportsEnabled(data.enabled ?? true);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const toggleReportsEnabled = async (enabled: boolean) => {
    try {
      setTogglingSettings(true);
      const response = await fetch('/api/settings/bug-reports', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled }),
      });

      if (response.ok) {
        setReportsEnabled(enabled);
        toast({
          title: 'Настройки обновлены',
          description: enabled ? 'Создание отчетов включено' : 'Создание отчетов отключено',
        });
      } else {
        toast({
          title: 'Ошибка',
          description: 'Не удалось обновить настройки',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error toggling settings:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить настройки',
        variant: 'destructive',
      });
    } finally {
      setTogglingSettings(false);
    }
  };

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/bug-reports');
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          toast({
            title: 'Ошибка авторизации',
            description: 'Пожалуйста, войдите в систему',
            variant: 'destructive',
          });
          return;
        }
        throw new Error(data.error || 'Failed to fetch reports');
      }

      setReports(data.reports || []);
      setIsSuperAdmin(data.isSuperAdmin || false);
      setCanViewAll(data.canViewAll || false);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить отчеты',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formTitle.trim().length < 5) {
      toast({
        title: 'Ошибка',
        description: 'Заголовок должен содержать минимум 5 символов',
        variant: 'destructive',
      });
      return;
    }

    if (formDescription.trim().length < 10) {
      toast({
        title: 'Ошибка',
        description: 'Описание должно содержать минимум 10 символов',
        variant: 'destructive',
      });
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch('/api/bug-reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: formType,
          title: formTitle.trim(),
          description: formDescription.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          toast({
            title: 'Ошибка авторизации',
            description: 'Пожалуйста, войдите в систему для отправки отчетов',
            variant: 'destructive',
          });
          return;
        }
        toast({
          title: 'Ошибка',
          description: data.error || 'Не удалось отправить отчет',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Успешно',
        description: formType === 'bug' ? 'Баг отправлен' : 'Предложение отправлено',
      });

      // Reset form
      setFormTitle('');
      setFormDescription('');
      setFormType('bug');
      setIsDialogOpen(false);

      // Refresh reports
      fetchReports();
    } catch (error) {
      console.error('Error creating report:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить отчет. Проверьте подключение к интернету.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: BugReportStatus) => {
    try {
      const response = await fetch(`/api/bug-reports/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update status');
      }

      toast({
        title: 'Успешно',
        description: 'Статус обновлен',
      });

      fetchReports();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить статус',
        variant: 'destructive',
      });
    }
  };

  const handleUpdatePriority = async (id: string, priority: BugReportPriority) => {
    try {
      const response = await fetch(`/api/bug-reports/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priority }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update priority');
      }

      toast({
        title: 'Успешно',
        description: 'Приоритет обновлен',
      });

      fetchReports();
    } catch (error) {
      console.error('Error updating priority:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить приоритет',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот отчет?')) {
      return;
    }

    try {
      const response = await fetch(`/api/bug-reports/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete report');
      }

      toast({
        title: 'Успешно',
        description: 'Отчет удален',
      });

      fetchReports();
    } catch (error) {
      console.error('Error deleting report:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить отчет',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: BugReportStatus) => {
    const variants: Record<BugReportStatus, { variant: any; icon: any; label: string }> = {
      open: { variant: 'default', icon: Clock, label: 'Открыт' },
      closed: { variant: 'secondary', icon: CheckCircle2, label: 'Закрыт' },
    };

    const config = variants[status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: BugReportPriority) => {
    const variants: Record<BugReportPriority, { className: string; label: string }> = {
      low: { className: 'bg-gray-500/10 text-gray-700 dark:text-gray-300 border-gray-500/20', label: 'Низкий' },
      medium: { className: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20', label: 'Средний' },
      high: { className: 'bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/20', label: 'Высокий' },
      critical: { className: 'bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20', label: 'Критический' },
    };

    const config = variants[priority];

    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getTypeBadge = (type: BugReportType) => {
    return type === 'bug' ? (
      <Badge variant="destructive" className="gap-1">
        <Bug className="h-3 w-3" />
        Баг
      </Badge>
    ) : (
      <Badge variant="default" className="gap-1">
        <Lightbulb className="h-3 w-3" />
        Предложение
      </Badge>
    );
  };

  const filteredReports = reports.filter((report) => {
    if (filterType !== 'all' && report.type !== filterType) return false;
    if (filterStatus !== 'all' && report.status !== filterStatus) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Баги и предложения</h1>
          <p className="text-muted-foreground mt-1">
            {isSuperAdmin ? 'Управление отчетами о багах и предложениями' : 'Отправляйте баги и предложения'}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {isSuperAdmin && (
            <Card className="px-4 py-2">
              <div className="flex items-center gap-3">
                <Settings className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-2">
                  <Label htmlFor="reports-toggle" className="text-sm cursor-pointer">
                    Прием отчетов
                  </Label>
                  <Switch
                    id="reports-toggle"
                    checked={reportsEnabled}
                    onCheckedChange={toggleReportsEnabled}
                    disabled={togglingSettings}
                  />
                </div>
              </div>
            </Card>
          )}

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button disabled={!reportsEnabled}>
                <Plus className="h-4 w-4 mr-2" />
                Создать отчет
              </Button>
            </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Новый отчет</DialogTitle>
              <DialogDescription>
                Опишите баг или предложение для улучшения системы
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Тип</Label>
                <Select value={formType} onValueChange={(value) => setFormType(value as BugReportType)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bug">
                      <div className="flex items-center gap-2">
                        <Bug className="h-4 w-4" />
                        Баг
                      </div>
                    </SelectItem>
                    <SelectItem value="suggestion">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        Предложение
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Заголовок</Label>
                <Input
                  id="title"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Краткое описание проблемы или предложения"
                  required
                  minLength={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Подробное описание..."
                  required
                  minLength={10}
                  rows={6}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={submitting}
                >
                  Отмена
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Отправить
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        </div>
      </div>

      {isSuperAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>Фильтры</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <div className="space-y-2">
              <Label>Тип</Label>
              <Select value={filterType} onValueChange={(value) => setFilterType(value as any)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все</SelectItem>
                  <SelectItem value="bug">Баги</SelectItem>
                  <SelectItem value="suggestion">Предложения</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Статус</Label>
              <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as any)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все</SelectItem>
                  <SelectItem value="open">Открытые</SelectItem>
                  <SelectItem value="closed">Закрытые</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Отчеты ({filteredReports.length})</h2>
            <p className="text-muted-foreground text-sm">
              {canViewAll ? 'Все отчеты от пользователей' : 'Ваши отчеты'}
            </p>
          </div>
        </div>

        {filteredReports.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-muted-foreground">
                <p>Отчетов пока нет</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          {getTypeBadge(report.type)}
                          {getStatusBadge(report.status)}
                          {getPriorityBadge(report.priority)}
                        </div>
                        <h3 className="text-lg font-semibold">{report.title}</h3>
                      </div>
                      {isSuperAdmin && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(report.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground">{report.description}</p>

                    {/* Admin Comment */}
                    {(report.admin_comment || (isSuperAdmin && editingComment === report.id)) && (
                      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Комментарий администратора:</span>
                        </div>
                        {editingComment === report.id ? (
                          <div className="space-y-2">
                            <Textarea
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              placeholder="Введите комментарий..."
                              rows={3}
                              className="text-sm"
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={async () => {
                                  try {
                                    const response = await fetch(`/api/bug-reports/${report.id}`, {
                                      method: 'PATCH',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({ admin_comment: commentText }),
                                    });
                                    if (response.ok) {
                                      toast({ title: 'Успешно', description: 'Комментарий сохранен' });
                                      setEditingComment(null);
                                      setCommentText('');
                                      fetchReports();
                                    }
                                  } catch (error) {
                                    toast({ title: 'Ошибка', description: 'Не удалось сохранить комментарий', variant: 'destructive' });
                                  }
                                }}
                              >
                                Сохранить
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditingComment(null);
                                  setCommentText('');
                                }}
                              >
                                Отмена
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm">{report.admin_comment}</p>
                            {isSuperAdmin && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  setEditingComment(report.id);
                                  setCommentText(report.admin_comment || '');
                                }}
                              >
                                Редактировать
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Add Comment Button */}
                    {isSuperAdmin && !report.admin_comment && editingComment !== report.id && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingComment(report.id);
                          setCommentText('');
                        }}
                      >
                        Добавить комментарий
                      </Button>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between gap-4 pt-4 border-t">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {canViewAll && report.user && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Автор:</span>
                            <span>{report.user.full_name || report.user.email}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Создан:</span>
                          <span>
                            {new Date(report.created_at).toLocaleDateString('ru-RU', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </div>

                      {isSuperAdmin && (
                        <div className="flex items-center gap-2">
                          <Select
                            value={report.status}
                            onValueChange={(value) => handleUpdateStatus(report.id, value as BugReportStatus)}
                          >
                            <SelectTrigger className="w-[120px] h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="open">Открыт</SelectItem>
                              <SelectItem value="closed">Закрыт</SelectItem>
                            </SelectContent>
                          </Select>

                          <Select
                            value={report.priority}
                            onValueChange={(value) => handleUpdatePriority(report.id, value as BugReportPriority)}
                          >
                            <SelectTrigger className="w-[140px] h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Низкий</SelectItem>
                              <SelectItem value="medium">Средний</SelectItem>
                              <SelectItem value="high">Высокий</SelectItem>
                              <SelectItem value="critical">Критический</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
