"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useActions } from "@/hooks/use-actions";
import { ArrowLeft, Check, X } from "lucide-react";
import { redirect, useParams } from "next/navigation";

import data from "@/mock/data.json";
import { cn } from "@/lib/utils";

export default function ApproveActionById() {
  const { id } = useParams();
  const action = useActions().find((action) => action.id === Number(id));
  const [justification, setJustification] = useState("");
  const [error, setError] = useState("");

  if (!action) {
    return <div>Ação não encontrada</div>;
  }

  const handleApproveAction = (id: number) => {
    if (!justification.trim()) {
      setError("A justificativa é obrigatória.");
      return;
    }

    data.actions = data.actions.map((action) =>
      action.id === id ? { ...action, status: "Em andamento" } : action
    );

    redirect(`/manage`);
  };

  return (
    <div>
      <h1 className="text-lg font-bold mb-4">Aprovar Ação: {action.name}</h1>

      <Label htmlFor="justification">
        Justificativa
        <span className="text-red-500">*</span>
      </Label>
      <textarea
        id="justification"
        className={cn("border border-gray-300 p-2 rounded-md w-full mt-2", {
          "border-red-500": error,
        })}
        rows={4}
        value={justification}
        onChange={(e) => {
          setJustification(e.target.value);
          setError("");
        }}
      />
      {error && <div className="text-red-600 mt-1">{error}</div>}

      <div className="fixed bottom-0 right-0 p-4 w-full grid gap-y-2">
        <Button
          size="lg"
          className="bg-emerald-700"
          onClick={() => handleApproveAction(action.id)}
        >
          <Check className="mr-1" />
          Confirmar
        </Button>

        <Button
          variant="destructive"
          size="lg"
          onClick={() => redirect(`/manage/${action.id}`)}
        >
          <X className="mr-1" />
          Cancelar
        </Button>
      </div>
    </div>
  );
}
