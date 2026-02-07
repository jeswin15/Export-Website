
import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Debug: Verify connection and credentials
transporter.verify(function (error, success) {
  if (error) {
    console.error("❌ Email Transport Error:", error);
  } else {
    console.log("✅ Email Server is ready");
    console.log(`📧 Configured User: ${process.env.EMAIL_USER}`);
  }
});

export interface ContactData {
  name: string;
  email: string;
  message: string;
}

export interface QuoteData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  productInterest: string;
  estimatedQuantity: string;
  frequency: string;
  additionalRequirements?: string;
}

export async function sendContactEmail(data: ContactData) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to business owner
    subject: `New Contact Inquiry: ${data.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background: #f9f9f9; padding: 10px; border-left: 5px solid #ccc;">
        ${data.message}
      </blockquote>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("✅ Contact Email sent. Message ID:", info.messageId);
  await sendAutoReply(data.email, data.name, "Thank you for contacting Goodwill Global Exports");
}

export async function sendQuoteEmail(data: QuoteData) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to business owner
    subject: `New Quote Request: ${data.companyName}`,
    html: `
      <h2>New B2B Quote Request</h2>
      <h3>Corporate Information</h3>
      <ul>
        <li><strong>Company:</strong> ${data.companyName}</li>
        <li><strong>Contact Person:</strong> ${data.contactPerson}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Phone:</strong> ${data.phone}</li>
      </ul>
      <h3>Logistics & Supply</h3>
      <ul>
        <li><strong>Destination:</strong> ${data.country}</li>
        <li><strong>Product:</strong> ${data.productInterest}</li>
        <li><strong>Quantity:</strong> ${data.estimatedQuantity} MT</li>
        <li><strong>Frequency:</strong> ${data.frequency}</li>
      </ul>
      <h3>Additional Details</h3>
      <p>${data.additionalRequirements || "None"}</p>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("✅ Quote Email sent. Message ID:", info.messageId);
  await sendAutoReply(data.email, data.contactPerson, "We successfully received your Quote Request");
}

async function sendAutoReply(to: string, name: string, subject: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    html: `
      <h3>Hello ${name},</h3>
      <p>Thank you for reaching out to <strong>Goodwill Global Exports</strong>.</p>
      <p>We have received your request and our team will review it shortly. You can expect a response within 24-48 business hours.</p>
      <br>
      <p>Best Regards,</p>
      <p><strong>Goodwill Global Exports Team</strong></p>
      <p><em>Premium Quality. Global Reach.</em></p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Auto-reply failed:", error);
  }
}
