"use client";

import { useState, useEffect } from "react";
import { experiment, ExperimentStatusMAP } from "@/types/experiment";
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
  initialData?: experiment | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function ExperimentForm({ initialData, onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    missionId: 0,
    description: "",
    experimentStatus: "PLANNED" as ExperimentStatusMAP,
    responsibleMemberId: 0,
    startTime: "",
    endTime: "",
    results: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        startTime: fromLongDate(String(initialData.startTime)),
        endTime: fromLongDate(String(initialData.endTime)),
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      missionId: Number(formData.missionId),
      responsibleMemberId: Number(formData.responsibleMemberId),
      startTime: toLongDate(formData.startTime),
      endTime: toLongDate(formData.endTime),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Название</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Описание</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="missionId">ID Миссии</Label>
          <Input
            id="missionId"
            type="number"
            value={formData.missionId}
            onChange={(e) =>
              setFormData({ ...formData, missionId: Number(e.target.value) })
            }
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="responsibleMemberId">ID Ответственного</Label>
          <Input
            id="responsibleMemberId"
            type="number"
            value={formData.responsibleMemberId}
            onChange={(e) =>
              setFormData({
                ...formData,
                responsibleMemberId: Number(e.target.value),
              })
            }
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="startTime">Дата начала</Label>
          <Input
            id="startTime"
            type="datetime-local"
            value={formData.startTime}
            onChange={(e) =>
              setFormData({ ...formData, startTime: e.target.value })
            }
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="endTime">Дата окончания</Label>
          <Input
            id="endTime"
            type="datetime-local"
            value={formData.endTime}
            onChange={(e) =>
              setFormData({ ...formData, endTime: e.target.value })
            }
            required
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label>Статус</Label>
        <Select
          value={formData.experimentStatus}
          onValueChange={(value: ExperimentStatusMAP) =>
            setFormData({ ...formData, experimentStatus: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Выберите статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PLANNED">Planned</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="FAILED">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="results">Результаты</Label>
        <Input
          id="results"
          value={formData.results}
          onChange={(e) =>
            setFormData({ ...formData, results: e.target.value })
          }
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
