import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Brain, GamepadIcon, MessageCircle, Timer,X } from "lucide-react";

import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";

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



const meditationVideos = [
  {
    id: 1,
    title: "5 Minute Meditation",
    url: "https://www.youtube.com/embed/inpok4MKVLM"
  },
  {
    id: 2,
    title: "10 Minute Mindfulness",
    url: "https://www.youtube.com/embed/ZToicYcHIOU"
  },
  {
    id: 3,
    title: "15 Minute Deep Relaxation",
    url: "https://www.youtube.com/embed/z6X5oEIg6Ak"
  }
];

const VideoDialog = ({ isOpen, onClose, videoUrl }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-[100vw] max-h-[100vh] h-[100vh] w-[100vw] p-0">
      <div className="relative w-full h-full">
        <Button 
          variant="ghost" 
          className="absolute top-4 right-4 z-50"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>
        <iframe
          src={videoUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </DialogContent>
  </Dialog>
);


export default function BreakRoom() {

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(meditationVideos[0]);
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
              {key === "meditation" && (
                <div className="grid grid-cols-3 gap-2 my-4">
                  {meditationVideos.map((video) => (
                    <Button
                      key={video.id}
                      variant={selectedVideo.id === video.id ? "default" : "outline"}
                      onClick={() => setSelectedVideo(video)}
                      className="w-full"
                    >
                      {video.title}
                    </Button>
                  ))}
                </div>
              )}
              <div className="grid gap-4">
                <Button 
                  className="w-full" 
                  onClick={() => key === "meditation" && setIsVideoOpen(true)}
                >
                  <Timer className="mr-2 h-4 w-4" />
                  Start {key === "meditation" ? "Session" : key === "games" ? "Game" : "Chat"}
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <VideoDialog 
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
          videoUrl={selectedVideo.url}
        />
      </CardContent>
    </Card>
  );
}