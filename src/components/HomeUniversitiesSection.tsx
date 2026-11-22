import React from 'react';
import {
  MapPin,
  ArrowRight,
  Cpu,
  Cog,
  Briefcase,
  Stethoscope,
  Scale,
  BookOpen
} from 'lucide-react';
import hyderabadCampusImg from '../assets/images/campus_hyderabad_hub_1795312364463.jpg';
import bengaluruCampusImg from '../assets/images/campus_bengaluru_hub_1795312361853.jpg';
import delhiCampusImg from '../assets/images/campus_delhi_ncr_hub_1795312366899.jpg';
import puneCampusImg from '../assets/images/campus_pune_hub_1795312362753.jpg';

interface HomeUniversitiesSectionProps {
  onExploreUniversities: () => void;
  onApplyWithPreset: (preset: { course?: string; studyLevel?: string; field?: string }) => void;
}

interface DestinationItem {
  id: string;
  tag: string;
  name: string;
  location: string;
  programs: string;
  description: string;
  image: string;
  imageAlt: string;
  objectPosition?: string;
  ctaLabel: string;
  featured?: boolean;
}

const FEATURED_DESTINATIONS: DestinationItem[] = [
  {
    id: 'srsu-raipur',
    tag: 'Featured University Destination',
    name: 'Shri Rawatpura Sarkar University',
    location: 'Raipur, Chhattisgarh, India',
    programs: 'Computer Science · Engineering · Management · Pharmacy · Law · Sciences',
    description:
      'A multidisciplinary university in Central India hosting international undergraduate and postgraduate students across English-medium degree faculties—and the alma mater of Myers Global Pathways founder Menlaiday Myers Dahn (B.Sc. Computer Science, Class of 2026).',
    image: '/assets/aistudio/DSC_9367_web.jpg',
    imageAlt: 'International graduates in academic regalia at Shri Rawatpura Sarkar University in Raipur, India',
    objectPosition: 'object-[50%_28%]',
    ctaLabel: 'Explore University',
    featured: true
  },
  {
    id: 'hyderabad-hub',
    tag: 'Indian Study Hub',
    name: 'Hyderabad Academic Hub',
    location: 'Telangana, South India',
    programs: 'Computer Science · Pharmacy · Data Science · MBA',
    description:
      'A major technology and pharmaceutical corridor offering English-taught engineering, IT, and life science degrees with accessible student housing.',
    image: hyderabadCampusImg,
    imageAlt: 'Modern university academic building and green courtyard in Hyderabad, India',
    ctaLabel: 'Explore Study Hub'
  },
  {
    id: 'bengaluru-hub',
    tag: 'Indian Study Hub',
    name: 'Bengaluru Tech & Research Hub',
    location: 'Karnataka, South India',
    programs: 'Software Engineering · AI · Business · Allied Health',
    description:
      'India’s leading technology center known for international student communities, contemporary science libraries, and career-oriented computing curricula.',
    image: bengaluruCampusImg,
    imageAlt: 'Contemporary glass and brick university campus library in Bengaluru, India',
    ctaLabel: 'Explore Study Hub'
  },
  {
    id: 'delhi-ncr-hub',
    tag: 'Indian Study Hub',
    name: 'Delhi NCR University Hub',
    location: 'New Delhi & National Capital Region',
    programs: 'Engineering · Law · Business Administration · Health Sciences',
    description:
      'Home to established public and private universities offering broad undergraduate, postgraduate, and doctoral tracks with international campus hostels.',
    image: delhiCampusImg,
    imageAlt: 'Sandstone and red-brick academic hall on a university campus in Delhi NCR, India',
    ctaLabel: 'Explore Study Hub'
  },
  {
    id: 'pune-hub',
    tag: 'Indian Study Hub',
    name: 'Pune Higher Education Hub',
    location: 'Maharashtra, Western India',
    programs: 'IT · Mechanical & Civil Engineering · Management · Humanities',
    description:
      'Widely recognized across Asia and Africa as a student-centered city featuring multidisciplinary colleges, pleasant climate, and welcoming campus life.',
    image: puneCampusImg,
    imageAlt: 'Stone academic pavilion and landscaped student amphitheater in Pune, India',
    ctaLabel: 'Explore Study Hub'
  }
];

const ACADEMIC_FIELDS = [
  {
    title: 'Computer Science and Information Technology',
    degrees: 'B.Sc. CS · BCA · B.Tech CSE · MCA · AI & Cyber Security',
    summary: 'Software engineering, data analytics, cybersecurity, and modern computing labs taught in English.',
    icon: Cpu,
    presetCourse: 'Computer Science & Information Technology'
  },
  {
    title: 'Engineering',
    degrees: 'B.Tech & M.Tech · Civil · Mechanical · Electrical · Robotics',
    summary: 'Structured four-year undergraduate and two-year postgraduate engineering tracks with laboratory training.',
    icon: Cog,
    presetCourse: 'Engineering (B.Tech / M.Tech)'
  },
  {
    title: 'Business Administration',
    degrees: 'BBA · MBA · Accounting · International Finance · Supply Chain',
    summary: 'Management, entrepreneurship, and corporate finance programs built for emerging global markets.',
    icon: Briefcase,
    presetCourse: 'Business Administration (BBA / MBA)'
  },
  {
    title: 'Health Sciences',
    degrees: 'B.Sc. Nursing · B.Pharmacy · Medical Lab Technology · Public Health',
    summary: 'Clinical and laboratory health degrees preparing graduates for hospital, pharmaceutical, and public health roles.',
    icon: Stethoscope,
    presetCourse: 'Health Sciences & Pharmacy'
  },
  {
    title: 'Law',
    degrees: 'LL.B. · B.A. LL.B. · Corporate & International Law · LL.M.',
    summary: 'Comprehensive common-law legal foundations, moot court training, and international commercial law pathways.',
    icon: Scale,
    presetCourse: 'Law (LL.B. / LL.M.)'
  },
  {
    title: 'Other Available Academic Programs',
    degrees: 'Biotechnology · Agriculture · Mass Communication · Humanities · Diplomas',
    summary: 'Specialized undergraduate, postgraduate, and diploma programs matched to your specific career pathway.',
    icon: BookOpen,
    presetCourse: 'General Degree Consultation'
  }
];

export const HomeUniversitiesSection: React.FC<HomeUniversitiesSectionProps> = ({
  onExploreUniversities,
  onApplyWithPreset
}) => {
  const leadDestination = FEATURED_DESTINATIONS[0];
  const regionalHubs = FEATURED_DESTINATIONS.slice(1);

  return (
    <section
      id="universities-showcase"
      className="py-16 lg:py-24 bg-[#F4F6F9] text-[#0F172A] border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-left">
        {/* Part A: Featured Institution & Indian Study Hubs */}
        <div className="space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs sm:text-sm font-semibold text-[#9A6D17]">
                Universities &amp; Study Destinations in India
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#0B1F3A] leading-[1.15] text-balance">
                Explore Academic Destinations Across India
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                We help students evaluate recognized Indian universities and major higher education hubs based on course quality, entry requirements, tuition budget, and on-campus hostel availability.
              </p>
            </div>

            <button
              type="button"
              onClick={onExploreUniversities}
              className="self-start lg:self-end px-5 py-3 rounded-lg bg-white hover:bg-[#0B1F3A] text-[#0B1F3A] hover:text-white border border-slate-300 hover:border-[#0B1F3A] text-sm font-semibold transition-ui inline-flex items-center gap-2 cursor-pointer whitespace-nowrap min-h-[44px]"
            >
              <span>Browse Full Program Finder</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Lead Featured University Card (Full-Width Horizontal Editorial Feature) */}
          <article className="rounded-xl bg-white border border-slate-200/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-[0_2px_12px_rgba(11,31,58,0.04)]">
            <div className="lg:col-span-5 aspect-[4/3] lg:aspect-auto lg:h-full bg-[#0B1F3A] overflow-hidden">
              <img
                src={leadDestination.image}
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (!target.dataset.fallbackUsed) {
                    target.dataset.fallbackUsed = 'true';
                    target.src = '/DSC_9367.jpeg';
                  }
                }}
                alt={leadDestination.imageAlt}
                className={`w-full h-full object-cover ${leadDestination.objectPosition || 'object-center'}`}
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-slate-500">
                  <span className="text-[#9A6D17] font-semibold">{leadDestination.tag}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1.5 text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-[#0B1F3A]" aria-hidden="true" />
                    <span>{leadDestination.location}</span>
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-[26px] font-bold tracking-[-0.02em] text-[#0B1F3A]">
                  {leadDestination.name}
                </h3>

                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                  {leadDestination.description}
                </p>

                <div className="pt-3 border-t border-slate-200/80">
                  <p className="text-xs font-semibold text-[#0B1F3A]">Available Academic Programs</p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {leadDestination.programs}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onExploreUniversities}
                  className="px-5 py-2.5 rounded-lg bg-[#0B1F3A] hover:bg-[#132E54] text-white text-sm font-semibold transition-ui inline-flex items-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <span>{leadDestination.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4 text-[#E5B95C]" />
                </button>
                <button
                  type="button"
                  onClick={() => onApplyWithPreset({ course: 'Computer Science & Engineering (SRSU)' })}
                  className="px-5 py-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-[#0B1F3A] border border-slate-200 text-sm font-semibold transition-ui cursor-pointer min-h-[44px]"
                >
                  Request Fee &amp; Admission Guide
                </button>
              </div>
            </div>
          </article>

          {/* 4 Regional Indian Study Hub Cards — Consistent 4:3 Image Proportions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {regionalHubs.map((hub) => (
              <article
                key={hub.id}
                className="group rounded-xl bg-white border border-slate-200/90 hover:border-[#0B1F3A]/30 overflow-hidden flex flex-col justify-between transition-ui shadow-[0_1px_6px_rgba(11,31,58,0.03)]"
              >
                <div>
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-200 border-b border-slate-200/70">
                    <img
                      src={hub.image}
                      alt={hub.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-[#9A6D17] shrink-0" aria-hidden="true" />
                      <span className="truncate">{hub.location}</span>
                    </div>

                    <h3 className="font-display text-lg font-bold tracking-[-0.015em] text-[#0B1F3A] leading-snug">
                      {hub.name}
                    </h3>

                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                      {hub.description}
                    </p>

                    <div className="pt-2 border-t border-slate-100">
                      <p className="text-[11px] font-semibold text-[#0B1F3A]">Key Programs</p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        {hub.programs}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-1">
                  <button
                    type="button"
                    onClick={onExploreUniversities}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#F4F6F9] hover:bg-[#0B1F3A] text-[#0B1F3A] hover:text-white border border-slate-200 hover:border-[#0B1F3A] text-xs font-semibold transition-ui inline-flex items-center justify-center gap-1.5 cursor-pointer min-h-[42px]"
                  >
                    <span>{hub.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Part B: Popular Academic Fields */}
        <div className="pt-12 border-t border-slate-200 space-y-8">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs sm:text-sm font-semibold text-[#9A6D17]">
              Undergraduate, Postgraduate &amp; Diploma Tracks
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-[#0B1F3A]">
              Popular Academic Fields in India
            </h3>
            <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              Select a discipline to start an eligibility review or explore matching university programs with our admissions advisors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ACADEMIC_FIELDS.map((field) => {
              const Icon = field.icon;
              return (
                <button
                  key={field.title}
                  type="button"
                  onClick={() => onApplyWithPreset({ course: field.presetCourse })}
                  className="group p-6 rounded-xl bg-white border border-slate-200/90 hover:border-[#0B1F3A]/35 text-left flex flex-col justify-between gap-4 transition-ui cursor-pointer shadow-[0_1px_4px_rgba(11,31,58,0.03)]"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-[#F4F6F9] group-hover:bg-[#0B1F3A] text-[#0B1F3A] group-hover:text-[#E5B95C] border border-slate-200 group-hover:border-[#0B1F3A] flex items-center justify-center transition-ui">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="font-display text-base font-bold text-[#0B1F3A] group-hover:text-[#132E54] leading-snug">
                        {field.title}
                      </h4>
                      <p className="text-xs font-medium text-[#9A6D17]">
                        {field.degrees}
                      </p>
                    </div>

                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                      {field.summary}
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-[#0B1F3A] group-hover:text-[#9A6D17] inline-flex items-center gap-1.5 transition-ui">
                    <span>Inquire for this field</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeUniversitiesSection;
