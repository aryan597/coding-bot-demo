import { HeroSection } from '@/components/HeroSection';
import { WorkflowSection } from '@/components/WorkflowSection';
import { AgentSection } from '@/components/AgentSection';
import { CapabilitiesSection } from '@/components/CapabilitiesSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { CTASection } from '@/components/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WorkflowSection />
      <AgentSection />
      <CapabilitiesSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default Index;
