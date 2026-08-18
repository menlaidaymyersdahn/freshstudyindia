import React from 'react';
import { 
  Building2, 
  FileCheck, 
  Compass, 
  PlaneTakeoff 
} from 'lucide-react';

export const TrustBar: React.FC = () => {
  const trustItems = [
    {
      title: 'University Guidance',
      subtitle: 'Course & campus alignment',
      icon: Building2
    },
    {
      title: 'Application Support',
      subtitle: 'Admissions & documents',
      icon: FileCheck
    },
    {
      title: 'Student Guidance',
      subtitle: 'Visa & step-by-step readiness',
      icon: Compass
    },
    {
      title: 'Arrival Assistance',
      subtitle: 'Hostel, airport & onboarding',
      icon: PlaneTakeoff
    }
  ];

  return (
    <section className="border-y border-slate-200/80 bg-white py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.title} 
                className="flex items-center gap-3.5 group"
              >
                <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/60 text-slate-700 flex items-center justify-center shrink-0 group-hover:bg-[#0B192C] group-hover:text-white group-hover:border-[#0B192C] transition-colors duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0B192C] tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
