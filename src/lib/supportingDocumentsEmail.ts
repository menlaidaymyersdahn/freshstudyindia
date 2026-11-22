import { ApplicationSubmission } from '../types';

export const SUPPORTING_DOCS_DEFAULT_SUBJECT =
  'Application Received – Submission of Supporting Documents';

export const SUPPORTING_DOCS_ADMISSIONS_EMAIL = 'admissions@myersglobalpathways.com';
export const SUPPORTING_DOCS_WHATSAPP = '+231 889425645';
export const SUPPORTING_DOCS_WEBSITE = 'https://myersglobalpathways.com';

export interface SupportingDocumentsTemplateData {
  studentName: string;
  applicationId: string;
  courseName: string;
  recipientEmail: string;
  subject: string;
  bodyText: string;
}

/**
 * Escapes HTML special characters to ensure student data and officer edits are safely rendered.
 */
export function escapeEmailHtml(input: string): string {
  return String(input || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Generates the official "Application Received – Supporting Documents Request" email content
 * populated automatically with the student's application details.
 */
export function buildSupportingDocumentsTemplate(
  app: Pick<
    ApplicationSubmission,
    'id' | 'trackingId' | 'fullName' | 'email' | 'preferredCourse' | 'preferredStudyLevel'
  >
): SupportingDocumentsTemplateData {
  const studentName = (app.fullName || 'Applicant').trim();
  const applicationId = (app.trackingId || app.id || 'MGP-PENDING').trim();
  const courseName = (
    app.preferredCourse ||
    app.preferredStudyLevel ||
    'your selected program'
  ).trim();
  const recipientEmail = (app.email || '').trim();

  const bodyText = `Dear ${studentName},

Greetings from the Admissions Desk at Myers Global Pathways.

We are pleased to inform you that we have successfully received your application (Reference: ${applicationId}) for ${courseName} in India.

To proceed with the next stage of your admission process, we kindly request that you submit your required supporting documents through either of the following channels:

Email: ${SUPPORTING_DOCS_ADMISSIONS_EMAIL}

WhatsApp: ${SUPPORTING_DOCS_WHATSAPP}

Please ensure that all submitted documents are clear, complete and readable so our admissions team can review and process your application.

Once we receive your documents, our team will review them and forward your application to the University for further assessment.

If you have any questions or need assistance with the document submission process, please feel free to contact us.

We look forward to assisting you with your admission journey to India.

Warm regards,

Admissions Committee
Myers Global Pathways
Email: ${SUPPORTING_DOCS_ADMISSIONS_EMAIL}
Website: ${SUPPORTING_DOCS_WEBSITE}`;

  return {
    studentName,
    applicationId,
    courseName,
    recipientEmail,
    subject: SUPPORTING_DOCS_DEFAULT_SUBJECT,
    bodyText,
  };
}

/**
 * Renders the branded, mobile-friendly Myers Global Pathways HTML email for
 * "Application Received – Supporting Documents Request", preserving any edits
 * made by the admissions officer to the subject or body text.
 */
export function renderSupportingDocumentsHtml(params: {
  studentName: string;
  applicationId: string;
  courseName: string;
  subject: string;
  bodyText: string;
}): string {
  const safeSubject = escapeEmailHtml(params.subject || SUPPORTING_DOCS_DEFAULT_SUBJECT);
  const safeStudentName = escapeEmailHtml(params.studentName || 'Applicant');
  const safeAppId = escapeEmailHtml(params.applicationId || 'MGP-REF');
  const safeCourseName = escapeEmailHtml(params.courseName || 'Degree Program');

  // Split officer-editable body into paragraphs while stripping the trailing signature lines
  // if they match the official signature block so we don't duplicate the branded signature footer.
  const rawParagraphs = (params.bodyText || '')
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  // Identify where the official signature begins ("Warm regards,") so we style it cleanly
  const signOffIdx = rawParagraphs.findIndex((p) => /^warm regards,?$/i.test(p));
  const mainParagraphs = signOffIdx >= 0 ? rawParagraphs.slice(0, signOffIdx) : rawParagraphs;
  const customSignatureParagraphs =
    signOffIdx >= 0 ? rawParagraphs.slice(signOffIdx) : [];

  // Filter out standalone raw "Email: ..." / "WhatsApp: ..." lines from the prose flow ONLY when
  // both appear right after the channels intro, because we render them in the prominent branded
  // Document Submission Channels card right in place!
  const emailLineIdx = mainParagraphs.findIndex((p) =>
    /^Email:\s*admissions@myersglobalpathways\.com$/i.test(p)
  );
  const whatsappLineIdx = mainParagraphs.findIndex((p) =>
    /^WhatsApp:\s*\+231\s*889425645$/i.test(p)
  );
  const hasChannelLines = emailLineIdx !== -1 && whatsappLineIdx !== -1;

  const renderedBlocks: string[] = [];
  let channelCardInserted = false;

  const channelCardHtml = `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 18px 0 22px 0; background-color: #f8fafc; border: 1px solid #cbd5e1; border-left: 4px solid #0b192c; border-radius: 10px;">
      <tr>
        <td style="padding: 18px 20px;">
          <p style="margin: 0 0 12px 0; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #0b192c;">
            Official Document Submission Channels
          </p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size: 14px;">
            <tr>
              <td style="padding: 6px 0; vertical-align: top; width: 96px; color: #64748b; font-weight: 700;">Email:</td>
              <td style="padding: 6px 0; vertical-align: top;">
                <a href="mailto:${SUPPORTING_DOCS_ADMISSIONS_EMAIL}?subject=${encodeURIComponent(`Supporting Documents – ${params.applicationId} – ${params.studentName}`)}" style="color: #1d4ed8; font-weight: 700; text-decoration: none; word-break: break-all;">${SUPPORTING_DOCS_ADMISSIONS_EMAIL}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 6px 0; vertical-align: top; width: 96px; color: #64748b; font-weight: 700;">WhatsApp:</td>
              <td style="padding: 6px 0; vertical-align: top;">
                <a href="https://wa.me/231889425645" target="_blank" style="color: #047857; font-weight: 700; text-decoration: none;">${SUPPORTING_DOCS_WHATSAPP}</a>
              </td>
            </tr>
          </table>
          <p style="margin: 12px 0 0 0; padding-top: 10px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #475569; line-height: 1.5;">
            <strong>Submission Tip:</strong> Include your reference number <strong style="color: #0f172a; font-family: monospace;">${safeAppId}</strong> when sending your files. Clear PDF scans or sharp, readable photos are accepted.
          </p>
        </td>
      </tr>
    </table>`;

  mainParagraphs.forEach((para, idx) => {
    if (hasChannelLines && (idx === emailLineIdx || idx === whatsappLineIdx)) {
      if (!channelCardInserted) {
        renderedBlocks.push(channelCardHtml);
        channelCardInserted = true;
      }
      return;
    }

    const formattedHtml = escapeEmailHtml(para)
      .replace(/\n/g, '<br />')
      .replace(
        new RegExp(escapeEmailHtml(params.applicationId).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
        `<strong style="color: #0b192c; font-family: monospace;">${safeAppId}</strong>`
      );

    renderedBlocks.push(
      `<p style="margin: 0 0 15px 0; font-size: 15px; color: #334155; line-height: 1.7;">${formattedHtml}</p>`
    );
  });

  if (!channelCardInserted) {
    renderedBlocks.push(channelCardHtml);
  }

  const signatureHtml =
    customSignatureParagraphs.length > 0
      ? customSignatureParagraphs
          .map((p, idx) => {
            const safe = escapeEmailHtml(p).replace(/\n/g, '<br />');
            if (idx === 0) {
              return `<p style="margin: 22px 0 10px 0; font-size: 15px; color: #334155; line-height: 1.6;">${safe}</p>`;
            }
            return `<p style="margin: 0 0 8px 0; font-size: 14px; color: #0f172a; line-height: 1.65; font-weight: 600;">${safe
              .replace(
                SUPPORTING_DOCS_ADMISSIONS_EMAIL,
                `<a href="mailto:${SUPPORTING_DOCS_ADMISSIONS_EMAIL}" style="color: #1d4ed8; text-decoration: none; font-weight: 600;">${SUPPORTING_DOCS_ADMISSIONS_EMAIL}</a>`
              )
              .replace(
                SUPPORTING_DOCS_WEBSITE,
                `<a href="${SUPPORTING_DOCS_WEBSITE}" target="_blank" style="color: #b45309; text-decoration: underline; font-weight: 600;">${SUPPORTING_DOCS_WEBSITE}</a>`
              )}</p>`;
          })
          .join('')
      : `<p style="margin: 22px 0 8px 0; font-size: 15px; color: #334155;">Warm regards,</p>
         <p style="margin: 0; font-size: 14px; color: #0f172a; line-height: 1.65;">
           <strong>Admissions Committee</strong><br />
           Myers Global Pathways<br />
           Email: <a href="mailto:${SUPPORTING_DOCS_ADMISSIONS_EMAIL}" style="color: #1d4ed8; text-decoration: none;">${SUPPORTING_DOCS_ADMISSIONS_EMAIL}</a><br />
           Website: <a href="${SUPPORTING_DOCS_WEBSITE}" target="_blank" style="color: #b45309; text-decoration: underline;">${SUPPORTING_DOCS_WEBSITE}</a>
         </p>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${safeSubject}</title>
  <style>
    @media only screen and (max-width: 600px) {
      .email-outer { padding: 12px 6px !important; }
      .email-card { border-radius: 12px !important; }
      .email-pad { padding-left: 18px !important; padding-right: 18px !important; }
      .ref-cell { display: block !important; width: 100% !important; padding-bottom: 10px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; -webkit-font-smoothing: antialiased;">
  <table role="presentation" class="email-outer" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f1f5f9; padding: 28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" class="email-card" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 620px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);">
          
          <!-- Branded Header -->
          <tr>
            <td class="email-pad" style="background-color: #0b1f3a; padding: 28px 32px; text-align: center; border-bottom: 4px solid #c5922e;">
              <div style="display: inline-block; background-color: #ffffff; padding: 10px 16px; border-radius: 10px; margin-bottom: 12px;">
                <img src="https://myersglobalpathways.com/mgp-logo-full.png" alt="Myers Global Pathways" width="132" style="display: block; height: auto; max-width: 132px; border: 0;" />
              </div>
              <p style="margin: 0; color: #cbd5e1; font-size: 11px; text-transform: uppercase; letter-spacing: 1.6px; font-weight: 600;">
                Admissions Desk &bull; Study in India Advisory
              </p>
            </td>
          </tr>

          <!-- Status Tag & Title -->
          <tr>
            <td class="email-pad" style="padding: 26px 32px 14px 32px;">
              <div style="display: inline-block; background-color: #fef3c7; color: #92400e; border: 1px solid #fcd34d; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; padding: 5px 12px; border-radius: 999px;">
                Action Required &bull; Supporting Documents
              </div>
              <h2 style="margin: 14px 0 4px 0; color: #0f172a; font-size: 20px; font-weight: 800; line-height: 1.3;">
                ${safeSubject}
              </h2>
            </td>
          </tr>

          <!-- Application Reference Summary Strip -->
          <tr>
            <td class="email-pad" style="padding: 6px 32px 18px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;">
                <tr>
                  <td style="padding: 14px 18px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td class="ref-cell" width="50%" style="vertical-align: top; padding-right: 10px;">
                          <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.8px; color: #64748b; font-weight: 700;">Applicant Name</div>
                          <div style="font-size: 14px; color: #0f172a; font-weight: 700; margin-top: 2px;">${safeStudentName}</div>
                        </td>
                        <td class="ref-cell" width="50%" style="vertical-align: top;">
                          <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.8px; color: #64748b; font-weight: 700;">Application Reference</div>
                          <div style="font-size: 14px; color: #1d4ed8; font-weight: 800; font-family: monospace; margin-top: 2px;">${safeAppId}</div>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding-top: 10px; border-top: 1px solid #e2e8f0;">
                          <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.8px; color: #64748b; font-weight: 700;">Selected Course &amp; Destination</div>
                          <div style="font-size: 14px; color: #0f172a; font-weight: 600; margin-top: 2px;">${safeCourseName} &mdash; India</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Email Body -->
          <tr>
            <td class="email-pad" style="padding: 4px 32px 26px 32px;">
              ${renderedBlocks.join('\n')}
              <div style="margin-top: 18px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
                ${signatureHtml}
              </div>
            </td>
          </tr>

          <!-- Official Branded Footer -->
          <tr>
            <td class="email-pad" style="background-color: #0b192c; padding: 20px 32px; text-align: center; color: #94a3b8; font-size: 12px; line-height: 1.6;">
              <p style="margin: 0 0 4px 0; color: #ffffff; font-weight: 700; font-size: 13px;">
                Myers Global Pathways &bull; Admissions Committee
              </p>
              <p style="margin: 0 0 8px 0; color: #cbd5e1; font-size: 11px;">
                Your Pathway to Global Education
              </p>
              <p style="margin: 0; font-size: 12px;">
                Email: <a href="mailto:${SUPPORTING_DOCS_ADMISSIONS_EMAIL}" style="color: #fbbf24; text-decoration: none;">${SUPPORTING_DOCS_ADMISSIONS_EMAIL}</a>
                &nbsp;&bull;&nbsp;
                WhatsApp: <a href="https://wa.me/231889425645" target="_blank" style="color: #fbbf24; text-decoration: none;">${SUPPORTING_DOCS_WHATSAPP}</a><br />
                Website: <a href="${SUPPORTING_DOCS_WEBSITE}" target="_blank" style="color: #fbbf24; text-decoration: underline;">${SUPPORTING_DOCS_WEBSITE}</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
