"use client";

import { NavMenu } from "@/components/nav-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Power } from "lucide-react";
import { redirect } from "next/navigation";

export default function AccountPage() {
  const { user, logout } = useAuth();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="h-[calc(100vh_-_3rem)] flex flex-col">
      <h1 className="text-2xl font-bold">Conta</h1>
      <p>Bem-vindo, {user.name}!</p>
      <p className="text-sm text-muted-foreground">
        Esta é a sua conta. Você pode gerenciar suas configurações aqui.
      </p>

      <Button
        variant="destructive"
        size="lg"
        className="fixed bottom-18 w-[calc(100%_-_3rem)]"
        onClick={() => {
          logout();
        }}
      >
        <Power />
        Sair
      </Button>

      <NavMenu />
    </div>
  );
}
