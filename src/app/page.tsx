"use client";

import { useCallback, useEffect, useState } from "react";
import { spacecraftService } from "@/services/service-spacecraft";
import { Spacecraft } from "@/types/spacecraft";
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
import { Plus, Edit2, Trash2, MapPin, Search, X } from "lucide-react";
import { SpacecraftForm } from "@/components/space-craft-form";
import { missionService } from "@/services/service-mission";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function SpacecraftsPage() {
  const [spacecrafts, setSpacecrafts] = useState<Spacecraft[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Spacecraft | null>(null);

  const [filters, setFilters] = useState<{ search: string; status: string }>({
    search: "",
    status: "all",
  });

  const loadData = useCallback(async () => {
    const params: any = {};
    if (filters.search) params.search = filters.search;
    if (filters.status !== "all") params.status = filters.status;

    const data = await spacecraftService.getAll(params);
    setSpacecrafts(data);
  }, [filters]);

  useEffect(() => {
    loadData();
  }, [filters]);

  const clearFilters = () => setFilters({ search: "", status: "all" });

  const handleCreate = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: Spacecraft) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Вы уверены, что хотите удалить этот корабль?")) {
      await spacecraftService.delete(id);
      loadData();
    }
  };

  const onSubmit = async (formData: any) => {
    if (editingItem) {
      await spacecraftService.put(editingItem.id, {
        ...formData,
        id: editingItem.id,
      });
    } else {
      await spacecraftService.post(formData);
    }
    setIsModalOpen(false);
    loadData();
  };

  return (
    <div className="px-5 py-10 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Космические корабли
          </h1>
          <p className="text-muted-foreground">Управление флотом экспедиции</p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="w-4 h-4" /> Создать корабль
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end bg-muted/30 p-4 rounded-lg">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label className="text-sm font-medium">Поиск</label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Название или модель..."
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
              <SelectItem value="STANDBY">Standby</SelectItem>
              <SelectItem value="IN_MISSION">In Mission</SelectItem>
              <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="ghost" onClick={clearFilters} className="gap-2">
          <X className="h-4 w-4" /> Сбросить
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spacecrafts.map((ship) => (
          <Card key={ship.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{ship.name}</CardTitle>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    ship.spacecraftStatus === "IN_MISSION"
                      ? "bg-green-100 text-green-700"
                      : ship.spacecraftStatus === "MAINTENANCE"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {ship.spacecraftStatus}
                </span>
              </div>
              <CardDescription>{ship.model}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {ship.currentLocation}
              </div>
              <p className="mt-4 text-sm line-clamp-2">{ship.specifications}</p>
            </CardContent>
            <CardFooter className="border-t pt-4 flex gap-2">
              <Button
                variant="default"
                size="sm"
                className="flex-1 gap-2"
                onClick={() => handleEdit(ship)}
              >
                <Edit2 className="w-3 h-3" /> Редактировать
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(ship.id)}
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
              {editingItem ? "Редактировать корабль" : "Создать новый корабль"}
            </DialogTitle>
          </DialogHeader>
          <SpacecraftForm
            initialData={editingItem}
            onSubmit={onSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
