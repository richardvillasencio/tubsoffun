import { useState, useCallback } from 'react';
import { Upload, X, Image, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
  accept?: string;
  maxSize?: number; // in bytes
}

export function ImageUpload({ 
  value, 
  onChange, 
  label = "Image", 
  className,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024 // 5MB default
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [urlInput, setUrlInput] = useState(value || '');

  const handleFileUpload = async (file: File) => {
    if (file.size > maxSize) {
      alert(`File size must be less than ${maxSize / 1024 / 1024}MB`);
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      onChange(data.url);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      handleFileUpload(imageFile);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
    }
  };

  const removeImage = () => {
    onChange('');
    setUrlInput('');
  };

  return (
    <div className={cn("space-y-4", className)}>
      {label && <Label>{label}</Label>}
      
      {value ? (
        <div className="relative group">
          <img 
            src={value} 
            alt="Preview" 
            className="w-full h-40 object-cover rounded-lg border"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload File</TabsTrigger>
            <TabsTrigger value="url">Image URL</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-4">
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                dragActive ? "border-primary bg-primary/5" : "border-gray-300",
                isUploading && "opacity-50 pointer-events-none"
              )}
              onDragEnter={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragActive(false);
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              {isUploading ? (
                <div className="space-y-2">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                  <p className="text-sm text-gray-600">Uploading...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Image className="h-12 w-12 mx-auto text-gray-400" />
                  <div>
                    <p className="text-lg font-medium">Drag and drop an image here</p>
                    <p className="text-sm text-gray-600">or click to browse</p>
                  </div>
                  <Input
                    type="file"
                    accept={accept}
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <Label htmlFor="file-upload" asChild>
                    <Button type="button" variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                  </Label>
                  <p className="text-xs text-gray-500">
                    Max file size: {maxSize / 1024 / 1024}MB
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="url" className="space-y-4">
            <div className="flex space-x-2">
              <Input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
              />
              <Button type="button" onClick={handleUrlSubmit}>
                Add
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}