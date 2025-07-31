import { Button } from '@/components/ui/button';

interface SwimSpaShowcaseProps {
  content?: {
    title?: string;
    subtitle?: string;
    description?: string;
    ctaText?: string;
    features?: string[];
    imageUrl?: string;
  };
}

export function SwimSpaShowcase({ content }: SwimSpaShowcaseProps) {
  const defaultContent = {
    title: 'WE DON\'T JUST SELL SWIM SPAS.',
    subtitle: 'WE BUILD THEM!',
    description: 'Our swim spas are built with the highest quality materials and craftsmanship. We offer installation, maintenance, and repair services to keep your swim spa running perfectly for years to come.',
    ctaText: 'Learn More',
    features: [
      'Custom Installation',
      'Professional Maintenance',
      'Expert Repairs',
      'Quality Guaranteed'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600'
  };

  const data = { ...defaultContent, ...content };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-2">
              {data.title}
            </h2>
            <h3 className="text-3xl lg:text-4xl font-bold text-blue-300 mb-6">
              {data.subtitle}
            </h3>
            
            <p className="text-xl mb-8 text-blue-100">
              {data.description}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {data.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-blue-100">{feature}</span>
                </div>
              ))}
            </div>
            
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              {data.ctaText}
            </Button>
          </div>
          
          <div className="relative">
            <img 
              src={data.imageUrl} 
              alt="High-quality swim spa installation" 
              className="rounded-2xl shadow-2xl w-full h-auto" 
            />
            
            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="text-2xl font-bold">25+</div>
              <div className="text-sm">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}