"use client";

import { AccountRequestsAdmin } from "@/components/account-requests-admin";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function AccountRequestsAdminPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || (user.role !== "Лидер ПГС" && user.role !== "ГС"))) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user || (user.role !== "Лидер ПГС" && user.role !== "ГС")) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <AccountRequestsAdmin />
    </div>
  );
}
