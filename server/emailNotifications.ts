export interface EmailTemplateResult {
  subject: string;
  text: string;
  html: string;
  statusBadgeColor: string;
  statusBadgeBg: string;
}

export interface DispatchEmailResult {
  success: boolean;
  subject: string;
  recipient: string;
  mode: 'gmail_api' | 'dossier_logged';
  messageId?: string;
  threadId?: string;
  senderEmail?: string;
  previewText: string;
  error?: string;
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
    email: serverWorkspaceUserEmail,
    updatedAt: tokenUpdatedAt
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

    case 'University Review':
    case 'Under Review':
      badgeColor = '#6d28d9';
      badgeBg = '#f3e8ff';
      subject = `🏛️ University Committee Review in Progress [Ref: ${trackingId}] - Myers Global Pathways`;
      headline = `Application Under University Review`;
      subheadline = `Your verified dossier has been presented to the University Admissions Directorate for formal placement & scholarship allocation.`;
      bodyParagraphs = [
        `Dear ${applicantName},`,
        `Your application dossier (Ref: <strong>${trackingId}</strong>) has been verified and officially forwarded to the Admissions Directorate for <strong>${university}</strong>.`,
        `The academic board is now reviewing your program suitability for <strong>${program}</strong>, seat availability for the upcoming intake, and evaluating your profile for institutional scholarship waivers.`,
        customNote ? `<strong>Admissions Notice:</strong> ${customNote}` : `Myers Global Pathways maintains direct institutional ties with university leadership to expedite admissions decisions for international candidates.`
      ];
      nextSteps = [
        `The University Committee typically issues admission recommendations within 2–4 working days.`,
        `Upon approval, your official Provisional Admission Letter with institutional scholarship details will be issued.`,
        `Track live evaluation progress in your Student Portal.`
      ];
      break;

    case 'Admission Decision':
      badgeColor = '#047857';
      badgeBg = '#d1fae5';
      showAdmissionBox = true;
      subject = `🎉 Congratulations! Provisional Admission Offer Granted [Ref: ${trackingId}] - Myers Global Pathways`;
      headline = `Official Admission Offer Issued!`;
      subheadline = `Congratulations! The Admissions Board has approved your admission into Indian higher education.`;
      bodyParagraphs = [
        `Dear ${applicantName},`,
        `We are thrilled to congratulate you on your official admission to study in India through Myers Global Pathways!`,
        `The University Admissions Board has formally reviewed your credentials and issued an <strong>Official Provisional Admission Offer</strong> for <strong>${app.admissionDetails?.approvedProgram || program}</strong> at <strong>${app.admissionDetails?.approvedUniversity || university}</strong>.`,
        customNote ? `<strong>Director's Message:</strong> ${customNote}` : `Your provisional admission letter and scholarship grant details are now available for instant download in your Student Portal.`
      ];
      nextSteps = [
        `Download your Official Provisional Admission Letter directly from the Myers Student Portal.`,
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
            <td style="background-color: #0b192c; padding: 32px 28px; text-align: center; border-bottom: 3px solid #f59e0b;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center">
                    <div style="display: inline-block; background-color: #f59e0b; color: #0b192c; font-weight: 900; font-size: 18px; padding: 6px 14px; border-radius: 8px; letter-spacing: 1px; margin-bottom: 10px;">MGP</div>
                    <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">Myers Global Pathways</h1>
                    <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Admissions Directorate & Student Mobility Hub</p>
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
    subject: emailContent.subject,
    recipient,
    mode,
    messageId,
    threadId,
    senderEmail: 'admissions@myersglobalpathways.com',
    previewText: emailContent.text.slice(0, 160) + '...',
    error: errorMsg
  };
}
