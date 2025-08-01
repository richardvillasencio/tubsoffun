import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageUpload } from '@/components/ui/image-upload';
import { BackgroundEditor } from '@/components/ui/background-editor';
import { Trash2, Plus, GripVertical } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface NavigationItem {
  name: string;
  href: string;
}

interface HeaderConfigData {
  id?: string;
  logoUrl?: string;
  logoAlt?: string;
  navigationItems?: NavigationItem[];
  contactPhone?: string;
  contactText?: string;
  ctaText?: string;
  ctaLink?: string;
  // Top bar fields
  topBarEnabled?: boolean;
  topBarPhone?: string;
  topBarAddress?: string;
  topBarBackgroundType?: 'solid' | 'gradient' | 'image';
  topBarBackgroundColor?: string;
  topBarBackgroundImage?: string;
  topBarGradientFrom?: string;
  topBarGradientTo?: string;
  topBarTextColor?: string;
  topBarLinks?: NavigationItem[];
  // Main navigation fields  
  mainNavBackgroundColor?: string;
  mainNavTextColor?: string;
  backgroundColor?: string;
  backgroundType?: 'solid' | 'gradient' | 'image';
  backgroundImage?: string;
  gradientFrom?: string;
  gradientTo?: string;
  textColor?: string;
  linkColor?: string;
  linkHoverColor?: string;
  isActive?: boolean;
}

export function HeaderEditor() {
  const queryClient = useQueryClient();
  const [config, setConfig] = useState<HeaderConfigData>({
    logoUrl: '',
    logoAlt: 'Logo',
    navigationItems: [
      { name: 'HOT TUBS', href: '/hot-tubs' },
      { name: 'SAUNAS', href: '/saunas' },
      { name: 'POOL', href: '/pools' },
      { name: 'SWIM SPAS', href: '/swim-spas' },
      { name: 'GAME ROOM ESSENTIALS', href: '/pool-tables' },
      { name: 'GRILLS', href: '/outdoor-furniture' },
    ],
    contactPhone: '(701) 234-0705',
    contactText: 'Call Us Today',
    ctaText: 'Schedule Visit',
    ctaLink: '/contact',
    // Top bar settings
    topBarEnabled: true,
    topBarPhone: '(701) 234-0705',
    topBarAddress: '601 Main Ave W, West Fargo, ND 58078',
    topBarBackgroundType: 'solid',
    topBarBackgroundColor: '#2dd4bf',
    topBarBackgroundImage: '',
    topBarGradientFrom: '#2dd4bf',
    topBarGradientTo: '#0d9488',
    topBarTextColor: '#ffffff',
    topBarLinks: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Our Company', href: '/about' },
      { name: 'Home', href: '/' },
    ],
    // Main navigation settings
    mainNavBackgroundColor: '#f97316',
    mainNavTextColor: '#ffffff',
    backgroundColor: '#ffffff',
    backgroundType: 'solid',
    textColor: '#000000',
    linkColor: '#2563eb',
    linkHoverColor: '#1d4ed8',
    isActive: true,
  });

  const { data: headerConfig } = useQuery({
    queryKey: ['/api/header-config'],
  });

  const createHeaderMutation = useMutation({
    mutationFn: async (data: HeaderConfigData) => {
      const response = await fetch('/api/header-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create header config');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/header-config'] });
    },
  });

  const updateHeaderMutation = useMutation({
    mutationFn: async ({ id, ...data }: HeaderConfigData & { id: string }) => {
      const response = await fetch(`/api/header-config/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update header config');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/header-config'] });
    },
  });

  useEffect(() => {
    if (headerConfig) {
      setConfig(headerConfig);
    }
  }, [headerConfig]);

  const handleSave = async () => {
    try {
      if (config.id) {
        await updateHeaderMutation.mutateAsync(config as HeaderConfigData & { id: string });
      } else {
        await createHeaderMutation.mutateAsync(config);
      }
    } catch (error) {
      console.error('Failed to save header config:', error);
    }
  };

  const updateConfig = (key: string, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const addNavigationItem = () => {
    const newItem = { name: 'New Page', href: '/new-page' };
    setConfig(prev => ({
      ...prev,
      navigationItems: [...(prev.navigationItems || []), newItem]
    }));
  };

  const updateNavigationItem = (index: number, field: keyof NavigationItem, value: string) => {
    setConfig(prev => ({
      ...prev,
      navigationItems: prev.navigationItems?.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      ) || []
    }));
  };

  const removeNavigationItem = (index: number) => {
    setConfig(prev => ({
      ...prev,
      navigationItems: prev.navigationItems?.filter((_, i) => i !== index) || []
    }));
  };

  const handleBackgroundChange = (backgroundConfig: any) => {
    setConfig(prev => ({ ...prev, ...backgroundConfig }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Header Configuration</h2>
        <Button 
          onClick={handleSave}
          disabled={createHeaderMutation.isPending || updateHeaderMutation.isPending}
        >
          {createHeaderMutation.isPending || updateHeaderMutation.isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <Tabs defaultValue="logo" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="logo">Logo</TabsTrigger>
          <TabsTrigger value="topbar">Top Header</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
          <TabsTrigger value="styling">Styling</TabsTrigger>
        </TabsList>

        <TabsContent value="logo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Logo & Branding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ImageUpload
                label="Logo"
                value={config.logoUrl || ''}
                onChange={(url) => updateConfig('logoUrl', url)}
              />
              <div>
                <Label htmlFor="logoAlt">Logo Alt Text</Label>
                <Input
                  id="logoAlt"
                  value={config.logoAlt || ''}
                  onChange={(e) => updateConfig('logoAlt', e.target.value)}
                  placeholder="Descriptive text for screen readers"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topbar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Header Bar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="topBarEnabled"
                  checked={config.topBarEnabled ?? true}
                  onChange={(e) => updateConfig('topBarEnabled', e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="topBarEnabled">Enable Top Header Bar</Label>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="topBarPhone">Phone Number</Label>
                  <Input
                    id="topBarPhone"
                    value={config.topBarPhone || ''}
                    onChange={(e) => updateConfig('topBarPhone', e.target.value)}
                    placeholder="(701) 234-0705"
                  />
                </div>
                <div>
                  <Label htmlFor="topBarAddress">Address</Label>
                  <Input
                    id="topBarAddress"
                    value={config.topBarAddress || ''}
                    onChange={(e) => updateConfig('topBarAddress', e.target.value)}
                    placeholder="601 Main Ave W, West Fargo, ND 58078"
                  />
                </div>
              </div>

              <BackgroundEditor
                backgroundType={config.topBarBackgroundType || 'solid'}
                backgroundColor={config.topBarBackgroundColor}
                backgroundImage={config.topBarBackgroundImage}
                gradientFrom={config.topBarGradientFrom}
                gradientTo={config.topBarGradientTo}
                onChange={(backgroundConfig) => {
                  setConfig(prev => ({ 
                    ...prev, 
                    topBarBackgroundType: backgroundConfig.backgroundType,
                    topBarBackgroundColor: backgroundConfig.backgroundColor,
                    topBarBackgroundImage: backgroundConfig.backgroundImage,
                    topBarGradientFrom: backgroundConfig.gradientFrom,
                    topBarGradientTo: backgroundConfig.gradientTo
                  }));
                }}
              />
              
              <div>
                <Label htmlFor="topBarTextColor">Text Color</Label>
                <div className="flex space-x-2 mt-1">
                  <Input
                    id="topBarTextColor"
                    type="color"
                    value={config.topBarTextColor || '#ffffff'}
                    onChange={(e) => updateConfig('topBarTextColor', e.target.value)}
                    className="w-16 h-10 p-1 border rounded"
                  />
                  <Input
                    type="text"
                    value={config.topBarTextColor || '#ffffff'}
                    onChange={(e) => updateConfig('topBarTextColor', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label>Top Header Links</Label>
                <div className="space-y-2 mt-2">
                  {config.topBarLinks?.map((link, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 border rounded">
                      <Input
                        placeholder="Link Name"
                        value={link.name}
                        onChange={(e) => {
                          const newLinks = [...(config.topBarLinks || [])];
                          newLinks[index] = { ...newLinks[index], name: e.target.value };
                          updateConfig('topBarLinks', newLinks);
                        }}
                      />
                      <Input
                        placeholder="/link-url"
                        value={link.href}
                        onChange={(e) => {
                          const newLinks = [...(config.topBarLinks || [])];
                          newLinks[index] = { ...newLinks[index], href: e.target.value };
                          updateConfig('topBarLinks', newLinks);
                        }}
                      />
                      <Button
                        onClick={() => {
                          const newLinks = (config.topBarLinks || []).filter((_, i) => i !== index);
                          updateConfig('topBarLinks', newLinks);
                        }}
                        variant="outline"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    onClick={() => {
                      const newLinks = [...(config.topBarLinks || []), { name: 'New Link', href: '#' }];
                      updateConfig('topBarLinks', newLinks);
                    }}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Link
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="navigation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Navigation Menu
                <Button onClick={addNavigationItem} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {config.navigationItems?.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 p-4 border rounded-lg">
                  <GripVertical className="h-4 w-4 text-gray-400" />
                  <div className="flex-1 space-x-2 flex">
                    <Input
                      placeholder="Page Name"
                      value={item.name}
                      onChange={(e) => updateNavigationItem(index, 'name', e.target.value)}
                    />
                    <Input
                      placeholder="/page-url"
                      value={item.href}
                      onChange={(e) => updateNavigationItem(index, 'href', e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={() => removeNavigationItem(index)}
                    variant="outline"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information & CTA</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contactText">Contact Label</Label>
                <Input
                  id="contactText"
                  value={config.contactText || ''}
                  onChange={(e) => updateConfig('contactText', e.target.value)}
                  placeholder="Call Us Today"
                />
              </div>
              <div>
                <Label htmlFor="contactPhone">Phone Number</Label>
                <Input
                  id="contactPhone"
                  value={config.contactPhone || ''}
                  onChange={(e) => updateConfig('contactPhone', e.target.value)}
                  placeholder="(701) 234-0705"
                />
              </div>
              <div>
                <Label htmlFor="ctaText">CTA Button Text</Label>
                <Input
                  id="ctaText"
                  value={config.ctaText || ''}
                  onChange={(e) => updateConfig('ctaText', e.target.value)}
                  placeholder="Schedule Visit"
                />
              </div>
              <div>
                <Label htmlFor="ctaLink">CTA Button Link</Label>
                <Input
                  id="ctaLink"
                  value={config.ctaLink || ''}
                  onChange={(e) => updateConfig('ctaLink', e.target.value)}
                  placeholder="/contact"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="styling" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Header Styling</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <BackgroundEditor
                backgroundType={config.backgroundType || 'solid'}
                backgroundColor={config.backgroundColor}
                backgroundImage={config.backgroundImage}
                gradientFrom={config.gradientFrom}
                gradientTo={config.gradientTo}
                onChange={handleBackgroundChange}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="textColor">Text Color</Label>
                  <div className="flex space-x-2 mt-1">
                    <Input
                      id="textColor"
                      type="color"
                      value={config.textColor || '#000000'}
                      onChange={(e) => updateConfig('textColor', e.target.value)}
                      className="w-16 h-10 p-1 border rounded"
                    />
                    <Input
                      type="text"
                      value={config.textColor || '#000000'}
                      onChange={(e) => updateConfig('textColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="linkColor">Link Color</Label>
                  <div className="flex space-x-2 mt-1">
                    <Input
                      id="linkColor"
                      type="color"
                      value={config.linkColor || '#2563eb'}
                      onChange={(e) => updateConfig('linkColor', e.target.value)}
                      className="w-16 h-10 p-1 border rounded"
                    />
                    <Input
                      type="text"
                      value={config.linkColor || '#2563eb'}
                      onChange={(e) => updateConfig('linkColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="linkHoverColor">Link Hover Color</Label>
                  <div className="flex space-x-2 mt-1">
                    <Input
                      id="linkHoverColor"
                      type="color"
                      value={config.linkHoverColor || '#1d4ed8'}
                      onChange={(e) => updateConfig('linkHoverColor', e.target.value)}
                      className="w-16 h-10 p-1 border rounded"
                    />
                    <Input
                      type="text"
                      value={config.linkHoverColor || '#1d4ed8'}
                      onChange={(e) => updateConfig('linkHoverColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}