"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { redirect } from "next/navigation";
import { ArrowRight, ArrowUp, X } from "lucide-react";

import data from "@/mock/data.json";

const areaOptions = [
  "Engenharias",
  "Ciências da Saúde",
  "Linguística, Letras e Artes",
];

export default function CreateActionPage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "",
    location: "",
    professor: "",
    area: "",
    photo: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { user } = useAuth();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validação simples
    if (
      !form.name ||
      !form.description ||
      !form.location ||
      !form.area ||
      !form.photo
    ) {
      setError("Preencha todos os campos.");
      return;
    }

    const newAction = {
      ...form,
      professor: user?.name ?? "",
      status: "Aguardando Aprovação",
      id: data.actions.length + 1,
    };

    data.actions.push(newAction);

    setSuccess(true);
    setForm({
      name: "",
      description: "",
      status: "",
      location: "",
      professor: "",
      area: "",
      photo: "",
    });

    redirect("/my-actions/create/approve/" + newAction.id);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Criar Nova Ação</h1>
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
          Ação criada com sucesso!
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">{error}</div>
      )}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="name">
            Nome <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">
            Descrição <span className="text-red-500">*</span>
          </Label>
          <Input
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">
            Local <span className="text-red-500">*</span>
          </Label>
          <Input
            id="location"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="area">
            Área <span className="text-red-500">*</span>
          </Label>
          <Select
            onValueChange={(value) => {
              setForm({ ...form, area: value });
              setError("");
            }}
            value={form.area}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select an area" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>
                  Área <span className="text-red-500">*</span>
                </SelectLabel>
                {areaOptions.map((area) => (
                  <SelectItem key={area} value={area}>
                    {area.charAt(0).toUpperCase() + area.slice(1)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="photo">
            URL da Foto <span className="text-red-500">*</span>
          </Label>
          <Input
            id="photo"
            name="photo"
            value={form.photo}
            onChange={handleChange}
            required
            placeholder="https://..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="document">
            Documentos <span className="text-red-500">*</span>
          </Label>
          <Input
            id="document"
            name="document"
            type="file"
            placeholder="Selecione um arquivo"
          />
        </div>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <Button type="submit" className="w-full" size="lg">
            <ArrowRight className="mr-1" />
            Avançar
          </Button>
          <Button
            variant="destructive"
            size="lg"
            type="button"
            className="w-full"
            onClick={() => redirect("/my-actions")}
          >
            <X className="mr-1" />
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
