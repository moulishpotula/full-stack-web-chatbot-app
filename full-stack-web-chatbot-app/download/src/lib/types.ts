
import type { LucideIcon } from 'lucide-react';

export type Persona = {
  id: string;
  name: string;
  instructions: string;
};

export type Chatbot = {
  id: string;
  name: string;
  businessDescription?: string;
  instructions?: string;
  createdAt: string;
  persona?: string;
  knowledgeBaseUrl?: string;
  knowledgeBaseFileName?: string;
  primaryColor?: string;
  widgetBackgroundColor?: string;
  proactiveWelcomeEnabled?: boolean;
  proactiveWelcomeMessage?: string;
};

export type ChatbotTemplate = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  chatbot: Partial<Chatbot>;
};

export type Conversation = {
  id: string;
  chatbotId: string;
  customer: {
    name: string;
    avatar: string;
  };
  summary: string;
  startedAt: string;
  messageCount: number;
  tags?: string[];
};

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
};

export type AnalyticsData = {
  conversationsByDay: { date: string; count: number }[];
  userSatisfaction: { rating: string; count: number; fill: string }[];
  averageResponseTime: string;
  totalConversations: number;
};
