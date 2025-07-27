import { useEffect, useRef, useState } from 'react';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  agent: string;
  code: string;
  progress: number;
}

const workflowSteps: WorkflowStep[] = [
  {
    id: 'analyze',
    title: 'Business Analysis',
    description: 'The Strategist analyzes your requirements and market position',
    agent: 'Strategist Agent',
    code: `// Analyzing business requirements
const businessData = await analyzeMarket({
  industry: "e-commerce",
  targetAudience: "millennials",
  competitors: ["shopify", "amazon"]
});

// Generating strategy
const strategy = generateGrowthPlan(businessData);`,
    progress: 100
  },
  {
    id: 'design',
    title: 'Design Creation',
    description: 'The Architect creates your brand identity and website design',
    agent: 'Architect Agent',
    code: `// Creating responsive design system
const designSystem = {
  colors: generatePalette(brandValues),
  typography: optimizeReadability(),
  layout: createResponsiveGrid()
};

// Building component library
const components = buildUIComponents(designSystem);`,
    progress: 85
  },
  {
    id: 'develop',
    title: 'Code Generation',
    description: 'AI writes clean, optimized code for your entire application',
    agent: 'Developer Agent',
    code: `// Generating React components
export const HomePage = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);
  
  return (
    <div className="homepage">
      <Hero />
      <ProductGrid products={products} />
    </div>
  );
};`,
    progress: 70
  },
  {
    id: 'deploy',
    title: 'Deployment',
    description: 'Automatic deployment to production with CI/CD pipeline',
    agent: 'DevOps Agent',
    code: `# Automated deployment pipeline
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        run: vercel --prod`,
    progress: 45
  },
  {
    id: 'optimize',
    title: 'SEO Optimization',
    description: 'The Communicator optimizes content and SEO for maximum visibility',
    agent: 'Communicator Agent',
    code: `// SEO optimization in progress
const seoOptimization = {
  metaTags: generateMetaTags(pageContent),
  structuredData: createJsonLD(businessInfo),
  sitemap: generateSitemap(pages),
  performance: optimizePageSpeed()
};

// Content enhancement
const enhancedContent = improveReadability(content);`,
    progress: 30
  }
];

const CodeWindow = ({ step, isVisible }: { step: WorkflowStep; isVisible: boolean }) => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    const timer = setTimeout(() => {
      if (currentIndex < step.code.length) {
        setDisplayedCode(step.code.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, 20);

    return () => clearTimeout(timer);
  }, [currentIndex, step.code, isVisible]);

  return (
    <div className="code-window rounded-lg p-6 h-80 overflow-hidden">
      {/* Header */}
      <div className="flex items-center mb-4 pb-3 border-b border-border">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
        <span className="ml-4 text-sm font-medium text-muted-foreground">{step.agent}</span>
      </div>
      
      {/* Code Content */}
      <div className="text-sm">
        <pre className="text-foreground leading-relaxed whitespace-pre-wrap">
          {displayedCode}
          {isVisible && currentIndex < step.code.length && (
            <span className="animate-blink">|</span>
          )}
        </pre>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Progress</span>
          <span>{step.progress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5">
          <div 
            className="h-1.5 bg-accent rounded-full transition-all duration-1000"
            style={{ width: isVisible ? `${step.progress}%` : '0%' }}
          />
        </div>
      </div>
    </div>
  );
};

const WorkflowStep = ({ step, index, isVisible }: { 
  step: WorkflowStep; 
  index: number; 
  isVisible: boolean;
}) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`grid md:grid-cols-2 gap-12 items-center mb-32 ${isEven ? '' : 'md:flex-row-reverse'}`}>
      {/* Content */}
      <div className={`${isEven ? 'md:order-1' : 'md:order-2'}`}>
        <div className={`transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        }`}>
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                {index + 1}
              </div>
              <span className="text-sm font-medium text-accent uppercase tracking-wide">
                {step.agent}
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {step.title}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </div>
          
          {/* Status */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-medium text-accent">In Progress</span>
          </div>
        </div>
      </div>

      {/* Code Window */}
      <div className={`${isEven ? 'md:order-2' : 'md:order-1'}`}>
        <div className={`transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isEven ? '-translate-x-8' : 'translate-x-8'}`
        }`} style={{ transitionDelay: '200ms' }}>
          <CodeWindow step={step} isVisible={isVisible} />
        </div>
      </div>
    </div>
  );
};

export const WorkflowSection = () => {
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>(Array(workflowSteps.length).fill(false));
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-step-index') || '0');
            setVisibleSteps(prev => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Watch <span className="accent-text">AI Agents</span> Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Follow the real-time process as our AI agents analyze, design, code, deploy, and optimize your business
          </p>
        </div>

        {/* Workflow Steps */}
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-border" />
          
          {workflowSteps.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => (stepRefs.current[index] = el)}
              data-step-index={index}
              className="relative"
            >
              <WorkflowStep 
                step={step} 
                index={index} 
                isVisible={visibleSteps[index]} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};