import { useEffect, useRef, useState } from 'react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  result: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'CEO',
    company: 'TechFlow Solutions',
    content: 'Our AI agents built our entire digital ecosystem in 3 days. The results speak for themselves.',
    result: '300% revenue increase in Q1'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Founder',
    company: 'GrowthLabs',
    content: 'Having AI agents work 24/7 on our SEO and optimization has been a game-changer for our growth.',
    result: '500% organic traffic growth'
  },
  {
    name: 'Emma Thompson',
    role: 'Director',
    company: 'InnovateNow',
    content: 'The autonomous optimization improved our conversion rates without any manual intervention.',
    result: '180% conversion rate improvement'
  }
];

const TestimonialCard = ({ testimonial, index, isVisible }: { 
  testimonial: Testimonial; 
  index: number; 
  isVisible: boolean;
}) => {
  return (
    <div className={`minimal-card p-8 rounded-xl transition-all duration-600 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`} style={{ transitionDelay: `${index * 200}ms` }}>
      
      {/* Quote */}
      <div className="mb-6">
        <div className="text-accent text-2xl mb-4 font-serif">"</div>
        <p className="text-foreground leading-relaxed text-lg">
          {testimonial.content}
        </p>
      </div>

      {/* Result */}
      <div className="mb-6 p-4 bg-accent/5 rounded-lg border-l-4 border-accent">
        <p className="text-accent font-semibold text-sm">
          {testimonial.result}
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-bold text-foreground">
            {testimonial.name}
          </h4>
          <p className="text-muted-foreground text-sm">
            {testimonial.role} at {testimonial.company}
          </p>
        </div>
        
        <div className="flex items-center space-x-1 text-accent">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
};

export const TestimonialsSection = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(Array(testimonials.length).fill(false));
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards(Array(testimonials.length).fill(true));
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
            Trusted by <span className="accent-text">Growth Leaders</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how businesses are scaling with AI agents
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
              isVisible={visibleCards[index]}
            />
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '1000+', label: 'Active Businesses' },
              { value: '99.9%', label: 'Uptime Guarantee' },
              { value: '24/7', label: 'AI Monitoring' },
              { value: '4.9/5', label: 'Customer Rating' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
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