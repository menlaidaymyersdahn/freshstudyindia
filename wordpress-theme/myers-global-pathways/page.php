<?php
/**
 * Generic Page Template
 *
 * @package Myers_Global_Pathways
 * @author Menlaiday Myers Dahn
 */

get_header();
?>

<main id="primary" class="site-main" style="padding: 4rem 0;">
  <div class="container" style="max-width: 900px;">
    <?php while (have_posts()) : the_post(); ?>
      <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
        <header class="entry-header" style="margin-bottom: 2rem; border-bottom: 1px solid #E2E8F0; padding-bottom: 1rem;">
          <h1 class="entry-title" style="font-size: 2.25rem; font-weight: 800; color: #0F172A;">
            <?php the_title(); ?>
          </h1>
        </header>

        <div class="entry-content" style="font-size: 1rem; color: #334155; line-height: 1.8;">
          <?php the_content(); ?>
        </div>
      </article>
    <?php endwhile; ?>
  </div>
</main>

<?php
get_footer();
