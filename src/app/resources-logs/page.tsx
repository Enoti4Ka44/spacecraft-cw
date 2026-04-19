"use client";

import { useEffect, useState } from "react";
import { resourceLogService } from "@/services/service-resource-log";
import { RosourceLog } from "@/types/resource";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  History,
  ArrowUpRight,
  ArrowDownLeft,
  Caravan,
  Package,
} from "lucide-react";

export default function ResourceLogsPage() {
  const [logs, setLogs] = useState<RosourceLog[]>([]);

  useEffect(() => {
    resourceLogService.getAll().then(setLogs);
  }, []);

  return (
    <div className="px-5 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <History className="w-8 h-8 text-primary" /> Журнал изменений ресурсов
        </h1>
        <p className="text-muted-foreground">
          Полная история потребления и пополнения запасов
        </p>
      </div>

      <div className="border rounded-xl bg-card overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>ID Лога</TableHead>
              <TableHead>Дата и время</TableHead>
              <TableHead>Корабль ID</TableHead>
              <TableHead>Ресурс ID</TableHead>
              <TableHead className="text-right">Изменение</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-mono text-xs">{log.id}</TableCell>
                <TableCell>{log.timestamp}</TableCell>
                <TableCell>
                  <span className="flex gap-1 items-center ">
                    <Caravan className="w-4 h-4 text-muted-foreground" />{" "}
                    {log.spacecraftId}
                  </span>
                </TableCell>
                <TableCell className="flex gap-1 items-center">
                  <span className="flex gap-1 items-center ">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    {log.resourceId}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={`inline-flex items-center font-bold ${log.quantityChange > 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {log.quantityChange > 0 ? (
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                    ) : (
                      <ArrowDownLeft className="w-4 h-4 mr-1" />
                    )}
                    {log.quantityChange > 0
                      ? `+${log.quantityChange}`
                      : log.quantityChange}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
