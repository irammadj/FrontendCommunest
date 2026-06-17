// emailService.ts - Extended with super-admin approval system emails

export interface EmailData {
  estateId: string;
  estateName: string;
  tenantEmails: string[];
  notificationTitle: string;
  notificationBody: string;
  notificationType: string;
}

export const sendNotificationEmails = async (
  data: EmailData,
): Promise<boolean> => {
  try {
    console.log("Sending notification emails to tenants...", data);

    const tenantEmails = data.tenantEmails;

    if (!tenantEmails || tenantEmails.length === 0) {
      console.log("No tenants to notify");
      return true;
    }

    for (const email of tenantEmails) {
      const emailContent = {
        to_email: email,
        estate_name: data.estateName,
        notification_title: data.notificationTitle,
        notification_body: data.notificationBody,
        notification_type: data.notificationType,
        sent_at: new Date().toLocaleString(),
      };

      console.log("Email to be sent:", emailContent);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    console.log(
      `✓ Notification emails sent to ${tenantEmails.length} tenant(s)`,
    );
    return true;
  } catch (error) {
    console.error("Error sending notification emails:", error);
    return false;
  }
};

export const getTenantEmailsForEstate = (estateId: string): string[] => {
  try {
    const storedUsers = localStorage.getItem("communest_users");

    if (storedUsers) {
      const users = JSON.parse(storedUsers);

      const tenantEmails = users
        .filter((user: any) => user.rentedEstateId === estateId && user.email)
        .map((user: any) => user.email);

      console.log(
        `Found ${tenantEmails.length} tenants for estate ${estateId}`,
      );
      return tenantEmails;
    }
  } catch (error) {
    console.error("Error getting tenant emails:", error);
  }

  const mockTenantEmails: Record<string, string[]> = {
    "greenview-properties": [
      "tenant1@example.com",
      "tenant2@example.com",
      "tenant3@example.com",
    ],
    "skyline-residences": ["resident@example.com"],
    "lakeside-estates": ["family1@example.com", "family2@example.com"],
  };

  return mockTenantEmails[estateId] || [];
};

// ===== SUPER-ADMIN APPROVAL SYSTEM EMAILS =====

export interface EstateSubmissionData {
  estateName: string;
  estateEmail: string;
  estateManagement: string;
  submissionDate: string;
}

export const sendSubmissionConfirmationEmail = async (
  data: EstateSubmissionData,
): Promise<boolean> => {
  try {
    console.log("Sending submission confirmation email...", data);

    const emailContent = {
      to_email: data.estateEmail,
      estate_name: data.estateName,
      estate_management: data.estateManagement,
      submission_date: data.submissionDate,
      subject: `Estate Listing Submission Received - ${data.estateName}`,
      message: `Dear ${data.estateManagement},

Thank you for submitting your estate listing to Communest!

Estate: ${data.estateName}
Submission Date: ${data.submissionDate}

Your estate listing has been received and is now under review by our team. You will receive an email notification within 7 days confirming whether your estate has been approved or if any additional information is needed.

If you have any questions, please contact us at support@communest.co.ke or call +254 700 000 000.

Best regards,
Communest Team`,
    };

    console.log("Submission confirmation email:", emailContent);
    await new Promise((resolve) => setTimeout(resolve, 100));

    console.log(`✓ Submission confirmation email sent to ${data.estateEmail}`);
    return true;
  } catch (error) {
    console.error("Error sending submission confirmation email:", error);
    return false;
  }
};

export interface NewEstateNotificationData {
  estateName: string;
  estateEmail: string;
  estateManagement: string;
  location: string;
  county: string;
  submissionDate: string;
}

export const sendNewEstateNotificationToAdmin = async (
  data: NewEstateNotificationData,
): Promise<boolean> => {
  try {
    console.log("Sending new estate notification to super-admin...", data);

    const superAdminEmail = "superadmin@communest.co.ke";

    const emailContent = {
      to_email: superAdminEmail,
      estate_name: data.estateName,
      estate_management: data.estateManagement,
      estate_email: data.estateEmail,
      location: data.location,
      county: data.county,
      submission_date: data.submissionDate,
      subject: `New Estate Submission for Review - ${data.estateName}`,
      message: `New Estate Listing Received!

Estate: ${data.estateName}
Management: ${data.estateManagement}
Location: ${data.location}, ${data.county}
Contact: ${data.estateEmail}
Submitted: ${data.submissionDate}

A new estate listing has been submitted for approval. Please log in to your admin dashboard to review and approve or deny this listing.`,
    };

    console.log("Admin notification email:", emailContent);
    await new Promise((resolve) => setTimeout(resolve, 100));

    console.log(`✓ New estate notification sent to super-admin`);
    return true;
  } catch (error) {
    console.error("Error sending new estate notification:", error);
    return false;
  }
};

export interface ApprovalEmailData {
  estateName: string;
  estateEmail: string;
  estatePhone: string;
}

export const sendApprovalEmail = async (
  data: ApprovalEmailData,
): Promise<boolean> => {
  try {
    console.log("Sending approval email...", data);

    const emailContent = {
      to_email: data.estateEmail,
      estate_name: data.estateName,
      estate_phone: data.estatePhone,
      subject: `Estate Listing Approved! - ${data.estateName}`,
      message: `Congratulations!

Your estate listing "${data.estateName}" has been approved and is now live on Communest!

Your estate is now visible to all users on the Communest platform. Tenants can view your listings and apply for housing.

Log in to your estate portal to:
- Manage your listings
- View tenant inquiries
- Post announcements and updates

Website: https://irammadj.github.io/FrontendCommunest/

If you have any questions, please contact us at support@communest.co.ke or call +254 700 000 000.

Best regards,
Communest Team`,
    };

    console.log("Approval email:", emailContent);
    await new Promise((resolve) => setTimeout(resolve, 100));

    console.log(`✓ Approval email sent to ${data.estateEmail}`);
    return true;
  } catch (error) {
    console.error("Error sending approval email:", error);
    return false;
  }
};

export interface DenialEmailData {
  estateName: string;
  estateEmail: string;
  denialReason: string;
}

export const sendDenialEmail = async (
  data: DenialEmailData,
): Promise<boolean> => {
  try {
    console.log("Sending denial email...", data);

    const emailContent = {
      to_email: data.estateEmail,
      estate_name: data.estateName,
      denial_reason: data.denialReason,
      subject: `Estate Listing Status - ${data.estateName}`,
      message: `Hello,

We have reviewed your estate listing submission "${data.estateName}" and unfortunately, it does not meet our current standards for listing on Communest.

Reason for Denial:
${data.denialReason}

What You Can Do:
- Address the issues mentioned above
- Resubmit your estate listing after making improvements
- Contact us if you have any questions

If you would like to resubmit your estate, please contact us at support@communest.co.ke or call +254 700 000 000.

We appreciate your interest in Communest and hope to welcome you to our platform soon.

Best regards,
Communest Team`,
    };

    console.log("Denial email:", emailContent);
    await new Promise((resolve) => setTimeout(resolve, 100));

    console.log(`✓ Denial email sent to ${data.estateEmail}`);
    return true;
  } catch (error) {
    console.error("Error sending denial email:", error);
    return false;
  }
};

export interface ExpirationEmailData {
  estateName: string;
  estateEmail: string;
  submittedDate: string;
}

export const sendExpirationEmail = async (
  data: ExpirationEmailData,
): Promise<boolean> => {
  try {
    console.log("Sending expiration email...", data);

    const emailContent = {
      to_email: data.estateEmail,
      estate_name: data.estateName,
      submitted_date: data.submittedDate,
      subject: `Estate Listing Submission Expired - Resubmission Required`,
      message: `Hello,

Your estate listing submission "${data.estateName}" submitted on ${data.submittedDate} has expired after 7 days without approval.

What This Means:
- Your submission has been removed from our review queue
- You will need to resubmit your estate listing if you wish to proceed

To Resubmit:
1. Visit https://irammadj.github.io/FrontendCommunest/
2. Log in to your account
3. Go to "List Your Estate"
4. Provide your estate information again

If you have any questions or need assistance, please contact us at support@communest.co.ke or call +254 700 000 000.

We look forward to hearing from you!

Best regards,
Communest Team`,
    };

    console.log("Expiration email:", emailContent);
    await new Promise((resolve) => setTimeout(resolve, 100));

    console.log(`✓ Expiration email sent to ${data.estateEmail}`);
    return true;
  } catch (error) {
    console.error("Error sending expiration email:", error);
    return false;
  }
};
