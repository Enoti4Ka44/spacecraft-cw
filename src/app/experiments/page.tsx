"use client";

import { useEffect, useState } from "react";
import { experimentService } from "@/services/service-experiment";
import { experiment } from "@/types/experiment";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, FlaskConical, Search, X } from "lucide-react";
import { ExperimentForm } from "@/components/experiment-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CrewMember, Mission } from "@/types/mission";
import { missionService } from "@/services/service-mission";
import { crewMemberService } from "@/services/service-crew-member";

export default function ExperimentsPage() {
  const [experiments, setExperiments] = useState<experiment[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<experiment | null>(null);
  const [filters, setFilters] = useState({
    search: "",
    missionId: "all",
    status: "all",
    responsibleMemberId: "all",
  });

  useEffect(() => {
    missionService.getAll().then(setMissions);
    crewMemberService.getAll().then(setCrew);
  }, []);

  const loadData = async () => {
    const params: any = {};
    if (filters.search) params.search = filters.search;
    if (filters.missionId !== "all")
      params.missionId = Number(filters.missionId);
    if (filters.status !== "all") params.status = filters.status;
    if (filters.responsibleMemberId !== "all")
      params.responsibleMemberId = Number(filters.responsibleMemberId);

    setExperiments(await experimentService.getAll(params));
  };

  useEffect(() => {
    loadData();
  }, [filters]);

  const clearFilters = () => {
    setFilters({
      missionId: "all",
      status: "all",
      responsibleMemberId: "all",
      search: "",
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };
  const handleEdit = (item: experiment) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Удалить этот эксперимент?")) {
      await experimentService.delete(id);
      loadData();
    }
  };

  const onSubmit = async (formData: any) => {
    if (editingItem) {
      await experimentService.put(editingItem.id, {
        ...formData,
        id: editingItem.id,
      });
    } else {
      await experimentService.post(formData);
    }
    setIsModalOpen(false);
    loadData();
  };

  return (
    <div className="px-5 py-10 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Эксперименты</h1>
          <p className="text-muted-foreground">Научные исследования миссий</p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="w-4 h-4" /> Добавить эксперимент
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end bg-muted/30 p-4 rounded-lg flex-wrap">
        <div className="grid w-full max-w-[200px] items-center gap-1.5">
          <label className="text-sm font-medium">Поиск</label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Название..."
              className="pl-9"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>
        </div>

        <div className="grid items-center gap-1.5">
          <label className="text-sm font-medium">Статус</label>
          <Select
            value={filters.status}
            onValueChange={(v) => setFilters({ ...filters, status: v })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все</SelectItem>
              <SelectItem value="PLANNED">Planned</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="FAILED">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid items-center gap-1.5">
          <label className="text-sm font-medium">Миссия</label>
          <Select
            value={filters.missionId}
            onValueChange={(v) => setFilters({ ...filters, missionId: v })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все миссии</SelectItem>
              {missions.map((m) => (
                <SelectItem key={m.id} value={m.id.toString()}>
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid items-center gap-1.5">
          <label className="text-sm font-medium">Ответственный</label>
          <Select
            value={filters.responsibleMemberId}
            onValueChange={(v) =>
              setFilters({ ...filters, responsibleMemberId: v })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все участники</SelectItem>
              {crew.map((c) => (
                <SelectItem key={c.id} value={c.id.toString()}>
                  {c.firstName} {c.lastName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button variant="ghost" onClick={clearFilters} className="gap-2">
          <X className="h-4 w-4" /> Сбросить
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiments.map((exp) => (
          <Card key={exp.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{exp.name}</CardTitle>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    exp.experimentStatus === "COMPLETED"
                      ? "bg-green-100 text-green-700"
                      : exp.experimentStatus === "FAILED"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {exp.experimentStatus}
                </span>
              </div>
              <CardDescription>Миссия ID: {exp.missionId}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FlaskConical className="w-4 h-4" /> Ответственный ID:{" "}
                {exp.responsibleMemberId}
              </div>
              <p className="mt-4 text-sm line-clamp-2">{exp.description}</p>
            </CardContent>
            <CardFooter className="border-t pt-4 flex gap-2">
              <Button
                variant="default"
                size="sm"
                className="flex-1 gap-2"
                onClick={() => handleEdit(exp)}
              >
                <Edit2 className="w-3 h-3" /> Редактировать
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(exp.id)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Редактировать" : "Создать"}
            </DialogTitle>
          </DialogHeader>
          <ExperimentForm
            initialData={editingItem}
            onSubmit={onSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
