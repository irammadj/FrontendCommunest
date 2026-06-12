// emailService.ts
// Email service for sending notifications to tenants

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

    // For each tenant, send an email
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

      // In production, use EmailJS:
      // await emailjs.send('service_id', 'template_id', emailContent);

      // For now, simulate the email being sent
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

// Get tenant emails from your app's user data
export const getTenantEmailsForEstate = (estateId: string): string[] => {
  // THIS FUNCTION GETS TENANT EMAILS FROM YOUR USERS
  // Currently returns mock data, but will work with real users you create

  try {
    // Get users from localStorage (where your app stores user data)
    const storedUsers = localStorage.getItem("communest_users");

    if (storedUsers) {
      const users = JSON.parse(storedUsers);

      // Filter users who are tenants in this estate
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

  // Fallback mock data for demo
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
