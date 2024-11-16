import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TaskCardProps {
  title: string;
  progress: number;
  weight: "High" | "Medium" | "Low";
  points:number;
}

export default function TaskCard({ title, progress, weight,points }: TaskCardProps) {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <span
            className={`text-sm ${
              weight === "High"
                ? "text-red-500"
                : weight === "Medium"
                ? "text-yellow-500"
                : "text-green-500"
            }`}
          >
            {weight}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} />
          <div className="flex items-center justify-between text-sm">
            <span>Value:</span>
            <span>{points}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}