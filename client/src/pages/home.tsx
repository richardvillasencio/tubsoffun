import { useQuery } from '@tanstack/react-query';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { ServicesGrid } from '@/components/sections/services-grid';
import { SwimSpaShowcase } from '@/components/sections/swim-spa-showcase';
import { CommitmentSection } from '@/components/sections/commitment-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { GallerySection } from '@/components/sections/gallery-section';
import { EnhancedGallery } from '@/components/sections/enhanced-gallery';
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

  // If no blocks found, show default content matching the comprehensive layout
  if (sortedBlocks.length === 0) {
    return (
      <div className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <SwimSpaShowcase />
        <ServicesGrid />
        <EnhancedGallery />
        <CommitmentSection />
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
