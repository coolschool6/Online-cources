# Email Service Setup Guide for Genius Academy

## Overview
Your Genius Academy platform now includes a complete email system using **EmailJS** - a free service that allows you to send emails directly from your client-side application without needing a backend server.

## 📧 Email Features Implemented

### 1. **Welcome Email** (on user signup)
- Sent automatically when new users create an account
- Welcomes them to Genius Academy
- Encourages them to explore courses

### 2. **Course Enrollment Confirmation** (on course enrollment)
- Sent when users enroll in a course
- Includes course name and access link
- Confirms successful enrollment

### 3. **Progress Reminders** (manual/automated)
- Reminds inactive users to continue learning
- Shows current progress percentage
- Suggests next module to complete
- Can be triggered manually or set up as scheduled function

### 4. **Certificate Email** (on course completion)
- Sent automatically when user reaches 100% progress
- Includes certificate ID for verification
- Links to dashboard for certificate download
- Encourages LinkedIn sharing

### 5. **Contact Form** (user-initiated)
- Sends contact form submissions to your email
- Stores submissions in Firestore for admin dashboard
- Allows admin to reply directly from dashboard

---

## 🚀 Setup Instructions

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **Sign Up** (it's FREE - 200 emails/month on free tier)
3. Verify your email address
4. Log in to your EmailJS dashboard

### Step 2: Connect Your Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for testing)
   - **Outlook/Hotmail**
   - **Yahoo**
   - **Custom SMTP** (for professional domains)
4. Follow the connection instructions (usually OAuth for Gmail)
5. **Copy the Service ID** (looks like: `service_abc123`)

### Step 3: Create Email Templates

You need to create 5 email templates. For each template:

1. Go to **Email Templates** → **Create New Template**
2. Use the template names and content below
3. **Copy the Template ID** after creating each

#### Template 1: Welcome Email
**Template ID to use**: `template_welcome`

**Subject**: Welcome to Genius Academy! 🧠

**Body**:
```
Hi {{to_name}},

Welcome to Genius Academy! We're thrilled to have you join our community of learners.

{{message}}

Start your learning journey today by exploring our courses. Your dashboard is waiting for you at:
https://your-site-url.com/dashboard.html

If you have any questions, just reply to this email!

Best regards,
The Genius Academy Team

---
This email was sent from Genius Academy
```

#### Template 2: Enrollment Confirmation
**Template ID to use**: `template_enrollment`

**Subject**: You're enrolled in {{course_name}}! 🎓

**Body**:
```
Hi {{to_name}},

{{message}}

Course: {{course_name}}

Access your course here: {{course_link}}

Happy learning!

Best regards,
The Genius Academy Team
```

#### Template 3: Progress Reminder
**Template ID to use**: `template_progress`

**Subject**: Keep learning! You're {{progress_percent}}% through {{course_name}}

**Body**:
```
Hi {{to_name}},

{{message}}

You're currently at {{progress_percent}}% completion. You're doing great!

Continue learning: {{continue_link}}

See you in class!

The Genius Academy Team
```

#### Template 4: Certificate Email
**Template ID to use**: `template_certificate`

**Subject**: 🎉 Your {{course_name}} Certificate is Ready!

**Body**:
```
Congratulations {{to_name}}!

{{message}}

📜 Certificate ID: {{cert_id}}
📅 Completion Date: {{completion_date}}

Download your certificate: {{dashboard_link}}
Verify your certificate: {{verify_link}}

Share your achievement on LinkedIn and showcase your new skills!

Proud of you!
The Genius Academy Team
```

#### Template 5: Contact Form
**Template ID to use**: `template_contact`

**Subject**: New Contact Form Message: {{subject}}

**Body**:
```
New contact form submission from Genius Academy:

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Reply to: {{reply_to}}
```

### Step 4: Get Your Public Key

1. In EmailJS dashboard, click your **profile icon** (top right)
2. Go to **Account** → **General**
3. Find your **Public Key** (looks like: `user_abc123xyz`)
4. **Copy this key**

### Step 5: Update Your Code

Open `email-service.js` and update the configuration:

```javascript
const EMAILJS_CONFIG = {
  publicKey: 'YOUR_PUBLIC_KEY_HERE',  // From Step 4
  serviceId: 'YOUR_SERVICE_ID_HERE',   // From Step 2
  templates: {
    welcome: 'template_welcome',       // Keep these names
    enrollment: 'template_enrollment',
    progress: 'template_progress',
    certificate: 'template_certificate',
    contact: 'template_contact'
  }
};
```

**Replace**:
- `YOUR_PUBLIC_KEY_HERE` with your actual public key
- `YOUR_SERVICE_ID_HERE` with your actual service ID

### Step 6: Test Your Emails

1. Push your changes to Vercel (or test locally)
2. Create a new test account on your site
3. Check if you receive the welcome email
4. Try the contact form
5. Complete a course (or set progress to 100% manually in Firestore) to test certificate email

---

## 📊 Email Sending Triggers

| Email Type | Trigger | File Location |
|------------|---------|---------------|
| Welcome Email | User signs up | `auth.html` (signup handler) |
| Enrollment Email | User enrolls in course | `auth.html` (auto-enrollment) |
| Progress Reminder | Manual/Scheduled | Can call `checkAndSendProgressReminders()` |
| Certificate Email | Course reaches 100% | `access.html` (lesson completion) |
| Contact Form | User submits form | `contact.html` (form submission) |

---

## 🔧 Advanced Configuration

### Automated Progress Reminders

To send automated progress reminders (e.g., daily checks for inactive users), you'll need to set up a scheduled function. Options:

**Option A: Vercel Cron Jobs** (Requires Vercel Pro)
- Create an API endpoint that calls `checkAndSendProgressReminders()`
- Set up cron job in `vercel.json`

**Option B: Firebase Cloud Functions** (Recommended)
```javascript
// Deploy this as a Firebase Cloud Function
exports.dailyProgressReminders = functions.pubsub
  .schedule('0 9 * * *') // Daily at 9 AM
  .onRun(async (context) => {
    const usersSnap = await admin.firestore().collection('users').get();
    for (const userDoc of usersSnap.docs) {
      await checkAndSendProgressReminders(userDoc.id);
    }
  });
```

**Option C: Manual Trigger from Admin Dashboard**
- Add a button in admin.html to manually send reminders

### Customize Email Templates

You can customize the templates in EmailJS dashboard at any time:
- Add your logo/branding
- Change colors and styling
- Add footer links
- Include social media icons

### Monitor Email Delivery

In EmailJS dashboard:
- **History** tab shows all sent emails
- Track delivery rates
- View failed sends
- Check error messages

---

## 🎯 Email Quotas

**Free Tier**: 200 emails/month
**Personal**: $7/month - 1,000 emails
**Business**: $15/month - 5,000 emails

For higher volume, consider:
- SendGrid (better for scale)
- AWS SES (cheapest for volume)
- Mailgun (good deliverability)

---

## 🐛 Troubleshooting

### Emails not sending?

1. **Check browser console** for errors
2. **Verify configuration** in `email-service.js`
3. **Check EmailJS dashboard** → History tab
4. **Gmail users**: Make sure "Less secure app access" is enabled (or use OAuth)
5. **Check spam folder** for test emails

### "Email service not configured" message?

This means you haven't replaced `YOUR_PUBLIC_KEY` in `email-service.js` yet. Update the config file.

### Emails going to spam?

- Use a professional domain (not Gmail)
- Add SPF and DKIM records to your domain
- Keep email content relevant and concise
- Include unsubscribe link (for marketing emails)

### Rate limiting errors?

- Free tier: 200 emails/month
- Upgrade to Personal or Business plan
- Implement email queueing for high volume

---

## 📝 Firestore Security Rules

Make sure your Firestore rules allow writing to `contact_submissions` and `certificates`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // ... existing rules ...
    
    match /contact_submissions/{submissionId} {
      allow read: if request.auth != null && 
                    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      allow create: if request.auth != null;
    }
    
    match /certificates/{certId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
    }
  }
}
```

---

## ✅ Testing Checklist

- [ ] EmailJS account created
- [ ] Email service connected
- [ ] All 5 templates created
- [ ] Public key and Service ID copied
- [ ] `email-service.js` updated with credentials
- [ ] Code pushed to Vercel
- [ ] Welcome email tested (sign up new user)
- [ ] Contact form tested
- [ ] Certificate email tested (complete course or set progress to 100%)
- [ ] All emails arriving (check spam too!)
- [ ] Contact submissions appearing in admin dashboard

---

## 🚀 Next Steps

After email system is working:

1. **Customize email templates** with your branding
2. **Set up progress reminders** (automated or manual)
3. **Monitor email analytics** in EmailJS dashboard
4. **Consider upgrading** if you exceed 200 emails/month
5. **Add email preferences** so users can opt-out of reminders
6. **Create additional templates** for special announcements

---

## 📞 Need Help?

- **EmailJS Docs**: https://www.emailjs.com/docs/
- **EmailJS Support**: https://www.emailjs.com/support/
- **Genius Academy Email Code**: See `email-service.js` for all functions

---

**Happy Emailing! 📧**
