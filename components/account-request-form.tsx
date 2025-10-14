"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle2, AlertCircle, Shield } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CaptchaData {
  question: string;
  token: string;
}

export function AccountRequestForm() {
  const [formData, setFormData] = useState({
    nickname: "",
    login: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [captcha, setCaptcha] = useState<CaptchaData | null>(null);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Загружаем CAPTCHA при монтировании компонента
  useEffect(() => {
    loadCaptcha();
  }, []);

  const loadCaptcha = async () => {
    try {
      const response = await fetch("/api/account-requests/generate-captcha");
      const data = await response.json();
      if (data.success) {
        setCaptcha(data);
        setCaptchaAnswer("");
      }
    } catch (err) {
      console.error("Failed to load CAPTCHA:", err);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
    setValidationErrors([]);
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!formData.nickname.trim()) {
      errors.push("Ник обязателен для заполнения");
    }

    if (!formData.login.trim()) {
      errors.push("Логин обязателен для заполнения");
    }

    if (!formData.password) {
      errors.push("Пароль обязателен для заполнения");
    }

    if (formData.password !== formData.confirmPassword) {
      errors.push("Пароли не совпадают");
    }

    if (!formData.role) {
      errors.push("Выберите фракцию");
    }

    if (!captchaAnswer.trim()) {
      errors.push("Необходимо ответить на вопрос CAPTCHA");
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/account-requests/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: formData.nickname,
          login: formData.login,
          password: formData.password,
          role: formData.role || null,
          captchaAnswer,
          captchaToken: captcha?.token,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.details && Array.isArray(data.details)) {
          setValidationErrors(data.details);
        } else {
          setError(data.error || "Ошибка при отправке запроса");
        }
        // Перезагружаем CAPTCHA после неудачной попытки
        loadCaptcha();
        return;
      }

      setIsSuccess(true);
      setFormData({
        nickname: "",
        login: "",
        password: "",
        confirmPassword: "",
        role: "",
      });
      setCaptchaAnswer("");
    } catch (err) {
      setError("Произошла ошибка при отправке запроса");
      console.error("Submit error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Запрос успешно отправлен!</h3>
            <p className="text-muted-foreground mb-6">
              Ваш запрос на создание аккаунта был успешно отправлен и ожидает рассмотрения
              лидерами ПГС или ГС. Вы получите уведомление о результате.
            </p>
            <Button onClick={() => setIsSuccess(false)}>
              Отправить еще один запрос
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-6 h-6" />
          Запрос на создание аккаунта
        </CardTitle>
        <CardDescription>
          Заполните форму для создания запроса на регистрацию аккаунта. Ваш запрос будет
          рассмотрен лидерами ПГС или ГС.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Ошибки валидации */}
          {validationErrors.length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1">
                  {validationErrors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Общая ошибка */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Ник */}
          <div className="space-y-2">
            <Label htmlFor="nickname">
              Ник <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nickname"
              placeholder="Введите ник (например: Petr_Petrov)"
              value={formData.nickname}
              onChange={(e) => handleInputChange("nickname", e.target.value)}
              disabled={isLoading}
              maxLength={50}
            />
            <p className="text-xs text-muted-foreground">
              Только буквы, дефисы и подчеркивания
            </p>
          </div>

          {/* Логин */}
          <div className="space-y-2">
            <Label htmlFor="login">
              Логин <span className="text-red-500">*</span>
            </Label>
            <Input
              id="login"
              placeholder="Введите логин для входа"
              value={formData.login}
              onChange={(e) => handleInputChange("login", e.target.value)}
              disabled={isLoading}
              maxLength={30}
            />
            <p className="text-xs text-muted-foreground">
              Только латинские буквы, цифры, дефисы и подчеркивания
            </p>
          </div>

          {/* Пароль */}
          <div className="space-y-2">
            <Label htmlFor="password">
              Пароль <span className="text-red-500">*</span>
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Введите пароль"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              disabled={isLoading}
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground">Пароль обязателен</p>
          </div>

          {/* Подтверждение пароля */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              Подтвердите пароль <span className="text-red-500">*</span>
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Повторите пароль"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              disabled={isLoading}
              maxLength={100}
            />
          </div>

          {/* Роль/Фракция */}
          <div className="space-y-2">
            <Label htmlFor="role">Фракция <span className="text-red-500">*</span></Label>
            <Select
              value={formData.role}
              onValueChange={(value) => handleInputChange("role", value)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите фракцию" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ГУВД">ГУВД</SelectItem>
                <SelectItem value="ГИБДД">ГИБДД</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* CAPTCHA */}
          {captcha && (
            <div className="space-y-2 p-4 border rounded-lg bg-muted/50">
              <Label htmlFor="captcha" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Проверка безопасности <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm font-medium">{captcha.question}</p>
              <div className="flex gap-2">
                <Input
                  id="captcha"
                  type="number"
                  placeholder="Введите ответ"
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                  disabled={isLoading}
                  className="max-w-xs"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={loadCaptcha}
                  disabled={isLoading}
                >
                  Обновить
                </Button>
              </div>
            </div>
          )}

          {/* Информация о защите от спама */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              <strong>Защита от спама:</strong> Вы можете отправить только 3 запроса в течение
              24 часов. Убедитесь, что все данные введены корректно перед отправкой.
            </AlertDescription>
          </Alert>

          {/* Кнопка отправки */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Отправка запроса...
              </>
            ) : (
              "Отправить запрос"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
