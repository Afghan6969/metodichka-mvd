"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Shield,
  Calendar,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useAuth } from "@/lib/auth-context";

interface AccountRequest {
  id: string;
  nickname: string;
  login: string;
  role: string | null;
  status: "pending" | "approved" | "rejected";
  comment: string | null;
  created_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
  ip_address: string | null;
  reviewed_by_user?: {
    nickname: string;
  } | null;
}

interface ReviewDialogData {
  request: AccountRequest;
  action: "approve" | "reject";
}

export function AccountRequestsAdmin() {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState<AccountRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected" | "all">("pending");
  const [reviewDialog, setReviewDialog] = useState<ReviewDialogData | null>(null);
  const [reviewComment, setReviewComment] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    loadRequests();
  }, [activeTab, pagination.page]);

  const loadRequests = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const statusParam = activeTab === "all" ? "" : `&status=${activeTab}`;
      const response = await fetch(
        `/api/account-requests/list?page=${pagination.page}&limit=${pagination.limit}${statusParam}`
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to load requests");
      }

      const data = await response.json();
      setRequests(data.requests);
      setPagination(data.pagination);
    } catch (err: any) {
      setError(err.message || "Ошибка при загрузке запросов");
      console.error("Load requests error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const openReviewDialog = (request: AccountRequest, action: "approve" | "reject") => {
    setReviewDialog({ request, action });
    setReviewComment("");
  };

  const closeReviewDialog = () => {
    setReviewDialog(null);
    setReviewComment("");
  };

  const handleReview = async () => {
    if (!reviewDialog) return;

    setIsReviewing(true);

    try {
      const response = await fetch("/api/account-requests/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestId: reviewDialog.request.id,
          action: reviewDialog.action,
          comment: reviewComment.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to review request");
      }

      // Обновляем список запросов
      await loadRequests();
      closeReviewDialog();
    } catch (err: any) {
      setError(err.message || "Ошибка при обработке запроса");
      console.error("Review error:", err);
    } finally {
      setIsReviewing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
            <Clock className="w-3 h-3 mr-1" />
            Ожидает
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Одобрен
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/20">
            <XCircle className="w-3 h-3 mr-1" />
            Отклонен
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMMM yyyy, HH:mm", { locale: ru });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-300" />
            Запросы на создание аккаунтов
          </h2>
          <p className="text-sm text-blue-200/80 mt-1">
            Просмотр и обработка запросов на регистрацию новых пользователей
          </p>
        </div>
        <div className="p-6">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="pending">Ожидают</TabsTrigger>
                <TabsTrigger value="approved">Одобренные</TabsTrigger>
                <TabsTrigger value="rejected">Отклоненные</TabsTrigger>
                <TabsTrigger value="all">Все</TabsTrigger>
              </TabsList>
              <Button variant="outline" size="sm" onClick={loadRequests} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                Обновить
              </Button>
            </div>

            <TabsContent value={activeTab} className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                </div>
              ) : requests.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Нет запросов для отображения</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {requests.map((request) => (
                    <div key={request.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/8 hover:border-white/20 transition-all duration-200">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <h3 className="font-semibold text-lg">{request.nickname}</h3>
                              {getStatusBadge(request.status)}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Логин: <span className="font-mono">{request.login}</span>
                            </p>
                            {request.role && (
                              <p className="text-sm text-muted-foreground">
                                Фракция/Роль: <span className="font-medium">{request.role}</span>
                              </p>
                            )}
                          </div>
                          {request.status === "pending" && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="default"
                                onClick={() => openReviewDialog(request, "approve")}
                              >
                                <CheckCircle2 className="w-4 h-4" />
                                Одобрить
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => openReviewDialog(request, "reject")}
                              >
                                <XCircle className="w-4 h-4" />
                                Отклонить
                              </Button>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>Создан: {formatDate(request.created_at)}</span>
                          </div>
                          {request.ip_address && (currentUser?.role === "super-admin" || currentUser?.role === "root") && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Shield className="w-4 h-4" />
                              <span>IP: {request.ip_address}</span>
                            </div>
                          )}
                          {request.reviewed_at && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span>Рассмотрен: {formatDate(request.reviewed_at)}</span>
                            </div>
                          )}
                          {request.reviewed_by_user && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <User className="w-4 h-4" />
                              <span>Проверил: {request.reviewed_by_user.nickname}</span>
                            </div>
                          )}
                        </div>

                        {request.comment && (
                          <div className="mt-4 p-3 bg-muted rounded-lg">
                            <p className="text-sm font-medium mb-1">Комментарий:</p>
                            <p className="text-sm text-muted-foreground">{request.comment}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPagination((p) => ({ ...p, page: p.page - 1 }))}
                    disabled={pagination.page === 1 || isLoading}
                  >
                    Назад
                  </Button>
                  <span className="flex items-center px-4 text-sm text-muted-foreground">
                    Страница {pagination.page} из {pagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))}
                    disabled={pagination.page === pagination.totalPages || isLoading}
                  >
                    Вперед
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Review Dialog */}
      <Dialog open={!!reviewDialog} onOpenChange={(open) => !open && closeReviewDialog()}>
        <DialogContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-2">
          <DialogHeader>
            <DialogTitle>
              {reviewDialog?.action === "approve" ? "Одобрить запрос" : "Отклонить запрос"}
            </DialogTitle>
            <DialogDescription>
              {reviewDialog?.action === "approve"
                ? "После одобрения аккаунт будет автоматически создан в системе."
                : "Укажите причину отклонения запроса (опционально)."}
            </DialogDescription>
          </DialogHeader>

          {reviewDialog && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Ник:</span> {reviewDialog.request.nickname}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Логин:</span> {reviewDialog.request.login}
                </p>
                {reviewDialog.request.role && (
                  <p className="text-sm">
                    <span className="font-medium">Роль:</span> {reviewDialog.request.role}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment">Комментарий (опционально)</Label>
                <Textarea
                  id="comment"
                  placeholder="Добавьте комментарий к решению..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  rows={4}
                  disabled={isReviewing}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={closeReviewDialog} disabled={isReviewing}>
              Отмена
            </Button>
            <Button
              variant={reviewDialog?.action === "approve" ? "default" : "destructive"}
              onClick={handleReview}
              disabled={isReviewing}
            >
              {isReviewing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Обработка...
                </>
              ) : reviewDialog?.action === "approve" ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Одобрить
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4" />
                  Отклонить
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
