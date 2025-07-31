import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageUpload } from '@/components/ui/image-upload';
import { cn } from '@/lib/utils';

interface BackgroundEditorProps {
  backgroundType: 'solid' | 'gradient' | 'image';
  backgroundColor?: string;
  backgroundImage?: string;
  gradientFrom?: string;
  gradientTo?: string;
  onChange: (config: {
    backgroundType: 'solid' | 'gradient' | 'image';
    backgroundColor?: string;
    backgroundImage?: string;
    gradientFrom?: string;
    gradientTo?: string;
  }) => void;
  className?: string;
}

export function BackgroundEditor({
  backgroundType,
  backgroundColor = '#ffffff',
  backgroundImage,
  gradientFrom = '#3b82f6',
  gradientTo = '#1d4ed8',
  onChange,
  className
}: BackgroundEditorProps) {
  const handleTypeChange = (type: 'solid' | 'gradient' | 'image') => {
    onChange({
      backgroundType: type,
      backgroundColor,
      backgroundImage,
      gradientFrom,
      gradientTo
    });
  };

  const handleColorChange = (field: string, value: string) => {
    onChange({
      backgroundType,
      backgroundColor,
      backgroundImage,
      gradientFrom,
      gradientTo,
      [field]: value
    });
  };

  const generatePreviewStyle = () => {
    switch (backgroundType) {
      case 'solid':
        return { backgroundColor };
      case 'gradient':
        return { 
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` 
        };
      case 'image':
        return backgroundImage 
          ? { 
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }
          : { backgroundColor: '#f3f4f6' };
      default:
        return { backgroundColor };
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div>
        <Label>Background Type</Label>
        <Select value={backgroundType} onValueChange={handleTypeChange}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="solid">Solid Color</SelectItem>
            <SelectItem value="gradient">Gradient</SelectItem>
            <SelectItem value="image">Image</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg p-4">
        <div className="flex items-center space-x-4 mb-4">
          <Label className="text-sm font-medium">Preview:</Label>
          <div 
            className="w-16 h-8 rounded border shadow-sm"
            style={generatePreviewStyle()}
          />
        </div>

        {backgroundType === 'solid' && (
          <div>
            <Label htmlFor="bg-color">Background Color</Label>
            <div className="flex space-x-2 mt-1">
              <Input
                id="bg-color"
                type="color"
                value={backgroundColor}
                onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                className="w-16 h-10 p-1 border rounded"
              />
              <Input
                type="text"
                value={backgroundColor || ''}
                onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                placeholder="#ffffff"
                className="flex-1"
              />
            </div>
          </div>
        )}

        {backgroundType === 'gradient' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="gradient-from">Gradient Start</Label>
              <div className="flex space-x-2 mt-1">
                <Input
                  id="gradient-from"
                  type="color"
                  value={gradientFrom}
                  onChange={(e) => handleColorChange('gradientFrom', e.target.value)}
                  className="w-16 h-10 p-1 border rounded"
                />
                <Input
                  type="text"
                  value={gradientFrom}
                  onChange={(e) => handleColorChange('gradientFrom', e.target.value)}
                  placeholder="#3b82f6"
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="gradient-to">Gradient End</Label>
              <div className="flex space-x-2 mt-1">
                <Input
                  id="gradient-to"
                  type="color"
                  value={gradientTo}
                  onChange={(e) => handleColorChange('gradientTo', e.target.value)}
                  className="w-16 h-10 p-1 border rounded"
                />
                <Input
                  type="text"
                  value={gradientTo}
                  onChange={(e) => handleColorChange('gradientTo', e.target.value)}
                  placeholder="#1d4ed8"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        )}

        {backgroundType === 'image' && (
          <ImageUpload
            value={backgroundImage}
            onChange={(url) => handleColorChange('backgroundImage', url)}
            label="Background Image"
          />
        )}
      </div>
    </div>
  );
}