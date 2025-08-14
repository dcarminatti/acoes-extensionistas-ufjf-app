"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { redirect } from "next/navigation";

export default function SubscribePage() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-y-4">
      <h1 className="text-2xl font-bold text-center">
        Parabéns por se inscrever!
      </h1>
      <CheckCircle className="text-emerald-500 size-14" />

      <Button
        variant="outline"
        className="w-[calc(100%_-_3rem)] absolute bottom-6"
        onClick={() => redirect("/home")}
      >
        <ArrowLeft className="mr-1" />
        Voltar
      </Button>
    </div>
  );
}
