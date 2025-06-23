'use client';

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import {
  Bot,
  LayoutDashboard,
  Settings,
  LifeBuoy,
} from "lucide-react";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname === '/dashboard/settings') {
      return 'Settings';
    }
    if (pathname.startsWith('/dashboard/chatbots')) {
      return 'Manage Chatbot';
    }
    return 'Dashboard';
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent className="p-2">
          <SidebarHeader>
            <div className="flex items-center gap-3">
              <Logo />
              <span className="font-semibold text-lg">Chatmatic</span>
            </div>
          </SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/dashboard' || pathname.startsWith('/dashboard/chatbots')}>
                <Link href="/dashboard">
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/dashboard/settings'}>
                <Link href="/dashboard/settings">
                  <Settings />
                  Settings
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <LifeBuoy />
                  Support
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <div className="p-2 flex items-center gap-3">
             <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Taylor Swift</span>
              <span className="text-xs text-muted-foreground">taylor@swift.com</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-xl font-semibold">{getTitle()}</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild>
              <Link href="/login">Logout</Link>
            </Button>
          </div>
        </header>
        <main className="p-4 lg:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
