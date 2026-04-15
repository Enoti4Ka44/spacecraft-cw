"use client";

import { useState, useEffect } from "react";
import { Resource } from "@/types/resource";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getNowLongDate } from "@/lib/date-formatter";

interface Props {
  initialData?: Resource | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function ResourceForm({ initialData, onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState({
    spacecraftId: 0,
    resourceTypeId: 0,
    currentQuantity: 0,
    maxCapacity: 0,
    unit: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        spacecraftId: initialData.spacecraftId,
        resourceTypeId: initialData.resourceTypeId,
        currentQuantity: initialData.currentQuantity,
        maxCapacity: initialData.maxCapacity,
        unit: initialData.unit,
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      spacecraftId: Number(formData.spacecraftId),
      resourceTypeId: Number(formData.resourceTypeId),
      currentQuantity: Number(formData.currentQuantity),
      maxCapacity: Number(formData.maxCapacity),
      lastUpdated: getNowLongDate(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="grid grid-cols-2 gap-4">
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
        <div className="grid gap-2">
          <Label htmlFor="resourceTypeId">ID Типа ресурса</Label>
          <Input
            id="resourceTypeId"
            type="number"
            value={formData.resourceTypeId}
            onChange={(e) =>
              setFormData({
                ...formData,
                resourceTypeId: Number(e.target.value),
              })
            }
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="currentQuantity">Текущее кол-во</Label>
          <Input
            id="currentQuantity"
            type="number"
            value={formData.currentQuantity}
            onChange={(e) =>
              setFormData({
                ...formData,
                currentQuantity: Number(e.target.value),
              })
            }
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="maxCapacity">Макс. вместимость</Label>
          <Input
            id="maxCapacity"
            type="number"
            value={formData.maxCapacity}
            onChange={(e) =>
              setFormData({ ...formData, maxCapacity: Number(e.target.value) })
            }
            required
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="unit">Единица измерения (кг, л, шт)</Label>
        <Input
          id="unit"
          value={formData.unit}
          onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
          required
        />
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
