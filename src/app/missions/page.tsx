"use client";

import { useEffect, useState, useCallback } from "react";
import { missionService } from "@/services/service-mission";
import { spacecraftService } from "@/services/service-spacecraft";
import { Mission } from "@/types/mission";
import { Spacecraft } from "@/types/spacecraft";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, Search, X, Rocket } from "lucide-react";
import { MissionForm } from "@/components/mission-form";

export default function MissionsPage() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [spacecrafts, setSpacecrafts] = useState<Spacecraft[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Mission | null>(null);

  const [filters, setFilters] = useState({
    spacecraftId: "all",
    status: "all",
    search: "",
  });

  useEffect(() => {
    spacecraftService.getAll().then(setSpacecrafts);
  }, []);

  const loadData = useCallback(async () => {
    const params: any = {};
    if (filters.search) params.search = filters.search;
    if (filters.spacecraftId !== "all")
      params.spacecraftId = Number(filters.spacecraftId);
    if (filters.status !== "all") params.missionStatus = filters.status;

    setMissions(await missionService.getAll(params));
  }, [filters]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const clearFilters = () => {
    setFilters({ spacecraftId: "all", status: "all", search: "" });
  };

  const handleCreate = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };
  const handleEdit = (item: Mission) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };
  const handleDelete = async (id: number) => {
    if (confirm("Удалить?")) {
      await missionService.delete(id);
      loadData();
    }
  };
  const onSubmit = async (data: any) => {
    editingItem
      ? await missionService.put(editingItem.id, {
          ...data,
          id: editingItem.id,
        })
      : await missionService.post(data);
    setIsModalOpen(false);
    loadData();
  };

  return (
    <div className="px-5 py-10 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Миссии</h1>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="w-4 h-4" /> Создать
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end bg-muted/30 p-4 rounded-lg flex-wrap">
        <div className="grid items-center gap-1.5">
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
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="PLANNING">Planning</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid items-center gap-1.5">
          <label className="text-sm font-medium">Корабль</label>
          <Select
            value={filters.spacecraftId}
            onValueChange={(v) => setFilters({ ...filters, spacecraftId: v })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все корабли</SelectItem>
              {spacecrafts.map((s) => (
                <SelectItem key={s.id} value={s.id.toString()}>
                  {s.name}
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
        {missions.map((mission) => (
          <Card key={mission.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{mission.name}</CardTitle>
              <CardDescription>Статус: {mission.missionStatus}</CardDescription>
            </CardHeader>
            <CardFooter className="border-t pt-4 flex gap-2">
              <Button
                variant="default"
                size="sm"
                className="flex-1 gap-2"
                onClick={() => handleEdit(mission)}
              >
                <Edit2 className="w-3 h-3" /> Редактировать
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(mission.id)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Редактировать" : "Создать"}
            </DialogTitle>
          </DialogHeader>
          <MissionForm
            initialData={editingItem}
            onSubmit={onSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
