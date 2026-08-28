/**
 * Myers Global Pathways - Main Theme JavaScript
 * Author: Menlaiday Myers Dahn
 */

(function ($) {
  'use strict';

  $(document).ready(function () {
    // 1. Mobile Menu Drawer Toggle
    $('.mgp-mobile-menu-toggle').on('click', function () {
      $('.mgp-mobile-drawer').toggleClass('active');
    });
    $('.mgp-mobile-drawer-close').on('click', function () {
      $('.mgp-mobile-drawer').removeClass('active');
    });

    // 2. Modal Open/Close System
    $('[data-mgp-modal]').on('click', function (e) {
      e.preventDefault();
      var targetModal = $(this).data('mgp-modal');
      $('#' + targetModal).addClass('active');
      $('body').css('overflow', 'hidden');
    });

    $('.mgp-modal-close, .mgp-modal-backdrop').on('click', function (e) {
      if ($(e.target).hasClass('mgp-modal-backdrop') || $(e.target).closest('.mgp-modal-close').length) {
        $('.mgp-modal-backdrop').removeClass('active');
        $('body').css('overflow', 'auto');
      }
    });

    // 3. FAQ Accordion
    $('.mgp-faq-question').on('click', function () {
      var item = $(this).closest('.mgp-faq-item');
      item.siblings().removeClass('active').find('.mgp-faq-answer').slideUp(200);
      item.toggleClass('active').find('.mgp-faq-answer').slideToggle(200);
    });

    // 4. Explorer Category Filter Tabs
    $('.mgp-tab-btn').on('click', function () {
      var targetCat = $(this).data('category');
      $('.mgp-tab-btn').removeClass('active');
      $(this).addClass('active');

      if (targetCat === 'all') {
        $('.mgp-course-card').fadeIn(200);
      } else {
        $('.mgp-course-card').hide();
        $('.mgp-course-card[data-category="' + targetCat + '"]').fadeIn(200);
      }
    });

    // 5. Admissions Application Form Submission via REST API
    $('#mgp-apply-form').on('submit', function (e) {
      e.preventDefault();
      var form = $(this);
      var submitBtn = form.find('button[type="submit"]');
      var statusMsg = form.find('.mgp-form-status');

      var payload = {
        fullName: form.find('[name="fullName"]').val(),
        email: form.find('[name="email"]').val(),
        phone: form.find('[name="phone"]').val(),
        whatsapp: form.find('[name="whatsapp"]').val() || form.find('[name="phone"]').val(),
        country: form.find('[name="country"]').val(),
        intendedDegree: form.find('[name="intendedDegree"]').val(),
        intendedCourse: form.find('[name="intendedCourse"]').val(),
        scholarshipRequested: form.find('[name="scholarshipRequested"]').val(),
        highestQualification: form.find('[name="highestQualification"]').val(),
        message: form.find('[name="message"]').val(),
      };

      submitBtn.prop('disabled', true).text('Processing Application...');
      statusMsg.html('<p class="text-blue-600">Submitting your admissions profile...</p>');

      $.ajax({
        url: (window.mgpConfig ? window.mgpConfig.root : '/wp-json/') + 'mgp/v1/apply',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        beforeSend: function (xhr) {
          if (window.mgpConfig && window.mgpConfig.nonce) {
            xhr.setRequestHeader('X-WP-Nonce', window.mgpConfig.nonce);
          }
        },
        success: function (res) {
          submitBtn.prop('disabled', false).text('Submit Application');
          if (res.success) {
            form.html(
              '<div class="mgp-success-card" style="text-align:center; padding:2rem; background:#F0FDF4; border:1px solid #86EFAC; border-radius:1.5rem;">' +
              '<div style="width:50px; height:50px; border-radius:50%; background:#22C55E; color:#fff; display:flex; align-items:center; justify-content:center; margin:0 auto 1rem; font-size:1.5rem;"><i class="fa-solid fa-check"></i></div>' +
              '<h3 style="font-size:1.5rem; font-weight:800; color:#14532D;">Application Registered!</h3>' +
              '<p style="margin:0.5rem 0; color:#166534;">Your official tracking reference is:</p>' +
              '<div style="font-size:1.5rem; font-weight:800; font-family:monospace; color:#B45309; background:#FEF3C7; padding:0.75rem 1.5rem; border-radius:0.75rem; display:inline-block; margin:0.5rem 0;">' + res.trackingId + '</div>' +
              '<p style="font-size:0.875rem; color:#4B5563; margin-top:1rem;">You can use this reference code in the <strong>Student Portal</strong> at any time to verify status and upload academic transcripts.</p>' +
              '</div>'
            );
          }
        },
        error: function (xhr) {
          submitBtn.prop('disabled', false).text('Submit Application');
          var err = xhr.responseJSON ? xhr.responseJSON.message : 'Error submitting application. Please try again.';
          statusMsg.html('<p style="color:#DC2626; font-size:0.875rem; margin-top:0.5rem;">' + err + '</p>');
        }
      });
    });

    // 6. Student Portal Status & Document Lookup
    $('#mgp-portal-track-form').on('submit', function (e) {
      e.preventDefault();
      var form = $(this);
      var query = form.find('[name="trackingReference"]').val().trim();
      var resultBox = $('#mgp-portal-result');
      var submitBtn = form.find('button[type="submit"]');

      if (!query) return;

      submitBtn.prop('disabled', true).text('Searching Dossier...');
      resultBox.html('<div style="padding:2rem; text-align:center;"><i class="fa-solid fa-spinner fa-spin"></i> Retrieving verification record...</div>');

      $.ajax({
        url: (window.mgpConfig ? window.mgpConfig.root : '/wp-json/') + 'mgp/v1/track?ref=' + encodeURIComponent(query),
        method: 'GET',
        success: function (res) {
          submitBtn.prop('disabled', false).text('Verify Status');
          if (res.success && res.application) {
            var app = res.application;
            var html = 
              '<div class="mgp-dossier-card" style="background:#ffffff; border:1px solid #BAE6FD; border-radius:1.5rem; padding:1.5rem; margin-top:1.5rem;">' +
                '<div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #E2E8F0; padding-bottom:1rem; margin-bottom:1rem;">' +
                  '<div>' +
                    '<span style="font-size:0.75rem; font-weight:700; color:#2563EB; text-transform:uppercase;">Application Dossier</span>' +
                    '<h3 style="font-size:1.25rem; font-weight:800; color:#0F172A;">' + app.fullName + '</h3>' +
                    '<p style="font-size:0.875rem; color:#64748B;">' + app.intendedCourse + ' (' + app.country + ')</p>' +
                  '</div>' +
                  '<div style="text-align:right;">' +
                    '<span style="display:inline-block; font-size:0.75rem; font-weight:800; text-transform:uppercase; padding:0.25rem 0.75rem; border-radius:9999px; background:#FEF3C7; color:#B45309;">' + app.status + '</span>' +
                    '<p style="font-size:0.75rem; font-family:monospace; font-weight:700; color:#475569; margin-top:0.25rem;">' + app.trackingId + '</p>' +
                  '</div>' +
                '</div>' +

                '<div style="margin-bottom:1.5rem;">' +
                  '<h4 style="font-size:0.875rem; font-weight:700; text-transform:uppercase; color:#334155; margin-bottom:0.5rem;">Attached Documents (' + (app.documents ? app.documents.length : 0) + ')</h4>' +
                  '<div id="mgp-dossier-doc-list" style="display:grid; grid-template-columns:1fr; gap:0.5rem;">';

            if (app.documents && app.documents.length > 0) {
              app.documents.forEach(function (doc) {
                html += '<div style="padding:0.75rem 1rem; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:0.75rem; display:flex; justify-content:space-between; align-items:center; font-size:0.875rem;">' +
                          '<span><i class="fa-solid fa-file-pdf" style="color:#DC2626; margin-right:0.5rem;"></i> ' + doc.name + '</span>' +
                          '<span style="font-size:0.75rem; font-weight:700; color:#059669;">' + (doc.verified ? 'Verified' : 'Under Review') + '</span>' +
                        '</div>';
              });
            } else {
              html += '<p style="font-size:0.875rem; color:#64748B; font-style:italic;">No documents uploaded yet. You can upload required transcripts below.</p>';
            }

            html += '</div></div>' +
                '<div style="background:#F0F9FF; border:1px dashed #7DD3FC; border-radius:1rem; padding:1.25rem; margin-top:1rem;">' +
                  '<h5 style="font-size:0.875rem; font-weight:700; color:#0369A1; margin-bottom:0.5rem;"><i class="fa-solid fa-cloud-arrow-up"></i> Upload Additional Documents Later</h5>' +
                  '<p style="font-size:0.75rem; color:#0C4A6E; margin-bottom:0.75rem;">Select your WAEC certificates, university transcripts, or passport page for verification.</p>' +
                  '<input type="file" id="mgp-later-doc-input" multiple style="font-size:0.875rem; margin-bottom:0.75rem;" />' +
                  '<button type="button" id="mgp-submit-later-docs" data-tracking="' + app.trackingId + '" class="mgp-btn mgp-btn-gold" style="font-size:0.75rem; padding:0.5rem 1rem;">Upload to Dossier</button>' +
                  '<div id="mgp-upload-status" style="margin-top:0.5rem;"></div>' +
                '</div>' +
              '</div>';

            resultBox.html(html);
          }
        },
        error: function (xhr) {
          submitBtn.prop('disabled', false).text('Verify Status');
          var msg = xhr.responseJSON ? xhr.responseJSON.message : 'Application not found with that tracking reference.';
          resultBox.html('<div style="padding:1.5rem; background:#FEF2F2; border:1px solid #FECACA; border-radius:1rem; color:#991B1B; font-size:0.875rem; margin-top:1.5rem;"><i class="fa-solid fa-circle-exclamation"></i> ' + msg + '</div>');
        }
      });
    });

    // 7. Handle Student Document Upload in Portal
    $(document).on('click', '#mgp-submit-later-docs', function () {
      var trackingId = $(this).data('tracking');
      var fileInput = document.getElementById('mgp-later-doc-input');
      var statusDiv = $('#mgp-upload-status');

      if (!fileInput || !fileInput.files.length) {
        statusDiv.html('<p style="color:#DC2626; font-size:0.75rem;">Please choose at least one file first.</p>');
        return;
      }

      var docs = [];
      Array.from(fileInput.files).forEach(function (f) {
        docs.push({
          name: f.name,
          size: f.size,
          formattedSize: (f.size / (1024 * 1024)).toFixed(2) + ' MB',
          type: f.type,
          category: 'Academic Transcripts',
          uploadedAt: new Date().toISOString()
        });
      });

      statusDiv.html('<p style="color:#2563EB; font-size:0.75rem;"><i class="fa-solid fa-spinner fa-spin"></i> Uploading documents...</p>');

      $.ajax({
        url: (window.mgpConfig ? window.mgpConfig.root : '/wp-json/') + 'mgp/v1/upload-document',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          trackingId: trackingId,
          documents: docs
        }),
        success: function (res) {
          if (res.success) {
            statusDiv.html('<p style="color:#059669; font-size:0.75rem; font-weight:700;"><i class="fa-solid fa-check"></i> ' + res.message + '</p>');
            // Re-trigger search to refresh view
            $('#mgp-portal-track-form').trigger('submit');
          }
        },
        error: function () {
          statusDiv.html('<p style="color:#DC2626; font-size:0.75rem;">Upload failed. Please try again or email documents directly to admissions@myersglobalpathways.com</p>');
        }
      });
    });

  });
})(jQuery);
