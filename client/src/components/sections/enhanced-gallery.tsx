import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Lightbox } from '@/components/ui/lightbox';

interface EnhancedGalleryProps {
  content?: {
    title?: string;
    subtitle?: string;
    ctaText?: string;
  };
}

export function EnhancedGallery({ content }: EnhancedGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const defaultContent = {
    title: 'Our Services',
    subtitle: 'Check out our recently completed projects',
    ctaText: 'View All Projects'
  };

  const data = { ...defaultContent, ...content };

  // Sample gallery images showing different services and installations
  const galleryImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
      alt: 'Hot tub installation',
      category: 'Hot Tubs'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
      alt: 'Swim spa installation',
      category: 'Swim Spas'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
      alt: 'Pool installation',
      category: 'Pools'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
      alt: 'Outdoor furniture setup',
      category: 'Outdoor Furniture'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
      alt: 'Pool table installation',
      category: 'Pool Tables'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1581092795442-8c4b3756b42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
      alt: 'Service and maintenance',
      category: 'Service'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
      alt: 'Sauna installation',
      category: 'Saunas'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
      alt: 'Custom backyard setup',
      category: 'Custom Projects'
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
      alt: 'Family enjoying hot tub',
      category: 'Customer Stories'
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
      alt: 'Outdoor living space',
      category: 'Outdoor Living'
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
      alt: 'Game room setup',
      category: 'Game Rooms'
    },
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1581092795442-8c4b3756b42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
      alt: 'Professional installation',
      category: 'Professional Work'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{data.title}</h2>
          <p className="text-xl text-gray-600">{data.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {galleryImages.map((image) => (
            <div 
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
              onClick={() => setSelectedImage(image.src)}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"></div>
              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-white text-sm font-medium bg-black/50 rounded px-2 py-1 backdrop-blur-sm">
                  {image.category}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
            {data.ctaText}
          </Button>
        </div>
      </div>
      
      {selectedImage && (
        <Lightbox
          images={[{ src: selectedImage, alt: "Gallery image" }]}
          isOpen={!!selectedImage}
          currentIndex={0}
          onClose={() => setSelectedImage(null)}
          onNext={() => {}}
          onPrev={() => {}}
        />
      )}
    </section>
  );
}