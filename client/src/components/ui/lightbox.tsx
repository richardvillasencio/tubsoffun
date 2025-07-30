import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: { src: string; alt: string }[];
  isOpen: boolean;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Lightbox({ images, isOpen, currentIndex, onClose, onNext, onPrev }: LightboxProps) {
  if (!isOpen || !images.length) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="relative max-w-6xl max-h-full w-full h-full flex items-center justify-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
        >
          <X className="h-8 w-8" />
        </button>

        {/* Previous button */}
        {images.length > 1 && (
          <button
            onClick={onPrev}
            className="absolute left-4 text-white text-2xl hover:text-gray-300"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
        )}

        {/* Image */}
        <img
          src={images[currentIndex]?.src}
          alt={images[currentIndex]?.alt}
          className="max-w-full max-h-full object-contain"
        />

        {/* Next button */}
        {images.length > 1 && (
          <button
            onClick={onNext}
            className="absolute right-4 text-white text-2xl hover:text-gray-300"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
}
