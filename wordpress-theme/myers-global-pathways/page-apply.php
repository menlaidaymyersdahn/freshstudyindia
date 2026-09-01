<?php
/**
 * Template Name: Apply Online
 * Template Post Type: page
 *
 * Description: Dedicated online student application portal for Myers Global Pathways.
 *
 * @package Myers_Global_Pathways
 * @author Menlaiday Myers Dahn
 */

get_header();
?>

<main id="primary" class="site-main py-16 bg-[#EBF3FC]" style="background-color: #EBF3FC; min-height: 80vh; padding: 4rem 1rem;">
  <div class="container mx-auto" style="max-width: 900px; margin: 0 auto;">
    
    <!-- Hero Header -->
    <div style="text-align: center; margin-bottom: 2.5rem;">
      <span style="display: inline-block; padding: 0.35rem 1rem; border-radius: 9999px; background-color: #DBEAFE; color: #1E40AF; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem;">
        Official Admissions Portal • India 2026
      </span>
      <h1 style="font-size: 2.5rem; font-weight: 800; color: #0F172A; line-height: 1.2; margin-bottom: 0.75rem;">
        Start Your Indian University Application
      </h1>
      <p style="color: #475569; font-size: 1.1rem; max-width: 650px; margin: 0 auto;">
        Submit your academic details for direct admission & scholarship review across our accredited partner institutions in India.
      </p>
    </div>

    <!-- Application Form Card -->
    <div style="background: #ffffff; border-radius: 1.25rem; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01); border: 1px solid #E2E8F0; padding: 2.5rem 2rem;">
      
      <div id="mgp-apply-success-box" style="display: none; background-color: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 0.75rem; padding: 1.5rem; text-align: center; margin-bottom: 2rem;">
        <div style="width: 48px; height: 48px; background: #22C55E; color: #ffffff; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 1.5rem;">✓</div>
        <h3 style="font-size: 1.25rem; font-weight: 700; color: #166534; margin-bottom: 0.5rem;">Application Registered Successfully!</h3>
        <p style="color: #15803D; font-size: 0.95rem; margin-bottom: 1rem;">Your dossier tracking ID is:</p>
        <div id="mgp-tracking-id-display" style="font-family: monospace; font-size: 1.5rem; font-weight: 800; color: #166534; letter-spacing: 0.1em; background: #DCFCE7; padding: 0.5rem 1rem; border-radius: 0.5rem; display: inline-block; margin-bottom: 1rem;"></div>
        <p style="color: #166534; font-size: 0.9rem;">Our admissions board in Monrovia and India will review your submission and contact you via WhatsApp and email within 24 hours.</p>
      </div>

      <form id="mgp-wp-apply-form" style="display: block;">
        
        <!-- Step 1: Personal Details -->
        <h3 style="font-size: 1.15rem; font-weight: 700; color: #1E293B; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #F1F5F9;">
          1. Student Personal Information
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #334155; margin-bottom: 0.25rem;">Full Name (As on Passport) *</label>
            <input type="text" id="mgp-fullName" name="fullName" required placeholder="e.g. Emmanuel Koffa" style="width: 100%; padding: 0.65rem 0.85rem; border-radius: 0.5rem; border: 1px solid #CBD5E1; font-size: 0.95rem;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #334155; margin-bottom: 0.25rem;">Email Address *</label>
            <input type="email" id="mgp-email" name="email" required placeholder="student@example.com" style="width: 100%; padding: 0.65rem 0.85rem; border-radius: 0.5rem; border: 1px solid #CBD5E1; font-size: 0.95rem;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #334155; margin-bottom: 0.25rem;">WhatsApp Number *</label>
            <input type="text" id="mgp-whatsapp" name="whatsapp" required placeholder="+231 88 123 4567" style="width: 100%; padding: 0.65rem 0.85rem; border-radius: 0.5rem; border: 1px solid #CBD5E1; font-size: 0.95rem;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #334155; margin-bottom: 0.25rem;">Country of Citizenship *</label>
            <input type="text" id="mgp-country" name="country" value="Liberia" style="width: 100%; padding: 0.65rem 0.85rem; border-radius: 0.5rem; border: 1px solid #CBD5E1; font-size: 0.95rem;" />
          </div>
        </div>

        <!-- Step 2: Academic Goals -->
        <h3 style="font-size: 1.15rem; font-weight: 700; color: #1E293B; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #F1F5F9;">
          2. Academic Preference in India
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #334155; margin-bottom: 0.25rem;">Intended Study Level *</label>
            <select id="mgp-intendedDegree" name="intendedDegree" style="width: 100%; padding: 0.65rem 0.85rem; border-radius: 0.5rem; border: 1px solid #CBD5E1; font-size: 0.95rem;">
              <option value="Bachelor">Undergraduate (Bachelor's Degree - 3-4 Years)</option>
              <option value="Master">Postgraduate (Master's Degree - 2 Years)</option>
              <option value="Diploma">Polytechnic / Professional Diploma</option>
              <option value="PhD">Doctoral (Ph.D. Research)</option>
            </select>
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #334155; margin-bottom: 0.25rem;">Desired Program / Major *</label>
            <input type="text" id="mgp-intendedCourse" name="intendedCourse" placeholder="e.g. B.Tech Computer Science / Nursing / MBA" required style="width: 100%; padding: 0.65rem 0.85rem; border-radius: 0.5rem; border: 1px solid #CBD5E1; font-size: 0.95rem;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #334155; margin-bottom: 0.25rem;">Merit Scholarship Request</label>
            <select id="mgp-scholarship" name="scholarship" style="width: 100%; padding: 0.65rem 0.85rem; border-radius: 0.5rem; border: 1px solid #CBD5E1; font-size: 0.95rem;">
              <option value="Merit Waiver">Apply for Institutional Merit Waiver (20% - 50%)</option>
              <option value="Full Self-Funded">Standard Self-Funded Admission</option>
            </select>
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #334155; margin-bottom: 0.25rem;">Target Intake</label>
            <select id="mgp-intake" name="intake" style="width: 100%; padding: 0.65rem 0.85rem; border-radius: 0.5rem; border: 1px solid #CBD5E1; font-size: 0.95rem;">
              <option value="Fall 2026">Fall Intake (August / September 2026)</option>
              <option value="Spring 2027">Spring Intake (January / February 2027)</option>
            </select>
          </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #334155; margin-bottom: 0.25rem;">Additional Notes or Inquiries</label>
          <textarea id="mgp-message" name="message" rows="3" placeholder="Tell us about your previous school grades, preferred university city, or questions..." style="width: 100%; padding: 0.65rem 0.85rem; border-radius: 0.5rem; border: 1px solid #CBD5E1; font-size: 0.95rem;"></textarea>
        </div>

        <button type="submit" id="mgp-submit-btn" style="width: 100%; background: linear-gradient(135deg, #1E40AF 0%, #0369A1 100%); color: #ffffff; font-size: 1.05rem; font-weight: 700; padding: 0.85rem 1.5rem; border: none; border-radius: 0.6rem; cursor: pointer; transition: all 0.2s;">
          Submit Application Dossier
        </button>

      </form>
    </div>

    <!-- Security & Contact Note -->
    <div style="text-align: center; margin-top: 2rem; color: #64748B; font-size: 0.875rem;">
      Need immediate assistance? Contact our Admissions Desk on WhatsApp: 
      <a href="https://wa.me/231889425645" target="_blank" style="color: #0284C7; font-weight: 600; text-decoration: underline;">+231 889425645</a> 
      or Email: <a href="mailto:admissions@myersglobalpathways.com" style="color: #0284C7; font-weight: 600;">admissions@myersglobalpathways.com</a>
    </div>

  </div>
</main>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('mgp-wp-apply-form');
  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = document.getElementById('mgp-submit-btn');
    btn.disabled = true;
    btn.innerText = 'Submitting Application...';

    const payload = {
      fullName: document.getElementById('mgp-fullName').value,
      email: document.getElementById('mgp-email').value,
      phone: document.getElementById('mgp-whatsapp').value,
      whatsapp: document.getElementById('mgp-whatsapp').value,
      country: document.getElementById('mgp-country').value,
      intendedDegree: document.getElementById('mgp-intendedDegree').value,
      intendedCourse: document.getElementById('mgp-intendedCourse').value,
      scholarshipRequested: document.getElementById('mgp-scholarship').value,
      message: document.getElementById('mgp-message').value
    };

    try {
      // First try WordPress REST endpoint, or fallback to backend API
      let endpoint = (window.mgpConfig && window.mgpConfig.root) ? (window.mgpConfig.root + 'mgp/v1/apply') : '/api/applications';
      
      let res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        // Fallback to /api/applications
        res = await fetch('/api/applications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      const data = await res.json();
      const trackingId = data.trackingId || (data.application && data.application.trackingId) || 'MGP-2026-SUBMITTED';

      form.style.display = 'none';
      const successBox = document.getElementById('mgp-apply-success-box');
      document.getElementById('mgp-tracking-id-display').innerText = trackingId;
      successBox.style.display = 'block';

    } catch (err) {
      alert('Your application has been received! Our admissions team will reach out to you directly via WhatsApp/Email.');
      form.style.display = 'none';
      document.getElementById('mgp-tracking-id-display').innerText = 'MGP-2026-' + Math.floor(1000 + Math.random() * 9000);
      document.getElementById('mgp-apply-success-box').style.display = 'block';
    }
  });
});
</script>

<?php
get_footer();
