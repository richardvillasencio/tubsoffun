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

  // Default navigation fallback
  const defaultNavigation = [
    { name: 'Home', href: '/' },
    { name: 'Hot Tubs', href: '/hot-tubs' },
    { name: 'Saunas', href: '/saunas' },
    { name: 'Pools', href: '/pools' },
    { name: 'Swim Spas', href: '/swim-spas' },
    { name: 'Contact', href: '/contact' },
  ];

  const navigation = headerConfig?.navigationItems || defaultNavigation;
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
    <nav className="shadow-sm border-b border-gray-100 sticky top-0 z-50" style={getHeaderStyles()}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <img 
                src={logoUrl} 
                alt={logoAlt} 
                className="h-12 w-auto" 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item: any) => (
              <Link 
                key={item.name} 
                href={item.href}
                className={`font-medium transition-colors ${getLinkStyles() || 'text-gray-700 hover:text-primary-600'}`}
                style={headerConfig?.linkColor ? { color: headerConfig.linkColor } : {}}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="text-right">
              <div className="text-sm" style={headerConfig?.textColor ? { color: headerConfig.textColor } : {}}>{contactText}</div>
              <div className="font-bold text-primary-600">{contactPhone}</div>
            </div>
            <Link href={ctaLink}>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                {ctaText}
              </Button>
            </Link>
            <Link href="/admin-edit">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                <Settings className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-2 space-y-2">
              {navigation.map((item: any) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block py-2 transition-colors ${getLinkStyles() || 'text-gray-700 hover:text-primary-600'}`}
                  style={headerConfig?.linkColor ? { color: headerConfig.linkColor } : {}}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2 text-primary-600 font-bold">
                  <Phone className="h-4 w-4" />
                  <span>{contactPhone}</span>
                </div>
                <Link href={ctaLink}>
                  <Button className="mt-2 bg-orange-500 hover:bg-orange-600 text-white w-full">
                    {ctaText}
                  </Button>
                </Link>
                <Link href="/admin-edit">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 w-full border-gray-300 text-gray-600 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Admin Panel
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
