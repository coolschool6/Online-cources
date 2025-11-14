/**
 * Email Service for Genius Academy
 * Uses EmailJS for client-side email sending
 * 
 * Setup Instructions:
 * 1. Sign up at https://www.emailjs.com/
 * 2. Create an email service (Gmail, Outlook, etc.)
 * 3. Create email templates for each type
 * 4. Replace the IDs below with your actual EmailJS credentials
 */

// EmailJS Configuration - REPLACE WITH YOUR ACTUAL IDs
const EMAILJS_CONFIG = {
  publicKey: 'Bc96UGs_w_Tn4JOy9', // Your EmailJS Public Key
  serviceId: 'service_t52m0im', // Your Gmail service
  templates: {
    welcome: 'template_welcome',
    enrollment: 'template_enrollment',
    progress: 'template_progress',
    certificate: 'template_certificate',
    contact: 'template_contact'
  }
};

// Initialize EmailJS
function initEmailService() {
  if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_CONFIG.publicKey);
    console.log('Email service initialized');
  } else {
    console.warn('EmailJS not configured. Please add your EmailJS credentials to email-service.js');
  }
}

/**
 * Send Welcome Email on Signup
 */
async function sendWelcomeEmail(userName, userEmail) {
  if (EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
    console.log('EmailJS not configured - skipping welcome email');
    return { success: false, message: 'Email service not configured' };
  }

  try {
    const templateParams = {
      to_name: userName,
      to_email: userEmail,
      from_name: 'Genius Academy',
      reply_to: 'support@geniusacademy.com',
      message: `Welcome to Genius Academy! We're excited to have you join our learning community. Start your journey by exploring our courses and unlocking your potential.`
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templates.welcome,
      templateParams
    );

    console.log('Welcome email sent:', response);
    return { success: true, message: 'Welcome email sent successfully' };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, message: error.text || 'Failed to send email' };
  }
}

/**
 * Send Course Enrollment Confirmation
 */
async function sendEnrollmentEmail(userName, userEmail, courseName) {
  if (EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
    console.log('EmailJS not configured - skipping enrollment email');
    return { success: false, message: 'Email service not configured' };
  }

  try {
    const templateParams = {
      to_name: userName,
      to_email: userEmail,
      course_name: courseName,
      from_name: 'Genius Academy',
      reply_to: 'support@geniusacademy.com',
      message: `Congratulations! You've successfully enrolled in "${courseName}". Access your course anytime from your dashboard and start learning today!`,
      course_link: 'https://geniusacademy.com/access.html'
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templates.enrollment,
      templateParams
    );

    console.log('Enrollment email sent:', response);
    return { success: true, message: 'Enrollment confirmation sent' };
  } catch (error) {
    console.error('Error sending enrollment email:', error);
    return { success: false, message: error.text || 'Failed to send email' };
  }
}

/**
 * Send Progress Reminder Email
 */
async function sendProgressReminderEmail(userName, userEmail, courseName, currentModule, progressPercent) {
  if (EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
    console.log('EmailJS not configured - skipping progress reminder');
    return { success: false, message: 'Email service not configured' };
  }

  try {
    const templateParams = {
      to_name: userName,
      to_email: userEmail,
      course_name: courseName,
      current_module: currentModule,
      progress_percent: progressPercent,
      from_name: 'Genius Academy',
      reply_to: 'support@geniusacademy.com',
      message: `Great progress! You're ${progressPercent}% through "${courseName}". Keep going - complete ${currentModule} to move forward!`,
      continue_link: 'https://geniusacademy.com/access.html'
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templates.progress,
      templateParams
    );

    console.log('Progress reminder sent:', response);
    return { success: true, message: 'Progress reminder sent' };
  } catch (error) {
    console.error('Error sending progress reminder:', error);
    return { success: false, message: error.text || 'Failed to send email' };
  }
}

/**
 * Send Certificate Email
 */
async function sendCertificateEmail(userName, userEmail, courseName, certId, completionDate) {
  if (EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
    console.log('EmailJS not configured - skipping certificate email');
    return { success: false, message: 'Email service not configured' };
  }

  try {
    const templateParams = {
      to_name: userName,
      to_email: userEmail,
      course_name: courseName,
      cert_id: certId,
      completion_date: completionDate,
      from_name: 'Genius Academy',
      reply_to: 'support@geniusacademy.com',
      message: `Congratulations on completing "${courseName}"! Your certificate is ready. Download it from your dashboard and share your achievement on LinkedIn!`,
      dashboard_link: 'https://geniusacademy.com/dashboard.html',
      verify_link: `https://geniusacademy.com/verify/${certId}`
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templates.certificate,
      templateParams
    );

    console.log('Certificate email sent:', response);
    return { success: true, message: 'Certificate email sent' };
  } catch (error) {
    console.error('Error sending certificate email:', error);
    return { success: false, message: error.text || 'Failed to send email' };
  }
}

/**
 * Send Contact Form Submission
 */
async function sendContactFormEmail(senderName, senderEmail, subject, message) {
  if (EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
    console.log('EmailJS not configured - skipping contact form email');
    return { success: false, message: 'Email service not configured' };
  }

  try {
    const templateParams = {
      from_name: senderName,
      from_email: senderEmail,
      to_name: 'Genius Academy Support',
      subject: subject,
      message: message,
      reply_to: senderEmail
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templates.contact,
      templateParams
    );

    console.log('Contact form email sent:', response);
    
    // Store in Firestore for admin dashboard
    try {
      await db.collection('contact_submissions').add({
        name: senderName,
        email: senderEmail,
        subject: subject,
        message: message,
        submittedAt: firebase.firestore.Timestamp.now(),
        status: 'new'
      });
    } catch (dbError) {
      console.error('Error storing contact submission:', dbError);
    }

    return { success: true, message: 'Message sent successfully' };
  } catch (error) {
    console.error('Error sending contact form:', error);
    return { success: false, message: error.text || 'Failed to send message' };
  }
}

/**
 * Check if user needs progress reminder
 * Call this periodically (e.g., daily check)
 */
async function checkAndSendProgressReminders(userId) {
  try {
    // Get user enrollments
    const enrollments = await db.collection('enrollments')
      .where('userId', '==', userId)
      .where('progress', '<', 100)
      .get();

    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();

    for (const enrollment of enrollments.docs) {
      const data = enrollment.data();
      const lastAccessed = data.lastAccessedDate ? new Date(data.lastAccessedDate.seconds * 1000) : null;
      const daysSinceAccess = lastAccessed ? Math.floor((Date.now() - lastAccessed) / (1000 * 60 * 60 * 24)) : 999;

      // Send reminder if inactive for 3+ days and progress < 100%
      if (daysSinceAccess >= 3 && data.progress < 100) {
        const currentModule = `Module ${Math.floor(data.progress / 20) + 1}`;
        await sendProgressReminderEmail(
          userData.displayName || userData.email,
          userData.email,
          'The Genius of the Prompt',
          currentModule,
          data.progress
        );

        // Update last reminder date
        await enrollment.ref.update({
          lastReminderSent: firebase.firestore.Timestamp.now()
        });
      }
    }
  } catch (error) {
    console.error('Error checking progress reminders:', error);
  }
}

// Expose functions globally
window.initEmailService = initEmailService;
window.sendWelcomeEmail = sendWelcomeEmail;
window.sendEnrollmentEmail = sendEnrollmentEmail;
window.sendProgressReminderEmail = sendProgressReminderEmail;
window.sendCertificateEmail = sendCertificateEmail;
window.sendContactFormEmail = sendContactFormEmail;
window.checkAndSendProgressReminders = checkAndSendProgressReminders;

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEmailService);
} else {
  initEmailService();
}
