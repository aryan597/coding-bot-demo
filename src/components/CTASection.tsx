import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Main Content */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Ready to Deploy Your{' '}
              <span className="accent-text">AI Team?</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join hundreds of businesses already scaling with autonomous AI agents.
            </p>

            {/* Value Props */}
            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
              {[
                { icon: '⚡', title: '5-minute setup', desc: 'Get started instantly' },
                { icon: '🔄', title: 'Zero maintenance', desc: 'Fully autonomous operation' },
                { icon: '📈', title: 'Guaranteed results', desc: 'Or money back' }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className={`text-center transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${index * 200 + 300}ms` }}
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
              <Button 
                size="lg" 
                className="clean-button px-8 py-4 text-base rounded-lg font-medium"
              >
                Start Free Trial
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-base rounded-lg font-medium border-border hover:bg-muted transition-all duration-300"
              >
                Schedule Demo
              </Button>
            </div>

            {/* Trust Line */}
            <p className="text-sm text-muted-foreground mt-8">
              No credit card required • 30-day free trial • Cancel anytime
            </p>
          </div>

          {/* Bottom Section */}
          <div className="pt-16 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
              <div className="mb-4 md:mb-0">
                <span>© 2024 Coding Bot. Built with AI.</span>
              </div>
              <div className="flex items-center space-x-6">
                <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                <a href="#" className="hover:text-foreground transition-colors">Support</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};