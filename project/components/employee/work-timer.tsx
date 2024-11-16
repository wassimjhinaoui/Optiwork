"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Clock, PlayCircle, PauseCircle } from "lucide-react";

export default function WorkTimer() {
  const [workTimer, setWorkTimer] = useState(0);
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isWorking) {
      interval = setInterval(() => {
        setWorkTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWorking]);

  return (
    <div className="flex items-center space-x-4">
      <Clock className="h-5 w-5 text-muted-foreground" />
      <span className="font-mono text-xl">
        {Math.floor(workTimer / 60)}:{(workTimer % 60).toString().padStart(2, "0")}
      </span>
      <Button
        variant={isWorking ? "destructive" : "default"}
        onClick={() => setIsWorking(!isWorking)}
      >
        {isWorking ? (
          <PauseCircle className="mr-2 h-4 w-4" />
        ) : (
          <PlayCircle className="mr-2 h-4 w-4" />
        )}
        {isWorking ? "Stop Working" : "Start Working"}
      </Button>
    </div>
  );
}