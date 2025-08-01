import { useState, useCallback } from 'react';
import { Upload, X, Image, Video, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface MediaUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
  accept?: string;
  maxSize?: number; // in bytes
  allowVideo?: boolean;
}

export function MediaUpload({ 
  value, 
  onChange, 
  label = "Media", 
  className,
  accept = "image/*,video/*",
  maxSize = 10 * 1024 * 1024, // 10MB default
  allowVideo = true
}: MediaUploadProps) {
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
      alert('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    const mediaFile = files.find(file => 
      file.type.startsWith('image/') || (allowVideo && file.type.startsWith('video/'))
    );
    
    if (mediaFile) {
      handleFileUpload(mediaFile);
    }
  }, [allowVideo]);

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

  const removeMedia = () => {
    onChange('');
    setUrlInput('');
  };

  const isVideo = (url: string) => {
    return url.match(/\.(mp4|webm|ogg|mov|avi|mkv)$/i);
  };

  const acceptedTypes = allowVideo ? "image/*,video/*" : "image/*";

  return (
    <div className={cn("space-y-4", className)}>
      {label && <Label>{label}</Label>}
      
      {value ? (
        <div className="relative group">
          {isVideo(value) ? (
            <video 
              src={value} 
              className="w-full h-40 object-cover rounded-lg border"
              controls
              muted
              loop
            />
          ) : (
            <img 
              src={value} 
              alt="Preview" 
              className="w-full h-40 object-cover rounded-lg border"
            />
          )}
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={removeMedia}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload File</TabsTrigger>
            <TabsTrigger value="url">Media URL</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-4">
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
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
              onClick={() => document.getElementById('media-upload')?.click()}
            >
              {isUploading ? (
                <div className="space-y-2">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                  <p className="text-sm text-gray-600">Uploading...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {allowVideo ? (
                    <div className="flex justify-center space-x-2">
                      <Image className="h-8 w-8 text-gray-400" />
                      <Video className="h-8 w-8 text-gray-400" />
                    </div>
                  ) : (
                    <Image className="h-12 w-12 mx-auto text-gray-400" />
                  )}
                  <div>
                    <p className="text-lg font-medium">
                      Drag and drop {allowVideo ? 'an image or video' : 'an image'} here
                    </p>
                    <p className="text-sm text-gray-600">or click to browse</p>
                  </div>
                  <Input
                    type="file"
                    accept={acceptedTypes}
                    onChange={handleFileChange}
                    className="hidden"
                    id="media-upload"
                  />
                  <Button type="button" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>Max file size: {maxSize / 1024 / 1024}MB</p>
                    {allowVideo && (
                      <p>Supported: Images (JPG, PNG, GIF, WebP) and Videos (MP4, WebM, MOV)</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="url" className="space-y-4">
            <div className="flex space-x-2">
              <Input
                type="url"
                placeholder={`Enter ${allowVideo ? 'image or video' : 'image'} URL`}
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUrlSubmit();
                  }
                }}
              />
              <Button type="button" onClick={handleUrlSubmit}>
                Add URL
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Enter a direct link to {allowVideo ? 'an image or video file' : 'an image file'}
            </p>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}