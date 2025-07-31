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
    <header className="sticky top-0 z-50">
      {/* Top Bar - Customizable Section */}
      {headerConfig?.topBarEnabled !== false && (
        <div 
          className="text-white"
          style={{ 
            backgroundColor: headerConfig?.topBarBackgroundColor || '#2dd4bf',
            color: headerConfig?.topBarTextColor || '#ffffff'
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-10 text-sm">
              {/* Contact Info */}
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Phone className="h-3 w-3 mr-1" />
                  {headerConfig?.topBarPhone || '(701) 234-0705'}
                </span>
                <span className="hidden sm:block">
                  📍 {headerConfig?.topBarAddress || '601 Main Ave W, West Fargo, ND 58078'}
                </span>
              </div>
              
              {/* Top Right Menu */}
              <div className="flex items-center space-x-4 text-sm">
                {headerConfig?.topBarLinks && Array.isArray(headerConfig.topBarLinks) ? 
                  (headerConfig.topBarLinks as Array<{name: string, href: string, hasDropdown?: boolean}>).map((link, index: number) => (
                    <div key={index} className="flex items-center space-x-4">
                      <Link href={link.href || '#'} className="hover:opacity-80 flex items-center">
                        {link.name}
                        {link.hasDropdown && (
                          <svg className="ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </Link>
                      {index < headerConfig.topBarLinks.length - 1 && <span className="opacity-60">|</span>}
                    </div>
                  )) :
                  <>
                    <Link href="/contact" className="hover:opacity-80 flex items-center">
                      Contact Us
                      <svg className="ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>
                    <span className="opacity-60">|</span>
                    <Link href="/about" className="hover:opacity-80 flex items-center">
                      Our Company
                      <svg className="ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>
                    <span className="opacity-60">|</span>
                    <Link href="/" className="hover:opacity-80">Home</Link>
                  </>
                }
                {/* Mascot Character */}
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  🏊
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation - Customizable Section */}
      <div 
        className="text-white shadow-lg"
        style={{ 
          backgroundColor: headerConfig?.mainNavBackgroundColor || '#f97316',
          color: headerConfig?.mainNavTextColor || '#ffffff'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
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

            {/* Main Navigation */}
            <div className="hidden lg:flex items-center space-x-0">
              {/* HOT TUBS */}
              <div className="relative group">
                <Link href="/hot-tubs" className="px-4 py-4 text-white hover:bg-orange-600 transition-colors font-medium flex items-center border-r border-orange-300">
                  HOT TUBS
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              </div>

              {/* SAUNAS */}
              <div className="relative group">
                <Link href="/saunas" className="px-4 py-4 text-white hover:bg-orange-600 transition-colors font-medium flex items-center border-r border-orange-300">
                  SAUNAS
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              </div>

              {/* POOL */}
              <div className="relative group">
                <Link href="/pools" className="px-4 py-4 text-white hover:bg-orange-600 transition-colors font-medium flex items-center border-r border-orange-300">
                  POOL
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              </div>

              {/* SWIM SPAS */}
              <div className="relative group">
                <Link href="/swim-spas" className="px-4 py-4 text-white hover:bg-orange-600 transition-colors font-medium flex items-center border-r border-orange-300">
                  SWIM SPAS
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              </div>

              {/* GAME ROOM ESSENTIALS */}
              <div className="relative group">
                <Link href="/pool-tables" className="px-4 py-4 text-white hover:bg-orange-600 transition-colors font-medium flex items-center border-r border-orange-300">
                  GAME ROOM ESSENTIALS
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              </div>

              {/* GRILLS */}
              <div className="relative group">
                <Link href="/outdoor-furniture" className="px-4 py-4 text-white hover:bg-orange-600 transition-colors font-medium flex items-center">
                  GRILLS
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-orange-200 p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div 
              className="lg:hidden border-t"
              style={{ 
                backgroundColor: headerConfig?.mainNavBackgroundColor || '#f97316',
                borderColor: 'rgba(255,255,255,0.2)'
              }}
            >
              <div className="px-4 py-4 space-y-2">
                <Link href="/hot-tubs" className="block py-3 text-white hover:text-orange-200 font-medium border-b border-orange-300" onClick={() => setIsMenuOpen(false)}>
                  HOT TUBS
                </Link>
                <Link href="/saunas" className="block py-3 text-white hover:text-orange-200 font-medium border-b border-orange-300" onClick={() => setIsMenuOpen(false)}>
                  SAUNAS
                </Link>
                <Link href="/pools" className="block py-3 text-white hover:text-orange-200 font-medium border-b border-orange-300" onClick={() => setIsMenuOpen(false)}>
                  POOL
                </Link>
                <Link href="/swim-spas" className="block py-3 text-white hover:text-orange-200 font-medium border-b border-orange-300" onClick={() => setIsMenuOpen(false)}>
                  SWIM SPAS
                </Link>
                <Link href="/pool-tables" className="block py-3 text-white hover:text-orange-200 font-medium border-b border-orange-300" onClick={() => setIsMenuOpen(false)}>
                  GAME ROOM ESSENTIALS
                </Link>
                <Link href="/outdoor-furniture" className="block py-3 text-white hover:text-orange-200 font-medium" onClick={() => setIsMenuOpen(false)}>
                  GRILLS
                </Link>
                <div className="pt-4 mt-4 border-t border-orange-300">
                  <Link href="/admin-edit" onClick={() => setIsMenuOpen(false)}>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full border-white text-white hover:bg-white hover:text-orange-500"
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
      </div>
    </header>
  );
}
