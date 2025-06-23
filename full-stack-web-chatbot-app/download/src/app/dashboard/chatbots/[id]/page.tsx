
'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Loader2, Upload, FileText, X } from "lucide-react";
import { useParams } from 'next/navigation';
import { mockChatbots, mockPersonas } from '@/lib/mock-data';
import { generateChatbotInstructions } from '@/ai/flows/generate-chatbot-instructions';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import type { Chatbot } from '@/lib/types';
import { Switch } from '@/components/ui/switch';


export default function ChatbotConfigurationPage() {
  const params = useParams();
  const { toast } = useToast();
  const [chatbot, setChatbot] = useState<Chatbot | null>(() => mockChatbots.find(bot => bot.id === params.id) || null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // A simple way to communicate config changes to the embed preview page without a full backend.
    if (chatbot) {
      localStorage.setItem(`chatbot-config-${chatbot.id}`, JSON.stringify(chatbot));
    }
  }, [chatbot]);

  const updateChatbot = (update: Partial<Chatbot>) => {
    setChatbot(prev => prev ? { ...prev, ...update } : null);
  }

  const handleFileUpload = async () => {
    if (!selectedFile || !chatbot) return;

    if (selectedFile.type !== 'text/plain') {
        toast({
            title: 'Invalid File Type',
            description: 'Please upload a .txt file.',
            variant: 'destructive',
        });
        return;
    }

    setIsUploading(true);
    const storageRef = ref(storage, `knowledge-bases/${chatbot.id}/${selectedFile.name}`);

    try {
        await uploadBytes(storageRef, selectedFile);
        const downloadURL = await getDownloadURL(storageRef);

        updateChatbot({
            knowledgeBaseUrl: downloadURL,
            knowledgeBaseFileName: selectedFile.name,
        });

        toast({
            title: 'Upload Successful',
            description: `${selectedFile.name} has been uploaded.`,
        });
        setSelectedFile(null);
    } catch (error) {
        console.error("Error uploading file:", error);
        toast({
            title: 'Upload Failed',
            description: 'Could not upload the file. Please try again.',
            variant: 'destructive',
        });
    } finally {
        setIsUploading(false);
    }
  };

  const handleRemoveFile = async () => {
    if (!chatbot?.knowledgeBaseFileName) return;

    const storageRef = ref(storage, `knowledge-bases/${chatbot.id}/${chatbot.knowledgeBaseFileName}`);

    try {
        await deleteObject(storageRef);
        updateChatbot({
            knowledgeBaseUrl: undefined,
            knowledgeBaseFileName: undefined,
        });
        toast({
            title: 'File Removed',
            description: 'The knowledge base file has been removed.',
        });
    } catch (error) {
        console.error("Error removing file:", error);
        toast({
            title: 'Removal Failed',
            description: 'Could not remove the file. Please try again.',
            variant: 'destructive',
        });
    }
  };

  const handleGenerateInstructions = async () => {
    if (!chatbot?.businessDescription) {
      toast({
        title: 'Business description is empty',
        description: 'Please provide a description of your business first.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      let knowledgeBaseContent: string | undefined = undefined;
      if (chatbot.knowledgeBaseUrl) {
        try {
            const response = await fetch(chatbot.knowledgeBaseUrl);
            if(response.ok) {
                knowledgeBaseContent = await response.text();
            } else {
                 toast({
                    title: 'Could not fetch knowledge base',
                    description: 'There was an issue fetching the file content. You may need to configure CORS on your Firebase Storage bucket.',
                    variant: 'destructive',
                });
            }
        } catch(e) {
             toast({
                title: 'Could not fetch knowledge base',
                description: 'There was an issue fetching the file content. Check CORS policies on your storage bucket.',
                variant: 'destructive',
            });
        }
      }

      const result = await generateChatbotInstructions({
        businessDescription: chatbot.businessDescription,
        knowledgeBaseContent: knowledgeBaseContent,
      });

      updateChatbot({ instructions: result.instructions, persona: undefined });
      toast({
        title: 'Instructions Generated',
        description: 'New instructions have been successfully generated.',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Generation Failed',
        description: 'Could not generate instructions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePersonaChange = (personaId: string) => {
    const selectedPersona = mockPersonas.find(p => p.id === personaId);
    if (selectedPersona && chatbot) {
        updateChatbot({
            persona: selectedPersona.id,
            instructions: selectedPersona.instructions,
        });
    }
  };

  if (!chatbot) {
    return <div>Chatbot not found.</div>
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Chatbot Behavior</CardTitle>
          <CardDescription>
            Define your chatbot's personality and knowledge base.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="chatbot-name">Chatbot Name</Label>
            <Input id="chatbot-name" value={chatbot.name} onChange={e => updateChatbot({ name: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="business-description">Business Description</Label>
            <Textarea
              id="business-description"
              placeholder="Describe your business, products, and services..."
              rows={5}
              value={chatbot.businessDescription}
              onChange={e => updateChatbot({ businessDescription: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Knowledge Base (.txt file)</Label>
            <CardDescription>
              Upload a text file with information your chatbot can use to answer questions.
            </CardDescription>
            {chatbot.knowledgeBaseFileName ? (
              <div className="flex items-center justify-between p-3 bg-secondary rounded-md">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <span className="text-sm font-medium">{chatbot.knowledgeBaseFileName}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={handleRemoveFile}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Input
                  id="knowledge-base-file"
                  type="file"
                  accept=".txt"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="flex-grow"
                  disabled={isUploading}
                />
                <Button onClick={handleFileUpload} disabled={!selectedFile || isUploading}>
                  {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                  Upload
                </Button>
              </div>
            )}
          </div>
          <div className="space-y-2">
              <Label htmlFor="chatbot-persona">Chatbot Persona</Label>
              <Select value={chatbot.persona || ''} onValueChange={handlePersonaChange}>
                  <SelectTrigger id="chatbot-persona">
                      <SelectValue placeholder="Select a persona" />
                  </SelectTrigger>
                  <SelectContent>
                      {mockPersonas.map(persona => (
                          <SelectItem key={persona.id} value={persona.id}>
                              {persona.name}
                          </SelectItem>
                      ))}
                  </SelectContent>
              </Select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="instructions">Chatbot Instructions (System Prompt)</Label>
              <Button variant="ghost" size="sm" onClick={handleGenerateInstructions} disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Auto-generate
              </Button>
            </div>
            <Textarea
              id="instructions"
              placeholder="e.g., You are a friendly and helpful assistant..."
              rows={8}
              value={chatbot.instructions}
              onChange={e => updateChatbot({ instructions: e.target.value, persona: undefined})}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="md:col-span-1">
            <CardHeader>
                <CardTitle>Widget Appearance</CardTitle>
                <CardDescription>Customize the look of your chat widget.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="relative">
                        <Input 
                            id="primary-color" 
                            type="color" 
                            value={chatbot.primaryColor || '#000000'}
                            onChange={e => updateChatbot({ primaryColor: e.target.value})}
                            className="p-1 h-10"
                        />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="bg-color">Widget Background Color</Label>
                    <Input 
                        id="bg-color" 
                        type="color" 
                        value={chatbot.widgetBackgroundColor || '#FFFFFF'}
                        onChange={e => updateChatbot({ widgetBackgroundColor: e.target.value})}
                        className="p-1 h-10"
                    />
                </div>
            </CardContent>
        </Card>
         <Card className="md:col-span-1">
            <CardHeader>
                <CardTitle>Proactive Welcome Message</CardTitle>
                <CardDescription>Engage visitors by automatically sending a welcome message.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center space-x-2">
                 <Switch
                    id="proactive-welcome"
                    checked={chatbot.proactiveWelcomeEnabled}
                    onCheckedChange={(checked) => updateChatbot({ proactiveWelcomeEnabled: checked })}
                  />
                  <Label htmlFor="proactive-welcome">Enable proactive welcome message</Label>
                </div>
                {chatbot.proactiveWelcomeEnabled && (
                  <div className="space-y-2">
                    <Label htmlFor="welcome-message">Welcome Message</Label>
                    <Textarea
                      id="welcome-message"
                      placeholder="e.g., Hello! How can I help you today?"
                      rows={3}
                      value={chatbot.proactiveWelcomeMessage}
                      onChange={e => updateChatbot({ proactiveWelcomeMessage: e.target.value })}
                    />
                  </div>
                )}
            </CardContent>
        </Card>
      </div>
      <CardFooter className="col-span-full">
        <Button>Save Changes</Button>
      </CardFooter>
    </div>
  );
}
