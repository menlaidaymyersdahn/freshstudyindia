<?php
/**
 * The Header for Myers Global Pathways Theme
 *
 * @package Myers_Global_Pathways
 * @author Menlaiday Myers Dahn
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="profile" href="https://gmpg.org/xfn/11">
  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- 1. Global Top Notification Bar -->
<div class="mgp-top-bar">
  <div class="container">
    <div class="mgp-top-bar-left">
      <span><i class="fa-solid fa-graduation-cap" style="color:#FBBF24;"></i> India Admissions 2026 Open</span>
      <span><i class="fa-solid fa-phone"></i> +231 889425645 (Liberia)</span>
      <span><i class="fa-solid fa-phone"></i> +91 93478 69324 (India)</span>
    </div>
    <div class="mgp-top-bar-right">
      <a href="mailto:info@myersglobalpathways.com"><i class="fa-solid fa-envelope"></i> info@myersglobalpathways.com</a>
      <a href="https://wa.me/231889425645" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp" style="color:#25D366;"></i> WhatsApp Us</a>
    </div>
  </div>
</div>

<!-- 2. Primary Header & Sticky Navigation -->
<header class="mgp-header">
  <div class="container">
    <div class="mgp-header-inner">
      
      <!-- Brand Logo & Founder Tag -->
      <a href="<?php echo esc_url(home_url('/')); ?>" class="mgp-brand-logo">
        <div class="mgp-logo-badge">
          <i class="fa-solid fa-globe"></i>
        </div>
        <div class="mgp-brand-text">
          <h1>Myers Global Pathways</h1>
          <p>Founded by Menlaiday Myers Dahn (B.Sc. CS)</p>
        </div>
      </a>

      <!-- Desktop Nav Links -->
      <nav class="mgp-nav">
        <?php
        if (has_nav_menu('primary-menu')) {
          wp_nav_menu(array(
            'theme_location' => 'primary-menu',
            'container'      => false,
            'menu_class'     => 'mgp-nav-links',
            'fallback_cb'    => false,
          ));
        } else {
        ?>
          <ul class="mgp-nav-links">
            <li><a href="<?php echo esc_url(home_url('/')); ?>">Home</a></li>
            <li><a href="<?php echo esc_url(home_url('/#explorer')); ?>">Study In India</a></li>
            <li><a href="<?php echo esc_url(home_url('/#about')); ?>">About Founder</a></li>
            <li><a href="<?php echo esc_url(home_url('/#ventures')); ?>">Myers Group</a></li>
            <li><a href="<?php echo esc_url(home_url('/#services')); ?>">Services</a></li>
            <li><a href="<?php echo esc_url(home_url('/#contact')); ?>">Contact</a></li>
          </ul>
        <?php } ?>
      </nav>

      <!-- Action Buttons -->
      <div class="mgp-header-actions">
        <button type="button" data-mgp-modal="mgp-portal-modal" class="mgp-btn mgp-btn-outline" style="font-size: 0.8125rem;">
          <i class="fa-solid fa-folder-open" style="color:#D97706;"></i>
          <span>Student Portal</span>
        </button>

        <button type="button" data-mgp-modal="mgp-apply-modal" class="mgp-btn mgp-btn-gold">
          <i class="fa-solid fa-paper-plane"></i>
          <span>Apply Now</span>
        </button>

        <!-- Mobile Toggle Button -->
        <button type="button" class="mgp-btn mgp-btn-outline mgp-mobile-menu-toggle" style="display: inline-flex; padding: 0.5rem;" aria-label="Toggle Navigation">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>

    </div>
  </div>
</header>
