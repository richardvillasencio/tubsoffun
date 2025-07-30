import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  date: string;
  rating: number;
  text: string;
}

interface TestimonialsSectionProps {
  content?: {
    title?: string;
    overallRating?: number;
    reviewCount?: number;
    testimonials?: Testimonial[];
  };
}

export function TestimonialsSection({ content }: TestimonialsSectionProps) {
  const defaultTestimonials: Testimonial[] = [
    {
      name: "Mort Sarabakhsh",
      date: "Jun 20, 2025",
      rating: 5,
      text: "I would like to recognize Tubs of Fun for great service and pool installation. They have great staff for help and support with cleaning products and pool equipment repair."
    },
    {
      name: "Darci Phillips",
      date: "Jun 11, 2025",
      rating: 5,
      text: "I had an issue with my new heater I ordered from an online store. The online store wouldn't help me and the manufacturer wouldn't help me. Troy immediately said he would help us troubleshoot. Don't buy your pool heaters online! Pay a little more and get the service to back it up in town."
    },
    {
      name: "Randy Mittleider",
      date: "Apr 11, 2025",
      rating: 5,
      text: "Karen and her team are top notch. We were treated with respect and no pressure sales the moment we walked in the door. I am confident that we received the best price and a quality product from Tubs of Fun."
    },
    {
      name: "Keri VanEnk",
      date: "Feb 14, 2025",
      rating: 5,
      text: "Fantastic! My hot tub water was a mess and Karen helped me get it balanced. She's knowledgeable, friendly, and great to work with."
    }
  ];

  const data = {
    title: 'What they say about us...',
    overallRating: 4.2,
    reviewCount: 96,
    testimonials: defaultTestimonials,
    ...content
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {data.title}
          </h2>
          <div className="flex items-center justify-center space-x-2">
            <div className="flex space-x-1">
              {renderStars(Math.floor(data.overallRating))}
            </div>
            <span className="text-lg font-semibold text-gray-700">{data.overallRating}</span>
            <span className="text-gray-500">based on {data.reviewCount} reviews</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.date}</p>
                </div>
                <div className="flex space-x-1">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
