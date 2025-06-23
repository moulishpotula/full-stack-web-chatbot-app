import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockTemplates } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";

export default function NewChatbotPage() {
  const templateToIdMap: { [key: string]: string } = {
    'support': '1',
    'lead-gen': '2',
    'blank': '3',
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create a New Chatbot</h1>
        <p className="text-muted-foreground mt-2">
          Choose a template to get started, or start from scratch.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockTemplates.map((template) => (
          <Link href={`/dashboard/chatbots/${templateToIdMap[template.id]}`} key={template.id} className="block group">
            <Card className="h-full hover:border-primary transition-colors flex flex-col">
              <CardHeader className="flex-row items-start gap-4 space-y-0">
                <div className="bg-primary/10 text-primary p-3 rounded-lg">
                  <template.icon className="h-6 w-6" />
                </div>
                <div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </CardContent>
              <CardFooter>
                 <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Choose Template <ArrowRight className="h-4 w-4" />
                 </span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
