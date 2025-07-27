import { useEffect, useRef, useState } from 'react';

interface Capability {
  title: string;
  description: string;
  benefits: string[];
  metric: string;
}

const capabilities: Capability[] = [
  {
    title: 'Autonomous Development',
    description: 'AI agents write, test, and deploy production-ready code automatically.',
    benefits: [
      'Zero manual coding required',
      'Continuous integration & deployment',
      'Automatic bug fixes and optimizations',
      'Scalable architecture planning'
    ],
    metric: '10x faster deployment'
  },
  {
    title: 'Intelligent Optimization',
    description: 'Machine learning algorithms continuously improve your digital performance.',
    benefits: [
      'Real-time performance monitoring',
      'Automatic A/B testing',
      'Conversion rate optimization',
      'User experience improvements'
    ],
    metric: '3x better conversion rates'
  },
  {
    title: 'Growth Analytics',
    description: 'Advanced analytics provide actionable insights for business growth.',
    benefits: [
      'Predictive market analysis',
      'Competitor intelligence',
      'Customer behavior insights',
      'Revenue optimization'
    ],
    metric: '250% ROI increase'
  }
];

const CapabilityCard = ({ capability, index, isVisible }: { 
  capability: Capability; 
  index: number; 
  isVisible: boolean;
}) => {
  return (
    <div className={`minimal-card p-8 rounded-xl transition-all duration-600 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`} style={{ transitionDelay: `${index * 200}ms` }}>
      
      {/* Metric Badge */}
      <div className="inline-flex items-center bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
        {capability.metric}
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold text-foreground mb-4">
        {capability.title}
      </h3>
      
      <p className="text-muted-foreground leading-relaxed mb-6">
        {capability.description}
      </p>

      {/* Benefits */}
      <div className="space-y-3">
        {capability.benefits.map((benefit, benefitIndex) => (
          <div 
            key={benefitIndex}
            className="flex items-start space-x-3"
          >
            <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
            <span className="text-sm text-muted-foreground">
              {benefit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CapabilitiesSection = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(Array(capabilities.length).fill(false));
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards(Array(capabilities.length).fill(true));
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
    <section ref={sectionRef} className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="accent-text">AI-Powered</span> Capabilities
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Advanced automation and intelligence that works around the clock to grow your business
          </p>
        </div>

        {/* Capabilities Grid */}
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
    </section>
  );
};