"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Resource } from "@/types/resource";

interface Props {
  resource: Resource;
  onSubmit: (quantityChange: string) => void;
  onCancel: () => void;
}

export function ResourceQuantityForm({ resource, onSubmit, onCancel }: Props) {
  // Храним значение как строку, чтобы можно было ввести знак "-"
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    onSubmit(quantity);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="bg-muted/50 p-3 rounded-md mb-4 text-sm">
        <p>
          Текущее количество:{" "}
          <strong>
            {resource.currentQuantity} {resource.unit}
          </strong>
        </p>
        <p className="text-muted-foreground mt-1">
          Введите положительное число для пополнения (например: 50) или
          отрицательное для списания (например: -20).
        </p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="quantityChange">Изменение количества</Label>
        <Input
          id="quantityChange"
          type="number"
          placeholder="+50 или -20"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit">Применить</Button>
      </div>
    </form>
  );
}
