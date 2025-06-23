import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { PlusCircle, Bot, MessageSquare } from "lucide-react";
import { mockChatbots } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">My Chatbots</h2>
        <Button asChild>
          <Link href="/dashboard/chatbots/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Chatbot
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockChatbots.map((bot) => (
          <Card key={bot.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <span>{bot.name}</span>
              </CardTitle>
              <CardDescription>
                Created on {new Date(bot.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <div className="flex-grow" />
            <CardFooter className="flex justify-between items-center">
              <Badge variant="secondary" className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                12 conversations
              </Badge>
              <Button asChild variant="secondary" size="sm">
                <Link href={`/dashboard/chatbots/${bot.id}`}>Manage</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
        <Card className="flex items-center justify-center border-dashed">
            <Button asChild variant="ghost">
                <Link href="/dashboard/chatbots/new" className="flex flex-col h-full justify-center items-center">
                    <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm font-medium">Create New Chatbot</span>
                </Link>
            </Button>
        </Card>
      </div>
    </div>
  );
}
