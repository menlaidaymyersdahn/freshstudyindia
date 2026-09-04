/**
 * Professional WhatsApp Admissions Messaging System
 * Myers Global Pathways
 */

export type WhatsAppMessageOptionKey =
  | 'application_received'
  | 'documents_required'
  | 'application_update'
  | 'team_will_contact'
  | 'general_assistance';

export interface WhatsAppMessageOption {
  key: WhatsAppMessageOptionKey;
  id: number;
  label: string;
  badge: string;
  summary: string;
  updateText: string;
  suggestedNotes?: string;
}

export const WHATSAPP_MESSAGE_OPTIONS: WhatsAppMessageOption[] = [
  {
    key: 'application_received',
    id: 1,
    label: 'Application Received',
    badge: 'Step 1: Receipt',
    summary: 'Inform the applicant that our team has received their university application and will call them soon to discuss the next steps.',
    updateText: 'our team has received your university application and will call you soon to discuss the next steps.',
    suggestedNotes: 'Please keep your phone line open and available for a brief admissions assessment call.'
  },
  {
    key: 'documents_required',
    id: 2,
    label: 'Documents Required',
    badge: 'Step 2: Verification',
    summary: 'Inform the applicant that their application has been reviewed and that additional or missing documents are required. Ask them to reply with clear copies.',
    updateText: 'your application has been reviewed and additional or missing documents are required. Please reply to this WhatsApp message with clear copies of the required documents.',
    suggestedNotes: 'Kindly provide: (1) High School / WAEC / Bachelor Transcripts, (2) Valid International Passport photo page, and (3) Scratch Card verification details.'
  },
  {
    key: 'application_update',
    id: 3,
    label: 'Application Update',
    badge: 'Step 3: Progress',
    summary: "Provide a professional update regarding the applicant's admission process and clearly explain what happens next.",
    updateText: 'we would like to share a professional update regarding your admission process. Your academic dossier is currently progressing through university evaluation, and our team is preparing the subsequent steps toward your provisional admission letter.',
    suggestedNotes: 'Next stage: University faculty evaluation and issuance of your official Letter of Admission.'
  },
  {
    key: 'team_will_contact',
    id: 4,
    label: 'Team Will Contact You',
    badge: 'Step 4: Direct Call',
    summary: 'Inform the applicant that our admissions team will contact them soon regarding their application.',
    updateText: 'our admissions team will contact you soon regarding your application to guide you through the next requirements.',
    suggestedNotes: 'An international education counselor will reach out via WhatsApp audio call or cellular telephone.'
  },
  {
    key: 'general_assistance',
    id: 5,
    label: 'General Admission Assistance',
    badge: 'Step 5: Support Desk',
    summary: 'Let the applicant know that the Admissions Desk is available to assist them and invite them to ask any questions.',
    updateText: 'the Admissions Desk is available to assist you with any questions or support you may need regarding your studies, scholarships, or travel arrangements.',
    suggestedNotes: 'Feel free to reply with your questions regarding tuition fees, campus hostel accommodation, or visa processing.'
  }
];

export interface WhatsAppMessageParams {
  applicantName: string;
  applicationId: string;
  program: string;
  countryOfStudy: string;
  optionKey: WhatsAppMessageOptionKey;
  additionalMessage?: string;
}

/**
 * Builds the canonical admissions WhatsApp message according to the exact Myers Global Pathways format:
 *
 * Hello [Applicant Name],
 *
 * Greetings from the Admissions Desk at Myers Global Pathways.
 *
 * Regarding your university application ([Application ID]) for [Program] in [Country], [insert the selected update/message here].
 *
 * [Additional Message or Instructions if provided]
 *
 * Our team will contact you soon if further action or information is required.
 *
 * Thank you,
 * Admissions Desk
 * Myers Global Pathways
 */
export const generateWhatsAppAdmissionsMessage = (params: WhatsAppMessageParams): string => {
  const applicantName = params.applicantName?.trim() || '[Applicant Name]';
  const applicationId = params.applicationId?.trim() || '[Application ID]';
  const program = params.program?.trim() || '[Program]';
  const country = params.countryOfStudy?.trim() || 'India';

  const selectedOption =
    WHATSAPP_MESSAGE_OPTIONS.find((opt) => opt.key === params.optionKey) ||
    WHATSAPP_MESSAGE_OPTIONS[0];

  // Clean the update text and ensure proper punctuation
  let updateSentence = selectedOption.updateText.trim();
  if (!updateSentence.endsWith('.')) {
    updateSentence += '.';
  }

  const parts: string[] = [
    `Hello ${applicantName},`,
    `Greetings from the Admissions Desk at Myers Global Pathways.`,
    `Regarding your university application (${applicationId}) for ${program} in ${country}, ${updateSentence}`
  ];

  if (params.additionalMessage && params.additionalMessage.trim()) {
    parts.push(params.additionalMessage.trim());
  }

  parts.push(
    `Our team will contact you soon if further action or information is required.`,
    `Thank you,\nAdmissions Desk\nMyers Global Pathways`
  );

  return parts.join('\n\n');
};

/**
 * Formats a phone number for WhatsApp URL:
 * e.g. +231 88 942 5645 -> 231889425645
 */
export const cleanPhoneNumberForWhatsApp = (phone: string): string => {
  return (phone || '').replace(/[^0-9]/g, '');
};

/**
 * Generates the full WhatsApp Click-to-Chat URL
 */
export const buildWhatsAppUrl = (phone: string, message: string): string => {
  const cleanPhone = cleanPhoneNumberForWhatsApp(phone);
  const encodedText = encodeURIComponent(message);
  return cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodedText}`
    : `https://wa.me/?text=${encodedText}`;
};
