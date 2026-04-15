"use client";

import { useState, useEffect } from "react";
import { Mission, MissionStatusMAP } from "@/types/mission";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fromLongDate, toLongDate } from "@/lib/date-formatter";

interface Props {
  initialData?: Mission | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function MissionForm({ initialData, onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    spacecraftId: 0,
    startDate: "",
    endDate: "",
    missionStatus: "PLANNING" as MissionStatusMAP,
    objectives: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        startDate: fromLongDate(String(initialData.startDate)),
        endDate: fromLongDate(String(initialData.endDate)),
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      spacecraftId: Number(formData.spacecraftId),
      startDate: toLongDate(formData.startDate),
      endDate: toLongDate(formData.endDate),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Название миссии</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="spacecraftId">ID Корабля</Label>
        <Input
          id="spacecraftId"
          type="number"
          value={formData.spacecraftId}
          onChange={(e) =>
            setFormData({ ...formData, spacecraftId: Number(e.target.value) })
          }
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="startDate">Дата начала</Label>
          <Input
            id="startDate"
            type="datetime-local"
            value={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="endDate">Дата окончания</Label>
          <Input
            id="endDate"
            type="datetime-local"
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
            required
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label>Статус</Label>
        <Select
          value={formData.missionStatus}
          onValueChange={(value: MissionStatusMAP) =>
            setFormData({ ...formData, missionStatus: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Выберите статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PLANNING">Planning</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="objectives">Цели</Label>
        <Input
          id="objectives"
          value={formData.objectives}
          onChange={(e) =>
            setFormData({ ...formData, objectives: e.target.value })
          }
          required
        />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit">{initialData ? "Сохранить" : "Создать"}</Button>
      </div>
    </form>
  );
}
