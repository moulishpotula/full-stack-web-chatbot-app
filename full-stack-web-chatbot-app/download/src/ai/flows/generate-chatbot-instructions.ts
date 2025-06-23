'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating initial chatbot instructions based on a business description.
 *
 * - generateChatbotInstructions - A function that generates chatbot instructions.
 * - GenerateChatbotInstructionsInput - The input type for the generateChatbotInstructions function.
 * - GenerateChatbotInstructionsOutput - The return type for the generateChatbotInstructions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateChatbotInstructionsInputSchema = z.object({
  businessDescription: z
    .string()
    .describe('A detailed description of the business and its services.'),
  knowledgeBaseContent: z.string().optional().describe('Content from a knowledge base file.')
});
export type GenerateChatbotInstructionsInput = z.infer<
  typeof GenerateChatbotInstructionsInputSchema
>;

const GenerateChatbotInstructionsOutputSchema = z.object({
  instructions: z
    .string()
    .describe(
      'Instructions for the chatbot, including its persona, knowledge base, and response style.'
    ),
});
export type GenerateChatbotInstructionsOutput = z.infer<
  typeof GenerateChatbotInstructionsOutputSchema
>;

export async function generateChatbotInstructions(
  input: GenerateChatbotInstructionsInput
): Promise<GenerateChatbotInstructionsOutput> {
  return generateChatbotInstructionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateChatbotInstructionsPrompt',
  input: {schema: GenerateChatbotInstructionsInputSchema},
  output: {schema: GenerateChatbotInstructionsOutputSchema},
  prompt: `You are an expert in creating chatbot instructions for businesses.

  Based on the following business description and knowledge base (if provided), generate a set of clear and concise instructions for a chatbot.

  The instructions should cover the chatbot's persona, its knowledge base, and its response style. The chatbot should be able to provide helpful and informative responses to customer inquiries, primarily relying on the knowledge base.

  Business Description: {{{businessDescription}}}

  {{#if knowledgeBaseContent}}
  Knowledge Base Content:
  {{{knowledgeBaseContent}}}
  {{/if}}

  Instructions:
  `,
});

const generateChatbotInstructionsFlow = ai.defineFlow(
  {
    name: 'generateChatbotInstructionsFlow',
    inputSchema: GenerateChatbotInstructionsInputSchema,
    outputSchema: GenerateChatbotInstructionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
