import { useEffect, useRef, useState } from 'react';

interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  status: string;
  tasks: string[];
}

const agents: Agent[] = [
  {
    id: 'architect',
    name: 'The Architect',
    role: 'Design & Frontend Specialist',
    description: 'Creates beautiful, responsive designs and user interfaces that convert visitors into customers.',
    status: 'Designing homepage',
    tasks: ['Brand identity', 'UI/UX design', 'Responsive layouts', 'Component systems']
  },
  {
    id: 'strategist',
    name: 'The Strategist',
    role: 'SEO & Analytics Expert',
    description: 'Analyzes market trends and optimizes your digital presence for maximum visibility and growth.',
    status: 'Optimizing SEO',
    tasks: ['Keyword research', 'Content strategy', 'Performance tracking', 'Growth analytics']
  },
  {
    id: 'communicator',
    name: 'The Communicator',
    role: 'Content & Brand Manager',
    description: 'Crafts compelling content and manages your brand voice across all digital touchpoints.',
    status: 'Writing content',
    tasks: ['Brand messaging', 'Content creation', 'Social media', 'Email campaigns']
  }
];

const AgentCard = ({ agent, index, isVisible }: { agent: Agent; index: number; isVisible: boolean }) => {
  return (
    <div className={`minimal-card p-8 rounded-xl transition-all duration-600 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`} style={{ transitionDelay: `${index * 150}ms` }}>
      
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{agent.name}</h3>
          <p className="text-accent font-medium text-sm uppercase tracking-wide">
            {agent.role}
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-muted px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-muted-foreground">Active</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed mb-6">
        {agent.description}
      </p>

      {/* Current Status */}
      <div className="mb-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
          <span className="text-sm font-medium text-foreground">Currently:</span>
        </div>
        <p className="text-sm text-muted-foreground">{agent.status}</p>
      </div>

      {/* Capabilities */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">Core Capabilities</h4>
        <div className="space-y-2">
          {agent.tasks.map((task, taskIndex) => (
            <div key={taskIndex} className="flex items-center space-x-3">
              <div className="w-1 h-1 bg-accent rounded-full" />
              <span className="text-sm text-muted-foreground">{task}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AgentSection = () => {
  const [visibleAgents, setVisibleAgents] = useState<boolean[]>(Array(agents.length).fill(false));
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleAgents(Array(agents.length).fill(true));
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
    <section ref={sectionRef} className="py-32 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meet Your <span className="accent-text">AI Team</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three specialized agents working together to build and grow your business
          </p>
        </div>

        {/* Agents Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {agents.map((agent, index) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              index={index}
              isVisible={visibleAgents[index]}
            />
          ))}
        </div>

        {/* Team Stats */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '24/7', label: 'Active Monitoring' },
              { value: '< 1min', label: 'Response Time' },
              { value: '99.9%', label: 'Uptime' },
              { value: '∞', label: 'Scalability' }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-2xl md:text-3xl font-bold accent-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};