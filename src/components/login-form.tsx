"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [alertMessage, setAlertMessage] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login } = useAuth();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email.length === 0 || password.length === 0) {
      setAlertMessage("Por favor, preencha seus dados corretamente.");
      return;
    }

    const isLoggedIn = login(email, password);
    if (isLoggedIn) {
      redirect("/");
    } else {
      setAlertMessage("Email ou senha inválidos.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "email") setEmail(e.target.value);
    if (e.target.id === "password") setPassword(e.target.value);
    setAlertMessage("");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <p className={cn("text-red-500 m-auto ", { hidden: !alertMessage })}>
        {alertMessage}
      </p>

      <Card>
        <CardHeader>
          <Image
            src="/logo.webp"
            alt="Login Image"
            width={96}
            height={96}
            className="m-auto"
          />
          <CardTitle>Entre na sua conta</CardTitle>
          <CardDescription>
            Insira seu email abaixo para entrar na sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  aria-required="true"
                  value={email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">
                    Senha <span className="text-red-500">*</span>
                  </Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  aria-required="true"
                  value={password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className={cn("w-full")}
                  disabled={email.length === 0 || password.length === 0}
                >
                  Entrar
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
