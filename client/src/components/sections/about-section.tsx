import { Button } from '@/components/ui/button';

interface AboutSectionProps {
  content?: {
    title?: string;
    subtitle?: string;
    founderName?: string;
    description?: string;
    ctaText?: string;
    imageUrl?: string;
  };
}

export function AboutSection({ content }: AboutSectionProps) {
  const defaultContent = {
    title: 'ABOUT US',
    subtitle: 'MEET THE FOUNDER & CEO',
    founderName: 'Hi, I\'m Troy!',
    description: 'Our business began in 1991, as a hot tub rental company. We grew that company into a hot tub superstore. Our founder and CEO Troy Derheim eventually sold Tubs of Fun! to focus on designing and building swimming pools, splash pads, and specialty aquatic therapy products. Now, by customer request, and a passion re-imagined, we are back! Fully committed to serving the great people of our community with quality products and unmatched service.',
    ctaText: 'See more',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600'
  };

  const data = { ...defaultContent, ...content };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{data.title}</h2>
          <h3 className="text-xl text-gray-600">{data.subtitle}</h3>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src={data.imageUrl} 
              alt="Troy Derheim, Founder and CEO of Tubs of Fun" 
              className="rounded-2xl shadow-lg w-full h-auto max-w-md mx-auto" 
            />
          </div>
          
          <div className="lg:pl-8">
            <h3 className="text-3xl font-bold text-primary-600 mb-6">{data.founderName}</h3>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              {data.description.split('. ').map((sentence, index) => (
                <p key={index}>{sentence}{index < data.description.split('. ').length - 1 ? '.' : ''}</p>
              ))}
            </div>
            
            <Button className="mt-8 bg-primary-600 hover:bg-primary-700 text-white">
              {data.ctaText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
