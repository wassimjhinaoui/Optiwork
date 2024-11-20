import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Building2,
  Users,
  UserCircle,
  BarChart3,
  Calendar,
  MessageSquare,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Track and visualize team productivity with real-time analytics.",
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Optimize work schedules and manage time-off requests efficiently.",
    },
    {
      icon: MessageSquare,
      title: "Team Communication",
      description: "Stay connected with integrated chat and collaboration tools.",
    },
  ];

  const dashboards = [
    {
      icon: UserCircle,
      title: "Employee Dashboard",
      description: "Track your work hours, manage tasks, and stay productive.",
      href: "/employee/1",
    },
    {
      icon: Users,
      title: "Manager Dashboard",
      description: "Monitor team performance and assign tasks effectively.",
      href: "/manager",
    },
    {
      icon: Building2,
      title: "HR Dashboard",
      description: "Handle leave requests and manage employee relations.",
      href: "/hr",
    },
  ];

  return (
    <div className="flex flex-col gap-12 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Optimize Your Remote Work Experience
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground text-lg sm:text-xl">
          Enhance productivity and streamline collaboration with our comprehensive remote work management platform.
        </p>
      </section>

      {/* Features Section */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <feature.icon className="h-10 w-10 text-primary" />
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      {/* Dashboards Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter">
            Choose Your Dashboard
          </h2>
          <p className="text-muted-foreground mt-2">
            Access the tools you need based on your role
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dashboards.map((dashboard) => (
            <Link key={dashboard.title} href={dashboard.href}>
              <Card className="h-full border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <dashboard.icon className="h-10 w-10 text-primary" />
                  <CardTitle>{dashboard.title}</CardTitle>
                  <CardDescription>{dashboard.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Access Dashboard</Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}