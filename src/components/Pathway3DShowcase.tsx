import React, { useState } from 'react';
import { ThreePathwayGlobe } from './ThreePathwayGlobe';
import { TiltCard3D } from './TiltCard3D';
import { 
  Building2, 
  GraduationCap, 
  ShieldCheck, 
  Plane, 
  Award, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  FileCheck2, 
  Layers, 
  MapPin, 
  Compass, 
  ChevronRight,
  DollarSign
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface HubInfo {
  id: string;
  name: string;
  state: string;
  tagline: string;
  accreditation: string;
  popularFields: string[];
  avgTuitionAnnual: string;
  hostelCost: string;
  internationalStudents: string;
  topFeatures: string[];
  image: string;
}

const UNIVERSITY_HUBS: HubInfo[] = [
  {
    id: 'delhi-ncr',
    name: 'Delhi NCR University Hub',
    state: 'New Delhi / Greater Noida',
    tagline: 'Capital Zone for AI, Computer Engineering, Law & Biotech',
    accreditation: 'UGC Recognized, NAAC A++ / A+',
    popularFields: ['B.Tech Computer Science & AI', 'MBA International Business', 'BBA & Fintech', 'Biotechnology'],
    avgTuitionAnnual: '$2,200 – $3,400 / year',
    hostelCost: '$800 – $1,200 / year (Food + AC)',
    internationalStudents: '4,500+ from 40+ countries',
    topFeatures: ['Direct proximity to African Embassies & Foreigners Regional Registration Office (FRRO)', 'Metro connectivity and modern multi-acre tech campuses', 'Multinational tech firm internship placements'],
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru / Karnataka Hub',
    state: 'Bengaluru & Mysuru',
    tagline: 'Silicon Valley of Asia — Top Computing, Cyber Security & Pharmacy',
    accreditation: 'AICTE & PCI Approved, NAAC A++',
    popularFields: ['B.Tech Cyber Security & Cloud', 'Bachelor of Pharmacy (B.Pharm)', 'B.Sc Nursing', 'Data Science'],
    avgTuitionAnnual: '$2,000 – $3,200 / year',
    hostelCost: '$750 – $1,100 / year (All-inclusive)',
    internationalStudents: '6,000+ African & Global Scholars',
    topFeatures: ['Global tech hub with Infosys, Wipro, Google, and Microsoft R&D centers', 'English-speaking cosmopolitan academic environment', 'World-class hospital affiliations for clinical training'],
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'punjab',
    name: 'Punjab / Chandigarh Mega Campuses',
    state: 'Mohali & Jalandhar',
    tagline: 'Largest International Student Communities & Research Parks',
    accreditation: 'NIRF Top 50, NAAC A+ Grade',
    popularFields: ['B.Sc Agriculture (Hons)', 'B.Tech Mechanical & Robotics', 'B.Sc Medical Lab Tech', 'Hotel Management'],
    avgTuitionAnnual: '$1,800 – $2,800 / year',
    hostelCost: '$700 – $950 / year (Standard & Deluxe)',
    internationalStudents: '7,500+ International Community',
    topFeatures: ['Dedicated international student welfare cells and African student unions', 'Sprawling 100+ acre self-contained smart campuses with sports complexes', 'Special merit scholarships for WASSCE high-achievers'],
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'chennai',
    name: 'Chennai / Tamil Nadu Hub',
    state: 'Chennai & Coimbatore',
    tagline: 'Healthcare, Biomedical Engineering & Automobile Super-Campuses',
    accreditation: 'UGC & MCI / NMC Affiliated',
    popularFields: ['Biomedical Engineering', 'B.Sc Cardiovascular Tech', 'B.Tech Aerospace', 'MBA Healthcare'],
    avgTuitionAnnual: '$2,100 – $3,500 / year',
    hostelCost: '$800 – $1,150 / year',
    internationalStudents: '3,800+ Global Students',
    topFeatures: ['Asia’s medical capital with premier teaching super-specialty hospitals', 'Advanced industrial robotics labs and automobile testing bays', 'High safety index and student-friendly coastal environment'],
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80'
  }
];

interface Pathway3DShowcaseProps {
  onOpenApply: (programTitle?: string) => void;
}

export const Pathway3DShowcase: React.FC<Pathway3DShowcaseProps> = ({ onOpenApply }) => {
  const [selectedHub, setSelectedHub] = useState<HubInfo>(UNIVERSITY_HUBS[0]);

  return (
    <section id="interactive-3d-pathway" className="relative py-24 bg-[#030914] text-white overflow-hidden">
      {/* Background 3D Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-blue-600/15 via-rose-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/40 text-xs font-bold text-sky-400 mb-4 shadow-lg shadow-blue-950/50">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span className="uppercase tracking-widest text-[11px]">3D Interactive Experience</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Explore Your Journey to <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-blue-400">
              India's Premier Campuses
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
            Interact with the 3D globe to trace direct flight corridors from Monrovia, Accra, and Lagos into India's top accredited university hubs.
          </p>
        </div>

        {/* 1. Interactive 3D Globe Component */}
        <div className="mb-16">
          <ThreePathwayGlobe />
        </div>

        {/* 2. Interactive 3D University Hubs Explorer */}
        <div className="mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-400 mb-1">
                <Building2 className="w-4 h-4" />
                <span>Accredited Hub Spotlight</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Select an Indian University Region
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md">
              All partner institutions hold top-tier Indian Government UGC approval, NAAC 'A+' / 'A++' accreditation, and direct degree equivalency worldwide.
            </p>
          </div>

          {/* Hub Navigation Tabs with 3D Depth */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {UNIVERSITY_HUBS.map((hub) => {
              const isSelected = selectedHub.id === hub.id;
              return (
                <button
                  key={hub.id}
                  onClick={() => setSelectedHub(hub)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-b from-blue-900/80 to-slate-900 border-blue-400 shadow-xl shadow-blue-500/20 -translate-y-1'
                      : 'bg-slate-900/60 border-slate-800/90 text-slate-400 hover:border-slate-700 hover:bg-slate-800/40 hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wider">
                      {hub.state}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-emerald-400 shadow-sm shadow-emerald-400' : 'bg-slate-700'}`} />
                  </div>
                  <h4 className="text-sm sm:text-base font-extrabold text-white group-hover:text-sky-300 transition">
                    {hub.name}
                  </h4>
                </button>
              );
            })}
          </div>

          {/* Active Hub 3D Showcase Card */}
          <TiltCard3D maxTilt={5} className="w-full">
            <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900/95 via-[#08152e] to-slate-950 border border-slate-700/80 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Hub Information & Key Stats */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold font-mono">
                      {selectedHub.accreditation}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-bold">
                      {selectedHub.internationalStudents}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                      {selectedHub.name}
                    </h3>
                    <p className="text-sm sm:text-base text-sky-300 font-medium mt-1">
                      {selectedHub.tagline}
                    </p>
                  </div>

                  {/* Financial Overview Cubes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/10 shadow-inner">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                        Average Tuition Fees
                      </span>
                      <span className="text-lg font-black text-emerald-400">
                        {selectedHub.avgTuitionAnnual}
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        Direct official university invoice
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/10 shadow-inner">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                        Hostel & Food Package
                      </span>
                      <span className="text-lg font-black text-white">
                        {selectedHub.hostelCost}
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        Wi-Fi, 3 Meals & Security
                      </span>
                    </div>
                  </div>

                  {/* Popular Degree Tracks */}
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Top Enrolled Degree Programs:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedHub.popularFields.map((field, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-200"
                        >
                          {field}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Campus Advantages */}
                  <div className="space-y-2 pt-2">
                    {selectedHub.topFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => onOpenApply(selectedHub.name)}
                      className="px-8 py-4 rounded-2xl text-xs sm:text-sm font-extrabold uppercase tracking-wide text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-xl shadow-red-600/30 transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
                    >
                      <span>Apply for {selectedHub.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      href={getWhatsAppLink('india', `Hello Myers Global Pathway, I want to inquire about admissions and tuition costs for the ${selectedHub.name}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-4 rounded-2xl text-xs sm:text-sm font-bold text-slate-200 bg-slate-800/80 hover:bg-slate-700 border border-slate-600/80 transition flex items-center gap-2"
                    >
                      <span>Chat with Advisor</span>
                    </a>
                  </div>
                </div>

                {/* Right: Hub Visual & 3D Layered Card */}
                <div className="lg:col-span-5 relative">
                  <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl aspect-[4/3] sm:aspect-[16/11]">
                    <img
                      src={selectedHub.image}
                      alt={selectedHub.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                    {/* Floating 3D Badge */}
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/20 shadow-xl">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 font-bold text-white">
                          <GraduationCap className="w-4 h-4 text-rose-400" />
                          <span>Myers Global Verified University</span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">
                          2026 Direct Admissions
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard3D>
        </div>
      </div>
    </section>
  );
};
