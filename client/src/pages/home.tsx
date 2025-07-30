import { useQuery } from '@tanstack/react-query';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { ServicesGrid } from '@/components/sections/services-grid';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { GallerySection } from '@/components/sections/gallery-section';
import { ScheduleSection } from '@/components/sections/schedule-section';
import { Button } from '@/components/ui/button';
import type { LayoutBlock } from '@shared/schema';

export default function Home() {
  const { data: blocks = [], isLoading } = useQuery<LayoutBlock[]>({
    queryKey: ['/api/layout-blocks', 'homepage'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const getBlocksByType = (type: string) => {
    return blocks.filter(block => block.type === type && block.isVisible);
  };

  const renderBlock = (block: LayoutBlock) => {
    switch (block.type) {
      case 'hero':
        return <HeroSection key={block.id} content={block.content as any} />;
      case 'about':
        return <AboutSection key={block.id} content={block.content as any} />;
      case 'services':
        return <ServicesGrid key={block.id} content={block.content as any} />;
      case 'testimonials':
        return <TestimonialsSection key={block.id} content={block.content as any} />;
      case 'gallery':
        return <GallerySection key={block.id} content={block.content as any} />;
      case 'schedule':
        return <ScheduleSection key={block.id} content={block.content as any} />;
      default:
        return null;
    }
  };

  // Sort blocks by order
  const sortedBlocks = blocks
    .filter(block => block.isVisible)
    .sort((a, b) => a.order - b.order);

  // If no blocks found, show default content
  if (sortedBlocks.length === 0) {
    return (
      <div className="min-h-screen">
        <HeroSection />
        
        {/* Swim Spa Highlight */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-6xl font-bold mb-4">
              We Don't Just Sell Swim Spas
            </h2>
            <h3 className="text-3xl lg:text-5xl font-bold mb-6">
              — We <span className="text-orange-400">Master</span> Them!
            </h3>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Experience the ultimate in aquatic fitness.
            </p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg">
              Explore Swim Spas
            </Button>
          </div>
        </section>

        <AboutSection />
        <ServicesGrid />

        {/* Location Highlight */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Check our Lakeville Location
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Now open in Lakeville, MN—experience our full showroom and service team!
                </p>
                <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                  Visit Lakeville Location
                </Button>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="Modern retail showroom exterior" 
                  className="rounded-2xl shadow-lg w-full h-auto" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <img 
              src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/Q8i1yKqsccON1uqGARTN/media/67533211d7b7d40b30b4935c.svg" 
              alt="Tubs of Fun Logo" 
              className="h-16 w-auto mx-auto mb-8" 
            />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12">
              We're committed to serve you!
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl text-primary-600 mb-4">🛡️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Licensed & Insured</h3>
                <p className="text-gray-600">Your peace of mind is our priority</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl text-orange-500 mb-4">%</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Military & Senior Discounts</h3>
                <p className="text-gray-600">Special pricing for those who served</p>
              </div>
            </div>
          </div>
        </section>

        <GallerySection />
        <TestimonialsSection />
        <ScheduleSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {sortedBlocks.map(renderBlock)}
    </div>
  );
}
