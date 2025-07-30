import { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X, Phone, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Hot Tubs', href: '/hot-tubs' },
    { name: 'Saunas', href: '/saunas' },
    { name: 'Pools', href: '/pools' },
    { name: 'Swim Spas', href: '/swim-spas' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <img 
                src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/Q8i1yKqsccON1uqGARTN/media/67533211d7b7d40b30b4935c.svg" 
                alt="Tubs of Fun Logo" 
                className="h-12 w-auto" 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="text-right">
              <div className="text-sm text-gray-600">Call Us Today</div>
              <div className="font-bold text-primary-600">(701) 234-0705</div>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Schedule Visit
            </Button>
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
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-gray-700 hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2 text-primary-600 font-bold">
                  <Phone className="h-4 w-4" />
                  <span>(701) 234-0705</span>
                </div>
                <Button className="mt-2 bg-orange-500 hover:bg-orange-600 text-white w-full">
                  Schedule Visit
                </Button>
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
