import { Button } from '@/components/ui/button';
import { Shield, Percent } from 'lucide-react';

interface HeroSectionProps {
  content?: {
    title?: string;
    subtitle?: string;
    description?: string;
    ctaPrimary?: string;
    ctaSecondary?: string;
    imageUrl?: string;
  };
}

export function HeroSection({ content }: HeroSectionProps) {
  const defaultContent = {
    title: 'FAMILY TIME MADE SIMPLE!!!',
    subtitle: 'Let us help you transform your space',
    description: 'Our friendly and knowledgeable staff are here to show you our amazing Hot tubs, Swim spas, Pools, Saunas, and more!',
    ctaPrimary: 'Schedule Your Visit',
    ctaSecondary: 'View Products',
    imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600'
  };

  const data = { ...defaultContent, ...content };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              <span className="text-primary-600">{data.title.split(' ').slice(0, 2).join(' ')}</span><br />
              <span className="text-gray-900">{data.title.split(' ').slice(2).join(' ')}</span>
            </h1>
            
            <h2 className="text-xl lg:text-2xl text-gray-600 mb-4">
              {data.subtitle}
            </h2>
            <h3 className="text-lg lg:text-xl text-gray-700 font-medium mb-8">
              into something special
            </h3>
            
            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              {data.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-primary-600 hover:bg-primary-700 text-white shadow-lg">
                {data.ctaPrimary}
              </Button>
              <Button 
                size="lg"
                variant="outline" 
                className="border-2 border-primary-600 text-primary-600 hover:bg-primary-50"
              >
                {data.ctaSecondary}
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src={data.imageUrl} 
              alt="Family enjoying luxury hot tub in backyard setting" 
              className="rounded-2xl shadow-2xl w-full h-auto" 
            />
            
            <div className="absolute -bottom-6 -left-6 bg-orange-500 text-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="flex items-center space-x-2 text-sm font-medium">
                    <Shield className="h-4 w-4" />
                    <span>Licensed & Insured</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs opacity-90">
                    <Percent className="h-3 w-3" />
                    <span>Military & Senior Discounts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
