import { useEffect, useRef, useState } from 'react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'CEO',
    company: 'TechFlow Solutions',
    content: 'Our AI agents built and optimized our entire digital presence in days, not months. Revenue increased 300% in the first quarter.',
    avatar: '👩‍💼'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Founder',
    company: 'GrowthLabs',
    content: 'The AI team works 24/7, constantly improving our SEO and customer acquisition. It\'s like having a world-class marketing team that never sleeps.',
    avatar: '👨‍🚀'
  },
  {
    name: 'Emma Thompson',
    role: 'Director',
    company: 'InnovateNow',
    content: 'The autonomous optimization is incredible. Our conversion rates improved by 180% without any manual intervention.',
    avatar: '👩‍💻'
  }
];

const TestimonialCard = ({ testimonial, index, isVisible }: { 
  testimonial: Testimonial; 
  index: number; 
  isVisible: boolean;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    
    setMousePosition({ x, y });
  };

  return (
    <div 
      ref={cardRef}
      className={`hologram-card p-8 rounded-2xl transition-all duration-700 cursor-pointer ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-16'
      }`}
      style={{ 
        transitionDelay: `${index * 200}ms`,
        transform: isHovering 
          ? `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg) translateZ(20px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
    >
      {/* Holographic Glow */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-neural transition-opacity duration-500 ${
        isHovering ? 'opacity-20' : 'opacity-5'
      }`} />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Quote */}
        <div className="mb-6">
          <div className="text-primary text-4xl mb-4 opacity-60">"</div>
          <p className="text-foreground leading-relaxed text-lg">
            {testimonial.content}
          </p>
        </div>

        {/* Author */}
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className={`w-14 h-14 rounded-full bg-gradient-neural flex items-center justify-center text-2xl transition-all duration-300 ${
            isHovering ? 'scale-110 rotate-6' : 'scale-100'
          }`}>
            {testimonial.avatar}
          </div>
          
          {/* Info */}
          <div>
            <h4 className="font-semibold text-foreground text-lg">
              {testimonial.name}
            </h4>
            <p className="text-primary font-medium">
              {testimonial.role}
            </p>
            <p className="text-muted-foreground text-sm">
              {testimonial.company}
            </p>
          </div>
        </div>

        {/* Verification Badge */}
        <div className="mt-6 flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center">
            <div className="w-2 h-2 bg-background rounded-full" />
          </div>
          <span className="text-xs text-accent font-medium tracking-wide">
            VERIFIED CLIENT
          </span>
        </div>
      </div>

      {/* Corner Elements */}
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/20" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/20" />
      
      {/* Scan Line Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-all duration-1000 ${
        isHovering ? 'translate-x-full' : '-translate-x-full'
      }`} style={{ width: '200%' }} />
    </div>
  );
};

export const TestimonialsSection = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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
    <section ref={sectionRef} className="relative py-32 bg-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-1/3 right-1/5 w-48 h-48 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(${195}, ${100}, ${60}, 0.15) 1px, transparent 0)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Trusted by Businesses. <span className="neural-text">Powered by AI.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how AI agents are transforming businesses across industries
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                index={index}
                isVisible={visibleCards[index]}
              />
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: '500+', label: 'Active AI Agents' },
              { value: '99.9%', label: 'Uptime' },
              { value: '3.2x', label: 'Avg ROI Increase' },
              { value: '24/7', label: 'Autonomous Operation' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold neural-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground tracking-wide">
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