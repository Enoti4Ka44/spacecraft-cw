"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spacecraft } from "@/types/spacecraft";
import { Pencil } from "lucide-react";
import DeleteButton from "./delete-button";
import { spacecraftService } from "@/services/service-spacecraft";

type SpacecraftCardProps = {
  data: Spacecraft;
};

export function SpacecraftCard({ data }: SpacecraftCardProps) {
  const handleDelete = async (id: number) => {
    spacecraftService.delete(id);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="font-bold text-lg">{data.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground font-semibold">
          Модель: {data.model}
        </p>
        <p className="text-muted-foreground font-semibold">
          Спецификация: {data.specifications}
        </p>
        <p className="text-muted-foreground font-semibold">
          Статус: {data.spacecraftStatus}
        </p>
        <p className="text-muted-foreground font-semibold">
          Текущее местоположение: {data.currentLocation}
        </p>
        <p className="text-muted-foreground font-semibold">
          Дата вылета: {data.launchDate}
        </p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button type="submit" className="p-2">
          <Pencil /> Редактировать
        </Button>
        <DeleteButton onClick={() => handleDelete(data.id)} />
      </CardFooter>
    </Card>
  );
}
