
import type { Chatbot, Conversation, Message, AnalyticsData, Persona, ChatbotTemplate } from './types';
import { LifeBuoy, Lightbulb, Bot } from 'lucide-react';

export const mockPersonas: Persona[] = [
  {
    id: 'friendly',
    name: 'Friendly',
    instructions: 'You are a friendly and helpful assistant. Your tone should be warm, approachable, and enthusiastic. Use emojis where appropriate to convey friendliness. Always greet users warmly and end conversations on a positive note.',
  },
  {
    id: 'professional',
    name: 'Professional',
    instructions: 'You are a professional and courteous assistant. Your responses should be clear, concise, and formal. Avoid using slang, contractions, or emojis. Maintain a respectful and efficient tone at all times.',
  },
  {
    id: 'witty',
    name: 'Witty',
    instructions: 'You are an assistant with a witty and humorous personality. Your responses can be playful and include clever remarks or light-hearted jokes. However, always remain helpful and ensure the humor is appropriate for a customer service context.',
  },
    {
    id: 'direct',
    name: 'Direct & To-the-Point',
    instructions: 'You are a direct and efficient assistant. Your goal is to provide information as quickly and clearly as possible. Get straight to the point, avoid unnecessary pleasantries, and use short sentences.',
  }
];

export const mockTemplates: ChatbotTemplate[] = [
    {
    id: 'support',
    name: 'Customer Support',
    description: 'A friendly and helpful chatbot to answer customer questions and resolve issues.',
    icon: LifeBuoy,
    chatbot: {
      name: 'Support Bot',
      businessDescription: 'We provide top-notch customer support for our products and services.',
      instructions: 'You are a patient and helpful customer support agent. Your primary goal is to resolve customer issues efficiently. Be empathetic and clear in your communication. Escalate to a human agent when necessary.',
      persona: 'professional',
      proactiveWelcomeEnabled: true,
      proactiveWelcomeMessage: 'Hello! Welcome to support. How can I assist you today?',
    }
  },
  {
    id: 'lead-gen',
    name: 'Lead Generation',
    description: 'Engage website visitors, qualify leads, and schedule appointments.',
    icon: Lightbulb,
    chatbot: {
      name: 'Lead Gen Bot',
      businessDescription: 'Our business aims to connect with potential customers and demonstrate the value of our services.',
      instructions: 'You are a proactive and engaging assistant. Your goal is to capture visitor information (name, email) and understand their needs. Ask qualifying questions and encourage them to book a demo or a call.',
      persona: 'friendly',
      proactiveWelcomeEnabled: true,
      proactiveWelcomeMessage: 'Hi there! Interested in learning more about our services? I can help with that!',
    }
  },
   {
    id: 'blank',
    name: 'Start from Scratch',
    description: 'Build a custom chatbot from the ground up with your own instructions.',
    icon: Bot,
    chatbot: {
      name: 'My Custom Bot',
      businessDescription: '',
      instructions: '',
      proactiveWelcomeEnabled: false,
      proactiveWelcomeMessage: 'Hello! How can I help you today?',
    }
  },
];


export const mockChatbots: Chatbot[] = [
  {
    id: '1',
    name: 'Support Bot',
    businessDescription: 'We provide top-notch customer support for our products and services.',
    instructions: 'You are a patient and helpful customer support agent. Your primary goal is to resolve customer issues efficiently. Be empathetic and clear in your communication. Escalate to a human agent when necessary.',
    createdAt: '2024-05-10T14:48:00.000Z',
    persona: 'professional',
    primaryColor: '#6366F1',
    widgetBackgroundColor: '#FFFFFF',
    proactiveWelcomeEnabled: true,
    proactiveWelcomeMessage: 'Hello! Welcome to support. How can I assist you today?',
  },
  {
    id: '2',
    name: 'Lead Gen Bot',
    businessDescription: 'Our business aims to connect with potential customers and demonstrate the value of our services.',
    instructions: 'You are a proactive and engaging assistant. Your goal is to capture visitor information (name, email) and understand their needs. Ask qualifying questions and encourage them to book a demo or a call.',
    createdAt: '2024-05-12T09:22:00.000Z',
    persona: 'friendly',
    primaryColor: '#A37F64',
    widgetBackgroundColor: '#FFFFFF',
    proactiveWelcomeEnabled: true,
    proactiveWelcomeMessage: 'Hi there! Interested in learning more about our services? I can help with that!',
  },
  {
    id: '3',
    name: 'My Custom Bot',
    businessDescription: '',
    instructions: '',
    createdAt: '2024-05-15T18:30:00.000Z',
    primaryColor: '#10B981',
    widgetBackgroundColor: '#F9FAFB',
    proactiveWelcomeEnabled: false,
    proactiveWelcomeMessage: 'Hello! How can I help you today?',
  },
];

export const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    chatbotId: '1',
    customer: { name: 'Alice', avatar: '/avatars/01.png' },
    summary: 'Customer was looking for a signed copy of "The Midnight Library".',
    startedAt: '2024-05-20T10:00:00.000Z',
    messageCount: 4,
    tags: ['sales', 'inquiry'],
  },
  {
    id: 'conv2',
    chatbotId: '1',
    customer: { name: 'Bob', avatar: '/avatars/02.png' },
    summary: 'Inquired about the return policy for online orders.',
    startedAt: '2024-05-20T11:30:00.000Z',
    messageCount: 6,
    tags: ['support'],
  },
  {
    id: 'conv3',
    chatbotId: '3',
    customer: { name: 'Charlie', avatar: '/avatars/03.png' },
    summary: 'User had trouble installing the latest software update and was guided through the process.',
    startedAt: '2024-05-19T15:00:00.000Z',
    messageCount: 12,
    tags: ['support', 'troubleshooting'],
  },
   {
    id: 'conv4',
    chatbotId: '1',
    customer: { name: 'Diana', avatar: '/avatars/04.png' },
    summary: 'Asked about upcoming author events.',
    startedAt: '2024-05-21T14:00:00.000Z',
    messageCount: 3,
    tags: ['events'],
  },
];

export const mockMessages: Message[] = [
    {
        id: 'msg1',
        role: 'user',
        content: 'Hi, do you have "The Name of the Wind" in stock?',
        timestamp: '2024-05-21T10:00:00Z',
    },
    {
        id: 'msg2',
        role: 'assistant',
        content: 'Hello! Yes, we do have "The Name of the Wind" in stock. Would you like the paperback or hardcover version?',
        timestamp: '2024-05-21T10:00:30Z',
    },
     {
        id: 'msg3',
        role: 'user',
        content: 'Paperback, please.',
        timestamp: '2024-05-21T10:01:00Z',
    },
    {
        id: 'msg4',
        role: 'assistant',
        content: 'Great, I can add that to your cart for you. Is there anything else I can help with?',
        timestamp: '2024-05-21T10:01:30Z',
    }
];

export const mockAnalytics: AnalyticsData = {
  conversationsByDay: [
    { date: 'May 18', count: 12 },
    { date: 'May 19', count: 19 },
    { date: 'May 20', count: 23 },
    { date: 'May 21', count: 17 },
    { date: 'May 22', count: 28 },
    { date: 'May 23', count: 32 },
    { date: 'May 24', count: 26 },
  ],
  userSatisfaction: [
    { rating: 'Positive', count: 125, fill: "var(--color-positive)" },
    { rating: 'Neutral', count: 45, fill: "var(--color-neutral)"  },
    { rating: 'Negative', count: 12, fill: "var(--color-negative)"  },
  ],
  averageResponseTime: '32s',
  totalConversations: 182,
};
