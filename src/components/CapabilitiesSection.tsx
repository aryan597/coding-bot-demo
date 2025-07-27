import { useEffect, useRef, useState } from 'react';

interface Capability {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

const capabilities: Capability[] = [
  {
    title: 'Autonomous Automation',
    description: 'AI agents coordinate to build, optimize, and deploy your entire digital ecosystem.',
    icon: '🤖',
    features: [
      'Self-deploying infrastructure',
      'Continuous optimization',
      'Zero-intervention scaling',
      'Real-time coordination'
    ]
  },
  {
    title: 'Adaptive Intelligence',
    description: 'Our AI learns your business and evolves your branding & strategy dynamically.',
    icon: '🧠',
    features: [
      'Brand voice learning',
      'Market trend analysis',
      'Competitive intelligence',
      'Dynamic strategy updates'
    ]
  },
  {
    title: 'Live Growth Insights',
    description: 'Real-time analytics fed directly from your AI team\'s activity.',
    icon: '📈',
    features: [
      'Performance monitoring',
      'Growth predictions',
      'ROI optimization',
      'Actionable recommendations'
    ]
  }
];

const CapabilityCard = ({ capability, index, isVisible }: { 
  capability: Capability; 
  index: number; 
  isVisible: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`group relative p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-neural opacity-0 transition-all duration-500 group-hover:opacity-10 ${
        isHovered ? 'scale-105' : 'scale-100'
      }`} />
      
      {/* Icon */}
      <div className="relative mb-6">
        <div className={`w-16 h-16 rounded-xl bg-gradient-neural flex items-center justify-center text-2xl transition-all duration-500 ${
          isHovered ? 'rotate-12 scale-110' : 'rotate-0 scale-100'
        }`}>
          {capability.icon}
        </div>
        {isHovered && (
          <div className="absolute inset-0 w-16 h-16 rounded-xl bg-primary/20 animate-ping" />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
          {capability.title}
        </h3>
        
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {capability.description}
        </p>

        {/* Features */}
        <div className="space-y-3">
          {capability.features.map((feature, featureIndex) => (
            <div 
              key={featureIndex}
              className={`flex items-center space-x-3 transition-all duration-300 ${
                isHovered ? 'translate-x-2' : 'translate-x-0'
              }`}
              style={{ transitionDelay: `${featureIndex * 100}ms` }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* Status Bar */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">AI Status</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent font-medium">Active</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-2 w-full bg-muted/30 rounded-full h-1">
            <div 
              className="h-1 bg-gradient-neural rounded-full transition-all duration-1000"
              style={{ 
                width: isVisible ? '100%' : '0%',
                transitionDelay: `${index * 300 + 500}ms`
              }}
            />
          </div>
        </div>
      </div>

      {/* Corner Accent */}
      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-neural opacity-5 transition-all duration-500 ${
        isHovered ? 'scale-150 opacity-10' : 'scale-100'
      }`} style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
    </div>
  );
};

export const CapabilitiesSection = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger all cards with staggered delay
            setVisibleCards([true, true, true]);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-gradient-space">
      {/* Section Header */}
      <div className="text-center mb-20 px-6">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          AI <span className="neural-text">Capabilities</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Advanced AI systems working together to deliver unprecedented business growth
        </p>
      </div>

      {/* Capabilities Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => (
            <CapabilityCard
              key={index}
              capability={capability}
              index={index}
              isVisible={visibleCards[index]}
            />
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-neural-pulse" />
      <div className="absolute bottom-20 right-10 w-3 h-3 bg-accent rounded-full animate-neural-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-5 w-1 h-1 bg-neural-purple rounded-full animate-neural-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(${195}, ${100}, ${60}, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(${195}, ${100}, ${60}, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>
    </section>
  );
};