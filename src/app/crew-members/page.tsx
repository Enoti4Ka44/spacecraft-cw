"use client";

import { useEffect, useState } from "react";
import { crewMemberService } from "@/services/service-crew-member";
import { CrewMember } from "@/types/mission";
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
import { Plus, User, Heart, Briefcase, Trash2, Edit2 } from "lucide-react";
import { CrewMemberForm } from "@/components/crew-member-form";

export default function CrewMembersPage() {
  const [members, setMembers] = useState<CrewMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CrewMember | null>(null);

  const loadData = async () => setMembers(await crewMemberService.getAll());
  useEffect(() => {
    loadData();
  }, []);

  const handleEdit = (item: CrewMember) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };
  const handleDelete = async (id: number) => {
    if (confirm("Удалить участника из базы?")) {
      await crewMemberService.delete(id);
      loadData();
    }
  };

  const onSubmit = async (formData: any) => {
    editingItem
      ? await crewMemberService.put(editingItem.id, {
          ...formData,
          id: editingItem.id,
        })
      : await crewMemberService.post(formData);
    setIsModalOpen(false);
    loadData();
  };

  return (
    <div className="px-5 py-10 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Экипаж</h1>
          <p className="text-muted-foreground">
            Реестр всех подготовленных космонавтов
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingItem(null);
            setIsModalOpen(true);
          }}
          className="gap-2"
        >
          <Plus className="w-4 h-4" /> Добавить участника
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {members.map((m) => (
          <Card key={m.id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">
                  {m.firstName} {m.lastName}
                </CardTitle>
                <div className="text-xs text-muted-foreground">ID: {m.id}</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="w-4 h-4" /> {m.specialization}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Heart
                  className={`w-4 h-4 ${m.healthStatus === "CRITICAL" ? "text-red-500" : "text-green-500"}`}
                />
                {m.healthStatus}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex gap-2">
              <Button
                variant="default"
                size="sm"
                className="flex-1"
                onClick={() => handleEdit(m)}
              >
                <Edit2 className="w-3 h-3" /> Редактировать
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive"
                onClick={() => handleDelete(m.id)}
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
              {editingItem ? "Редактировать" : "Новый участник"}
            </DialogTitle>
          </DialogHeader>
          <CrewMemberForm
            initialData={editingItem}
            onSubmit={onSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
