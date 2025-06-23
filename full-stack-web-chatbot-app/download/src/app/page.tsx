import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Bot className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-semibold">Chatmatic</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Button asChild variant="ghost">
            <Link href="/login" prefetch={false}>
              Login
            </Link>
          </Button>
          <Button asChild>
            <Link href="/signup" prefetch={false}>
              Sign Up
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Build AI Chatbots for Your Business in Minutes
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Chatmatic allows you to create, customize, and embed intelligent chatbots on your website. No coding required.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="group">
                    <Link href="/signup" prefetch={false}>
                      Get Started Free
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://media.giphy.com/media/ZgTR3UQ9XAWDvqy9jv/giphy.gif"
                width="600"
                height="400"
                alt="Animated 3D chatbot"
                unoptimized
                className="mx-auto aspect-video overflow-hidden rounded-xl object-contain sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Chatmatic. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
