"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useActions } from "@/hooks/use-actions";
import { redirect, useParams } from "next/navigation";
import Image from "next/image";
import { cn, getStatusColor } from "@/lib/utils";
import { ArrowLeft, Pen, Share2 } from "lucide-react";

export default function ActionPage() {
  const { id } = useParams();
  const action = useActions().find((action) => action.id === Number(id));

  if (!action) {
    return <div>Ação não encontrada</div>;
  }

  const handleEditAction = (id: number) => {
    if (action) {
      redirect(`/actions/edit/${id}`);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{action.name}</h1>
      <Image
        src={action.photo}
        alt={action.name}
        width={500}
        height={200}
        className="mb-4 rounded-lg"
      />
      <p className="mb-4 text-gray-900 text-lg">{action.description}</p>
      <p className="mb-2">
        Status:{" "}
        <span
          className={cn(
            "font-semibold p-1 rounded",
            getStatusColor(action.status)
          )}
        >
          {action.status}
        </span>
      </p>
      <p className="mb-2 text-gray-900">
        Localização: <span className="text-gray-700">{action.location}</span>
      </p>
      <p className="mb-2 text-gray-900">
        Professor: <span className="text-gray-700">{action.professor}</span>
      </p>
      <p className="mb-2 text-gray-900">
        Área: <span className="text-gray-700">{action.area}</span>
      </p>

      <div className="mt-4 grid gap-y-2">
        <Button
          className="bg-emerald-700"
          onClick={() => redirect("/actions/subscribe")}
        >
          <Pen className="mr-1" />
          Inscrever-se
        </Button>
        <Button>
          <Share2 className="mr-1" />
          Compartilhar
        </Button>
        <Button variant="outline" size="lg" onClick={() => redirect("/home")}>
          <ArrowLeft className="mr-1" />
          Voltar
        </Button>
      </div>
    </div>
  );
}
