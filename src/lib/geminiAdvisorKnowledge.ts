/**
 * Fresh Study India - Agency AI Admissions & Counseling Knowledge Engine
 * Exclusively focused on Fresh Study India's agency services, admission process,
 * scholarship processing, visa assistance, and student support.
 */

export interface AdvisorContext {
  name?: string;
  email?: string;
  role?: string;
  country?: string;
  desiredMajor?: string;
}

export function generateAdvisorResponse(
  query: string,
  role: 'general_advisor' | 'visa_specialist' | 'scholarship_navigator' | 'campus_life_guide' | 'fast_faq' = 'general_advisor',
  context?: AdvisorContext
): { reply: string; modelUsed: string } {
  const q = query.toLowerCase();
  const studentName = context?.name || 'Future Scholar';

  // 1. Scholarship & Fee Assistance
  if (
    q.includes('scholarship') || 
    q.includes('discount') || 
    q.includes('grant') || 
    q.includes('waiver') || 
    q.includes('financial aid') ||
    role === 'scholarship_navigator'
  ) {
    return {
      modelUsed: 'Fresh Study India Scholarship Desk',
      reply: `### 🎓 Fresh Study India Merit Scholarship Guidance

Hello **${studentName}**! At **Fresh Study India**, our primary mission is to secure maximum tuition scholarships for international students through our direct institutional partnerships.

---

#### 🏆 How Our Agency Processes Your Scholarship:
1. **Academic Transcript Evaluation**:
   - We evaluate your high school qualifications (WASSCE, WAEC, NECO, KCSE, or equivalent diploma) or bachelor's transcript against our partner scholarship brackets.
2. **Merit Scholarship Brackets**:
   - **Excellent Results (Grade A/B or 75%+ average)**: Eligible for **50% to 100% Tuition Fee Scholarships**.
   - **Credit/Pass Results (Grade C or 50%–74%)**: Eligible for **30% to 40% Regional Diversity Grants**.
3. **Zero Processing Fees for Evaluation**:
   - Fresh Study India assesses your scholarship eligibility completely free of charge within **24 to 48 hours**.

---

#### 📋 Documents Required for Agency Assessment:
* High school result certificate or university transcript
* International passport bio-data page
* Passport-sized photograph

💡 **Next Step**: Click **Apply Now** in the menu or message our agency counselors directly on WhatsApp at **+231 889425645** for a free scholarship calculation!`
    };
  }

  // 2. Visa, Embassy & FRRO Support
  if (
    q.includes('visa') || 
    q.includes('embassy') || 
    q.includes('frro') || 
    q.includes('interview') || 
    q.includes('police clearance') || 
    q.includes('yellow fever') ||
    role === 'visa_specialist'
  ) {
    return {
      modelUsed: 'Fresh Study India Visa & Compliance Desk',
      reply: `### 🛂 Fresh Study India Visa & Immigration Support

Hello **${studentName}**! Our agency maintains a **99.4% visa approval record** for international students through structured document verification and mock interview coaching.

---

#### 📑 How Fresh Study India Assists Your Visa Process:
1. **Official Bonafide & Provisional Admission Letters**:
   - We issue certified institutional admission documents required by the Indian Embassy.
2. **AIU Equivalence Certification**:
   - Our legal desk coordinates with the Association of Indian Universities (AIU) to certify your academic equivalence.
3. **Embassy Interview Coaching**:
   - We prepare you with sample questions, financial documentation review, and statement of purpose refinement.
4. **On-Ground FRRO Registration**:
   - Upon arriving in India, our local agency coordinators physically guide you through the Foreigners Regional Registration Office (FRRO) registration and resident permit procedures within your first 14 days.

📞 **Contact Our Visa Desk**: Chat directly with our visa officers on WhatsApp at **+231 889425645**.`
    };
  }

  // 3. Agency Services & How We Work
  if (
    q.includes('agency') || 
    q.includes('service') || 
    q.includes('about') || 
    q.includes('fresh study') || 
    q.includes('who are you') || 
    q.includes('why fresh study') ||
    q.includes('what do you do') ||
    q.includes('support')
  ) {
    return {
      modelUsed: 'Fresh Study India Advisory Desk',
      reply: `### 🏢 About Fresh Study India

**Fresh Study India** is a premier international educational consultancy and student facilitation agency dedicated to connecting students from across the globe to accredited, top-tier higher education institutions in India.

---

#### 🌟 Our End-to-End Agency Services:
1. **Academic Profiling & Course Selection**: Guidance across Engineering, Computer Science & AI, Medicine & Health Sciences, Business Administration, Pharmacy, and Law.
2. **Direct Partner Admissions**: Guaranteed fast-track application processing without third-party middleman delays.
3. **Scholarship Facilitation**: Securing 30%–100% tuition scholarships based on academic merit.
4. **Visa Filing & Embassy Support**: Complete documentation checks, visa letters, and interview prep.
5. **On-Ground Indian Student Desk**:
   - 🛬 Airport reception and private transfer to campus
   - 📱 Local SIM card and connectivity setup
   - 🏢 Campus hostel room allocation and mess enrollment
   - 🛡️ FRRO registration and residence permit clearance
   - 🤝 Continuous academic and pastoral mentorship throughout your studies

📲 **Speak with an Agency Counselor**: WhatsApp **+231 889425645** | Email: **freshstudyindia@gmail.com**`
    };
  }

  // 4. Cost Breakdown & Agency Transparency
  if (
    q.includes('cost') || 
    q.includes('fee') || 
    q.includes('price') || 
    q.includes('usd') || 
    q.includes('budget') || 
    q.includes('how much') ||
    q.includes('charge')
  ) {
    return {
      modelUsed: 'Fresh Study India Finance Desk',
      reply: `### 💰 Estimated Study Costs & Agency Fee Policy

At **Fresh Study India**, we practice 100% transparency with zero hidden charges.

---

#### 📌 Fresh Study India Fee Policy:
* **Initial Profile Assessment & Counseling**: **100% FREE**
* **Scholarship Evaluation**: **100% FREE**
* **Admission Letter Processing**: **FREE via our authorized partner network**

---

#### 💵 Average Yearly Study & Living Budget in India (in USD):
* **Tuition Fees (After Fresh Study India Scholarship)**: ~$1,500 – $3,200 USD / year (depending on degree)
* **Hostel Accommodation & 3 Meals/Day**: ~$900 – $1,800 USD / year
* **Personal Living & Books**: ~$50 – $100 USD / month

💡 **Total Estimated Annual Budget**: **$2,500 to $4,500 USD total per year** covering both tuition and living.

Contact our financial counselor on WhatsApp at **+231 889425645** for a personalized estimate.`
    };
  }

  // 5. Academic Programs & Courses
  if (
    q.includes('course') || 
    q.includes('program') || 
    q.includes('major') || 
    q.includes('degree') || 
    q.includes('btech') || 
    q.includes('cs') || 
    q.includes('mbbs') || 
    q.includes('mba') || 
    q.includes('nursing') || 
    q.includes('pharmacy')
  ) {
    return {
      modelUsed: 'Fresh Study India Academic Desk',
      reply: `### 📚 Academic Programs Facilitated by Fresh Study India

Our agency facilitates admissions across a comprehensive portfolio of accredited undergraduate, postgraduate, and doctoral degree programs:

---

#### 🎓 Major Degree Fields:
* **Engineering & Technology**: B.Tech / M.Tech in Computer Science, Artificial Intelligence & Machine Learning, Cyber Security, Data Science, Mechanical, and Civil Engineering.
* **Healthcare & Medical Sciences**: MBBS, BDS (Dental), B.Pharmacy, Pharm.D, B.Sc Nursing, and Physiotherapy.
* **Business & Management**: BBA, MBA (International Business, Finance, Marketing, Supply Chain), and B.Com.
* **Computer Applications & IT**: BCA, MCA, and Cloud Computing certifications.
* **Applied Sciences & Humanities**: Biotechnology, Microbiology, Agriculture, and International Relations.

---

#### 🚀 How to Apply Through Our Agency:
1. Submit your high school credentials or bachelor's transcript.
2. Receive your personalized eligibility and scholarship offer within **48 hours**.
3. Fresh Study India secures your provisional admission letter.

Click **Apply Now** or chat with our desk on WhatsApp: **+231 889425645**.`
    };
  }

  // 6. On-Ground Support, Hostels & Student Welfare
  if (
    q.includes('hostel') || 
    q.includes('accommodation') || 
    q.includes('food') || 
    q.includes('safety') || 
    q.includes('airport') || 
    q.includes('pickup') || 
    role === 'campus_life_guide'
  ) {
    return {
      modelUsed: 'Fresh Study India Student Welfare Desk',
      reply: `### 🌍 Fresh Study India On-Ground Student Support

Hello **${studentName}**! Unlike traditional agencies that stop at visa issuance, **Fresh Study India provides dedicated on-ground guardians** in India.

---

#### 🛡️ Our On-Arrival Assistance:
1. **Airport Reception**: Our local team greets you at the airport (Delhi, Mumbai, Bengaluru, etc.) and provides safe transportation to campus.
2. **Hostel Placement**: We arrange comfortable on-campus accommodation (AC / Non-AC with Wi-Fi, laundry, and 24/7 security).
3. **Dining & Nutrition**: International student messes offering international, African, continental, and vegetarian/non-vegetarian cuisine options.
4. **Local Orientation**: SIM card setup, local bank account assistance, and city orientation.
5. **24/7 Emergency Helpline**: Dedicated agency student welfare officers on standby throughout your academic journey.

💬 Questions about settling in? Message our student support desk on WhatsApp: **+231 889425645**.`
    };
  }

  // Default General Advice
  return {
    modelUsed: 'Fresh Study India Advisory Desk',
    reply: `### 🎓 Fresh Study India AI Admissions Advisor

Hello **${studentName}**! Welcome to **Fresh Study India** — your official educational consultancy and admissions facilitator.

---

#### 🌟 How Our Agency Helps You:
* **Direct Partner Admissions**: Fast-track admission letters from top accredited partner universities in India.
* **Up to 100% Scholarships**: Comprehensive merit evaluation for high-achieving international applicants.
* **Complete Visa Assistance**: Embassy interview coaching, documentation, and bonafide certification.
* **On-Ground Indian Desk**: Airport pickup, hostel check-in, SIM card setup, and FRRO registration.

---

#### 💬 How can I assist you today?
* Inquire about **merit scholarship eligibility**
* Ask about **available degree programs (B.Tech, MBBS, BBA, Nursing, MBA)**
* Learn about **visa & embassy interview preparation**
* Ask about **our airport reception and on-ground student support**

📞 **Official Agency Helpline**: WhatsApp: **+231 889425645** | Email: **freshstudyindia@gmail.com**`
  };
}
