import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const NeuralNode = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
  <div
    className="absolute w-2 h-2 bg-primary rounded-full animate-neural-pulse"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      animationDelay: `${delay}s`,
    }}
  >
    <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75" />
  </div>
);

const NeuralConnection = ({ x1, y1, x2, y2, delay }: { 
  x1: number; y1: number; x2: number; y2: number; delay: number 
}) => {
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  
  return (
    <div
      className="absolute h-0.5 bg-gradient-to-r from-primary/30 to-accent/30 origin-left"
      style={{
        left: `${x1}%`,
        top: `${y1}%`,
        width: `${length}%`,
        transform: `rotate(${angle}deg)`,
        animationDelay: `${delay}s`,
      }}
    >
      <div className="h-full bg-gradient-to-r from-primary to-accent animate-pulse" />
    </div>
  );
};

export const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const nodes = [
    { x: 20, y: 30, delay: 0 },
    { x: 80, y: 25, delay: 0.5 },
    { x: 50, y: 60, delay: 1 },
    { x: 30, y: 80, delay: 1.5 },
    { x: 70, y: 75, delay: 2 },
  ];

  const connections = [
    { x1: 20, y1: 30, x2: 50, y2: 60, delay: 2.5 },
    { x1: 50, y1: 60, x2: 80, y2: 25, delay: 3 },
    { x1: 30, y1: 80, x2: 70, y2: 75, delay: 3.5 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-space">
      {/* Neural Network Background */}
      <div className="absolute inset-0 overflow-hidden">
        {isLoaded && (
          <>
            {nodes.map((node, index) => (
              <NeuralNode key={index} {...node} />
            ))}
            {connections.map((connection, index) => (
              <NeuralConnection key={index} {...connection} />
            ))}
          </>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/5 to-background/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Logo/Brand */}
          <div className="mb-8">
            <h2 className="text-xl font-light text-muted-foreground mb-2 tracking-wider">
              CODING BOT
            </h2>
            <div className="w-24 h-0.5 bg-gradient-neural mx-auto" />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="neural-text">AI Agents.</span>{' '}
            <span className="text-foreground">One Mission:</span>
            <br />
            <span className="text-foreground">Transform Your Business.</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
            A next-gen platform where autonomous AI agents build, optimize, 
            and grow your digital presence.
          </p>

          {/* CTA Button */}
          <Button 
            size="lg" 
            className="hero-button px-12 py-6 text-lg rounded-full font-semibold tracking-wide"
          >
            Deploy Your AI Team
          </Button>

          {/* Subtle indicator */}
          <div className="mt-16 animate-bounce">
            <div className="w-1 h-8 bg-gradient-neural mx-auto rounded-full opacity-60" />
          </div>
        </div>
      </div>

      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
    </section>
  );
};