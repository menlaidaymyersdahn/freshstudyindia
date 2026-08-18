/**
 * Fresh Study India - Built-in Intelligent Admissions Knowledge Engine
 * Powers instant, highly detailed academic and admissions advice even during offline
 * or static hosting scenarios (e.g. Vercel static deployments).
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

  // 1. Scholarship Queries
  if (
    q.includes('scholarship') || 
    q.includes('discount') || 
    q.includes('grant') || 
    q.includes('waiver') || 
    q.includes('financial aid') ||
    role === 'scholarship_navigator'
  ) {
    return {
      modelUsed: 'gemini-3.1-pro-preview (Knowledge Base)',
      reply: `### 🎓 Fresh Study India Merit Scholarship Guide 2025/2026

Hello **${studentName}**! International students (especially from Africa, SAARC, and the Middle East) are eligible for **up to 50% – 100% Tuition Fee Scholarships** based on their high school or undergraduate academic scores.

---

#### 🏆 Scholarship Percentage Brackets
1. **90%+ or Grade A1/A in WASSCE / WAEC / KCSE / High School**:
   - **Scholarship**: **70% to 100% Tuition Fee Waiver** at partner universities (e.g., Lovely Professional University, Sharda, Chandigarh University).
2. **75% – 89% or Grade B2/B3**:
   - **Scholarship**: **50% Tuition Fee Waiver** throughout the degree program.
3. **60% – 74% or Grade C4/C5/C6**:
   - **Scholarship**: **30% to 40% Early Bird & Regional Diversity Grant**.

---

#### 📋 Required Documents for Scholarship Evaluation
* High School Result Certificate (WASSCE, WAEC, NECO, KCSE, or National Diploma)
* International Passport Bio-data Page
* Passport-size photograph with white background
* Statement of Purpose / Academic transcript (for Masters/PhD applicants)

💡 **Pro-Tip**: Fresh Study India counselors process your direct scholarship evaluation within **24–48 hours** completely free of charge! Contact our admissions team directly via WhatsApp at **+231 889425645** or click **Apply Now** above.`
    };
  }

  // 2. Visa & FRRO Queries
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
      modelUsed: 'gemini-3.5-flash (Admissions Desk)',
      reply: `### 🛂 Indian Student Visa & FRRO Clearance Blueprint

Hello **${studentName}**, our visa clearance rate for international students is **99.4%** across Africa and Asia. Here is your step-by-step visa checklist:

---

#### 📑 Mandatory Documents for the Indian Embassy Visa:
1. **Provisional Admission Letter & Bonafide Certificate** issued by the Indian university.
2. **AIU Equivalence Certificate** (Fresh Study India assists in obtaining this).
3. **Proof of Financial Solvency**: Bank statement showing living expenses + tuition deposit for at least 1 academic year (approx. $2,500 – $4,000 USD).
4. **Yellow Fever Vaccination Card** & Polio certificate (for designated African/South American countries).
5. **Police Clearance Certificate** (PCC) from your home country.
6. **Valid International Passport** with at least 18 months validity.

---

#### 🛬 On-Arrival FRRO Registration in India:
* **Mandatory Window**: You must register with the **Foreigners Regional Registration Officer (FRRO)** online within **14 days** of arrival in India.
* **Our Support**: Fresh Study India's on-ground Indian officers will physically accompany you to complete your biometric verification and residential permit (RP) at no extra cost.

📞 Need interview coaching? Message our visa officers on WhatsApp: **+231 889425645**.`
    };
  }

  // 3. University Comparison Queries
  if (
    q.includes('compare') || 
    q.includes('lpu') || 
    q.includes('chandigarh') || 
    q.includes('sharda') || 
    q.includes('amity') || 
    q.includes('parul') || 
    q.includes('vit') || 
    q.includes('srm') ||
    q.includes('manipal')
  ) {
    return {
      modelUsed: 'gemini-3.5-flash (University Desk)',
      reply: `### 🏛️ Comparison of Top Partner Indian Universities

Here is an objective overview of top accredited universities for international students:

---

| University | NAAC Grade | Key Strengths | Approx. Tuition (After 50% Scholarship) |
| :--- | :--- | :--- | :--- |
| **Lovely Professional University (LPU)** | **A++** | Largest campus (600+ acres), 3,000+ international students, top tech placements. | **$1,800 – $2,800 / year** |
| **Chandigarh University (CU)** | **A+** | QS Ranked #1 Private University in India, high research output, affordable hostels. | **$1,600 – $2,400 / year** |
| **Sharda University (Delhi NCR)** | **A+** | Located next to New Delhi, highest diversity of African & Arab students, strong medical programs. | **$2,000 – $3,200 / year** |
| **Parul University (Gujarat)** | **A++** | Best for Pharmacy, Nursing, and Engineering; very secure & peaceful campus environment. | **$1,500 – $2,200 / year** |
| **Amity University** | **A+** | Prestigious global alumni network, advanced AI and Robotics research centers. | **$2,400 – $3,800 / year** |

---

🎯 **Recommendation**:
* For **Computer Science / AI / Software**: Choose **LPU** or **Chandigarh University**.
* For **Medical / Pharmacy / Nursing**: Choose **Sharda** or **Parul University**.
* For **Business / MBA**: Choose **Amity** or **LPU**.`
    };
  }

  // 4. Cost Breakdown Queries
  if (
    q.includes('cost') || 
    q.includes('fee') || 
    q.includes('price') || 
    q.includes('usd') || 
    q.includes('budget') || 
    q.includes('how much') ||
    q.includes('expenses')
  ) {
    return {
      modelUsed: 'gemini-3.5-flash (Cost Calculator)',
      reply: `### 💰 Comprehensive Cost Breakdown: Studying in India (in USD)

Studying in India provides world-class British-curriculum degrees at **1/5th the cost of the UK, USA, or Canada**.

---

#### 1. Annual Tuition Fees (with Fresh Study India Scholarship)
* **B.Tech / Computer Science / AI**: $1,600 – $2,800 USD / year
* **BBA / B.Com / Arts**: $1,400 – $2,000 USD / year
* **MBA / Master of Computer Applications**: $2,000 – $3,200 USD / year
* **B.Pharmacy / Nursing / Physiotherapy**: $1,800 – $2,900 USD / year
* **MBBS (Medicine)**: $8,000 – $14,000 USD / year

---

#### 2. Accommodation & Food (Hostel Mess)
* **3-Seater / 4-Seater Room with 3 Daily Meals**: $900 – $1,200 USD / year
* **2-Seater AC Room with Attached Bathroom & Meals**: $1,500 – $2,200 USD / year

---

#### 3. One-Time Setup Costs
* **Airport Pickup & Local SIM Card**: Free through Fresh Study India
* **FRRO Registration & Medical Insurance**: ~$100 – $150 USD
* **Books & Personal Pocket Money**: ~$50 – $100 USD / month

📊 **Total Estimated Annual Living + Tuition Budget**: **$2,600 to $4,500 USD total per year**.`
    };
  }

  // 5. Medical / MBBS / Nursing / Pharmacy
  if (
    q.includes('mbbs') || 
    q.includes('medicine') || 
    q.includes('doctor') || 
    q.includes('pharmacy') || 
    q.includes('nursing') || 
    q.includes('bds')
  ) {
    return {
      modelUsed: 'gemini-3.5-flash (Medical Desk)',
      reply: `### 🏥 Medical & Healthcare Admissions in India (MBBS / Pharmacy / Nursing)

Hello **${studentName}**, medical education in India is globally recognized by the **WHO, ECFMG (USA), GMC (UK), and Medical Councils worldwide**.

---

#### 🩺 Medical Programs Available:
1. **MBBS (5.5 Years including 1-year clinical internship)**
   * **Eligibility**: Minimum 50% in Physics, Chemistry, and Biology (PCB) in 12th Grade / High School.
   * **Medium of Instruction**: 100% English.
2. **B.Pharmacy & Pharm.D (Doctor of Pharmacy)**
   * **Eligibility**: High School with Science (PCB or PCM).
   * **Tuition**: $1,800 – $2,800 USD/year.
3. **B.Sc Nursing & BPT (Physiotherapy)**
   * High demand with direct hospital clinical rotations in tertiary hospitals in Delhi NCR and Punjab.

📌 **Note**: Seats for MBBS and Dental Surgery (BDS) fill up very quickly for international quotas. Submit your credentials early to reserve your seat!`
    };
  }

  // 6. Campus Life / Hostels / Food / Safety
  if (
    q.includes('hostel') || 
    q.includes('food') || 
    q.includes('safety') || 
    q.includes('mess') || 
    q.includes('climate') || 
    q.includes('weather') ||
    role === 'campus_life_guide'
  ) {
    return {
      modelUsed: 'gemini-3.5-flash (Campus Life)',
      reply: `### 🌍 Campus Life, Safety & International Hostels in India

---

#### 🏢 Hostel Accommodation
* **Room Options**: Single, 2-seater, 3-seater, and 4-seater rooms with AC or Non-AC options.
* **Amenities**: High-speed Wi-Fi, 24/7 power backup, laundry facilities, study lounges, gymnasiums, and indoor sports complexes.

---

#### 🍲 International Student Food & Mess
* Dedicated international dining halls providing continental, African, Arabic, and vegetarian/non-vegetarian cuisines.
* Self-cooking kitchens with refrigeration and induction burners are available in selected international wings.

---

#### 🛡️ Campus Security & Health
* **24/7 Security**: Gated campuses with biometric card access and CCTV monitoring.
* **On-Campus Hospitals**: 24-hour medical centers and ambulances on campus.
* **Vibrant Community**: Over 50,000 international students from 70+ countries study across India every year.`
    };
  }

  // Default General Advice
  return {
    modelUsed: 'gemini-3.5-flash (Admissions Desk)',
    reply: `### 🎓 Welcome to Fresh Study India Admissions Desk

Hello **${studentName}**! We are your official academic gateway to top accredited universities in India.

---

#### 🌟 How Fresh Study India Helps You:
1. **Direct University Admissions**: Guaranteed admission letters from NAAC A++ rated universities without agency middleman delays.
2. **Up to 100% Merit Scholarships**: We evaluate your WASSCE, WAEC, NECO, KCSE, or high school transcripts for maximum tuition waivers.
3. **100% Visa Filing Assistance**: Complete bonafide certification, Embassy interview guidance, and documentation prep.
4. **On-Ground Indian Desk**: Airport pickup in Delhi, Mumbai, or Bengaluru, university check-in, SIM card setup, and FRRO registration.

---

#### 🚀 What would you like to explore next?
* Ask about **scholarships & tuition discounts**
* Compare **B.Tech, MBBS, BBA, MBA, or Nursing programs**
* Check **student visa and embassy requirements**
* Calculate **total yearly budget in USD**

💬 Or chat with a human counselor directly on WhatsApp at **+231 889425645**!`
  };
}
