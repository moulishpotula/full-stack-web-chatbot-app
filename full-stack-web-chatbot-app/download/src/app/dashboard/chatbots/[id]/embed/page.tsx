
'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChatWidget } from "@/components/chat-widget";
import { Check, Clipboard } from 'lucide-react';
import { useParams } from 'next/navigation';
import { mockChatbots } from '@/lib/mock-data';
import type { Chatbot } from '@/lib/types';


export default function ChatbotEmbedPage() {
    const params = useParams();
    const chatbotId = params.id;
    const [hasCopied, setHasCopied] = useState(false);
    const [chatbot, setChatbot] = useState<Chatbot | undefined>(undefined);

    useEffect(() => {
        // In a real app, you would fetch this data.
        // For demonstration, we find it in the mock data.
        const foundBot = mockChatbots.find(bot => bot.id === chatbotId);
        // We'll use a local copy to simulate live changes from the config page
        const localConfig = localStorage.getItem(`chatbot-config-${chatbotId}`);
        if (localConfig) {
            setChatbot(JSON.parse(localConfig));
        } else {
            setChatbot(foundBot);
        }

        const handleStorageChange = () => {
             const updatedConfig = localStorage.getItem(`chatbot-config-${chatbotId}`);
             if(updatedConfig) {
                setChatbot(JSON.parse(updatedConfig));
             }
        }

        window.addEventListener('storage', handleStorageChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
        }

    }, [chatbotId]);

    const embedCode = `<script src="https://your-service.com/embed.js" data-chatbot-id="${chatbotId}" async defer><\/script>`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(embedCode.replace('<\\/script>', '</script>'));
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
    };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Embed Chatbot</CardTitle>
          <CardDescription>
            Copy and paste this code into your website's HTML to embed the chatbot.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative bg-secondary rounded-md p-4">
            <pre className="text-sm overflow-x-auto">
              <code>{embedCode}</code>
            </pre>
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2"
              onClick={copyToClipboard}
            >
              {hasCopied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
            </Button>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Instructions</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Copy the code snippet above.</li>
                <li>Open the HTML file of the page where you want the chatbot to appear.</li>
                <li>Paste the code snippet just before the closing {'</' + 'body>'} tag.</li>
                <li>Save your file, and the chatbot will appear on your site!</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Live Preview</h3>
        <div className="flex justify-end items-end h-[600px] w-full">
            <ChatWidget 
              primaryColor={chatbot?.primaryColor}
              widgetBackgroundColor={chatbot?.widgetBackgroundColor}
              proactiveWelcomeEnabled={chatbot?.proactiveWelcomeEnabled}
              proactiveWelcomeMessage={chatbot?.proactiveWelcomeMessage}
              chatbotName={chatbot?.name}
            />
        </div>
      </div>
    </div>
  );
}
