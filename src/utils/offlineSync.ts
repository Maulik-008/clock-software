// Utility to sync pending feedback when back online
import emailjs from "@emailjs/browser";
import {
  EMAIL_SERVICE_ID,
  EMAIL_TEMPLATE_ID,
  EMAIL_PUBLIC_KEY,
} from "@/lib/emailjs";

export const syncPendingFeedback = async () => {
  if (!navigator.onLine) {
    return;
  }

  const pendingFeedback = JSON.parse(
    localStorage.getItem("pending-feedback") || "[]"
  );

  if (pendingFeedback.length === 0) {
    return;
  }

  const successful: number[] = [];
  const failed: number[] = [];

  for (let i = 0; i < pendingFeedback.length; i++) {
    const feedback = pendingFeedback[i];
    try {
      await emailjs.send(
        EMAIL_SERVICE_ID,
        EMAIL_TEMPLATE_ID,
        {
          from_name: feedback.name,
          form_email: feedback.form_email || "",
          message: feedback.message,
        },
        EMAIL_PUBLIC_KEY
      );
      successful.push(i);
    } catch (error) {
      console.error("Failed to sync feedback:", error);
      failed.push(i);
    }
  }

  // Remove successfully sent feedback
  if (successful.length > 0) {
    const remaining = pendingFeedback.filter(
      (_, index) => !successful.includes(index)
    );
    if (remaining.length > 0) {
      localStorage.setItem("pending-feedback", JSON.stringify(remaining));
    } else {
      localStorage.removeItem("pending-feedback");
    }
  }

  return { successful: successful.length, failed: failed.length };
};

// Auto-sync when coming back online
if (typeof window !== "undefined") {
  window.addEventListener("online", () => {
    syncPendingFeedback().then((result) => {
      if (result && result.successful > 0) {
        console.log(`Synced ${result.successful} pending feedback items`);
      }
    });
  });
}

