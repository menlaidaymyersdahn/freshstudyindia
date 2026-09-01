<?php
/**
 * Template Name: Student Portal
 * Template Post Type: page
 *
 * Description: Dedicated student tracking portal for Myers Global Pathways.
 *
 * @package Myers_Global_Pathways
 * @author Menlaiday Myers Dahn
 */

get_header();
?>

<main id="primary" class="site-main py-16 bg-[#EBF3FC]" style="background-color: #EBF3FC; min-height: 80vh; padding: 4rem 1rem;">
  <div class="container mx-auto" style="max-width: 800px; margin: 0 auto;">
    
    <!-- Hero Header -->
    <div style="text-align: center; margin-bottom: 2.5rem;">
      <span style="display: inline-block; padding: 0.35rem 1rem; border-radius: 9999px; background-color: #DBEAFE; color: #1E40AF; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem;">
        Applicant Tracking Desk
      </span>
      <h1 style="font-size: 2.25rem; font-weight: 800; color: #0F172A; line-height: 1.2; margin-bottom: 0.75rem;">
        Track Your Application & Offer Letter
      </h1>
      <p style="color: #475569; font-size: 1.05rem;">
        Enter your official tracking code (e.g. MGP-2026-XXXX) or registered email to view real-time status.
      </p>
    </div>

    <!-- Search Card -->
    <div style="background: #ffffff; border-radius: 1.25rem; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); border: 1px solid #E2E8F0; padding: 2rem;">
      <form id="mgp-track-form" style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
        <input 
          type="text" 
          id="mgp-track-input" 
          placeholder="Enter Tracking ID (e.g. MGP-2026-1042) or Email" 
          required 
          style="flex: 1; min-width: 260px; padding: 0.75rem 1rem; border-radius: 0.5rem; border: 1px solid #CBD5E1; font-size: 1rem;"
        />
        <button 
          type="submit" 
          style="background: linear-gradient(135deg, #1E40AF 0%, #0369A1 100%); color: #ffffff; font-weight: 700; padding: 0.75rem 1.5rem; border: none; border-radius: 0.5rem; cursor: pointer;"
        >
          Check Status
        </button>
      </form>

      <div id="mgp-track-result" style="margin-top: 1.5rem; display: none;"></div>
    </div>

    <!-- Contact note -->
    <div style="text-align: center; margin-top: 2rem; color: #64748B; font-size: 0.875rem;">
      Need help retrieving your code? Reach our Admissions Team on WhatsApp: 
      <a href="https://wa.me/231889425645" target="_blank" style="color: #0284C7; font-weight: 600; text-decoration: underline;">+231 889425645</a>
    </div>

  </div>
</main>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('mgp-track-form');
  const input = document.getElementById('mgp-track-input');
  const result = document.getElementById('mgp-track-result');
  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    result.style.display = 'block';
    result.innerHTML = '<div style="text-align:center; color:#64748B;">Searching admissions database...</div>';

    try {
      let res = await fetch('/api/applications/track/' + encodeURIComponent(query));
      if (!res.ok) {
        res = await fetch('/wp-json/mgp/v1/track?id=' + encodeURIComponent(query));
      }
      const data = await res.json();

      if (data.success && data.application) {
        const app = data.application;
        result.innerHTML = `
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 0.75rem; padding: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #E2E8F0; padding-bottom: 0.75rem; margin-bottom: 0.75rem;">
              <div>
                <h4 style="font-weight: 700; color: #0F172A; margin: 0;">${app.fullName}</h4>
                <span style="font-family: monospace; font-size: 0.85rem; color: #0369A1;">${app.trackingId}</span>
              </div>
              <span style="background: #DBEAFE; color: #1E40AF; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.8rem; font-weight: 700;">
                ${app.status || 'Under Review'}
              </span>
            </div>
            <p style="font-size: 0.9rem; color: #334155; margin: 0.25rem 0;"><strong>Program:</strong> ${app.preferredCourse || app.intendedCourse || 'Undergraduate'}</p>
            <p style="font-size: 0.9rem; color: #334155; margin: 0.25rem 0;"><strong>Preferred Institution:</strong> ${app.preferredUniversity || 'SRM Institute / Partner Campus'}</p>
          </div>
        `;
      } else {
        result.innerHTML = `
          <div style="background: #FEF2F2; border: 1px solid #FECACA; border-radius: 0.75rem; padding: 1rem; color: #991B1B; font-size: 0.9rem; text-align: center;">
            No application record matched <strong>"${query}"</strong>. Please verify your tracking ID or contact our admissions team on WhatsApp.
          </div>
        `;
      }
    } catch (err) {
      result.innerHTML = `
        <div style="background: #FEF2F2; border: 1px solid #FECACA; border-radius: 0.75rem; padding: 1rem; color: #991B1B; font-size: 0.9rem; text-align: center;">
          Unable to connect to status server. Please contact us via WhatsApp: +231 889425645.
        </div>
      `;
    }
  });
});
</script>

<?php
get_footer();
