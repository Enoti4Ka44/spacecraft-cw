"use client";

import { useEffect, useState } from "react";
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
import { Plus, Edit2, Trash2 } from "lucide-react";
import { ResourceTypeForm } from "@/components/resource-type-form";

export default function ResourceTypesPage() {
  const [types, setTypes] = useState<ResourceType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ResourceType | null>(null);

  const loadData = async () => setTypes(await resourceTypeService.getAll());
  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };
  const handleEdit = (item: ResourceType) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };
  const handleDelete = async (id: number) => {
    if (confirm("Удалить этот тип?")) {
      await resourceTypeService.delete(id);
      loadData();
    }
  };

  const onSubmit = async (formData: any) => {
    if (editingItem) {
      await resourceTypeService.put(editingItem.id, {
        ...formData,
        id: editingItem.id,
      });
    } else {
      await resourceTypeService.post(formData);
    }
    setIsModalOpen(false);
    loadData();
  };

  return (
    <div className="px-5 py-10 space-y-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Типы ресурсов</h1>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="w-4 h-4" /> Добавить тип
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {types.map((type) => (
          <Card key={type.id}>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {type.name}
              </CardTitle>
            </CardHeader>
            <CardFooter className="border-t pt-4 flex gap-2">
              <Button
                variant="default"
                size="sm"
                className="flex-1"
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
              {editingItem ? "Редактировать тип" : "Новый тип ресурса"}
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
