import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-space-deep via-space-medium to-space-deep">
      {/* Neural Network Background */}
      <div className="absolute inset-0">
        {/* Converging Nodes */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          const radius = 300;
          const x = 50 + (radius * Math.cos(angle)) / 8;
          const y = 50 + (radius * Math.sin(angle)) / 8;
          
          return (
            <div
              key={i}
              className="absolute w-3 h-3 bg-primary rounded-full animate-neural-pulse"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            >
              <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75" />
            </div>
          );
        })}

        {/* Converging Lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000">
          <defs>
            <radialGradient id="convergingGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.8 }} />
              <stop offset="50%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.4 }} />
              <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0 }} />
            </radialGradient>
          </defs>
          
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i * 45) * Math.PI / 180;
            const startX = 500 + 400 * Math.cos(angle);
            const startY = 500 + 400 * Math.sin(angle);
            
            return (
              <line
                key={i}
                x1={startX}
                y1={startY}
                x2="500"
                y2="500"
                stroke="url(#convergingGrad)"
                strokeWidth="2"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            );
          })}
        </svg>

        {/* Central Glow */}
        <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2">
          <div className="w-full h-full bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute inset-8 bg-accent/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute inset-16 bg-primary/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Main Heading */}
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Your <span className="neural-text">AI Team</span>
            <br />
            Is Ready to Launch.
          </h2>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Deploy autonomous AI agents that work 24/7 to build, optimize, and grow your business.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-3xl mx-auto">
            {[
              { value: '<5min', label: 'Setup Time' },
              { value: '24/7', label: 'Active Monitoring' },
              { value: '0%', label: 'Manual Work' },
              { value: '∞', label: 'Scalability' }
            ].map((stat, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg bg-card/20 backdrop-blur-sm border border-primary/20 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200 + 300}ms` }}
              >
                <div className="text-2xl md:text-3xl font-bold neural-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center">
            <Button 
              size="lg" 
              className="hero-button px-12 py-6 text-lg rounded-full font-semibold tracking-wide"
            >
              Activate AI Agents Now
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="px-12 py-6 text-lg rounded-full font-semibold tracking-wide border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300"
            >
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-primary/20">
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span>Enterprise Ready</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Particle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-float opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};