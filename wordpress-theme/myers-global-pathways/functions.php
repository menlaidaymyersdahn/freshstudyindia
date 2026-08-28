<?php
/**
 * Myers Global Pathways Theme Functions and Definitions
 *
 * @package Myers_Global_Pathways
 * @author Menlaiday Myers Dahn
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

define('MGP_THEME_VERSION', '1.0.0');
define('MGP_THEME_DIR', get_template_directory());
define('MGP_THEME_URI', get_template_directory_uri());

/**
 * Sets up theme defaults and registers support for various WordPress features.
 */
function mgp_theme_setup() {
    // Make theme available for translation.
    load_theme_textdomain('myers-global-pathways', get_template_directory() . '/languages');

    // Add default posts and comments RSS feed links to head.
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title.
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails on posts and pages.
    add_theme_support('post-thumbnails');

    // Register Navigation Menus
    register_nav_menus(array(
        'primary-menu' => esc_html__('Primary Header Menu', 'myers-global-pathways'),
        'footer-menu'  => esc_html__('Footer Quick Links', 'myers-global-pathways'),
        'myers-group'  => esc_html__('Myers Group Ventures Menu', 'myers-global-pathways'),
    ));

    // Switch default core markup for search form, comment form, etc. to output valid HTML5.
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));

    // Custom Logo Support
    add_theme_support('custom-logo', array(
        'height'      => 80,
        'width'       => 240,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    // Add theme support for responsive embeds
    add_theme_support('responsive-embeds');
}
add_action('after_setup_theme', 'mgp_theme_setup');

/**
 * Enqueue scripts and styles.
 */
function mgp_theme_scripts() {
    // Google Fonts: Plus Jakarta Sans & Playfair Display
    wp_enqueue_style('mgp-google-fonts', 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap', array(), null);

    // Font Awesome for icons
    wp_enqueue_style('mgp-font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css', array(), '6.5.1');

    // Main Theme Stylesheet
    wp_enqueue_style('mgp-theme-style', get_template_directory_uri() . '/assets/css/main.css', array(), MGP_THEME_VERSION);
    wp_enqueue_style('mgp-style', get_stylesheet_uri(), array('mgp-theme-style'), MGP_THEME_VERSION);

    // Main Theme JavaScript
    wp_enqueue_script('mgp-main-script', get_template_directory_uri() . '/assets/js/main.js', array('jquery'), MGP_THEME_VERSION, true);

    // Pass REST API configuration to JS
    wp_localize_script('mgp-main-script', 'mgpConfig', array(
        'root'        => esc_url_raw(rest_url()),
        'nonce'       => wp_create_nonce('wp_rest'),
        'ajaxUrl'     => admin_url('admin-ajax.php'),
        'whatsapp'    => '+231889425645',
        'themeUri'    => get_template_directory_uri(),
        'companyName' => 'Myers Global Pathways',
        'founder'     => 'Menlaiday Myers Dahn',
    ));
}
add_action('wp_enqueue_scripts', 'mgp_theme_scripts');

/**
 * Register Custom Post Types for Student Applications and Enquiries
 */
function mgp_register_custom_post_types() {
    // 1. Applications Post Type
    $app_labels = array(
        'name'               => _x('Student Applications', 'post type general name', 'myers-global-pathways'),
        'singular_name'      => _x('Application', 'post type singular name', 'myers-global-pathways'),
        'menu_name'          => _x('Admissions', 'admin menu', 'myers-global-pathways'),
        'name_admin_bar'     => _x('Application', 'add new on admin bar', 'myers-global-pathways'),
        'add_new'            => _x('Add New Application', 'application', 'myers-global-pathways'),
        'add_new_item'       => __('Add New Student Application', 'myers-global-pathways'),
        'new_item'           => __('New Application', 'myers-global-pathways'),
        'edit_item'          => __('Edit Application', 'myers-global-pathways'),
        'view_item'          => __('View Application', 'myers-global-pathways'),
        'all_items'          => __('All Applications', 'myers-global-pathways'),
        'search_items'       => __('Search Applications', 'myers-global-pathways'),
        'not_found'          => __('No applications found.', 'myers-global-pathways'),
        'not_found_in_trash' => __('No applications found in Trash.', 'myers-global-pathways')
    );

    $app_args = array(
        'labels'             => $app_labels,
        'description'        => __('Student admissions dossiers and tracking references.', 'myers-global-pathways'),
        'public'             => false,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => false,
        'capability_type'    => 'post',
        'has_archive'        => false,
        'hierarchical'       => false,
        'menu_position'      => 20,
        'menu_icon'          => 'dashicons-welcome-learn-more',
        'supports'           => array('title', 'custom-fields', 'notes'),
        'show_in_rest'       => true
    );
    register_post_type('mgp_application', $app_args);

    // 2. Student Inquiries Post Type
    $inq_labels = array(
        'name'               => _x('Inquiries & Leads', 'post type general name', 'myers-global-pathways'),
        'singular_name'      => _x('Inquiry', 'post type singular name', 'myers-global-pathways'),
        'menu_name'          => _x('Inquiries', 'admin menu', 'myers-global-pathways'),
        'all_items'          => __('All Inquiries', 'myers-global-pathways'),
        'search_items'       => __('Search Inquiries', 'myers-global-pathways'),
    );

    $inq_args = array(
        'labels'             => $inq_labels,
        'public'             => false,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'menu_position'      => 21,
        'menu_icon'          => 'dashicons-email-alt',
        'supports'           => array('title', 'editor', 'custom-fields'),
        'show_in_rest'       => true
    );
    register_post_type('mgp_inquiry', $inq_args);
}
add_action('init', 'mgp_register_custom_post_types');

/**
 * REST API Endpoints for Application Submission & Student Portal Tracking
 */
add_action('rest_api_init', function () {
    // 1. Submit Application
    register_rest_route('mgp/v1', '/apply', array(
        'methods'             => 'POST',
        'callback'            => 'mgp_rest_submit_application',
        'permission_callback' => '__return_true',
    ));

    // 2. Track Application
    register_rest_route('mgp/v1', '/track', array(
        'methods'             => 'GET',
        'callback'            => 'mgp_rest_track_application',
        'permission_callback' => '__return_true',
    ));

    // 3. Document Upload
    register_rest_route('mgp/v1', '/upload-document', array(
        'methods'             => 'POST',
        'callback'            => 'mgp_rest_upload_document',
        'permission_callback' => '__return_true',
    ));
});

/**
 * REST Callback: Submit Student Application
 */
function mgp_rest_submit_application($request) {
    $params = $request->get_json_params();

    $full_name       = sanitize_text_field($params['fullName'] ?? '');
    $email           = sanitize_email($params['email'] ?? '');
    $phone           = sanitize_text_field($params['phone'] ?? '');
    $whatsapp        = sanitize_text_field($params['whatsapp'] ?? $phone);
    $country         = sanitize_text_field($params['country'] ?? 'Liberia');
    $intended_degree = sanitize_text_field($params['intendedDegree'] ?? 'Bachelor');
    $intended_course = sanitize_text_field($params['intendedCourse'] ?? 'Computer Science (B.Sc. / B.Tech)');
    $scholarship     = sanitize_text_field($params['scholarshipRequested'] ?? 'Merit Scholarship');
    $qualification   = sanitize_text_field($params['highestQualification'] ?? '');
    $message         = sanitize_textarea_field($params['message'] ?? '');

    if (empty($full_name) || empty($email) || empty($phone)) {
        return new WP_Error('missing_fields', 'Full name, email, and phone number are required.', array('status' => 400));
    }

    // Generate unique tracking reference code: MGP-2026-XXXX
    $random_num = str_pad(rand(1000, 9999), 4, '0', STR_PAD_LEFT);
    $tracking_id = 'MGP-2026-' . $random_num;

    $post_id = wp_insert_post(array(
        'post_title'   => $full_name . ' (' . $tracking_id . ')',
        'post_type'    => 'mgp_application',
        'post_status'  => 'publish',
        'post_content' => $message,
    ));

    if (is_wp_error($post_id)) {
        return new WP_Error('creation_failed', 'Failed to record application.', array('status' => 500));
    }

    // Store metadata
    update_post_meta($post_id, 'mgp_tracking_id', $tracking_id);
    update_post_meta($post_id, 'mgp_full_name', $full_name);
    update_post_meta($post_id, 'mgp_email', $email);
    update_post_meta($post_id, 'mgp_phone', $phone);
    update_post_meta($post_id, 'mgp_whatsapp', $whatsapp);
    update_post_meta($post_id, 'mgp_country', $country);
    update_post_meta($post_id, 'mgp_intended_degree', $intended_degree);
    update_post_meta($post_id, 'mgp_intended_course', $intended_course);
    update_post_meta($post_id, 'mgp_scholarship', $scholarship);
    update_post_meta($post_id, 'mgp_qualification', $qualification);
    update_post_meta($post_id, 'mgp_status', 'Application Submitted');
    update_post_meta($post_id, 'mgp_submitted_at', current_time('mysql'));

    // Handle initial documents if provided
    $documents = $params['documents'] ?? array();
    if (!empty($documents)) {
        update_post_meta($post_id, 'mgp_documents', $documents);
        update_post_meta($post_id, 'mgp_documents_count', count($documents));
    }

    return rest_ensure_response(array(
        'success'    => true,
        'trackingId' => $tracking_id,
        'message'    => 'Your application has been registered successfully.',
        'application' => array(
            'id'             => $post_id,
            'trackingId'     => $tracking_id,
            'fullName'       => $full_name,
            'email'          => $email,
            'intendedCourse' => $intended_course,
            'status'         => 'Application Submitted',
            'submittedAt'    => current_time('c'),
        )
    ));
}

/**
 * REST Callback: Track Student Application
 */
function mgp_rest_track_application($request) {
    $ref = sanitize_text_field($request->get_param('ref') ?? '');

    if (empty($ref)) {
        return new WP_Error('missing_ref', 'Tracking reference ID or email is required.', array('status' => 400));
    }

    $args = array(
        'post_type'      => 'mgp_application',
        'posts_per_page' => 1,
        'post_status'    => 'publish',
        'meta_query'     => array(
            'relation' => 'OR',
            array(
                'key'     => 'mgp_tracking_id',
                'value'   => $ref,
                'compare' => '='
            ),
            array(
                'key'     => 'mgp_email',
                'value'   => $ref,
                'compare' => '='
            )
        )
    );

    $query = new WP_Query($args);

    if (!$query->have_posts()) {
        return new WP_Error('not_found', 'No application found with reference ' . esc_html($ref), array('status' => 404));
    }

    $post = $query->posts[0];
    $post_id = $post->ID;

    $application = array(
        'id'             => $post_id,
        'trackingId'     => get_post_meta($post_id, 'mgp_tracking_id', true),
        'fullName'       => get_post_meta($post_id, 'mgp_full_name', true),
        'email'          => get_post_meta($post_id, 'mgp_email', true),
        'phone'          => get_post_meta($post_id, 'mgp_phone', true),
        'whatsapp'       => get_post_meta($post_id, 'mgp_whatsapp', true),
        'country'        => get_post_meta($post_id, 'mgp_country', true),
        'intendedDegree' => get_post_meta($post_id, 'mgp_intended_degree', true),
        'intendedCourse' => get_post_meta($post_id, 'mgp_intended_course', true),
        'status'         => get_post_meta($post_id, 'mgp_status', true) ?: 'Application Submitted',
        'documents'      => get_post_meta($post_id, 'mgp_documents', true) ?: array(),
        'submittedAt'    => get_post_meta($post_id, 'mgp_submitted_at', true),
    );

    return rest_ensure_response(array(
        'success'     => true,
        'application' => $application
    ));
}

/**
 * REST Callback: Student Upload Additional Documents Later
 */
function mgp_rest_upload_document($request) {
    $params = $request->get_json_params();
    $target_ref = sanitize_text_field($params['trackingId'] ?? '');
    $incoming_docs = $params['documents'] ?? array();
    $student_note = sanitize_textarea_field($params['studentNote'] ?? '');

    if (empty($target_ref) || empty($incoming_docs)) {
        return new WP_Error('invalid_payload', 'Tracking reference and documents are required.', array('status' => 400));
    }

    $args = array(
        'post_type'      => 'mgp_application',
        'posts_per_page' => 1,
        'post_status'    => 'publish',
        'meta_query'     => array(
            'relation' => 'OR',
            array('key' => 'mgp_tracking_id', 'value' => $target_ref, 'compare' => '='),
            array('key' => 'mgp_email', 'value' => $target_ref, 'compare' => '=')
        )
    );

    $query = new WP_Query($args);

    if (!$query->have_posts()) {
        return new WP_Error('not_found', 'Application dossier not found.', array('status' => 404));
    }

    $post_id = $query->posts[0]->ID;
    $existing_docs = get_post_meta($post_id, 'mgp_documents', true) ?: array();
    $merged_docs = array_merge($existing_docs, $incoming_docs);

    update_post_meta($post_id, 'mgp_documents', $merged_docs);
    update_post_meta($post_id, 'mgp_documents_count', count($merged_docs));
    update_post_meta($post_id, 'mgp_last_updated', current_time('mysql'));

    if (!empty($student_note)) {
        $notes = get_post_meta($post_id, 'mgp_student_notes', true) ?: array();
        $notes[] = array(
            'date' => current_time('mysql'),
            'note' => $student_note
        );
        update_post_meta($post_id, 'mgp_student_notes', $notes);
    }

    return rest_ensure_response(array(
        'success'   => true,
        'message'   => 'Successfully uploaded ' . count($incoming_docs) . ' document(s) to your dossier.',
        'documents' => $merged_docs
    ));
}
