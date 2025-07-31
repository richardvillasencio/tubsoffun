import { useState } from 'react';
import { usePageContent } from '@/hooks/use-page-content';
import { BlockEditor } from './block-editor';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { GripVertical, Edit, Trash2, Plus, Save, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { LayoutBlock } from '@shared/schema';

export function VisualEditor() {
  const { blocks, updateBlock, reorderBlocks, createBlock, deleteBlock, isLoading } = usePageContent();
  const [selectedBlock, setSelectedBlock] = useState<LayoutBlock | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [draggedItem, setDraggedItem] = useState<LayoutBlock | null>(null);
  const { toast } = useToast();

  const handleDragStart = (e: React.DragEvent, block: LayoutBlock) => {
    setDraggedItem(block);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetBlock: LayoutBlock) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === targetBlock.id) return;

    const newBlocks = [...blocks];
    const draggedIndex = newBlocks.findIndex(b => b.id === draggedItem.id);
    const targetIndex = newBlocks.findIndex(b => b.id === targetBlock.id);

    // Remove dragged item and insert at new position
    const [removed] = newBlocks.splice(draggedIndex, 1);
    newBlocks.splice(targetIndex, 0, removed);

    // Update order values
    newBlocks.forEach((block, index) => {
      block.order = index + 1;
    });

    reorderBlocks(newBlocks);
    setDraggedItem(null);
  };

  const addNewBlock = (type: string) => {
    const defaultContent = {
      hero: { 
        title: 'FAMILY TIME MADE SIMPLE!!!', 
        subtitle: 'Let us help you transform your space',
        description: 'Our friendly and knowledgeable staff are here to show you our amazing Hot tubs, Swim spas, Pools, Saunas, and more!',
        ctaPrimary: 'Schedule Your Visit',
        ctaSecondary: 'View Products',
        imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
        overlayOpacity: '60',
        textAlignment: 'center'
      },
      about: { title: 'About Us', founderName: 'Name Here' },
      services: { title: 'Our Services' },
      testimonials: { title: 'Testimonials' },
      gallery: { title: 'Gallery' },
      text: { title: 'Text Block', text: 'Your content here' },
      image: { title: 'Image Block', imageUrl: '', alt: 'Description' },
      video: { title: 'Video Section', videoUrl: '', description: 'Video description' },
      cta: { title: 'Call to Action', buttonText: 'Get Started', buttonLink: '/contact' }
    };

    createBlock({
      pageId: 'homepage',
      type: type,
      content: defaultContent[type as keyof typeof defaultContent] || { title: `New ${type} block` },
      order: blocks.length + 1,
      isVisible: true
    });
  };

  const handleDeleteBlock = (blockId: string) => {
    if (confirm('Are you sure you want to delete this block?')) {
      deleteBlock(blockId);
      toast({
        title: "Block deleted",
        description: "The content block has been removed.",
      });
    }
  };

  const editBlock = (block: LayoutBlock) => {
    setSelectedBlock(block);
    setIsEditing(true);
  };

  const handleUpdateBlock = (updatedContent: any) => {
    if (selectedBlock) {
      updateBlock({ id: selectedBlock.id, content: updatedContent });
      setIsEditing(false);
      setSelectedBlock(null);
      toast({
        title: "Block updated",
        description: "Your changes have been saved.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">Visual Page Editor</h1>
            <div className="flex space-x-4">
              <Button 
                variant="outline"
                onClick={() => window.open('/', '_blank')}
                className="flex items-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>Preview Site</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Blocks</h2>
          <div className="space-y-2">
            {['hero', 'about', 'services', 'testimonials', 'gallery', 'text', 'image'].map(type => (
              <Button
                key={type}
                variant="ghost"
                onClick={() => addNewBlock(type)}
                className="w-full justify-start text-left capitalize"
              >
                <Plus className="h-4 w-4 mr-2" />
                {type} Block
              </Button>
            ))}
          </div>
        </div>

        {/* Main Editor */}
        <div className="flex-1 p-6">
          <div className="space-y-4">
            {blocks.map((block) => (
              <Card
                key={block.id}
                draggable
                onDragStart={(e) => handleDragStart(e, block)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, block)}
                className="border-2 border-dashed border-gray-300 hover:border-primary-500 cursor-move group"
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <GripVertical className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-600 capitalize">
                        {block.type} Block
                      </span>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => editBlock(block)}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteBlock(block.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="min-h-20 bg-gray-50 rounded p-3">
                    <h3 className="font-medium text-gray-900">
                      {(block.content as any)?.title || 'Untitled Block'}
                    </h3>
                    {(block.content as any)?.text && (
                      <p className="text-sm text-gray-600 mt-1">
                        {String((block.content as any).text).substring(0, 100)}...
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Edit {selectedBlock?.type} Block
            </DialogTitle>
          </DialogHeader>
          {selectedBlock && (
            <BlockEditor
              block={selectedBlock}
              onSave={handleUpdateBlock}
              onCancel={() => setIsEditing(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
