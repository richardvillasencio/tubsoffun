import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { LayoutBlock } from '@shared/schema';

interface BlockEditorProps {
  block: LayoutBlock;
  onSave: (content: any) => void;
  onCancel: () => void;
}

export function BlockEditor({ block, onSave, onCancel }: BlockEditorProps) {
  const [content, setContent] = useState<Record<string, any>>(block.content as Record<string, any> || {});

  const handleSave = () => {
    onSave(content);
  };

  const updateContent = (key: string, value: any) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  const renderFieldsByType = () => {
    switch (block.type) {
      case 'hero':
        return (
          <>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={content.subtitle || ''}
                onChange={(e) => updateContent('subtitle', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={3}
                value={content.description || ''}
                onChange={(e) => updateContent('description', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                value={content.imageUrl || ''}
                onChange={(e) => updateContent('imageUrl', e.target.value)}
                className="mt-1"
              />
            </div>
          </>
        );

      case 'about':
        return (
          <>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={content.subtitle || ''}
                onChange={(e) => updateContent('subtitle', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="founderName">Founder Name</Label>
              <Input
                id="founderName"
                value={content.founderName || ''}
                onChange={(e) => updateContent('founderName', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={5}
                value={content.description || ''}
                onChange={(e) => updateContent('description', e.target.value)}
                className="mt-1"
              />
            </div>
          </>
        );

      case 'services':
        return (
          <>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Services (JSON format)</Label>
              <Textarea
                rows={10}
                value={JSON.stringify(content.services || [], null, 2)}
                onChange={(e) => {
                  try {
                    updateContent('services', JSON.parse(e.target.value));
                  } catch {
                    // Invalid JSON, ignore
                  }
                }}
                className="mt-1 font-mono text-sm"
                placeholder='[{"title": "HOT TUBS", "image": "...", "description": "..."}]'
              />
            </div>
          </>
        );

      case 'testimonials':
        return (
          <>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="overallRating">Overall Rating</Label>
              <Input
                id="overallRating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={content.overallRating || ''}
                onChange={(e) => updateContent('overallRating', parseFloat(e.target.value))}
                className="mt-1"
              />
            </div>
          </>
        );

      case 'gallery':
        return (
          <>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                className="mt-1"
              />
            </div>
          </>
        );

      case 'text':
        return (
          <>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="text">Text Content</Label>
              <Textarea
                id="text"
                rows={5}
                value={content.text || ''}
                onChange={(e) => updateContent('text', e.target.value)}
                className="mt-1"
              />
            </div>
          </>
        );

      case 'image':
        return (
          <>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                value={content.imageUrl || ''}
                onChange={(e) => updateContent('imageUrl', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="alt">Alt Text</Label>
              <Input
                id="alt"
                value={content.alt || ''}
                onChange={(e) => updateContent('alt', e.target.value)}
                className="mt-1"
              />
            </div>
          </>
        );

      default:
        return (
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={content.title || ''}
              onChange={(e) => updateContent('title', e.target.value)}
              className="mt-1"
            />
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>Block Type</Label>
        <div className="mt-1 px-3 py-2 bg-gray-100 rounded-md text-sm text-gray-600 capitalize">
          {block.type}
        </div>
      </div>

      {renderFieldsByType()}
      
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-primary-600 hover:bg-primary-700">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
