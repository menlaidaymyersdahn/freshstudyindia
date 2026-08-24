// Direct Vite asset imports - Vite bundles and hashes these for production builds & Vercel
import convocationJpg from '../assets/images/DSC_9367.jpg';
import convocationJpeg from '../assets/images/DSC_9367.jpeg';
import convocationWebp from '../assets/images/DSC_9367.webp';
import convocationPng from '../assets/images/DSC_9367.png';
import convocationSvg from '../assets/images/hero-bg.svg';

import graduateJpg from '../assets/images/DSC_9531.jpg';
import graduateJpeg from '../assets/images/DSC_9531.jpeg';
import graduateWebp from '../assets/images/DSC_9531.webp';
import graduatePng from '../assets/images/DSC_9531.png';
import graduateSvg from '../assets/images/graduate-myers.svg';

export const IMAGES = {
  convocation: {
    src: convocationJpg,
    jpeg: convocationJpeg,
    webp: convocationWebp,
    png: convocationPng,
    svg: convocationSvg,
    publicUrl: '/DSC_9367.jpg',
    alt: 'International Students Graduation Convocation Ceremony in India'
  },
  graduate: {
    src: graduateJpg,
    jpeg: graduateJpeg,
    webp: graduateWebp,
    png: graduatePng,
    svg: graduateSvg,
    publicUrl: '/DSC_9531.jpg',
    alt: 'Myers Dahn - Liberian Student & Microbiology Graduate in India'
  },
  students: {
    src: convocationJpg,
    jpeg: convocationJpeg,
    webp: convocationWebp,
    png: convocationPng,
    svg: convocationSvg,
    publicUrl: '/DSC_9367.jpg',
    alt: 'International students receiving admissions counseling and academic guidance'
  }
};
