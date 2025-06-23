
'use client';

import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { mockAnalytics } from '@/lib/mock-data';
import { MessageSquare, Gauge, Users } from 'lucide-react';

const chartConfig = {
  count: {
    label: 'Count',
  },
  conversations: {
    label: 'Conversations',
    color: 'hsl(var(--primary))',
  },
  positive: {
    label: 'Positive',
    color: 'hsl(var(--chart-2))',
  },
  neutral: {
    label: 'Neutral',
    color: 'hsl(var(--chart-3))',
  },
  negative: {
    label: 'Negative',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;


export default function ChatbotAnalyticsPage() {
  const positiveFeedback = mockAnalytics.userSatisfaction.find(item => item.rating === 'Positive')?.count || 0;
  const totalFeedback = mockAnalytics.userSatisfaction.reduce((acc, item) => acc + item.count, 0);
  const satisfactionRate = totalFeedback > 0 ? ((positiveFeedback / totalFeedback) * 100).toFixed(0) : 0;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
       <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockAnalytics.totalConversations}</div>
          <p className="text-xs text-muted-foreground">+15.2% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{satisfactionRate}%</div>
          <p className="text-xs text-muted-foreground">Based on user feedback</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
          <Gauge className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockAnalytics.averageResponseTime}</div>
           <p className="text-xs text-muted-foreground">Average for all conversations</p>
        </CardContent>
      </Card>
      <Card className="col-span-full lg:col-span-1">
        <CardHeader>
          <CardTitle>User Feedback</CardTitle>
          <CardDescription>Breakdown of feedback ratings.</CardDescription>
        </CardHeader>
        <CardContent className="pl-0">
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart accessibilityLayer data={mockAnalytics.userSatisfaction} layout="vertical" margin={{ left: 10, right: 10 }}>
              <YAxis
                dataKey="rating"
                type="category"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                width={70}
                className="text-xs"
              />
              <XAxis type="number" hide />
              <Tooltip cursor={false} content={<ChartTooltipContent hideLabel indicator="dot" />} />
              <Bar dataKey="count" radius={5} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Conversation Volume</CardTitle>
          <CardDescription>Daily conversation volume over the last 7 days.</CardDescription>
        </CardHeader>
        <CardContent className="pl-0">
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
             <LineChart
                data={mockAnalytics.conversationsByDay}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  allowDecimals={false}
                />
                <Tooltip
                  cursor={{
                    stroke: "hsl(var(--border))",
                    strokeWidth: 2,
                    strokeDasharray: '3 3',
                  }}
                  content={<ChartTooltipContent indicator="line" nameKey="conversations" />}
                />
                <Line
                  dataKey="count"
                  name="conversations"
                  type="monotone"
                  stroke="var(--color-conversations)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-conversations)",
                    r: 4,
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
              </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
