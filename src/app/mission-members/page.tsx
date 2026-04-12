"use client";

import { useEffect, useState } from "react";
import { missionCrewService } from "@/services/service-mission-crew";
import { missionService } from "@/services/service-mission";
import { Mission, MissionCrew } from "@/types/mission";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2, UserPlus } from "lucide-react";
import { MissionMemberForm } from "@/components/mission-member-form";

export default function MissionMembersPage() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [selectedMissionId, setSelectedMissionId] = useState<string>("");
  const [crew, setCrew] = useState<MissionCrew[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    missionService.getAll().then(setMissions);
  }, []);

  const loadCrew = async (id: number) => {
    const data = await missionCrewService.getAll(id);
    setCrew(data);
  };

  const handleMissionChange = (id: string) => {
    setSelectedMissionId(id);
    loadCrew(Number(id));
  };

  const handleAddMember = async (formData: any) => {
    await missionCrewService.post(Number(selectedMissionId), formData);
    setIsModalOpen(false);
    loadCrew(Number(selectedMissionId));
  };

  const handleRemove = async (memberId: number) => {
    if (confirm("Отозвать участника из миссии?")) {
      await missionCrewService.delete(Number(selectedMissionId), memberId);
      loadCrew(Number(selectedMissionId));
    }
  };

  return (
    <div className="px-5 py-10 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Участники миссий</h1>
          <p className="text-muted-foreground">
            Назначение экипажа на активные задачи
          </p>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <Select onValueChange={handleMissionChange}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Выберите миссию" />
            </SelectTrigger>
            <SelectContent>
              {missions.map((m) => (
                <SelectItem key={m.id} value={m.id.toString()}>
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            disabled={!selectedMissionId}
            onClick={() => setIsModalOpen(true)}
          >
            <UserPlus className="mr-2 h-4 w-4" /> Назначить
          </Button>
        </div>
      </div>

      {selectedMissionId ? (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Имя</TableHead>
                <TableHead>Специализация</TableHead>
                <TableHead>Роль в миссии</TableHead>
                <TableHead>Дата вступления</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {crew.map((member) => (
                <TableRow key={member.memberId}>
                  <TableCell className="font-medium">
                    {member.firstName} {member.lastName}
                  </TableCell>
                  <TableCell>{member.specialization}</TableCell>
                  <TableCell className="text-blue-600 font-semibold">
                    {member.roleInMission}
                  </TableCell>
                  <TableCell>{String(member.joinDate).split("T")[0]}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemove(member.memberId)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {crew.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-10 text-muted-foreground"
                  >
                    В этой миссии пока нет участников
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-xl text-muted-foreground">
          Выберите миссию в списке сверху, чтобы увидеть состав экипажа
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Назначение в миссию</DialogTitle>
          </DialogHeader>
          <MissionMemberForm
            onSubmit={handleAddMember}
            onCancel={() => setIsModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
