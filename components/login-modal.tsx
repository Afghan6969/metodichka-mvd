"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Shield, User, Lock, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!username || !password) {
      setError("Пожалуйста, заполните все поля");
      setIsLoading(false);
      return;
    }

    const success = await login(username, password);
    if (success) {
      setUsername("");
      setPassword("");
      setError("");
      onClose();
    } else {
      setError("Неверный логин или пароль");
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-2 border-primary/30 backdrop-blur-xl shadow-2xl shadow-primary/20">
        <DialogHeader>
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-3xl flex items-center justify-center mb-4 border-2 border-primary/50 shadow-lg shadow-primary/30 relative overflow-hidden">
            <Shield className="h-10 w-10 text-primary-foreground z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
          <DialogTitle className="text-center text-2xl font-black uppercase tracking-widest">Вход в систему</DialogTitle>
          <DialogDescription className="text-center font-semibold uppercase tracking-wide text-primary">Авторизация МВД РП</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {error && (
            <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2 border-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="font-semibold">{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-bold uppercase tracking-wide">Логин игрока</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                placeholder="Введите логин"
                className="pl-10 h-12 border-2 border-primary/30 bg-background/50 rounded-xl font-semibold focus:border-primary focus:ring-2 focus:ring-primary/20"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-bold uppercase tracking-wide">Пароль</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Введите пароль"
                className="pl-10 h-12 border-2 border-primary/30 bg-background/50 rounded font-semibold focus:border-primary focus:ring-2 focus:ring-primary/20"
                disabled={isLoading}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 rounded-xl font-black uppercase tracking-widest mt-6 shadow-lg shadow-primary/30"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Вход...
              </>
            ) : (
              "Войти"
            )}
          </Button>
        </form>

        <div className="text-center pt-4 border-t-2 border-primary/20 mt-4">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">
            Доступ только для персонала МВД РП
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
