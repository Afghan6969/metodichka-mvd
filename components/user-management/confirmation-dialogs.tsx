"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ConfirmationDialogsProps {
  isDeleteDialogOpen: boolean
  isRestoreDialogOpen: boolean
  userToDelete: { id: string; nickname: string } | null
  userToRestore: { id: string; nickname: string } | null
  onDeleteConfirm: () => void
  onDeleteCancel: () => void
  onRestoreConfirm: () => void
  onRestoreCancel: () => void
}

export function ConfirmationDialogs({
  isDeleteDialogOpen,
  isRestoreDialogOpen,
  userToDelete,
  userToRestore,
  onDeleteConfirm,
  onDeleteCancel,
  onRestoreConfirm,
  onRestoreCancel,
}: ConfirmationDialogsProps) {
  return (
    <>
      {/* Диалог деактивации */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={onDeleteCancel}>
        <AlertDialogContent className="bg-card border-border backdrop-blur-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Подтверждение деактивации</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите деактивировать пользователя <strong>{userToDelete?.nickname}</strong>?
              <br />
              <br />
              Пользователь не сможет войти в систему, но его данные и пароль будут сохранены. Вы сможете
              восстановить его позже.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={onDeleteConfirm} className="bg-destructive hover:bg-destructive/90">
              Деактивировать
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Диалог восстановления */}
      <AlertDialog open={isRestoreDialogOpen} onOpenChange={onRestoreCancel}>
        <AlertDialogContent className="bg-card border-border backdrop-blur-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Подтверждение восстановления</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите восстановить пользователя <strong>{userToRestore?.nickname}</strong>?
              <br />
              <br />
              Пользователь снова сможет войти в систему со своим старым паролем.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={onRestoreConfirm} className="bg-green-600 hover:bg-green-700">
              Восстановить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
