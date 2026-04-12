"use client";

import { useState, useEffect } from "react";
import { Spacecraft, spacecraftStatusMAP } from "@/types/spacecraft";
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
  initialData?: Spacecraft | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function SpacecraftForm({ initialData, onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    launchDate: "",
    spacecraftStatus: "STANDBY" as spacecraftStatusMAP,
    specifications: "",
    currentLocation: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        // Обрезаем дату до формата YYYY-MM-DD для input type="date"
        launchDate: initialData.launchDate.split("T")[0],
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
        <Label htmlFor="model">Модель</Label>
        <Input
          id="model"
          value={formData.model}
          onChange={(e) => setFormData({ ...formData, model: e.target.value })}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="date">Дата запуска</Label>
          <Input
            id="date"
            type="date"
            value={formData.launchDate}
            onChange={(e) =>
              setFormData({ ...formData, launchDate: e.target.value })
            }
            required
          />
        </div>
        <div className="grid gap-2">
          <Label>Статус</Label>
          <Select
            value={formData.spacecraftStatus}
            onValueChange={(value: spacecraftStatusMAP) =>
              setFormData({ ...formData, spacecraftStatus: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="STANDBY">Standby</SelectItem>
              <SelectItem value="IN_MISSION">In Mission</SelectItem>
              <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="location">Локация</Label>
        <Input
          id="location"
          value={formData.currentLocation}
          onChange={(e) =>
            setFormData({ ...formData, currentLocation: e.target.value })
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
