"use client";

import { useState, useEffect } from "react";
import { CrewMember, CrewMemberHealthStatus } from "@/types/mission";
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

interface Props {
  initialData?: CrewMember | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function CrewMemberForm({ initialData, onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    specialization: "",
    healthStatus: "HEALTHY" as CrewMemberHealthStatus,
    birthDate: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        birthDate: initialData.birthDate
          ? initialData.birthDate.split("T")[0]
          : "",
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="firstName">Имя</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lastName">Фамилия</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            required
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="specialization">Специализация</Label>
        <Input
          id="specialization"
          value={formData.specialization}
          onChange={(e) =>
            setFormData({ ...formData, specialization: e.target.value })
          }
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="birthDate">Дата рождения</Label>
        <Input
          id="birthDate"
          type="date"
          value={formData.birthDate}
          onChange={(e) =>
            setFormData({ ...formData, birthDate: e.target.value })
          }
          required
        />
      </div>
      <div className="grid gap-2">
        <Label>Состояние здоровья</Label>
        <Select
          value={formData.healthStatus}
          onValueChange={(value: CrewMemberHealthStatus) =>
            setFormData({ ...formData, healthStatus: value })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="HEALTHY">Healthy</SelectItem>
            <SelectItem value="SICK">Sick</SelectItem>
            <SelectItem value="CRITICAL">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit">{initialData ? "Сохранить" : "Добавить"}</Button>
      </div>
    </form>
  );
}
