"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useActions } from "@/hooks/use-actions";
import { ArrowLeft, Check, X } from "lucide-react";
import { redirect, useParams } from "next/navigation";

import data from "@/mock/data.json";

export default function RejectActionById() {
  const { id } = useParams();
  const action = useActions().find((action) => action.id === Number(id));

  if (!action) {
    return <div>Ação não encontrada</div>;
  }

  const handleRejectAction = (id: number) => {
    data.actions = data.actions.map((action) =>
      action.id === id ? { ...action, status: "Rejeitado" } : action
    );

    redirect(`/manage`);
  };

  return (
    <div>
      <h1 className="text-lg font-bold mb-4">Rejeitar Ação: {action.name}</h1>

      <Label htmlFor="justification">Justificativa:</Label>
      <textarea
        id="justification"
        className="border border-gray-300 p-2 rounded-md w-full mt-2"
        rows={4}
      />

      <div className="fixed bottom-0 right-0 p-4 w-full grid gap-y-2">
        <Button
          size="lg"
          className="bg-emerald-700"
          onClick={() => handleRejectAction(action.id)}
        >
          <Check className="mr-1" />
          Confirmar
        </Button>

        <Button
          variant="destructive"
          size="lg"
          onClick={() => redirect("/manage")}
        >
          <X className="mr-1" />
          Cancelar
        </Button>
      </div>
    </div>
  );
}
