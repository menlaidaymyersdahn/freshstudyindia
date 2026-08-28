<?php
/**
 * The Front Page Template for Myers Global Pathways Theme
 *
 * @package Myers_Global_Pathways
 * @author Menlaiday Myers Dahn
 */

get_header();
?>

<main id="primary" class="site-main">

  <!-- 1. HERO SECTION -->
  <section class="mgp-hero-section">
    <div class="container">
      <div class="mgp-hero-grid">
        
        <div>
          <span class="mgp-badge mgp-badge-blue" style="background:rgba(255,255,255,0.1); border-color:rgba(255,255,255,0.2); color:#FBBF24;">
            <i class="fa-solid fa-graduation-cap"></i> Official International Admissions 2026
          </span>

          <h2 class="mgp-hero-title">
            Your Direct Pathway to Higher Education in <span>India</span>
          </h2>

          <p class="mgp-hero-desc">
            Personalized, transparent guidance for international scholars. We navigate university selection, scholarships, student visas, and campus settlement with unwavering integrity.
          </p>

          <div class="mgp-hero-actions">
            <button type="button" data-mgp-modal="mgp-apply-modal" class="mgp-btn mgp-btn-gold">
              <i class="fa-solid fa-paper-plane"></i>
              <span>Start Free Evaluation</span>
            </button>

            <a href="#explorer" class="mgp-btn mgp-btn-outline" style="background:rgba(255,255,255,0.1); color:#fff; border-color:rgba(255,255,255,0.3);">
              <i class="fa-solid fa-magnifying-glass"></i>
              <span>Explore Programs & Fees</span>
            </a>
          </div>

          <div class="mgp-hero-stats">
            <div class="mgp-stat-item">
              <h3>50+</h3>
              <p>Recognized Programs</p>
            </div>
            <div class="mgp-stat-item">
              <h3>Up to 50%</h3>
              <p>Merit Scholarships</p>
            </div>
            <div class="mgp-stat-item">
              <h3>100%</h3>
              <p>Admissions Support</p>
            </div>
          </div>
        </div>

        <!-- Right Hero Preview Box -->
        <div>
          <div class="mgp-hero-card">
            <div style="display:flex; align-items:center; gap:0.75rem; border-bottom:1px solid rgba(255,255,255,0.15); padding-bottom:1rem; margin-bottom:1rem;">
              <div style="width:40px; height:40px; border-radius:12px; background:#FBBF24; color:#020C1B; display:flex; align-items:center; justify-content:center; font-weight:800;">
                <i class="fa-solid fa-award"></i>
              </div>
              <div>
                <h3 style="font-size:1.125rem; font-weight:800; color:#fff;">Founder Led Advisory</h3>
                <p style="font-size:0.75rem; color:#FBBF24;">Menlaiday Myers Dahn (B.Sc. CS, SRSU India)</p>
              </div>
            </div>

            <p style="font-size:0.875rem; color:#CBD5E1; line-height:1.6; margin-bottom:1rem;">
              "Having walked the exact path as an international student graduating with a Computer Science degree in India in 2026, I established Myers Global Pathways to provide students with authentic, first-hand clarity from application to graduation."
            </p>

            <div style="background:rgba(0,0,0,0.25); border-radius:1rem; padding:1rem; border:1px solid rgba(255,255,255,0.1);">
              <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:#CBD5E1; margin-bottom:0.25rem;">
                <span>Admissions Status</span>
                <span style="color:#34D399; font-weight:700;">● Active Intakes 2026</span>
              </div>
              <p style="font-size:0.8125rem; font-weight:700; color:#fff;">Fall 2026 & Spring 2027 Admissions Open</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- 2. FOUNDER SPOTLIGHT: MENLAIDAY MYERS DAHN -->
  <section id="about" class="mgp-founder-section">
    <div class="container">
      
      <div style="margin-bottom:2.5rem;">
        <span class="mgp-badge mgp-badge-blue">
          <i class="fa-solid fa-award" style="color:#2563EB;"></i> Leadership & Vision
        </span>
        <h2 style="font-size:2.25rem; font-weight:800; color:#0F172A; margin-top:0.5rem;">
          About the Founder: Menlaiday Myers Dahn
        </h2>
        <p style="font-size:1.125rem; color:#475569; max-width:800px; margin-top:0.5rem;">
          Liberian blogger, filmmaker, digital media entrepreneur, and technology professional whose work spans digital media, entertainment, technology, and entrepreneurship.
        </p>
      </div>

      <div class="mgp-founder-grid">
        
        <!-- Left: Portrait & Key Stats -->
        <div class="mgp-founder-card">
          <div class="mgp-founder-portrait">
            <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/DSC_9367.jpeg'); ?>" alt="Menlaiday Myers Dahn - Founder" onerror="this.src='<?php echo esc_url(get_template_directory_uri() . '/assets/images/DSC_9531.jpeg'); ?>'" />
            <div class="mgp-founder-tag">
              <div>
                <h4>Menlaiday Myers Dahn</h4>
                <p>Founder & CEO, Myers Group of Companies</p>
              </div>
              <div style="width:32px; height:32px; border-radius:8px; background:#FBBF24; color:#0F172A; display:flex; align-items:center; justify-content:center; font-weight:800;">
                <i class="fa-solid fa-graduation-cap"></i>
              </div>
            </div>
          </div>

          <div style="background:#0F172A; border-radius:1rem; padding:1rem; color:#fff; margin-bottom:1rem;">
            <p style="font-size:0.6875rem; font-weight:700; color:#FBBF24; text-transform:uppercase;">Academic Degree & Alma Mater</p>
            <p style="font-size:0.875rem; font-weight:700; color:#fff;">Bachelor of Science in Computer Science (B.Sc. CS)</p>
            <p style="font-size:0.75rem; color:#BAE6FD;">Shri Rawatpura Sarkar University, India (Graduated 2026)</p>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div style="background:#EBF3FD; border:1px solid #BAE6FD; border-radius:1rem; padding:0.75rem; text-align:center;">
              <p style="font-size:1.25rem; font-weight:800; color:#1E3A8A;">600,000+</p>
              <p style="font-size:0.6875rem; font-weight:700; color:#64748B;">Social Media Reach</p>
            </div>
            <div style="background:#EBF3FD; border:1px solid #BAE6FD; border-radius:1rem; padding:0.75rem; text-align:center;">
              <p style="font-size:1.25rem; font-weight:800; color:#1E3A8A;">India 2026</p>
              <p style="font-size:0.6875rem; font-weight:700; color:#64748B;">Alumnus & Technologist</p>
            </div>
          </div>
        </div>

        <!-- Right: Comprehensive Biography -->
        <div class="mgp-bio-box">
          <h3 style="font-size:1.5rem; font-weight:800; color:#0F172A; margin-bottom:1rem; border-bottom:1px solid #E2E8F0; padding-bottom:0.75rem;">
            Bridging Media, Technology, and Global Education
          </h3>

          <p>
            <strong>Menlaiday Myers Dahn</strong> is a Liberian blogger, filmmaker, digital media entrepreneur, and technology professional whose work spans digital media, entertainment, technology, and entrepreneurship. He is best known for his work in digital news and entertainment through <strong>Fresh Updates News</strong>, a media platform with a combined audience of more than <strong>600,000 followers</strong> across social media platforms. Through Fresh Updates News, Menlaiday has built a strong digital presence by covering breaking news, current affairs, entertainment, trending stories, and issues of interest to Liberian and African audiences.
          </p>

          <p>
            Beyond digital publishing, Menlaiday has a background in film and visual production. Through <strong>Classic Myers Filmwork</strong>, he has been involved in filmmaking and music-video production, developing experience in visual storytelling and creative content. His work across blogging, digital media, and film reflects his interest in using modern media platforms to tell stories and reach audiences beyond traditional media.
          </p>

          <div style="background:#F0F9FF; border-left:4px solid #2563EB; border-radius:0.75rem; padding:1rem; margin:1rem 0;">
            <h4 style="font-size:0.875rem; font-weight:800; color:#1E3A8A; margin-bottom:0.25rem;">Higher Education in India (Graduated 2026)</h4>
            <p style="font-size:0.8125rem; color:#334155; margin:0;">
              In 2026, Menlaiday graduated from <strong>Shri Rawatpura Sarkar University</strong> in India with a <strong>Bachelor of Science in Computer Science</strong>, adding a formal technology background to his experience in digital media and creative production. His combination of technology, media, and entrepreneurship has become an important part of his professional journey and the businesses he continues to develop.
            </p>
          </div>

          <p>
            Through these ventures, Menlaiday is building beyond his identity as a blogger and content creator, developing a broader entrepreneurial portfolio that connects media, technology, education, commerce, and digital innovation. His journey from digital media and filmmaking to completing a Computer Science degree and establishing multiple businesses reflects an expanding interest in building digital platforms and businesses that serve African and international audiences.
          </p>

          <p>
            Today, Menlaiday Myers Dahn continues to work across media, technology, filmmaking, and entrepreneurship while developing the <strong>Myers Group of Companies</strong> and its individual ventures. His professional identity is increasingly defined not by one industry, but by the intersection of digital media, technology, creativity, education, and business development.
          </p>
        </div>

      </div>

    </div>
  </section>

  <!-- 3. MYERS GROUP OF COMPANIES PORTFOLIO -->
  <section id="ventures" class="mgp-group-section">
    <div class="container">
      
      <div style="margin-bottom:2rem;">
        <span class="mgp-badge mgp-badge-blue">
          <i class="fa-solid fa-building" style="color:#2563EB;"></i> Corporate Ecosystem
        </span>
        <h2 style="font-size:2.25rem; font-weight:800; color:#0F172A; margin-top:0.5rem;">
          Myers Group of Companies
        </h2>
        <p style="font-size:1.125rem; color:#475569; max-width:800px; margin-top:0.5rem;">
          A growing multidisciplinary business group established by Menlaiday Myers Dahn across education, media, technology, transportation, e-commerce, and creative storytelling.
        </p>
      </div>

      <div class="mgp-ventures-grid">
        
        <!-- Venture 1: Myers Global Pathways -->
        <div class="mgp-venture-card flagship">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
              <span style="font-size:0.6875rem; font-weight:800; text-transform:uppercase; background:#2563EB; color:#fff; padding:0.25rem 0.5rem; border-radius:0.5rem;">Flagship Education</span>
              <div style="width:36px; height:36px; border-radius:10px; background:#2563EB; color:#fff; display:flex; align-items:center; justify-content:center;">
                <i class="fa-solid fa-graduation-cap"></i>
              </div>
            </div>
            <h3 style="font-size:1.125rem; font-weight:800; color:#0F172A;">Myers Global Pathways</h3>
            <p style="font-size:0.75rem; font-weight:700; color:#2563EB; margin-bottom:0.75rem;">International Education & Student Support</p>
            <p style="font-size:0.8125rem; color:#475569; line-height:1.6;">
              Helping students access educational opportunities in India, including university and course selection, admissions, document guidance, scholarship guidance, student visa guidance, accommodation, and pre-departure support.
            </p>
          </div>
        </div>

        <!-- Venture 2: Fresh Updates News -->
        <div class="mgp-venture-card">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
              <span style="font-size:0.6875rem; font-weight:800; text-transform:uppercase; background:#E0F0FE; color:#0369A1; padding:0.25rem 0.5rem; border-radius:0.5rem;">600k+ Followers</span>
              <div style="width:36px; height:36px; border-radius:10px; background:#E0F0FE; color:#0369A1; display:flex; align-items:center; justify-content:center;">
                <i class="fa-solid fa-tv"></i>
              </div>
            </div>
            <h3 style="font-size:1.125rem; font-weight:800; color:#0F172A;">Fresh Updates News</h3>
            <p style="font-size:0.75rem; font-weight:700; color:#2563EB; margin-bottom:0.75rem;">Digital News & Entertainment Platform</p>
            <p style="font-size:0.8125rem; color:#475569; line-height:1.6;">
              The group's digital media platform focused on news, entertainment, current affairs, and trending stories, reaching an audience of more than 600,000 followers.
            </p>
          </div>
        </div>

        <!-- Venture 3: Myers FRESH Technologies -->
        <div class="mgp-venture-card">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
              <span style="font-size:0.6875rem; font-weight:800; text-transform:uppercase; background:#E0F0FE; color:#0369A1; padding:0.25rem 0.5rem; border-radius:0.5rem;">Tech & Software</span>
              <div style="width:36px; height:36px; border-radius:10px; background:#E0F0FE; color:#0369A1; display:flex; align-items:center; justify-content:center;">
                <i class="fa-solid fa-microchip"></i>
              </div>
            </div>
            <h3 style="font-size:1.125rem; font-weight:800; color:#0F172A;">Myers FRESH Technologies</h3>
            <p style="font-size:0.75rem; font-weight:700; color:#2563EB; margin-bottom:0.75rem;">Digital Products & Tech Solutions</p>
            <p style="font-size:0.8125rem; color:#475569; line-height:1.6;">
              A technology venture focused on digital products, innovative online services, and scalable web solutions.
            </p>
          </div>
        </div>

        <!-- Venture 4: MyEdRives -->
        <div class="mgp-venture-card">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
              <span style="font-size:0.6875rem; font-weight:800; text-transform:uppercase; background:#E0F0FE; color:#0369A1; padding:0.25rem 0.5rem; border-radius:0.5rem;">Mobility Tech</span>
              <div style="width:36px; height:36px; border-radius:10px; background:#E0F0FE; color:#0369A1; display:flex; align-items:center; justify-content:center;">
                <i class="fa-solid fa-car"></i>
              </div>
            </div>
            <h3 style="font-size:1.125rem; font-weight:800; color:#0F172A;">MyEdRives</h3>
            <p style="font-size:0.75rem; font-weight:700; color:#2563EB; margin-bottom:0.75rem;">Education & Mobility Services</p>
            <p style="font-size:0.8125rem; color:#475569; line-height:1.6;">
              A technology-driven platform designed to make access to driving-related learning and mobility services more convenient.
            </p>
          </div>
        </div>

        <!-- Venture 5: Fresh Marketplace -->
        <div class="mgp-venture-card">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
              <span style="font-size:0.6875rem; font-weight:800; text-transform:uppercase; background:#E0F0FE; color:#0369A1; padding:0.25rem 0.5rem; border-radius:0.5rem;">E-Commerce</span>
              <div style="width:36px; height:36px; border-radius:10px; background:#E0F0FE; color:#0369A1; display:flex; align-items:center; justify-content:center;">
                <i class="fa-solid fa-bag-shopping"></i>
              </div>
            </div>
            <h3 style="font-size:1.125rem; font-weight:800; color:#0F172A;">Fresh Marketplace</h3>
            <p style="font-size:0.75rem; font-weight:700; color:#2563EB; margin-bottom:0.75rem;">Digital Commerce Hub</p>
            <p style="font-size:0.8125rem; color:#475569; line-height:1.6;">
              An e-commerce and marketplace platform connecting buyers and sellers to make products and services seamlessly accessible.
            </p>
          </div>
        </div>

        <!-- Venture 6: Classic Myers Filmwork -->
        <div class="mgp-venture-card">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
              <span style="font-size:0.6875rem; font-weight:800; text-transform:uppercase; background:#E0F0FE; color:#0369A1; padding:0.25rem 0.5rem; border-radius:0.5rem;">Creative Media</span>
              <div style="width:36px; height:36px; border-radius:10px; background:#E0F0FE; color:#0369A1; display:flex; align-items:center; justify-content:center;">
                <i class="fa-solid fa-film"></i>
              </div>
            </div>
            <h3 style="font-size:1.125rem; font-weight:800; color:#0F172A;">Classic Myers Filmwork</h3>
            <p style="font-size:0.75rem; font-weight:700; color:#2563EB; margin-bottom:0.75rem;">Film & Visual Production</p>
            <p style="font-size:0.8125rem; color:#475569; line-height:1.6;">
              Visual storytelling, filmmaking, creative video direction, and music-video production using modern cinematography.
            </p>
          </div>
        </div>

      </div>

    </div>
  </section>

  <!-- 4. STUDY IN INDIA EXPLORER -->
  <section id="explorer" class="mgp-explorer-section">
    <div class="container">
      
      <div style="margin-bottom:2rem;">
        <span class="mgp-badge mgp-badge-blue">
          <i class="fa-solid fa-compass" style="color:#2563EB;"></i> Degree & Career Explorer
        </span>
        <h2 style="font-size:2.25rem; font-weight:800; color:#0F172A; margin-top:0.5rem;">
          Popular Study Programs in India
        </h2>
        <p style="font-size:1.125rem; color:#475569; max-width:800px; margin-top:0.5rem;">
          Explore internationally recognized bachelor, master, and diploma courses with guaranteed scholarship advisory.
        </p>
      </div>

      <!-- Filter Tabs -->
      <div class="mgp-tabs-bar">
        <button type="button" class="mgp-tab-btn active" data-category="all">All Programs</button>
        <button type="button" class="mgp-tab-btn" data-category="engineering">Computer Science & Engineering</button>
        <button type="button" class="mgp-tab-btn" data-category="medical">Medicine, Pharmacy & Nursing</button>
        <button type="button" class="mgp-tab-btn" data-category="business">Business & Management (BBA/MBA)</button>
        <button type="button" class="mgp-tab-btn" data-category="aviation">Aviation & Logistics</button>
      </div>

      <!-- Programs Grid -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:1.5rem;">
        
        <!-- Course 1 -->
        <div class="mgp-course-card" data-category="engineering" style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:1.5rem; padding:1.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <span style="font-size:0.6875rem; font-weight:800; background:#E0F0FE; color:#0369A1; padding:0.25rem 0.5rem; border-radius:0.5rem;">Bachelor Degree (4 Years)</span>
            <span style="font-size:0.75rem; font-weight:800; color:#059669;">Up to 50% Scholarship</span>
          </div>
          <h3 style="font-size:1.25rem; font-weight:800; color:#0F172A;">B.Tech / B.Sc. in Computer Science</h3>
          <p style="font-size:0.8125rem; color:#64748B; margin:0.5rem 0 1rem;">Software engineering, AI, cybersecurity, and data structures with top Indian tech faculty.</p>
          <div style="font-size:0.8125rem; font-weight:700; color:#0F172A; margin-bottom:1rem;">
            Est. Annual Tuition: <span style="color:#2563EB;">$1,800 - $3,200 / year</span>
          </div>
          <button type="button" data-mgp-modal="mgp-apply-modal" class="mgp-btn mgp-btn-gold" style="width:100%;">Apply for this Course</button>
        </div>

        <!-- Course 2 -->
        <div class="mgp-course-card" data-category="medical" style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:1.5rem; padding:1.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <span style="font-size:0.6875rem; font-weight:800; background:#E0F0FE; color:#0369A1; padding:0.25rem 0.5rem; border-radius:0.5rem;">Healthcare (4 Years)</span>
            <span style="font-size:0.75rem; font-weight:800; color:#059669;">Merit Grants</span>
          </div>
          <h3 style="font-size:1.25rem; font-weight:800; color:#0F172A;">Bachelor of Pharmacy (B.Pharm)</h3>
          <p style="font-size:0.8125rem; color:#64748B; margin:0.5rem 0 1rem;">Clinical pharmacy, pharmaceutical sciences, and hospital laboratory training.</p>
          <div style="font-size:0.8125rem; font-weight:700; color:#0F172A; margin-bottom:1rem;">
            Est. Annual Tuition: <span style="color:#2563EB;">$1,900 - $3,000 / year</span>
          </div>
          <button type="button" data-mgp-modal="mgp-apply-modal" class="mgp-btn mgp-btn-gold" style="width:100%;">Apply for this Course</button>
        </div>

        <!-- Course 3 -->
        <div class="mgp-course-card" data-category="business" style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:1.5rem; padding:1.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <span style="font-size:0.6875rem; font-weight:800; background:#E0F0FE; color:#0369A1; padding:0.25rem 0.5rem; border-radius:0.5rem;">Business (3 Years)</span>
            <span style="font-size:0.75rem; font-weight:800; color:#059669;">Up to 40% Scholarship</span>
          </div>
          <h3 style="font-size:1.25rem; font-weight:800; color:#0F172A;">Bachelor of Business Administration (BBA)</h3>
          <p style="font-size:0.8125rem; color:#64748B; margin:0.5rem 0 1rem;">International business, finance, digital marketing, and enterprise management.</p>
          <div style="font-size:0.8125rem; font-weight:700; color:#0F172A; margin-bottom:1rem;">
            Est. Annual Tuition: <span style="color:#2563EB;">$1,500 - $2,500 / year</span>
          </div>
          <button type="button" data-mgp-modal="mgp-apply-modal" class="mgp-btn mgp-btn-gold" style="width:100%;">Apply for this Course</button>
        </div>

      </div>

    </div>
  </section>

  <!-- 5. OUR 6-STEP ADMISSIONS JOURNEY -->
  <section class="mgp-group-section" style="background:#F0F7FF;">
    <div class="container">
      
      <div style="margin-bottom:2.5rem; text-align:center;">
        <span class="mgp-badge mgp-badge-blue">
          <i class="fa-solid fa-route" style="color:#2563EB;"></i> Step-by-Step Roadmap
        </span>
        <h2 style="font-size:2.25rem; font-weight:800; color:#0F172A; margin-top:0.5rem;">
          Your 6-Step Pathway to India
        </h2>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1.25rem;">
        
        <div style="background:#fff; padding:1.5rem; border-radius:1.5rem; border:1px solid #BAE6FD;">
          <div style="font-size:1.5rem; font-weight:800; color:#2563EB; margin-bottom:0.5rem;">01</div>
          <h4 style="font-size:1.125rem; font-weight:800; color:#0F172A;">Free Profile Assessment</h4>
          <p style="font-size:0.8125rem; color:#64748B; margin-top:0.25rem;">We evaluate your high school (WAEC) or university transcripts for eligibility.</p>
        </div>

        <div style="background:#fff; padding:1.5rem; border-radius:1.5rem; border:1px solid #BAE6FD;">
          <div style="font-size:1.5rem; font-weight:800; color:#2563EB; margin-bottom:0.5rem;">02</div>
          <h4 style="font-size:1.125rem; font-weight:800; color:#0F172A;">University & Scholarship Selection</h4>
          <p style="font-size:0.8125rem; color:#64748B; margin-top:0.25rem;">We match you with top accredited Indian universities offering merit scholarships.</p>
        </div>

        <div style="background:#fff; padding:1.5rem; border-radius:1.5rem; border:1px solid #BAE6FD;">
          <div style="font-size:1.5rem; font-weight:800; color:#2563EB; margin-bottom:0.5rem;">03</div>
          <h4 style="font-size:1.125rem; font-weight:800; color:#0F172A;">Official Admission Letter</h4>
          <p style="font-size:0.8125rem; color:#64748B; margin-top:0.25rem;">Direct issuance of your provisional admission and scholarship award letters.</p>
        </div>

        <div style="background:#fff; padding:1.5rem; border-radius:1.5rem; border:1px solid #BAE6FD;">
          <div style="font-size:1.5rem; font-weight:800; color:#2563EB; margin-bottom:0.5rem;">04</div>
          <h4 style="font-size:1.125rem; font-weight:800; color:#0F172A;">Student Visa (e-Visa) Guidance</h4>
          <p style="font-size:0.8125rem; color:#64748B; margin-top:0.25rem;">Complete documentation and mock interview preparation for the Indian Embassy.</p>
        </div>

        <div style="background:#fff; padding:1.5rem; border-radius:1.5rem; border:1px solid #BAE6FD;">
          <div style="font-size:1.5rem; font-weight:800; color:#2563EB; margin-bottom:0.5rem;">05</div>
          <h4 style="font-size:1.125rem; font-weight:800; color:#0F172A;">Pre-Departure Briefing</h4>
          <p style="font-size:0.8125rem; color:#64748B; margin-top:0.25rem;">Flight booking assistance, packing checklists, and cultural orientation for life in India.</p>
        </div>

        <div style="background:#fff; padding:1.5rem; border-radius:1.5rem; border:1px solid #BAE6FD;">
          <div style="font-size:1.5rem; font-weight:800; color:#2563EB; margin-bottom:0.5rem;">06</div>
          <h4 style="font-size:1.125rem; font-weight:800; color:#0F172A;">Airport Pickup & Campus Settlement</h4>
          <p style="font-size:0.8125rem; color:#64748B; margin-top:0.25rem;">On-ground reception, hostel check-in, FRRO student registration, and local SIM setup.</p>
        </div>

      </div>

    </div>
  </section>

  <!-- 6. FAQ ACCORDION -->
  <section id="faq" class="mgp-explorer-section">
    <div class="container" style="max-width:800px;">
      
      <div style="margin-bottom:2rem; text-align:center;">
        <span class="mgp-badge mgp-badge-blue">
          <i class="fa-solid fa-circle-question" style="color:#2563EB;"></i> Answers to Common Questions
        </span>
        <h2 style="font-size:2rem; font-weight:800; color:#0F172A; margin-top:0.5rem;">
          Frequently Asked Questions
        </h2>
      </div>

      <div style="display:flex; flex-direction:column; gap:1rem;">
        
        <div class="mgp-faq-item active" style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:1rem; padding:1.25rem;">
          <h4 class="mgp-faq-question" style="font-size:1rem; font-weight:800; color:#0F172A; cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
            <span>Can I apply without uploading all my documents today?</span>
            <i class="fa-solid fa-chevron-down" style="font-size:0.875rem; color:#64748B;"></i>
          </h4>
          <div class="mgp-faq-answer" style="font-size:0.875rem; color:#475569; margin-top:0.75rem; line-height:1.6;">
            Yes, absolutely. You can submit your initial application now to reserve your spot and scholarship evaluation. You will receive a unique tracking reference code (e.g. <code>MGP-2026-XXXX</code>) which allows you to upload remaining transcripts, certificates, or passport copies later via our <strong>Student Portal</strong>.
          </div>
        </div>

        <div class="mgp-faq-item" style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:1rem; padding:1.25rem;">
          <h4 class="mgp-faq-question" style="font-size:1rem; font-weight:800; color:#0F172A; cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
            <span>Are Indian university degrees recognized internationally?</span>
            <i class="fa-solid fa-chevron-down" style="font-size:0.875rem; color:#64748B;"></i>
          </h4>
          <div class="mgp-faq-answer" style="display:none; font-size:0.875rem; color:#475569; margin-top:0.75rem; line-height:1.6;">
            Yes. All universities partnered with Myers Global Pathways are UGC (University Grants Commission) and AICTE approved, ensuring full global equivalence across Africa, Europe, the United States, and Canada.
          </div>
        </div>

        <div class="mgp-faq-item" style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:1rem; padding:1.25rem;">
          <h4 class="mgp-faq-question" style="font-size:1rem; font-weight:800; color:#0F172A; cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
            <span>How much does it cost to study in India?</span>
            <i class="fa-solid fa-chevron-down" style="font-size:0.875rem; color:#64748B;"></i>
          </h4>
          <div class="mgp-faq-answer" style="display:none; font-size:0.875rem; color:#475569; margin-top:0.75rem; line-height:1.6;">
            India is one of the most affordable global education destinations. Annual tuition typically ranges between $1,500 and $3,500 USD, with accommodation and meals averaging $100 to $180 USD per month.
          </div>
        </div>

      </div>

    </div>
  </section>

  <!-- 7. CONTACT & EMAIL DIRECTORY -->
  <section id="contact" class="mgp-group-section" style="background:#0F172A; color:#fff;">
    <div class="container">
      
      <div style="margin-bottom:2.5rem; text-align:center;">
        <span class="mgp-badge mgp-badge-blue" style="background:rgba(255,255,255,0.1); border-color:rgba(255,255,255,0.2); color:#FBBF24;">
          <i class="fa-solid fa-envelope"></i> Get in Touch
        </span>
        <h2 style="font-size:2.25rem; font-weight:800; color:#fff; margin-top:0.5rem;">
          Official Admissions & Advisory Channels
        </h2>
        <p style="font-size:1rem; color:#94A3B8; margin-top:0.5rem;">
          Contact our verified team in Monrovia or Hyderabad.
        </p>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1.5rem;">
        
        <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:1.5rem; padding:1.5rem;">
          <h4 style="font-size:1.125rem; font-weight:800; color:#FBBF24; margin-bottom:0.75rem;"><i class="fa-solid fa-phone"></i> Phone & WhatsApp</h4>
          <p style="font-size:0.875rem; color:#CBD5E1; margin-bottom:0.5rem;"><strong>Liberia Office:</strong> +231 889425645</p>
          <p style="font-size:0.875rem; color:#CBD5E1;"><strong>India Office:</strong> +91 93478 69324</p>
        </div>

        <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:1.5rem; padding:1.5rem;">
          <h4 style="font-size:1.125rem; font-weight:800; color:#FBBF24; margin-bottom:0.75rem;"><i class="fa-solid fa-envelope"></i> General Inquiries</h4>
          <p style="font-size:0.875rem; color:#CBD5E1; margin-bottom:0.5rem;">info@myersglobalpathways.com</p>
          <p style="font-size:0.875rem; color:#CBD5E1;">admissions@myersglobalpathways.com</p>
        </div>

        <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:1.5rem; padding:1.5rem;">
          <h4 style="font-size:1.125rem; font-weight:800; color:#FBBF24; margin-bottom:0.75rem;"><i class="fa-solid fa-location-dot"></i> Global Operations</h4>
          <p style="font-size:0.875rem; color:#CBD5E1; margin-bottom:0.5rem;">Monrovia, Liberia</p>
          <p style="font-size:0.875rem; color:#CBD5E1;">Hyderabad & Raipur, India</p>
        </div>

      </div>

    </div>
  </section>

</main>

<?php
get_footer();
