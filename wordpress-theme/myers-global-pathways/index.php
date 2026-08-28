<?php
/**
 * Main Index Fallback Template
 *
 * @package Myers_Global_Pathways
 * @author Menlaiday Myers Dahn
 */

get_header();
?>

<main id="primary" class="site-main" style="padding: 4rem 0;">
  <div class="container">
    <header class="page-header" style="margin-bottom: 2rem; border-bottom: 1px solid #E2E8F0; padding-bottom: 1rem;">
      <h1 class="page-title" style="font-size: 2rem; font-weight: 800; color: #0F172A;">
        <?php single_post_title(); ?>
      </h1>
    </header>

    <?php if (have_posts()) : ?>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem;">
        <?php while (have_posts()) : the_post(); ?>
          <article id="post-<?php the_ID(); ?>" <?php post_class('mgp-post-card'); ?> style="background:#fff; border:1px solid #E2E8F0; border-radius:1.5rem; padding:1.5rem;">
            <?php if (has_post_thumbnail()) : ?>
              <div style="margin-bottom: 1rem; border-radius: 1rem; overflow: hidden;">
                <?php the_post_thumbnail('medium_large', array('style' => 'width:100%; height:200px; object-fit:cover;')); ?>
              </div>
            <?php endif; ?>
            <h2 style="font-size: 1.25rem; font-weight: 800; color: #0F172A; margin-bottom: 0.5rem;">
              <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
            </h2>
            <div style="font-size: 0.875rem; color: #64748B; margin-bottom: 1rem;">
              <?php the_excerpt(); ?>
            </div>
            <a href="<?php the_permalink(); ?>" class="mgp-btn mgp-btn-outline" style="font-size: 0.75rem;">Read More &rarr;</a>
          </article>
        <?php endwhile; ?>
      </div>
      <div style="margin-top: 2rem;">
        <?php the_posts_navigation(); ?>
      </div>
    <?php else : ?>
      <p>No content found.</p>
    <?php endif; ?>
  </div>
</main>

<?php
get_footer();
