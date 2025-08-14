"use client";

import { NavMenu } from "@/components/nav-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useActions } from "@/hooks/use-actions";
import { cn } from "@/lib/utils";
import { Filter, Search, X } from "lucide-react";
import { redirect } from "next/navigation";
import { getStatusColor } from "@/lib/utils";

import React, { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ManageActions() {
  const originalActions = useActions().filter(
    (action) => action.status === "Pendente"
  );
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [actions, setActions] = useState(
    originalActions ? originalActions : []
  );
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("");

  const areas = Array.from(new Set(originalActions.map((a) => a.area)));
  const statuses = Array.from(new Set(originalActions.map((a) => a.status)));

  if (user === undefined) {
    redirect("/auth/login");
  }

  const handleCardClick = (id: number) => {
    if (selectedCard === id) {
      setSelectedCard(null);
    } else {
      setSelectedCard(id);
    }
  };

  const searchActions = (query: string) => {
    const filteredActions = actions.filter((action) =>
      action.name.toLowerCase().includes(query.toLowerCase())
    );

    if (query === "") {
      setActions(originalActions ? originalActions : []);
      return;
    }

    setActions(filteredActions);
  };

  const handleAnalyzeAction = (id: number) => {
    if (originalActions.find((action) => action.id === id)) {
      redirect(`/manage/${id}`);
      return;
    }

    return;
  };

  const applyFilters = () => {
    let filtered = originalActions;
    if (search) {
      filtered = filtered.filter((action) =>
        action.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (statusFilter) {
      filtered = filtered.filter((action) => action.status === statusFilter);
    }
    if (areaFilter) {
      filtered = filtered.filter((action) => action.area === areaFilter);
    }
    setActions(filtered);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold">Analisar Ações Extensionistas</h1>
        <p className="text-sm">Selecione uma ação extensionista para análise</p>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Pesquisar ação..."
          onChange={(e) => searchActions(e.target.value)}
        />
        <Button
          size="icon"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Abrir filtros"
        >
          <Filter />
        </Button>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/30"
            onClick={() => setIsSidebarOpen(false)}
          />
          <aside className="relative w-80 bg-white h-screen  shadow-lg p-6 flex flex-col">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Fechar filtros"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold mb-6">Filtrar Ações</h2>
            <div className="mb-4 space-y-2">
              <Label htmlFor="status-select">Status</Label>
              <Select
                onValueChange={(value) => setStatusFilter(value)}
                value={statusFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4 space-y-2">
              <Label htmlFor="area-select">Área</Label>
              <Select
                onValueChange={(value) => setAreaFilter(value)}
                value={areaFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select an area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Área</SelectLabel>
                    {areas.map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-auto flex flex-col gap-y-2">
              <Button onClick={applyFilters}>Filtrar</Button>
              <Button
                variant="outline"
                onClick={() => {
                  setStatusFilter("");
                  setAreaFilter("");
                  setIsSidebarOpen(false);
                  setActions(originalActions);
                }}
              >
                Limpar filtros
              </Button>
            </div>
          </aside>
        </div>
      )}

      <ul className="space-y-4">
        {actions.map((action) => (
          <Card
            key={action.id}
            className={cn(
              "cursor-pointer transition-all duration-200 gap-0 hover:shadow-md",
              {
                "ring-2 ring-primary": selectedCard === action.id,
              }
            )}
            onClick={() => handleCardClick(action.id)}
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {action.name}
                <Badge
                  variant="secondary"
                  className={getStatusColor(action.status)}
                >
                  {action.status.charAt(0).toUpperCase() +
                    action.status.slice(1)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground leading-relaxed">
                {action.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </ul>

      {selectedCard !== null && (
        <div className="w-[calc(100%_-_3rem)] fixed bottom-14 grid gap-2">
          <Button size="lg" onClick={() => handleAnalyzeAction(selectedCard)}>
            <Search />
            Analisar Ação
          </Button>
        </div>
      )}

      <NavMenu />
    </div>
  );
}
