"use client";

import { useEffect, useState } from "react";
import { missionService } from "@/services/service-mission";
import { Mission } from "@/types/mission";
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
import { Plus, Edit2, Trash2, Rocket } from "lucide-react";
import { MissionForm } from "@/components/mission-form";

export default function MissionsPage() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Mission | null>(null);

  const loadData = async () => setMissions(await missionService.getAll());
  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };
  const handleEdit = (item: Mission) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Удалить эту миссию?")) {
      await missionService.delete(id);
      loadData();
    }
  };

  const onSubmit = async (formData: any) => {
    if (editingItem) {
      await missionService.put(editingItem.id, {
        ...formData,
        id: editingItem.id,
      });
    } else {
      await missionService.post(formData);
    }

    setIsModalOpen(false);
    loadData();
  };

  return (
    <div className="px-5 py-10 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Миссии</h1>
          <p className="text-muted-foreground">
            Управление задачами и экспедициями
          </p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="w-4 h-4" /> Создать миссию
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {missions.map((mission) => (
          <Card key={mission.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-semibold">
                  <span className="text-muted-foreground mr-2 text-sm">
                    ID: {mission.id}
                  </span>{" "}
                  {mission.name}
                </CardTitle>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    mission.missionStatus === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : mission.missionStatus === "COMPLETED"
                        ? "bg-blue-100 text-blue-700"
                        : mission.missionStatus === "CANCELLED"
                          ? "bg-red-100 text-red-700"
                          : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {mission.missionStatus}
                </span>
              </div>
              <CardDescription>
                <p>Корабль ID: {mission.spacecraftId}</p>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Rocket className="w-4 h-4" />
                {mission.startDate
                  ? String(mission.startDate).split("T")[0]
                  : "..."}{" "}
                -{" "}
                {mission.endDate
                  ? String(mission.endDate).split("T")[0]
                  : "..."}
              </div>
              <p className="text-sm line-clamp-3">{mission.objectives}</p>
            </CardContent>
            <CardFooter className="border-t pt-4 flex gap-2">
              <Button
                variant="default"
                size="sm"
                className="flex-1"
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
              {editingItem ? "Редактировать миссию" : "Создать миссию"}
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
