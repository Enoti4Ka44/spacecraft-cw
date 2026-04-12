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
import { Plus, Edit2, Trash2, FlaskConical } from "lucide-react";
import { ExperimentForm } from "@/components/experiment-form";

export default function ExperimentsPage() {
  const [experiments, setExperiments] = useState<experiment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<experiment | null>(null);

  const loadData = async () => {
    const data = await experimentService.getAll();
    setExperiments(data);
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
