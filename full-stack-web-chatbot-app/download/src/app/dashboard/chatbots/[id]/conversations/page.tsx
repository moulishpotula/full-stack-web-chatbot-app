
'use client';

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockConversations, mockMessages } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Tag, Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ChatbotConversationsPage() {
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const allTags = Array.from(new Set(mockConversations.flatMap(conv => conv.tags || [])));

  const filteredConversations = mockConversations.filter(conv =>
    selectedTag === 'all' || conv.tags?.includes(selectedTag)
  );
  
  const handleExport = (conversationId: string) => {
    const conversation = mockConversations.find(c => c.id === conversationId);
    if (!conversation) return;

    // For this example, we'll use the generic mockMessages as the transcript.
    // In a real app, you would fetch the specific messages for the conversationId.
    const transcriptHeader = `Conversation ID: ${conversation.id}\nCustomer: ${conversation.customer.name}\nDate: ${new Date(conversation.startedAt).toLocaleString()}\n\n---\n\n`;
    const transcriptBody = mockMessages
        .map(msg => `[${new Date(msg.timestamp).toLocaleTimeString()}] ${msg.role === 'user' ? conversation.customer.name : 'Bot'}: ${msg.content}`)
        .join('\n');
    
    const fullTranscript = transcriptHeader + transcriptBody;

    const blob = new Blob([fullTranscript], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transcript-${conversation.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  return (
    <Card>
      <CardHeader className="md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle>Conversation History</CardTitle>
          <CardDescription>
            Review and analyze past conversations with your users.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedTag} onValueChange={setSelectedTag}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tags</SelectItem>
              {allTags.map(tag => (
                <SelectItem key={tag} value={tag} className="capitalize">
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Summary</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="text-center">Messages</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredConversations.map((conv) => (
              <TableRow key={conv.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={`https://placehold.co/40x40.png?text=${conv.customer.name.charAt(0)}`} />
                      <AvatarFallback>{conv.customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{conv.customer.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="max-w-xs truncate">{conv.summary}</p>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {conv.tags?.map(tag => (
                      <Badge key={tag} variant="outline" className="capitalize">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary">{conv.messageCount}</Badge>
                </TableCell>
                <TableCell>
                  {new Date(conv.startedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Transcript</DropdownMenuItem>
                      <DropdownMenuItem>Edit Tags</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleExport(conv.id)}>
                        <Download className="mr-2 h-4 w-4" />
                        Export Transcript
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
