import { Button } from '@/components/ui/button';
import { Shield, Award, Users, Wrench } from 'lucide-react';

interface CommitmentSectionProps {
  content?: {
    title?: string;
    subtitle?: string;
    description?: string;
    ctaText?: string;
    imageUrl?: string;
    features?: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
}

export function CommitmentSection({ content }: CommitmentSectionProps) {
  const defaultContent = {
    title: 'We\'re committed to serve you!',
    subtitle: 'Your satisfaction is our priority',
    description: 'With over 25 years of experience in the industry, we provide exceptional service and quality products that enhance your outdoor living experience.',
    ctaText: 'Contact Us Today',
    imageUrl: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
    features: [
      {
        icon: 'shield',
        title: 'Licensed & Insured',
        description: 'Fully licensed and insured for your peace of mind'
      },
      {
        icon: 'award',
        title: 'Quality Guaranteed',
        description: 'We stand behind our work with comprehensive warranties'
      },
      {
        icon: 'users',
        title: 'Expert Team',
        description: 'Experienced professionals dedicated to excellence'
      },
      {
        icon: 'wrench',
        title: 'Full Service',
        description: 'From installation to maintenance, we handle it all'
      }
    ]
  };

  const data = { ...defaultContent, ...content };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield': return <Shield className="h-8 w-8" />;
      case 'award': return <Award className="h-8 w-8" />;
      case 'users': return <Users className="h-8 w-8" />;
      case 'wrench': return <Wrench className="h-8 w-8" />;
      default: return <Shield className="h-8 w-8" />;
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img 
              src={data.imageUrl} 
              alt="Our commitment to quality service" 
              className="rounded-2xl shadow-lg w-full h-auto" 
            />
            
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg border">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">1000+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {data.title}
            </h2>
            
            <h3 className="text-xl text-blue-600 mb-6">
              {data.subtitle}
            </h3>
            
            <p className="text-lg text-gray-600 mb-8">
              {data.description}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {data.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    {getIcon(feature.icon)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              {data.ctaText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}