<?php
/**
 * The Footer for Myers Global Pathways Theme
 *
 * @package Myers_Global_Pathways
 * @author Menlaiday Myers Dahn
 */
?>

<!-- 1. Footer Section -->
<footer class="mgp-footer">
  <div class="container">
    <div class="mgp-footer-grid">
      
      <!-- Col 1: Brand & Founder Credibility -->
      <div>
        <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem;">
          <div class="mgp-logo-badge" style="width:2.25rem; height:2.25rem; font-size:1rem;">
            <i class="fa-solid fa-globe"></i>
          </div>
          <div>
            <h3 style="font-size:1.125rem; font-weight:800; color:#fff; line-height:1.2;">Myers Global Pathways</h3>
            <p style="font-size:0.6875rem; font-weight:700; color:#FBBF24; text-transform:uppercase;">Your Pathway to Global Education</p>
          </div>
        </div>

        <p style="font-size:0.875rem; color:#94A3B8; line-height:1.6; margin-bottom:1.25rem;">
          Founded by <strong>Menlaiday Myers Dahn</strong> (B.Sc. in Computer Science, Shri Rawatpura Sarkar University, India), providing personalized, honest, and comprehensive admissions guidance for international scholars.
        </p>

        <div style="font-size:0.8125rem; color:#CBD5E1; space-y:0.5rem;">
          <p><i class="fa-solid fa-location-dot" style="color:#FBBF24; margin-right:0.5rem;"></i> Monrovia, Liberia & Hyderabad, India</p>
          <p><i class="fa-solid fa-phone" style="color:#FBBF24; margin-right:0.5rem;"></i> +231 889425645 / +91 93478 69324</p>
        </div>
      </div>

      <!-- Col 2: Navigation & Student Tools -->
      <div>
        <h4>Student Hub</h4>
        <ul>
          <li><a href="<?php echo esc_url(home_url('/#explorer')); ?>">Study In India 2026</a></li>
          <li><a href="<?php echo esc_url(home_url('/#about')); ?>">About Founder & Vision</a></li>
          <li><a href="<?php echo esc_url(home_url('/#services')); ?>">Our Advisory Services</a></li>
          <li><a href="#" data-mgp-modal="mgp-apply-modal">Apply for Admissions</a></li>
          <li><a href="#" data-mgp-modal="mgp-portal-modal">Student Status Portal</a></li>
          <li><a href="<?php echo esc_url(home_url('/#faq')); ?>">Admissions FAQ</a></li>
        </ul>
      </div>

      <!-- Col 3: Myers Group of Companies -->
      <div>
        <h4>Myers Group Ventures</h4>
        <ul>
          <li><a href="#ventures" style="color:#FBBF24; font-weight:700;">Myers Global Pathways</a></li>
          <li><a href="#ventures">Fresh Updates News (600k+)</a></li>
          <li><a href="#ventures">Myers FRESH Technologies</a></li>
          <li><a href="#ventures">MyEdRives Platform</a></li>
          <li><a href="#ventures">Fresh Marketplace</a></li>
          <li><a href="#ventures">Classic Myers Filmwork</a></li>
        </ul>
      </div>

      <!-- Col 4: Official Email Directory -->
      <div>
        <h4>Official Email Directory</h4>
        <p style="font-size:0.75rem; color:#94A3B8; margin-bottom:0.75rem;">Verified departments for direct student and partner inquiries:</p>
        <ul style="font-size:0.8125rem;">
          <li><a href="mailto:info@myersglobalpathways.com"><i class="fa-solid fa-envelope"></i> info@myersglobalpathways.com</a></li>
          <li><a href="mailto:admissions@myersglobalpathways.com"><i class="fa-solid fa-envelope"></i> admissions@myersglobalpathways.com</a></li>
          <li><a href="mailto:scholarships@myersglobalpathways.com"><i class="fa-solid fa-envelope"></i> scholarships@myersglobalpathways.com</a></li>
          <li><a href="mailto:visas@myersglobalpathways.com"><i class="fa-solid fa-envelope"></i> visas@myersglobalpathways.com</a></li>
          <li><a href="mailto:support@myersglobalpathways.com"><i class="fa-solid fa-envelope"></i> support@myersglobalpathways.com</a></li>
        </ul>
      </div>

    </div>

    <!-- Bottom Copyright -->
    <div class="mgp-footer-bottom">
      <p>© <?php echo date('Y'); ?> Myers Global Pathways. All rights reserved. Founded by Menlaiday Myers Dahn.</p>
      <p style="color:#94A3B8;">Part of the Myers Group of Companies Ecosystem.</p>
    </div>
  </div>
</footer>

<!-- 2. Floating WhatsApp Widget -->
<a href="https://wa.me/231889425645?text=Hello%20Myers%20Global%20Pathways%2C%20I%20would%20like%20to%20inquire%20about%20studying%20in%20India." target="_blank" rel="noopener" class="mgp-whatsapp-floating">
  <i class="fa-brands fa-whatsapp" style="font-size:1.25rem;"></i>
  <span>Chat with Admissions Advisor</span>
</a>

<!-- 3. Admissions Application Modal -->
<div id="mgp-apply-modal" class="mgp-modal-backdrop">
  <div class="mgp-modal-content">
    <div class="mgp-modal-header">
      <div>
        <span class="mgp-badge mgp-badge-blue">Official Application</span>
        <h3 style="font-size:1.25rem; font-weight:800; color:#0F172A; margin-top:0.25rem;">Study in India Admissions</h3>
      </div>
      <button type="button" class="mgp-modal-close" style="background:none; border:none; font-size:1.5rem; color:#64748B; cursor:pointer;">&times;</button>
    </div>

    <div class="mgp-modal-body">
      <form id="mgp-apply-form">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1rem;">
          <div>
            <label style="display:block; font-size:0.75rem; font-weight:700; text-transform:uppercase; color:#334155; margin-bottom:0.25rem;">Full Name *</label>
            <input type="text" name="fullName" required placeholder="e.g. Samuel K. Morris" style="width:100%; padding:0.625rem; border:1px solid #CBD5E1; border-radius:0.5rem; font-size:0.875rem;" />
          </div>
          <div>
            <label style="display:block; font-size:0.75rem; font-weight:700; text-transform:uppercase; color:#334155; margin-bottom:0.25rem;">Email Address *</label>
            <input type="email" name="email" required placeholder="student@example.com" style="width:100%; padding:0.625rem; border:1px solid #CBD5E1; border-radius:0.5rem; font-size:0.875rem;" />
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1rem;">
          <div>
            <label style="display:block; font-size:0.75rem; font-weight:700; text-transform:uppercase; color:#334155; margin-bottom:0.25rem;">Phone / WhatsApp *</label>
            <input type="tel" name="phone" required placeholder="+231 ..." style="width:100%; padding:0.625rem; border:1px solid #CBD5E1; border-radius:0.5rem; font-size:0.875rem;" />
          </div>
          <div>
            <label style="display:block; font-size:0.75rem; font-weight:700; text-transform:uppercase; color:#334155; margin-bottom:0.25rem;">Country of Residence *</label>
            <input type="text" name="country" required value="Liberia" style="width:100%; padding:0.625rem; border:1px solid #CBD5E1; border-radius:0.5rem; font-size:0.875rem;" />
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1rem;">
          <div>
            <label style="display:block; font-size:0.75rem; font-weight:700; text-transform:uppercase; color:#334155; margin-bottom:0.25rem;">Degree Level *</label>
            <select name="intendedDegree" style="width:100%; padding:0.625rem; border:1px solid #CBD5E1; border-radius:0.5rem; font-size:0.875rem;">
              <option value="Bachelor">Bachelor Degree (Undergraduate)</option>
              <option value="Master">Master Degree (Postgraduate)</option>
              <option value="Diploma">Diploma / Polytechnic</option>
              <option value="Doctorate">Ph.D. / Doctoral</option>
            </select>
          </div>
          <div>
            <label style="display:block; font-size:0.75rem; font-weight:700; text-transform:uppercase; color:#334155; margin-bottom:0.25rem;">Program of Choice *</label>
            <input type="text" name="intendedCourse" required placeholder="e.g. Computer Science (B.Sc. / B.Tech)" style="width:100%; padding:0.625rem; border:1px solid #CBD5E1; border-radius:0.5rem; font-size:0.875rem;" />
          </div>
        </div>

        <div style="margin-bottom:1rem;">
          <label style="display:block; font-size:0.75rem; font-weight:700; text-transform:uppercase; color:#334155; margin-bottom:0.25rem;">Highest Qualification Completed</label>
          <input type="text" name="highestQualification" placeholder="e.g. WAEC / High School Certificate, Associate Degree" style="width:100%; padding:0.625rem; border:1px solid #CBD5E1; border-radius:0.5rem; font-size:0.875rem;" />
        </div>

        <div style="margin-bottom:1.5rem;">
          <label style="display:block; font-size:0.75rem; font-weight:700; text-transform:uppercase; color:#334155; margin-bottom:0.25rem;">Questions or Academic Goals</label>
          <textarea name="message" rows="3" placeholder="Tell our advisory team about your preferred universities, intake date, or scholarship questions..." style="width:100%; padding:0.625rem; border:1px solid #CBD5E1; border-radius:0.5rem; font-size:0.875rem;"></textarea>
        </div>

        <div class="mgp-form-status"></div>

        <div style="display:flex; justify-content:flex-end; gap:0.75rem; margin-top:1rem;">
          <button type="button" class="mgp-btn mgp-btn-outline mgp-modal-close">Cancel</button>
          <button type="submit" class="mgp-btn mgp-btn-gold">
            <i class="fa-solid fa-paper-plane"></i>
            <span>Submit Application</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- 4. Student Portal Status & Document Uploader Modal -->
<div id="mgp-portal-modal" class="mgp-modal-backdrop">
  <div class="mgp-modal-content">
    <div class="mgp-modal-header">
      <div>
        <span class="mgp-badge mgp-badge-blue">Official Verification</span>
        <h3 style="font-size:1.25rem; font-weight:800; color:#0F172A; margin-top:0.25rem;">Student Portal & Document Vault</h3>
      </div>
      <button type="button" class="mgp-modal-close" style="background:none; border:none; font-size:1.5rem; color:#64748B; cursor:pointer;">&times;</button>
    </div>

    <div class="mgp-modal-body">
      <p style="font-size:0.875rem; color:#64748B; margin-bottom:1.25rem;">
        Enter your official tracking reference code (e.g. <code>MGP-2026-XXXX</code>) or registered student email to verify your admission stage and upload required academic documents.
      </p>

      <form id="mgp-portal-track-form" style="display:flex; gap:0.5rem;">
        <input type="text" name="trackingReference" required placeholder="Enter Reference Code or Email" style="flex:1; padding:0.75rem 1rem; border:1px solid #CBD5E1; border-radius:0.75rem; font-size:0.9375rem;" />
        <button type="submit" class="mgp-btn mgp-btn-navy">
          <i class="fa-solid fa-magnifying-glass"></i>
          <span>Track</span>
        </button>
      </form>

      <div id="mgp-portal-result"></div>
    </div>
  </div>
</div>

<?php wp_footer(); ?>
</body>
</html>
