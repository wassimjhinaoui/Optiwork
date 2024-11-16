import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Brain, GamepadIcon, MessageCircle, Timer } from "lucide-react";

const breakRooms = {
  meditation: {
    title: "Meditation Room",
    icon: Brain,
    description: "Take a mindful break with guided meditation sessions.",
  },
  games: {
    title: "Mini-Games Room",
    icon: GamepadIcon,
    description: "Refresh your mind with quick, fun games.",
  },
  chat: {
    title: "Break Room Chat",
    icon: MessageCircle,
    description: "Connect with coworkers in the virtual break room.",
  },
};

export default function BreakRoom() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Break Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="meditation">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="meditation">Meditation Room</TabsTrigger>
            <TabsTrigger value="games">Mini-Games</TabsTrigger>
            <TabsTrigger value="chat">Break Chat</TabsTrigger>
          </TabsList>
          {Object.entries(breakRooms).map(([key, room]) => (
            <TabsContent key={key} value={key} className="space-y-4">
              <div className="flex items-center space-x-4 mt-4">
                <room.icon className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">{room.title}</h3>
                  <p className="text-sm text-muted-foreground">{room.description}</p>
                </div>
              </div>
              <div className="grid gap-4">
                <Button className="w-full">
                  <Timer className="mr-2 h-4 w-4" />
                  Start {key === "meditation" ? "Session" : key === "games" ? "Game" : "Chat"}
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}