import { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X, Phone, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import type { HeaderConfig } from '@shared/schema';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fetch header configuration
  const { data: headerConfig } = useQuery<HeaderConfig>({
    queryKey: ['/api/header-config'],
  });

  // Default navigation fallback - matches the comprehensive menu structure
  const defaultNavigation = [
    { name: 'Home', href: '/' },
    { name: 'Hot Tubs', href: '/hot-tubs' },
    { name: 'Swim Spas', href: '/swim-spas' },
    { name: 'Pools', href: '/pools' },
    { name: 'Saunas', href: '/saunas' },
    { name: 'Pool Tables', href: '/pool-tables' },
    { name: 'Outdoor Furniture', href: '/outdoor-furniture' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Financing', href: '/financing' },
    { name: 'Contact', href: '/contact' },
  ];

  const navigation = (headerConfig?.navigationItems as any[]) || defaultNavigation;
  const logoUrl = headerConfig?.logoUrl || "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/Q8i1yKqsccON1uqGARTN/media/67533211d7b7d40b30b4935c.svg";
  const logoAlt = headerConfig?.logoAlt || "Tubs of Fun Logo";
  const contactPhone = headerConfig?.contactPhone || "(701) 234-0705";
  const contactText = headerConfig?.contactText || "Call Us Today";
  const ctaText = headerConfig?.ctaText || "Schedule Visit";
  const ctaLink = headerConfig?.ctaLink || "/contact";

  // Generate dynamic styles based on header config
  const getHeaderStyles = () => {
    if (!headerConfig) return {};
    
    const styles: any = {};
    
    if (headerConfig.backgroundType === 'solid' && headerConfig.backgroundColor) {
      styles.backgroundColor = headerConfig.backgroundColor;
    } else if (headerConfig.backgroundType === 'gradient' && headerConfig.gradientFrom && headerConfig.gradientTo) {
      styles.background = `linear-gradient(135deg, ${headerConfig.gradientFrom}, ${headerConfig.gradientTo})`;
    } else if (headerConfig.backgroundType === 'image' && headerConfig.backgroundImage) {
      styles.backgroundImage = `url(${headerConfig.backgroundImage})`;
      styles.backgroundSize = 'cover';
      styles.backgroundPosition = 'center';
    }
    
    if (headerConfig.textColor) {
      styles.color = headerConfig.textColor;
    }
    
    return styles;
  };

  const getLinkStyles = () => {
    if (!headerConfig) return '';
    
    return headerConfig.linkColor ? `text-[${headerConfig.linkColor}] hover:text-[${headerConfig.linkHoverColor || headerConfig.linkColor}]` : '';
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50" style={getHeaderStyles()}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/">
              <img 
                src={logoUrl} 
                alt={logoAlt} 
                className="h-8 sm:h-10 lg:h-12 w-auto" 
              />
            </Link>
          </div>

          {/* Desktop Navigation - Compact for large screens */}
          <div className="hidden xl:flex items-center space-x-6">
            {navigation.slice(0, 8).map((item: any) => (
              <Link 
                key={item.name} 
                href={item.href}
                className={`text-sm font-medium transition-colors whitespace-nowrap ${getLinkStyles() || 'text-gray-700 hover:text-primary-600'}`}
                style={headerConfig?.linkColor ? { color: headerConfig.linkColor } : {}}
              >
                {item.name}
              </Link>
            ))}
            {navigation.length > 8 && (
              <div className="relative group">
                <button className="text-sm font-medium text-gray-700 hover:text-primary-600 flex items-center">
                  More
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    {navigation.slice(8).map((item: any) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Medium screens navigation - reduced items */}
          <div className="hidden lg:flex xl:hidden items-center space-x-4">
            {navigation.slice(0, 5).map((item: any) => (
              <Link 
                key={item.name} 
                href={item.href}
                className={`text-sm font-medium transition-colors whitespace-nowrap ${getLinkStyles() || 'text-gray-700 hover:text-primary-600'}`}
                style={headerConfig?.linkColor ? { color: headerConfig.linkColor } : {}}
              >
                {item.name}
              </Link>
            ))}
            <div className="relative group">
              <button className="text-sm font-medium text-gray-700 hover:text-primary-600 flex items-center">
                More
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {navigation.slice(5).map((item: any) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info & CTA - Responsive */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-6 flex-shrink-0">
            <div className="text-right hidden xl:block">
              <div className="text-xs xl:text-sm" style={headerConfig?.textColor ? { color: headerConfig.textColor } : {}}>{contactText}</div>
              <div className="font-bold text-primary-600 text-sm xl:text-base">{contactPhone}</div>
            </div>
            <div className="flex items-center space-x-2">
              <Link href={ctaLink}>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white text-xs xl:text-sm px-3 xl:px-4">
                  {ctaText}
                </Button>
              </Link>
              <Link href="/admin-edit">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-gray-300 text-gray-600 hover:bg-gray-50 px-2 xl:px-3"
                >
                  <Settings className="h-3 w-3 xl:h-4 xl:w-4" />
                  <span className="hidden xl:inline ml-2">Admin</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile contact and menu */}
          <div className="flex lg:hidden items-center space-x-3">
            <div className="text-right text-xs">
              <div className="font-bold text-primary-600">{contactPhone}</div>
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 absolute left-0 right-0 top-full shadow-lg">
            <div className="max-h-96 overflow-y-auto">
              <div className="px-4 py-4 space-y-3">
                {navigation.map((item: any) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block py-3 text-base font-medium transition-colors border-b border-gray-100 last:border-b-0 ${getLinkStyles() || 'text-gray-700 hover:text-primary-600'}`}
                    style={headerConfig?.linkColor ? { color: headerConfig.linkColor } : {}}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 mt-4 border-t border-gray-200 space-y-3">
                  <div className="flex items-center justify-center space-x-2 text-primary-600 font-bold">
                    <Phone className="h-4 w-4" />
                    <span>{contactPhone}</span>
                  </div>
                  <Link href={ctaLink} onClick={() => setIsMenuOpen(false)}>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full">
                      {ctaText}
                    </Button>
                  </Link>
                  <Link href="/admin-edit" onClick={() => setIsMenuOpen(false)}>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full border-gray-300 text-gray-600 hover:bg-gray-50"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Admin Panel
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
