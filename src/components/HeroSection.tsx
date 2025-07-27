import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-subtle">
      {/* Minimal Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Brand */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-muted-foreground mb-4 tracking-wider uppercase">
              Coding Bot
            </h2>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
            <span className="accent-text">AI Agents.</span>{' '}
            <span className="text-foreground">One Mission:</span>
            <br />
            <span className="text-foreground">Transform Your Business.</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Watch autonomous AI agents build, deploy, and optimize your digital presence 
            while you focus on growing your business.
          </p>

          {/* CTA Button */}
          <Button 
            size="lg" 
            className="clean-button px-8 py-4 text-base rounded-lg font-medium"
          >
            See AI Agents in Action
          </Button>

          {/* Scroll Indicator */}
          <div className="mt-20 flex flex-col items-center">
            <span className="text-sm text-muted-foreground mb-2">Scroll to watch them work</span>
            <div className="w-0.5 h-8 bg-gradient-to-b from-accent to-transparent animate-pulse" />
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-accent rounded-full animate-gentle-float opacity-60" />
      <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-primary rounded-full animate-gentle-float opacity-40" style={{ animationDelay: '2s' }} />
    </section>
  );
};