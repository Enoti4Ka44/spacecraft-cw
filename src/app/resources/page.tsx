"use client";

import { useEffect, useState } from "react";
import { resourceService } from "@/services/service-resource";
import { Resource, ResourceType } from "@/types/resource";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, Package, X } from "lucide-react";
import { ResourceForm } from "@/components/resource-form";
import { resourceTypeService } from "@/services/service-resource-type";
import { spacecraftService } from "@/services/service-spacecraft";
import { Spacecraft } from "@/types/spacecraft";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [types, setTypes] = useState<ResourceType[]>([]);
  const [spacecrafts, setSpacecrafts] = useState<Spacecraft[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Resource | null>(null);

  // Фильтры
  const [filters, setFilters] = useState({
    maxCurrentQuantity: "",
    resourceTypeId: "all",
    spacecraftId: "all",
  });

  useEffect(() => {
    resourceTypeService.getAll().then(setTypes);
    spacecraftService.getAll().then(setSpacecrafts);
  }, []);

  const loadData = async () => {
    const params: any = {};
    if (filters.maxCurrentQuantity)
      params.maxCurrentQuantity = Number(filters.maxCurrentQuantity);
    if (filters.resourceTypeId !== "all")
      params.resourceTypeId = Number(filters.resourceTypeId);
    if (filters.spacecraftId !== "all")
      params.spacecraftId = Number(filters.spacecraftId);

    setResources(await resourceService.getAll(params));
  };

  useEffect(() => {
    loadData();
  }, [filters]);

  const clearFilters = () =>
    setFilters({
      maxCurrentQuantity: "",
      resourceTypeId: "all",
      spacecraftId: "all",
    });

  const handleCreate = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };
  const handleEdit = (item: Resource) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };
  const handleDelete = async (id: number) => {
    if (confirm("Удалить этот ресурс?")) {
      await resourceService.delete(id);
      loadData();
    }
  };

  const onSubmit = async (formData: any) => {
    if (editingItem) {
      await resourceService.put(editingItem.id, {
        ...formData,
        id: editingItem.id,
      });
    } else {
      await resourceService.post(formData);
    }
    setIsModalOpen(false);
    loadData();
  };

  return (
    <div className="px-5 py-10 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ресурсы</h1>
          <p className="text-muted-foreground">Запасы на кораблях</p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="w-4 h-4" /> Добавить ресурс
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end bg-muted/30 p-4 rounded-lg flex-wrap">
        <div className="grid items-center gap-1.5">
          <label className="text-sm font-medium">Макс. текущее кол-во</label>
          <Input
            type="number"
            placeholder="Например, 100"
            value={filters.maxCurrentQuantity}
            onChange={(e) =>
              setFilters({ ...filters, maxCurrentQuantity: e.target.value })
            }
          />
        </div>

        <div className="grid items-center gap-1.5">
          <label className="text-sm font-medium">Тип ресурса</label>
          <Select
            value={filters.resourceTypeId}
            onValueChange={(v) => setFilters({ ...filters, resourceTypeId: v })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все типы</SelectItem>
              {types.map((t) => (
                <SelectItem key={t.id} value={t.id.toString()}>
                  {t.name}
                </SelectItem>
              ))}
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

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {resources.map((res) => (
          <Card key={res.id}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Package className="w-5 h-5 text-muted-foreground" /> Тип:{" "}
                {res.resourceTypeId}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-4">
                Корабль ID: {res.spacecraftId}
              </div>
              <div className="text-2xl font-bold">
                {res.currentQuantity} / {res.maxCapacity}{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  {res.unit}
                </span>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex gap-2">
              <Button
                variant="default"
                size="sm"
                className="flex-1"
                onClick={() => handleEdit(res)}
              >
                <Edit2 className="w-3 h-3" /> Редактировать
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(res.id)}
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
          <ResourceForm
            initialData={editingItem}
            onSubmit={onSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
