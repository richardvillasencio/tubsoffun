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
    overlayOpacity?: string;
    textAlignment?: string;
  };
}

export function HeroSection({ content }: HeroSectionProps) {
  const defaultContent = {
    title: 'FAMILY TIME MADE SIMPLE!!!',
    subtitle: 'Let us help you transform your space',
    description: 'Our friendly and knowledgeable staff are here to show you our amazing Hot tubs, Swim spas, Pools, Saunas, and more!',
    ctaPrimary: 'Schedule Your Visit',
    ctaSecondary: 'View Products',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
    overlayOpacity: '60',
    textAlignment: 'center'
  };

  const data = { ...defaultContent, ...content };
  
  const isVideo = (url: string) => {
    return url?.match(/\.(mp4|webm|ogg|mov|avi|mkv)$/i);
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Media with Overlay */}
      {data.imageUrl && isVideo(data.imageUrl) ? (
        <>
          <video 
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={data.imageUrl} type="video/mp4" />
          </video>
          <div 
            className="absolute inset-0 bg-black z-10"
            style={{ opacity: parseInt(data.overlayOpacity) / 100 }}
          ></div>
        </>
      ) : (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${data.imageUrl})`,
          }}
        >
          <div 
            className="absolute inset-0 bg-black"
            style={{ opacity: parseInt(data.overlayOpacity) / 100 }}
          ></div>
        </div>
      )}
      
      {/* Content */}
      <div className={`relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-${data.textAlignment} text-white`}>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-8">
          {data.title}
        </h1>
        
        <h2 className="text-xl sm:text-2xl lg:text-3xl mb-4 font-light">
          {data.subtitle}
        </h2>
        
        <h3 className="text-xl sm:text-2xl lg:text-3xl mb-8 font-light">
          into something special
        </h3>
        
        <p className="text-lg sm:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
          {data.description}
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg"
          >
            {data.ctaPrimary}
          </Button>
          <Button 
            size="lg"
            variant="outline" 
            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold rounded-lg"
          >
            {data.ctaSecondary}
          </Button>
        </div>
      </div>

      {/* Chat Widget Placeholder */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors cursor-pointer">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </section>
  );
}
