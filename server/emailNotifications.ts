import nodemailer from 'nodemailer';

export interface EmailTemplateResult {
  subject: string;
  text: string;
  html: string;
  statusBadgeColor: string;
  statusBadgeBg: string;
}

export interface DispatchEmailResult {
  success: boolean;
  delivered?: boolean;
  subject: string;
  recipient: string;
  mode: 'gmail_api' | 'smtp' | 'dossier_logged';
  code?: 'SENT' | 'INVALID_RECIPIENT' | 'EMAIL_NOT_CONFIGURED' | 'DELIVERY_FAILED';
  messageId?: string;
  threadId?: string;
  senderEmail?: string;
  previewText: string;
  error?: string;
  missingConfig?: string[];
  logEntry?: any;
}

export interface EmailServiceStatus {
  configured: boolean;
  activeProvider: 'gmail_api' | 'smtp' | 'none';
  gmailOAuth: {
    connected: boolean;
    email: string;
    updatedAt: string | null;
  };
  smtp: {
    configured: boolean;
    host: string | null;
    from: string;
  };
  missingRequirements: string[];
}

// In-memory server-side Google Workspace OAuth token storage (never exposed to client)
let serverWorkspaceToken: string | null = null;
let serverWorkspaceUserEmail: string = 'admissions@myersglobalpathways.com';
let tokenUpdatedAt: string | null = null;

export function setServerWorkspaceToken(token: string, email: string = 'admissions@myersglobalpathways.com') {
  serverWorkspaceToken = token;
  serverWorkspaceUserEmail = email;
  tokenUpdatedAt = new Date().toISOString();
  console.log(`[Workspace OAuth] Active Google Workspace OAuth token registered for: ${email}`);
}

export function clearServerWorkspaceToken() {
  serverWorkspaceToken = null;
  tokenUpdatedAt = null;
  console.log(`[Workspace OAuth] Google Workspace OAuth token cleared.`);
}

export function getServerWorkspaceTokenInfo() {
  return {
    isConnected: Boolean(serverWorkspaceToken),
    connected: Boolean(serverWorkspaceToken),
    email: serverWorkspaceUserEmail,
    updatedAt: tokenUpdatedAt
  };
}

export function isSmtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  );
}

export function getEmailServiceStatus(bearerToken?: string): EmailServiceStatus {
  const hasGmailToken = Boolean(bearerToken || serverWorkspaceToken);
  const hasSmtp = isSmtpConfigured();
  const activeProvider: 'gmail_api' | 'smtp' | 'none' = hasGmailToken
    ? 'gmail_api'
    : hasSmtp
    ? 'smtp'
    : 'none';

  const missingRequirements: string[] = [];
  if (!hasGmailToken && !hasSmtp) {
    missingRequirements.push(
      'Connect Google Workspace Gmail OAuth (admissions@myersglobalpathways.com) using the "Connect Google Workspace" button in the Admin Dashboard',
      'OR configure server SMTP environment variables: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (and optional SMTP_FROM)'
    );
  }

  return {
    configured: hasGmailToken || hasSmtp,
    activeProvider,
    gmailOAuth: {
      connected: hasGmailToken,
      email: serverWorkspaceUserEmail,
      updatedAt: tokenUpdatedAt
    },
    smtp: {
      configured: hasSmtp,
      host: process.env.SMTP_HOST || null,
      from: process.env.SMTP_FROM || 'Myers Global Pathways Admissions <admissions@myersglobalpathways.com>'
    },
    missingRequirements
  };
}

/**
 * Creates RFC 2822 standard email message encoded as URL-safe base64 for Gmail API
 */
function createRawMimeMessage({
  to,
  subject,
  html,
  text,
  from = 'Myers Global Pathways Admissions <admissions@myersglobalpathways.com>',
  replyTo = 'admissions@myersglobalpathways.com'
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
  from?: string;
  replyTo?: string;
}): string {
  const boundary = `__mgp_mail_boundary_${Date.now()}__`;
  
  // Clean header strings
  const cleanTo = to.replace(/[\r\n]/g, '');
  const cleanFrom = from.replace(/[\r\n]/g, '');
  const cleanReplyTo = replyTo.replace(/[\r\n]/g, '');
  const encodedSubject = `=?UTF-8?B?${Buffer.from(subject, 'utf-8').toString('base64')}?=`;

  const mimeParts = [
    `From: ${cleanFrom}`,
    `To: ${cleanTo}`,
    `Reply-To: ${cleanReplyTo}`,
    `Subject: ${encodedSubject}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    Buffer.from(text, 'utf-8').toString('base64'),
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    Buffer.from(html, 'utf-8').toString('base64'),
    '',
    `--${boundary}--`
  ];

  const fullMimeString = mimeParts.join('\r\n');

  // Convert to URL-safe Base64 as required by Google Gmail API
  return Buffer.from(fullMimeString, 'utf-8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Generates tailored, branded email notifications for each application status transition & submission confirmation
 */
export function generateStatusEmail(
  app: any,
  newStatus: string,
  customNote?: string,
  appUrl?: string
): EmailTemplateResult {
  const applicantName = app.fullName || 'Valued Applicant';
  const trackingId = app.trackingId || app.id || 'MGP-REFERENCE';
  const program = app.preferredCourse || app.preferredStudyLevel || 'Selected Degree Program';
  const university = app.preferredUniversity || 'Affiliated Indian University Partner';
  const baseUrl = appUrl || process.env.APP_URL || 'https://myersglobalpathways.com';
  const studentPortalUrl = `${baseUrl.replace(/\/$/, '')}?portal=true&ref=${encodeURIComponent(trackingId)}`;

  let subject = `Admissions Update: ${newStatus} [Ref: ${trackingId}] - Myers Global Pathways`;
  let headline = `Application Status: ${newStatus}`;
  let subheadline = `Your admissions file has advanced to the next processing stage.`;
  let badgeColor = '#0f172a';
  let badgeBg = '#f1f5f9';
  let bodyParagraphs: string[] = [];
  let nextSteps: string[] = [];
  let showAdmissionBox = false;

  switch (newStatus) {
    case 'Application Received':
    case 'Application Submitted':
    case 'Submission Confirmation':
    case 'New Application':
      badgeColor = '#1d4ed8';
      badgeBg = '#dbeafe';
      subject = `🎉 Application Received & Registered [Ref: ${trackingId}] - Myers Global Pathways`;
      headline = `Official Application Received & Registered`;
      subheadline = `Welcome to Myers Global Pathways! Your international application to study in India is now in our system.`;
      bodyParagraphs = [
        `Dear ${applicantName},`,
        `Thank you for submitting your official application to study in India through Myers Global Pathways for the <strong>${program}</strong> program at <strong>${university}</strong>.`,
        `Your application dossier has been assigned official tracking reference <strong>${trackingId}</strong> with <strong>${app.documentsCount || app.documents?.length || 0}</strong> attached document(s).`,
        customNote ? `<strong>Admissions Notice:</strong> ${customNote}` : `Our international admissions desk is reviewing your academic credentials and qualifications to initiate preliminary evaluation and matching.`
      ];
      nextSteps = [
        `Track your real-time application processing, document verification, and status updates 24/7 on the Myers Student Portal.`,
        `Our senior admissions advisor will reach out via WhatsApp (${app.whatsapp || 'registered number'}) or Email to guide your next milestones.`,
        `Keep your Application Reference ID: <strong>${trackingId}</strong> handy for all communications with our admissions team.`
      ];
      break;

    case 'Documents Requested':
      badgeColor = '#b45309';
      badgeBg = '#fef3c7';
      subject = `Application Received – Submission of Supporting Documents`;
      headline = `Supporting Documents Requested`;
      subheadline = `Please submit your clear, complete supporting documents so our Admissions Desk can proceed with your application.`;
      bodyParagraphs = [
        `Dear ${applicantName},`,
        `We have received your application (Reference: <strong>${trackingId}</strong>) for <strong>${program}</strong> in India and are ready to proceed to document review.`,
        `Kindly submit your required supporting documents via Email at <strong>admissions@myersglobalpathways.com</strong> or WhatsApp at <strong>+231 889425645</strong>.`,
        customNote ? `<strong>Admissions Notice:</strong> ${customNote}` : `Please ensure all submitted documents are clear, complete, and readable so our admissions team can review and forward your application to the University.`
      ];
      nextSteps = [
        `Send clear copies of your passport, academic certificates, and transcripts to admissions@myersglobalpathways.com or WhatsApp +231 889425645.`,
        `Include your Application Reference (${trackingId}) when submitting your documents.`,
        `Once received, our team will confirm receipt and begin reviewing your file.`
      ];
      break;

    case 'Documents Received':
      badgeColor = '#0f766e';
      badgeBg = '#ccfbf1';
      subject = `✅ Supporting Documents Received [Ref: ${trackingId}] - Myers Global Pathways`;
      headline = `Supporting Documents Received`;
      subheadline = `Thank you! Our Admissions Desk has received your supporting documents and queued them for evaluation.`;
      bodyParagraphs = [
        `Dear ${applicantName},`,
        `This is to confirm that we have received your supporting documents for your application (Reference: <strong>${trackingId}</strong>) for <strong>${program}</strong> in India.`,
        customNote ? `<strong>Admissions Notice:</strong> ${customNote}` : `Your documents have been added to your official dossier and will shortly move to our Academic Document Review stage.`
      ];
      nextSteps = [
        `Our admissions committee will inspect each document for completeness and university compliance.`,
        `You will be notified once your documents enter formal review or if any clarification is required.`
      ];
      break;

    case 'Documents Under Review':
    case 'Documents Review':
    case 'Document Verification':
      badgeColor = '#0369a1';
      badgeBg = '#e0f2fe';
      subject = `📋 Academic Documents Under Review [Ref: ${trackingId}] - Myers Global Pathways`;
      headline = `Academic Documents Under Verification`;
      subheadline = `Our senior credentials evaluation committee is currently inspecting your uploaded academic transcripts, passport, and certificates.`;
      bodyParagraphs = [
        `Dear ${applicantName},`,
        `Thank you for applying through Myers Global Pathways for the <strong>${program}</strong> program at <strong>${university}</strong>.`,
        `We are pleased to inform you that your application dossier (Application Ref: <strong>${trackingId}</strong>) has successfully passed initial intake screening and is now under formal <strong>Academic Document Verification</strong>.`,
        customNote ? `<strong>Counselor Note:</strong> ${customNote}` : `Our admissions evaluators are validating your academic prerequisites and calculating subject equivalencies to ensure eligibility for direct university placement.`
      ];
      nextSteps = [
        `Document verification turnaround is typically 24–48 business hours.`,
        `You can log into the Myers Student Portal at any time to verify that all required certificates are uploaded.`,
        `If additional documentation is needed, your dedicated counselor will contact you via WhatsApp or Email.`
      ];
      break;

    case 'Application Submitted to University':
    case 'University Review':
    case 'Under Review':
      badgeColor = '#6d28d9';
      badgeBg = '#f3e8ff';
      subject = `🏛️ Application Submitted to University [Ref: ${trackingId}] - Myers Global Pathways`;
      headline = `Application Submitted to University`;
      subheadline = `Your verified dossier has been forwarded to the University Admissions Directorate for formal assessment & placement.`;
      bodyParagraphs = [
        `Dear ${applicantName},`,
        `Your application dossier (Ref: <strong>${trackingId}</strong>) has been verified and officially submitted to the Admissions Directorate for <strong>${university}</strong>.`,
        `The academic board is now reviewing your program suitability for <strong>${program}</strong>, seat availability for the upcoming intake, and evaluating your profile for institutional scholarship waivers.`,
        customNote ? `<strong>Admissions Notice:</strong> ${customNote}` : `Myers Global Pathways maintains direct institutional ties with university leadership to expedite admissions decisions for international candidates.`
      ];
      nextSteps = [
        `The University Committee typically issues admission recommendations within 2–4 working days.`,
        `Upon approval, your official Offer Letter / Provisional Admission Letter will be issued.`,
        `Track live evaluation progress in your Student Portal.`
      ];
      break;

    case 'Offer Letter Received':
    case 'Admission Decision':
      badgeColor = '#047857';
      badgeBg = '#d1fae5';
      showAdmissionBox = true;
      subject = `🎉 Congratulations! Official Offer Letter Received [Ref: ${trackingId}] - Myers Global Pathways`;
      headline = `Official Offer Letter Received!`;
      subheadline = `Congratulations! The University Admissions Board has issued your official admission offer.`;
      bodyParagraphs = [
        `Dear ${applicantName},`,
        `We are thrilled to congratulate you on your official admission to study in India through Myers Global Pathways!`,
        `The University Admissions Board has formally reviewed your credentials and issued an <strong>Official Provisional Admission Offer</strong> for <strong>${app.admissionDetails?.approvedProgram || program}</strong> at <strong>${app.admissionDetails?.approvedUniversity || university}</strong>.`,
        customNote ? `<strong>Director's Message:</strong> ${customNote}` : `Your provisional admission letter and scholarship grant details are now available for instant download in your Student Portal.`
      ];
      nextSteps = [
        `Download your Official Offer Letter directly from the Myers Student Portal.`,
        `Review tuition fee schedules, merit waiver allocations, and semester registration deadlines.`,
        `Your dedicated admissions counselor will connect with you to initiate your Indian Student Visa application.`
      ];
      break;

    case 'Visa Preparation':
      badgeColor = '#b45309';
      badgeBg = '#fef3c7';
      subject = `✈️ Next Steps: Indian Student Visa Processing [Ref: ${trackingId}] - Myers Global Pathways`;
      headline = `Indian Student Visa Preparation`;
      subheadline = `Your file has transitioned to visa filing, embassy interview guidance, and bonafide document collation.`;
      bodyParagraphs = [
        `Dear ${applicantName},`,
        `Following your successful admission offer for <strong>${program}</strong>, your file is now in the <strong>Visa Preparation & Travel Logistics</strong> stage.`,
        `Our international student mobility team in Monrovia, Accra, and Bangalore will assist you step-by-step with your Indian Student Visa application, documentation checklist, and embassy appointments.`,
        customNote ? `<strong>Visa Guidance:</strong> ${customNote}` : `Having the correct visa dossier prepared avoids delays and ensures smooth student visa issuance.`
      ];
      nextSteps = [
        `Prepare your valid International Passport (minimum 6 months validity).`,
        `Obtain 4 passport-size photographs (2x2 inch, white background) according to Indian visa specifications.`,
        `Schedule your 1-on-1 Visa Briefing with counselor Menlaiday Myers.`
      ];
      break;

    case 'Ready for India':
      badgeColor = '#059669';
      badgeBg = '#ecfdf5';
      subject = `🌟 Final Clearance: You Are Ready for India! [Ref: ${trackingId}] - Myers Global Pathways`;
      headline = `Ready for India — Pre-Departure Briefing`;
      subheadline = `Congratulations! Your visa, admissions clearance, and arrival logistics are verified.`;
      bodyParagraphs = [
        `Dear ${applicantName},`,
        `You are officially marked <strong>Ready for India</strong>! All prerequisite admission and visa milestones have been completed.`,
        `Our on-ground student reception officers in India are notified and preparing for your arrival, airport transfer, hostel check-in, and campus orientation.`,
        customNote ? `<strong>Arrival Briefing:</strong> ${customNote}` : `We look forward to welcoming you to campus in India and supporting you throughout your academic journey!`
      ];
      nextSteps = [
        `Share your flight itinerary with your counselor at least 72 hours prior to departure for airport pickup scheduling.`,
        `Review our Pre-Departure Packing & Travel Guide in the Student Portal.`,
        `Carry original academic transcripts and provisional offer letter in your hand luggage.`
      ];
      break;

    default:
      badgeColor = '#1e293b';
      badgeBg = '#f1f5f9';
      subject = `Status Update on Your Application [Ref: ${trackingId}] - Myers Global Pathways`;
      headline = `Application Status: ${newStatus}`;
      subheadline = `Your application profile has been updated in our admissions database.`;
      bodyParagraphs = [
        `Dear ${applicantName},`,
        `This is an automated status notification regarding your study application (Ref: <strong>${trackingId}</strong>) for <strong>${program}</strong> at <strong>${university}</strong>.`,
        `Your application status is now updated to: <strong>${newStatus}</strong>.`,
        customNote ? `<strong>Admissions Note:</strong> ${customNote}` : `Please feel free to check the Student Portal for complete details or contact our admissions desk.`
      ];
      nextSteps = [
        `Access the live Myers Student Portal using your reference code: ${trackingId}.`,
        `Reach out to admissions@myersglobalpathways.com if you have any questions.`
      ];
      break;
  }

  // Generate clean Plain Text version
  const plainText = `MYERS GLOBAL PATHWAYS - ADMISSIONS NOTIFICATION
==================================================

Application Reference: ${trackingId}
Applicant Name: ${applicantName}
Current Status: ${newStatus}
Program: ${program}
University: ${university}

${bodyParagraphs.map(p => p.replace(/<[^>]+>/g, '')).join('\n\n')}

RECOMMENDED NEXT STEPS:
${nextSteps.map((s, idx) => `${idx + 1}. ${s.replace(/<[^>]+>/g, '')}`).join('\n')}

ACCESS YOUR LIVE STUDENT PORTAL:
${studentPortalUrl}

Admissions Office:
Myers Global Pathways
Email: admissions@myersglobalpathways.com
WhatsApp: +91 92013 30946 / +231 881 234 567
Website: ${baseUrl}`;

  // Generate responsive HTML Email template
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Email Container -->
        <table role="presentation" width="100%" max-width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
          
          <!-- Top Header Banner -->
          <tr>
            <td style="background-color: #0b1f3a; padding: 28px 28px; text-align: center; border-bottom: 3px solid #c5922e;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center">
                    <div style="display: inline-block; background-color: #ffffff; padding: 10px 16px; border-radius: 10px; margin-bottom: 12px;">
                      <img src="https://myersglobalpathways.com/mgp-logo-full.png" alt="Myers Global Pathways" width="136" style="display: block; height: auto; max-width: 136px; border: 0;" />
                    </div>
                    <p style="margin: 0; color: #cbd5e1; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Admissions Directorate &amp; Student Mobility Hub</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Status Highlight Strip -->
          <tr>
            <td style="padding: 24px 28px 12px 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <div style="display: inline-block; background-color: ${badgeBg}; color: ${badgeColor}; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 6px 14px; border-radius: 9999px; border: 1px solid ${badgeColor}33;">
                      Status: ${newStatus}
                    </div>
                    <h2 style="margin: 14px 0 6px 0; color: #0f172a; font-size: 20px; font-weight: 800; line-height: 1.3;">${headline}</h2>
                    <p style="margin: 0; color: #64748b; font-size: 13px;">${subheadline}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Application Reference Card -->
          <tr>
            <td style="padding: 12px 28px;">
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size: 13px;">
                  <tr>
                    <td style="padding: 4px 0; color: #64748b; width: 40%;">Application Ref:</td>
                    <td style="padding: 4px 0; color: #0f172a; font-weight: 700; font-family: monospace; font-size: 14px;">${trackingId}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #64748b;">Applicant:</td>
                    <td style="padding: 4px 0; color: #0f172a; font-weight: 600;">${applicantName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #64748b;">Program:</td>
                    <td style="padding: 4px 0; color: #0f172a; font-weight: 600;">${program}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #64748b;">University:</td>
                    <td style="padding: 4px 0; color: #0f172a; font-weight: 600;">${university}</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          ${showAdmissionBox && app.admissionDetails ? `
          <!-- Admission Offer Details Box -->
          <tr>
            <td style="padding: 12px 28px;">
              <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px; padding: 18px 20px;">
                <h3 style="margin: 0 0 12px 0; color: #065f46; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">✓ Official Admission Offer Summary</h3>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size: 13px; color: #064e3b;">
                  <tr>
                    <td style="padding: 3px 0; font-weight: 600;">Approved Program:</td>
                    <td style="padding: 3px 0; font-weight: 700;">${app.admissionDetails.approvedProgram || program}</td>
                  </tr>
                  <tr>
                    <td style="padding: 3px 0; font-weight: 600;">Scholarship Grant:</td>
                    <td style="padding: 3px 0; font-weight: 700; color: #047857;">${app.admissionDetails.scholarshipPercentage || '20% Global Merit Waiver'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 3px 0; font-weight: 600;">Net Tuition Fee:</td>
                    <td style="padding: 3px 0; font-weight: 700;">$${app.admissionDetails.tuitionFeeUsd || '2,800'}/year</td>
                  </tr>
                  <tr>
                    <td style="padding: 3px 0; font-weight: 600;">Intake Semester:</td>
                    <td style="padding: 3px 0; font-weight: 700;">${app.admissionDetails.intakeSemester || 'Fall Intake 2026'}</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
          ` : ''}

          <!-- Main Message Body -->
          <tr>
            <td style="padding: 12px 28px 20px 28px; font-size: 14px; color: #334155; line-height: 1.7;">
              ${bodyParagraphs.map(p => `<p style="margin: 0 0 14px 0;">${p}</p>`).join('')}
            </td>
          </tr>

          <!-- Next Steps Section -->
          <tr>
            <td style="padding: 0 28px 24px 28px;">
              <div style="background-color: #f1f5f9; border-radius: 12px; padding: 18px 20px;">
                <h4 style="margin: 0 0 10px 0; font-size: 13px; font-weight: 800; text-transform: uppercase; color: #0f172a; letter-spacing: 0.5px;">Recommended Next Steps:</h4>
                <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #334155; line-height: 1.6;">
                  ${nextSteps.map(s => `<li style="margin-bottom: 6px;">${s}</li>`).join('')}
                </ul>
              </div>
            </td>
          </tr>

          <!-- Action Button: Open Student Portal -->
          <tr>
            <td align="center" style="padding: 0 28px 32px 28px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="border-radius: 10px; background-color: #f59e0b;">
                    <a href="${studentPortalUrl}" target="_blank" style="display: inline-block; padding: 14px 28px; font-size: 14px; font-weight: 700; color: #0b192c; text-decoration: none; border-radius: 10px; text-transform: uppercase; letter-spacing: 0.5px;">
                      Open Live Student Portal →
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 10px 0 0 0; font-size: 11px; color: #94a3b8;">Click above to view your full status dossier, documents, and official letters.</p>
            </td>
          </tr>

          <!-- Footer Signature & Contact Info -->
          <tr>
            <td style="background-color: #f8fafc; padding: 24px 28px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center;">
              <p style="margin: 0 0 6px 0; font-weight: 700; color: #0f172a;">Myers Global Pathways Admissions Directorate</p>
              <p style="margin: 0 0 8px 0;">Official Indian University Placement Partner for African & International Students</p>
              <p style="margin: 0; line-height: 1.5;">
                <strong>Inquiries:</strong> admissions@myersglobalpathways.com • 
                <strong>WhatsApp:</strong> +91 92013 30946 / +231 881 234 567<br>
                <strong>Website:</strong> <a href="${baseUrl}" target="_blank" style="color: #d97706; text-decoration: underline;">myersglobalpathways.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return {
    subject,
    text: plainText,
    html,
    statusBadgeColor: badgeColor,
    statusBadgeBg: badgeBg
  };
}

/**
 * Dispatches an automated email notification via Google Workspace / Gmail API (OAuth 2.0)
 * and logs it to the student's communication dossier.
 */
export async function dispatchStatusNotificationEmail(
  app: any,
  newStatus: string,
  options: {
    customNote?: string;
    author?: string;
    baseUrl?: string;
    bearerToken?: string; // Optional client-provided Bearer token
  } = {}
): Promise<DispatchEmailResult> {
  const recipient = app.email;
  if (!recipient || !recipient.includes('@')) {
    return {
      success: false,
      subject: `Status Update: ${newStatus}`,
      recipient: recipient || 'No email provided',
      mode: 'dossier_logged',
      previewText: 'No valid recipient email address found on file.',
      error: 'Applicant does not have a valid email address on file.'
    };
  }

  const emailContent = generateStatusEmail(app, newStatus, options.customNote, options.baseUrl);
  const author = options.author || 'Admissions Automation Engine';
  let mode: 'gmail_api' | 'dossier_logged' = 'dossier_logged';
  let messageId: string | undefined;
  let threadId: string | undefined;
  let errorMsg: string | undefined;

  // Active OAuth access token priority: 1) Explicit token passed in options, 2) Server in-memory session token
  const activeToken = options.bearerToken || serverWorkspaceToken;

  if (activeToken) {
    try {
      const rawMessage = createRawMimeMessage({
        to: recipient,
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
        from: 'Myers Global Pathways Admissions <admissions@myersglobalpathways.com>',
        replyTo: 'admissions@myersglobalpathways.com'
      });

      const gmailResponse = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${activeToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ raw: rawMessage })
      });

      const gmailData: any = await gmailResponse.json();

      if (gmailResponse.ok && gmailData.id) {
        mode = 'gmail_api';
        messageId = gmailData.id;
        threadId = gmailData.threadId;
        console.log(`[Gmail API OAuth] Successfully sent email to ${recipient} via admissions@myersglobalpathways.com (ID: ${gmailData.id})`);
      } else {
        const errorDetail = gmailData.error?.message || JSON.stringify(gmailData);
        console.warn(`[Gmail API OAuth] Gmail API send returned status ${gmailResponse.status}:`, errorDetail);
        errorMsg = errorDetail;
      }
    } catch (apiErr: any) {
      console.warn(`[Gmail API OAuth] Dispatch exception:`, apiErr.message);
      errorMsg = apiErr.message;
    }
  } else {
    console.log(`[Email Service] Automated status email generated for ${recipient} [${newStatus}]. Token not active; logged to application communication dossier.`);
  }

  // Ensure communication log is attached to application
  if (!app.communicationLogs) {
    app.communicationLogs = [];
  }

  const logEntry = {
    id: `comm-auto-email-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type: 'email' as const,
    recipient: recipient,
    subject: emailContent.subject,
    message: emailContent.text,
    sentBy: `${author} (${mode === 'gmail_api' ? 'Dispatched via Google Workspace Gmail API' : 'Automated Email Hub'})`,
    timestamp: new Date().toISOString()
  };

  app.communicationLogs.unshift(logEntry);

  return {
    success: true,
    delivered: mode === 'gmail_api',
    subject: emailContent.subject,
    recipient,
    mode,
    messageId,
    threadId,
    senderEmail: 'admissions@myersglobalpathways.com',
    previewText: emailContent.text.slice(0, 160) + '...',
    error: errorMsg,
    logEntry
  };
}

// ============================================================================
// APPLICATION RECEIVED – SUPPORTING DOCUMENTS REQUEST EMAIL FEATURE
// ============================================================================

export const SUPPORTING_DOCUMENTS_EMAIL_SUBJECT =
  'Application Received – Submission of Supporting Documents';

const OFFICIAL_ADMISSIONS_EMAIL = 'admissions@myersglobalpathways.com';
const OFFICIAL_WHATSAPP_NUMBER = '+231 889425645';
const OFFICIAL_WEBSITE_URL = 'https://myersglobalpathways.com';

function escapeHtml(input: string): string {
  return String(input || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export interface SupportingDocumentsEmailPayload {
  studentName: string;
  applicationId: string;
  courseName: string;
  recipient: string;
  subject: string;
  text: string;
  html: string;
}

/**
 * Generates the official "Application Received – Supporting Documents Request"
 * template (plain text + branded mobile-friendly HTML), supporting optional
 * edits made by the admissions officer before sending.
 */
export function generateSupportingDocumentsRequestEmail(
  app: any,
  overrides?: {
    subject?: string;
    bodyText?: string;
    recipientEmail?: string;
  }
): SupportingDocumentsEmailPayload {
  const studentName = String(app?.fullName || 'Applicant').trim();
  const applicationId = String(app?.trackingId || app?.id || 'MGP-PENDING').trim();
  const courseName = String(
    app?.preferredCourse || app?.preferredStudyLevel || 'your selected program'
  ).trim();
  const recipient = String(overrides?.recipientEmail || app?.email || '').trim().toLowerCase();

  const subject = String(
    overrides?.subject?.trim() || SUPPORTING_DOCUMENTS_EMAIL_SUBJECT
  ).replace(/[\r\n]/g, ' ');

  const defaultBodyText = `Dear ${studentName},

Greetings from the Admissions Desk at Myers Global Pathways.

We are pleased to inform you that we have successfully received your application (Reference: ${applicationId}) for ${courseName} in India.

To proceed with the next stage of your admission process, we kindly request that you submit your required supporting documents through either of the following channels:

Email: ${OFFICIAL_ADMISSIONS_EMAIL}

WhatsApp: ${OFFICIAL_WHATSAPP_NUMBER}

Please ensure that all submitted documents are clear, complete and readable so our admissions team can review and process your application.

Once we receive your documents, our team will review them and forward your application to the University for further assessment.

If you have any questions or need assistance with the document submission process, please feel free to contact us.

We look forward to assisting you with your admission journey to India.

Warm regards,

Admissions Committee
Myers Global Pathways
Email: ${OFFICIAL_ADMISSIONS_EMAIL}
Website: ${OFFICIAL_WEBSITE_URL}`;

  const text = (overrides?.bodyText && overrides.bodyText.trim().length > 0)
    ? overrides.bodyText.trim()
    : defaultBodyText;

  const safeSubject = escapeHtml(subject);
  const safeStudentName = escapeHtml(studentName);
  const safeAppId = escapeHtml(applicationId);
  const safeCourseName = escapeHtml(courseName);

  const rawParagraphs = text
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/)
    .map(p => p.trim())
    .filter(Boolean);

  const signOffIdx = rawParagraphs.findIndex(p => /^warm regards,?$/i.test(p));
  const mainParagraphs = signOffIdx >= 0 ? rawParagraphs.slice(0, signOffIdx) : rawParagraphs;
  const customSignatureParagraphs = signOffIdx >= 0 ? rawParagraphs.slice(signOffIdx) : [];

  const emailLineIdx = mainParagraphs.findIndex(p =>
    /^Email:\s*admissions@myersglobalpathways\.com$/i.test(p)
  );
  const whatsappLineIdx = mainParagraphs.findIndex(p =>
    /^WhatsApp:\s*\+231\s*889425645$/i.test(p)
  );
  const hasChannelLines = emailLineIdx !== -1 && whatsappLineIdx !== -1;

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
                <a href="mailto:${OFFICIAL_ADMISSIONS_EMAIL}?subject=${encodeURIComponent(`Supporting Documents – ${applicationId} – ${studentName}`)}" style="color: #1d4ed8; font-weight: 700; text-decoration: none; word-break: break-all;">${OFFICIAL_ADMISSIONS_EMAIL}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 6px 0; vertical-align: top; width: 96px; color: #64748b; font-weight: 700;">WhatsApp:</td>
              <td style="padding: 6px 0; vertical-align: top;">
                <a href="https://wa.me/231889425645" target="_blank" style="color: #047857; font-weight: 700; text-decoration: none;">${OFFICIAL_WHATSAPP_NUMBER}</a>
              </td>
            </tr>
          </table>
          <p style="margin: 12px 0 0 0; padding-top: 10px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #475569; line-height: 1.5;">
            <strong>Submission Tip:</strong> Include your reference number <strong style="color: #0f172a; font-family: monospace;">${safeAppId}</strong> when sending your files. Clear PDF scans or sharp, readable photos are accepted.
          </p>
        </td>
      </tr>
    </table>`;

  const renderedBlocks: string[] = [];
  let channelCardInserted = false;

  mainParagraphs.forEach((para, idx) => {
    if (hasChannelLines && (idx === emailLineIdx || idx === whatsappLineIdx)) {
      if (!channelCardInserted) {
        renderedBlocks.push(channelCardHtml);
        channelCardInserted = true;
      }
      return;
    }

    const escapedRefRegex = new RegExp(
      escapeHtml(applicationId).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
      'g'
    );
    const formattedHtml = escapeHtml(para)
      .replace(/\n/g, '<br />')
      .replace(
        escapedRefRegex,
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
            const safe = escapeHtml(p).replace(/\n/g, '<br />');
            if (idx === 0) {
              return `<p style="margin: 22px 0 10px 0; font-size: 15px; color: #334155; line-height: 1.6;">${safe}</p>`;
            }
            return `<p style="margin: 0 0 8px 0; font-size: 14px; color: #0f172a; line-height: 1.65; font-weight: 600;">${safe
              .replace(
                OFFICIAL_ADMISSIONS_EMAIL,
                `<a href="mailto:${OFFICIAL_ADMISSIONS_EMAIL}" style="color: #1d4ed8; text-decoration: none; font-weight: 600;">${OFFICIAL_ADMISSIONS_EMAIL}</a>`
              )
              .replace(
                OFFICIAL_WEBSITE_URL,
                `<a href="${OFFICIAL_WEBSITE_URL}" target="_blank" style="color: #b45309; text-decoration: underline; font-weight: 600;">${OFFICIAL_WEBSITE_URL}</a>`
              )}</p>`;
          })
          .join('')
      : `<p style="margin: 22px 0 8px 0; font-size: 15px; color: #334155;">Warm regards,</p>
         <p style="margin: 0; font-size: 14px; color: #0f172a; line-height: 1.65;">
           <strong>Admissions Committee</strong><br />
           Myers Global Pathways<br />
           Email: <a href="mailto:${OFFICIAL_ADMISSIONS_EMAIL}" style="color: #1d4ed8; text-decoration: none;">${OFFICIAL_ADMISSIONS_EMAIL}</a><br />
           Website: <a href="${OFFICIAL_WEBSITE_URL}" target="_blank" style="color: #b45309; text-decoration: underline;">${OFFICIAL_WEBSITE_URL}</a>
         </p>`;

  const html = `<!DOCTYPE html>
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
          <tr>
            <td class="email-pad" style="background-color: #0b192c; padding: 30px 32px; text-align: center; border-bottom: 4px solid #f59e0b;">
              <div style="display: inline-block; background-color: #f59e0b; color: #0b192c; font-weight: 900; font-size: 16px; padding: 5px 13px; border-radius: 7px; letter-spacing: 1.5px; margin-bottom: 10px;">
                MGP
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: -0.3px;">
                Myers Global Pathways
              </h1>
              <p style="margin: 5px 0 0 0; color: #cbd5e1; font-size: 11px; text-transform: uppercase; letter-spacing: 1.6px; font-weight: 600;">
                Admissions Desk &bull; Study in India Advisory
              </p>
            </td>
          </tr>
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
          <tr>
            <td class="email-pad" style="padding: 4px 32px 26px 32px;">
              ${renderedBlocks.join('\n')}
              <div style="margin-top: 18px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
                ${signatureHtml}
              </div>
            </td>
          </tr>
          <tr>
            <td class="email-pad" style="background-color: #0b192c; padding: 20px 32px; text-align: center; color: #94a3b8; font-size: 12px; line-height: 1.6;">
              <p style="margin: 0 0 4px 0; color: #ffffff; font-weight: 700; font-size: 13px;">
                Myers Global Pathways &bull; Admissions Committee
              </p>
              <p style="margin: 0 0 8px 0; color: #cbd5e1; font-size: 11px;">
                Your Pathway to Global Education
              </p>
              <p style="margin: 0; font-size: 12px;">
                Email: <a href="mailto:${OFFICIAL_ADMISSIONS_EMAIL}" style="color: #fbbf24; text-decoration: none;">${OFFICIAL_ADMISSIONS_EMAIL}</a>
                &nbsp;&bull;&nbsp;
                WhatsApp: <a href="https://wa.me/231889425645" target="_blank" style="color: #fbbf24; text-decoration: none;">${OFFICIAL_WHATSAPP_NUMBER}</a><br />
                Website: <a href="${OFFICIAL_WEBSITE_URL}" target="_blank" style="color: #fbbf24; text-decoration: underline;">${OFFICIAL_WEBSITE_URL}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return {
    studentName,
    applicationId,
    courseName,
    recipient,
    subject,
    text,
    html
  };
}

/**
 * Dispatches the official "Application Received – Supporting Documents Request" email
 * via the active email service (Google Workspace Gmail API OAuth or configured SMTP).
 * Always records the delivery attempt (sent or failed) in the student's communicationLogs.
 */
export async function dispatchSupportingDocumentsRequestEmail(
  app: any,
  options: {
    recipientEmail?: string;
    subject?: string;
    bodyText?: string;
    author?: string;
    bearerToken?: string;
  } = {}
): Promise<DispatchEmailResult> {
  const payload = generateSupportingDocumentsRequestEmail(app, {
    recipientEmail: options.recipientEmail,
    subject: options.subject,
    bodyText: options.bodyText
  });

  const author = (options.author || 'Admissions Officer').trim();
  const recipient = payload.recipient;

  // Basic RFC-style email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!recipient || !emailRegex.test(recipient)) {
    return {
      success: false,
      delivered: false,
      code: 'INVALID_RECIPIENT',
      subject: payload.subject,
      recipient: recipient || 'Missing email',
      mode: 'dossier_logged',
      previewText: 'Invalid or missing student email address.',
      error: 'The student application does not have a valid registered email address.'
    };
  }

  const activeToken = options.bearerToken || serverWorkspaceToken;
  const smtpReady = isSmtpConfigured();

  let delivered = false;
  let mode: 'gmail_api' | 'smtp' | 'dossier_logged' = 'dossier_logged';
  let code: DispatchEmailResult['code'] = 'EMAIL_NOT_CONFIGURED';
  let messageId: string | undefined;
  let threadId: string | undefined;
  let errorMsg: string | undefined;
  let missingConfig: string[] | undefined;

  if (activeToken) {
    try {
      const fromHeader = `Myers Global Pathways Admissions <${serverWorkspaceUserEmail || OFFICIAL_ADMISSIONS_EMAIL}>`;
      const rawMessage = createRawMimeMessage({
        to: recipient,
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
        from: fromHeader,
        replyTo: OFFICIAL_ADMISSIONS_EMAIL
      });

      const gmailResponse = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${activeToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ raw: rawMessage })
      });

      const gmailData: any = await gmailResponse.json().catch(() => ({}));

      if (gmailResponse.ok && gmailData.id) {
        delivered = true;
        mode = 'gmail_api';
        code = 'SENT';
        messageId = gmailData.id;
        threadId = gmailData.threadId;
        console.log(`[Supporting Docs Email] Sent via Gmail API to ${recipient} (Ref: ${payload.applicationId}, ID: ${gmailData.id})`);
      } else {
        const detail = gmailData?.error?.message || `Gmail API returned HTTP ${gmailResponse.status}`;
        errorMsg = gmailResponse.status === 401
          ? `Google Workspace session expired (${detail}). Please reconnect Google Workspace in the Admin Dashboard.`
          : `Gmail API delivery failed: ${detail}`;
        code = 'DELIVERY_FAILED';
        console.warn(`[Supporting Docs Email] Gmail API error:`, errorMsg);
      }
    } catch (err: any) {
      errorMsg = `Network error while contacting Gmail API: ${err?.message || 'Unknown error'}`;
      code = 'DELIVERY_FAILED';
      console.warn(`[Supporting Docs Email] Gmail API exception:`, errorMsg);
    }
  } else if (smtpReady) {
    try {
      const port = Number(process.env.SMTP_PORT || 587);
      const secure = process.env.SMTP_SECURE === 'true' || port === 465;
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      const fromAddress =
        process.env.SMTP_FROM || `Myers Global Pathways Admissions <${OFFICIAL_ADMISSIONS_EMAIL}>`;

      const info = await transporter.sendMail({
        from: fromAddress,
        replyTo: OFFICIAL_ADMISSIONS_EMAIL,
        to: recipient,
        subject: payload.subject,
        text: payload.text,
        html: payload.html
      });

      delivered = true;
      mode = 'smtp';
      code = 'SENT';
      messageId = info.messageId;
      console.log(`[Supporting Docs Email] Sent via SMTP to ${recipient} (Ref: ${payload.applicationId}, ID: ${info.messageId})`);
    } catch (smtpErr: any) {
      errorMsg = `SMTP delivery failed: ${smtpErr?.message || 'Unable to connect to mail server'}`;
      code = 'DELIVERY_FAILED';
      console.warn(`[Supporting Docs Email] SMTP exception:`, errorMsg);
    }
  } else {
    const status = getEmailServiceStatus();
    missingConfig = status.missingRequirements;
    code = 'EMAIL_NOT_CONFIGURED';
    errorMsg =
      'No active email service is connected. Please connect Google Workspace (admissions@myersglobalpathways.com) using the button above, or configure SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS on the server.';
    console.warn(`[Supporting Docs Email] Attempt blocked — no active Gmail OAuth token or SMTP configuration.`);
  }

  // Always record the email delivery attempt in the student's application activity history
  if (!Array.isArray(app.communicationLogs)) {
    app.communicationLogs = [];
  }

  const logEntry = {
    id: `comm-docs-req-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type: 'email' as const,
    templateType: 'supporting_documents_request' as const,
    deliveryStatus: delivered ? ('sent' as const) : ('failed' as const),
    deliveryMode: mode,
    messageId,
    error: errorMsg,
    recipient,
    subject: payload.subject,
    message: payload.text,
    sentBy: delivered
      ? `${author} (${mode === 'gmail_api' ? 'Gmail API – Google Workspace' : 'SMTP Mail Server'})`
      : `${author} (Delivery Failed)`,
    timestamp: new Date().toISOString()
  };

  app.communicationLogs.unshift(logEntry);

  return {
    success: delivered,
    delivered,
    code,
    subject: payload.subject,
    recipient,
    mode,
    messageId,
    threadId,
    senderEmail: OFFICIAL_ADMISSIONS_EMAIL,
    previewText: payload.text.slice(0, 180) + (payload.text.length > 180 ? '...' : ''),
    error: errorMsg,
    missingConfig,
    logEntry
  };
}
