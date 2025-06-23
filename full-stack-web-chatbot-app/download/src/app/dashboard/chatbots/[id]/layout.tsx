
'use client'

import type { ReactNode } from "react";
import Link from "next/link";
import { useParams, usePathname } from 'next/navigation'
import { mockChatbots } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Bot, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChatbotDetailLayout({ children }: { children: ReactNode }) {
  const params = useParams();
  const pathname = usePathname();
  const chatbot = mockChatbots.find(bot => bot.id === params.id);

  const navItems = [
    { name: 'Configuration', href: `/dashboard/chatbots/${params.id}` },
    { name: 'Analytics', href: `/dashboard/chatbots/${params.id}/analytics` },
    { name: 'Conversations', href: `/dashboard/chatbots/${params.id}/conversations` },
    { name: 'Embed', href: `/dashboard/chatbots/${params.id}/embed` },
  ];
  
  return (
    <div className="space-y-6">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
                <Link href="/dashboard"><ChevronLeft className="h-4 w-4" /></Link>
            </Button>
            <div className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight">{chatbot?.name || 'Chatbot'}</h2>
            </div>
        </div>

      <nav className="border-b">
        <div className="flex items-center gap-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary',
                pathname === item.href && 'border-b-2 border-primary text-primary'
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
      <div>
        {children}
      </div>
    </div>
  );
}
