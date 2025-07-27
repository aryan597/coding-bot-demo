import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

interface Agent {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const agents: Agent[] = [
  {
    id: 'architect',
    name: 'The Architect',
    title: 'Digital Design Specialist',
    description: 'I design your digital storefront in minutes—aligned perfectly with your brand.',
    icon: '🏗️',
    color: 'primary'
  },
  {
    id: 'strategist',
    name: 'The Strategist',
    title: 'Growth Analytics Expert',
    description: 'I scan the web and engineer your SEO & growth strategy in real-time.',
    icon: '📊',
    color: 'accent'
  },
  {
    id: 'communicator',
    name: 'The Communicator',
    title: 'Brand Voice Manager',
    description: 'I craft branded, verified communications to build trust and accelerate growth.',
    icon: '✉️',
    color: 'neural-purple'
  }
];

const AgentCard = ({ agent, isVisible }: { agent: Agent; isVisible: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`agent-card p-8 rounded-2xl transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Agent Avatar */}
      <div className="relative mb-6">
        <div className={`w-20 h-20 rounded-full bg-gradient-neural flex items-center justify-center text-3xl transition-all duration-500 ${
          isHovered ? 'scale-110 rotate-12' : 'scale-100'
        }`}>
          {agent.icon}
        </div>
        {isHovered && (
          <div className="absolute inset-0 w-20 h-20 rounded-full bg-primary/20 animate-ping" />
        )}
      </div>

      {/* Agent Info */}
      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-1">{agent.name}</h3>
          <p className="text-sm text-primary font-medium tracking-wide uppercase">
            {agent.title}
          </p>
        </div>

        {/* Speech Bubble Effect */}
        <div className="relative">
          <div className={`p-4 bg-muted/30 rounded-lg border-l-4 border-primary transition-all duration-300 ${
            isHovered ? 'bg-muted/50 scale-105' : ''
          }`}>
            <p className="text-muted-foreground italic">"{agent.description}"</p>
          </div>
          {isHovered && (
            <div className="absolute -bottom-2 left-6 w-4 h-4 bg-muted/50 rotate-45 border-b border-r border-primary/20" />
          )}
        </div>

        {/* Status Indicator */}
        <div className="flex items-center space-x-2 text-sm">
          <div className={`w-2 h-2 rounded-full bg-accent animate-pulse`} />
          <span className="text-accent font-medium">Agent Online</span>
        </div>
      </div>
    </div>
  );
};

export const AgentSection = () => {
  const [visibleAgents, setVisibleAgents] = useState<string[]>([]);
  const agentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const agentId = entry.target.getAttribute('data-agent-id');
            if (agentId && !visibleAgents.includes(agentId)) {
              setTimeout(() => {
                setVisibleAgents(prev => [...prev, agentId]);
              }, agents.findIndex(a => a.id === agentId) * 300);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    agentRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleAgents]);

  return (
    <section className="relative py-32 bg-background">
      {/* Section Header */}
      <div className="text-center mb-20 px-6">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Meet Your <span className="neural-text">AI Team</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Three specialized agents working in perfect harmony to transform your business
        </p>
      </div>

      {/* Agents Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {agents.map((agent, index) => (
            <div
              key={agent.id}
              ref={(el) => (agentRefs.current[index] = el)}
              data-agent-id={agent.id}
              className="parallax-section min-h-0"
            >
              <AgentCard 
                agent={agent} 
                isVisible={visibleAgents.includes(agent.id)} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Connecting Lines Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="connectionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0 }} />
              <stop offset="50%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          
          {visibleAgents.length > 1 && (
            <>
              <path
                d="M300,400 Q600,200 900,400"
                stroke="url(#connectionGrad)"
                strokeWidth="2"
                fill="none"
                className="animate-pulse"
              />
              <path
                d="M300,400 Q600,600 900,400"
                stroke="url(#connectionGrad)"
                strokeWidth="2"
                fill="none"
                className="animate-pulse"
                style={{ animationDelay: '1s' }}
              />
            </>
          )}
        </svg>
      </div>

      {/* Background Particles */}
      <div className="absolute top-0 left-1/4 w-1 h-32 bg-gradient-to-b from-primary/30 to-transparent animate-pulse" />
      <div className="absolute bottom-0 right-1/3 w-1 h-24 bg-gradient-to-t from-accent/30 to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
    </section>
  );
};