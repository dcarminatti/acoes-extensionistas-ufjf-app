"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useActions } from "@/hooks/use-actions";
import { cn, getStatusColor } from "@/lib/utils";
import { ArrowLeft, Check, X, FileText } from "lucide-react";
import { useParams, redirect } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function ManageActionById() {
  const { id } = useParams();
  const { user } = useAuth();
  const action = useActions().find((action) => action.id === Number(id));

  if (!action) {
    return <div>Ação não encontrada</div>;
  }

  const handleApproveAction = (id: number) => {
    if (action) {
      redirect(`/manage/approve/${id}`);
    }
  };

  const handleRejectAction = (id: number) => {
    if (action) {
      redirect(`/manage/reject/${id}`);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{action.name}</h1>
      <Image
        src={action.photo}
        alt={action.name}
        width={500}
        height={300}
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

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Arquivos Anexados</h2>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-blue-100 text-blue-800">
            <FileText className="w-4 h-4 mr-1" />
            documento.pdf
          </Badge>
          <Badge className="bg-green-100 text-green-800">
            <FileText className="w-4 h-4 mr-1" />
            relatorio_final.docx
          </Badge>
          <Badge className="bg-yellow-100 text-yellow-800">
            <FileText className="w-4 h-4 mr-1" />
            imagem.jpg
          </Badge>
        </div>
      </div>

      <div className="mt-8 w-full grid gap-y-2">
        <Button
          className="bg-emerald-700 hover:bg-emerald-600"
          onClick={() => handleApproveAction(action.id)}
        >
          <Check className="mr-1" />
          Aprovar Ação
        </Button>
        <Button
          variant="destructive"
          size="lg"
          onClick={() => handleRejectAction(action.id)}
        >
          <X className="mr-1" />
          Recusar Ação
        </Button>
        <Button variant="outline" size="lg" onClick={() => redirect("/manage")}>
          <ArrowLeft className="mr-1" />
          Voltar
        </Button>
      </div>
    </div>
  );
}
