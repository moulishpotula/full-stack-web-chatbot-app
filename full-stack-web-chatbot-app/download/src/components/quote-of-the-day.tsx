'use client';

import { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type QuoteData = {
  content: string;
  author: string;
};

const defaultQuote: QuoteData = {
  content: 'The best way to predict the future is to create it.',
  author: 'Peter Drucker',
};

export function QuoteOfTheDay() {
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchQuote() {
      try {
        const response = await fetch('https://api.quotable.io/random');
        if (!response.ok) {
          console.error('Quotable API response was not ok.');
          setQuote(defaultQuote);
          return;
        }
        const data = await response.json();
        setQuote({ content: data.content, author: data.author });
      } catch (error) {
        console.error('Failed to fetch quote:', error);
        setQuote(defaultQuote);
      } finally {
        setIsLoading(false);
      }
    }

    fetchQuote();
  }, []);

  const displayQuote = quote || defaultQuote;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Quote className="h-5 w-5 text-primary" />
          <span>Quote of the Day</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-4 w-1/3 mt-2" />
          </div>
        ) : (
          <blockquote className="border-l-2 pl-6 italic">
            <p className="mb-2">"{displayQuote.content}"</p>
            <footer className="text-sm text-muted-foreground">- {displayQuote.author}</footer>
          </blockquote>
        )}
      </CardContent>
    </Card>
  );
}
