"use client";

import { useState, useEffect } from "react";
import { ResourceType } from "@/types/resource";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  initialData?: ResourceType | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function ResourceTypeForm({ initialData, onSubmit, onCancel }: Props) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (initialData) setName(initialData.name);
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Название типа</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
