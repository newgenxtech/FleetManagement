"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardCard({
  title,
  number,
  sincelast,
  icon,
}: {
  title: string;
  number: number;
  sincelast: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+{number}</div>
        <p className="text-xs text-muted-foreground">{sincelast}</p>
      </CardContent>
    </Card>
  );
}
