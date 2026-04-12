"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function MissionMemberForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    memberId: 0,
    roleInMission: "",
    joinDate: new Date().toISOString().split("T")[0],
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="space-y-4 pt-4"
    >
      <div className="grid gap-2">
        <Label htmlFor="memberId">ID Участника (из базы экипажа)</Label>
        <Input
          id="memberId"
          type="number"
          value={formData.memberId}
          onChange={(e) =>
            setFormData({ ...formData, memberId: Number(e.target.value) })
          }
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="role">Роль в миссии</Label>
        <Input
          id="role"
          placeholder="Например: Пилот, Инженер"
          value={formData.roleInMission}
          onChange={(e) =>
            setFormData({ ...formData, roleInMission: e.target.value })
          }
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="date">Дата вступления</Label>
        <Input
          id="date"
          type="date"
          value={formData.joinDate}
          onChange={(e) =>
            setFormData({ ...formData, joinDate: e.target.value })
          }
          required
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit">Назначить</Button>
      </div>
    </form>
  );
}
