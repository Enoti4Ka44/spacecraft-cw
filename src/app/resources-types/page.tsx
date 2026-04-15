"use client";

import { useEffect, useState, useCallback } from "react";
import { resourceTypeService } from "@/services/service-resource-type";
import { ResourceType } from "@/types/resource";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Edit2, Trash2, Search, X } from "lucide-react";
import { ResourceTypeForm } from "@/components/resource-type-form";

export default function ResourceTypesPage() {
  const [types, setTypes] = useState<ResourceType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ResourceType | null>(null);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    const params: any = {};
    if (search) params.search = search;
    setTypes(await resourceTypeService.getAll(params));
  };

  useEffect(() => {
    loadData();
  }, [search]);

  const clearFilters = () => setSearch("");

  const handleCreate = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };
  const handleEdit = (item: ResourceType) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };
  const handleDelete = async (id: number) => {
    if (confirm("Удалить?")) {
      await resourceTypeService.delete(id);
      loadData();
    }
  };
  const onSubmit = async (data: any) => {
    editingItem
      ? await resourceTypeService.put(editingItem.id, {
          ...data,
          id: editingItem.id,
        })
      : await resourceTypeService.post(data);
    setIsModalOpen(false);
    loadData();
  };

  return (
    <div className="px-5 py-10 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Типы ресурсов</h1>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="w-4 h-4" /> Добавить
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end bg-muted/30 p-4 rounded-lg">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label className="text-sm font-medium">Поиск</label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Название типа..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <Button variant="ghost" onClick={clearFilters} className="gap-2">
          <X className="h-4 w-4" /> Сбросить
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {types.map((type) => (
          <Card key={type.id}>
            <CardHeader>
              <CardTitle className="text-lg">{type.name}</CardTitle>
            </CardHeader>
            <CardFooter className="border-t pt-4 flex gap-2">
              <Button
                variant="default"
                size="sm"
                className="flex-1 gap-2"
                onClick={() => handleEdit(type)}
              >
                <Edit2 className="w-3 h-3" /> Редактировать
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(type.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Редактировать" : "Новый тип"}
            </DialogTitle>
          </DialogHeader>
          <ResourceTypeForm
            initialData={editingItem}
            onSubmit={onSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
