import { MapPin, Phone, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <img 
              src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/Q8i1yKqsccON1uqGARTN/media/67f6c7da0a62175425d4b48c.png" 
              alt="Tubs of Fun Footer Logo" 
              className="h-16 w-auto mb-4" 
            />
            <p className="text-gray-300 leading-relaxed">
              Tubs of Fun! is a home and backyard leisure dealership committed to serving the residents of FARGO and SURROUNDING AREAS with quality products and services.
            </p>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              SHOW ROOM HOURS
            </h3>
            <div className="space-y-2 text-gray-300">
              <p>Mon - Fri: 9:00 am - 6:00 pm</p>
              <p>Sat: 9:00 am - 2:00 pm</p>
            </div>

            <h3 className="text-lg font-semibold mb-4 mt-6">SERVICE HOURS</h3>
            <div className="space-y-2 text-gray-300">
              <p>Mon - Fri: 8:00 am - 5:00 pm</p>
              <p>Saturday and Sunday by appointment only.</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact info</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary-400" />
                <span>Main: (701) 234-0705</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-primary-400 mt-1" />
                <span>601 Main Ave W.<br />West Fargo, ND 58708</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Tubs of Fun! All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
