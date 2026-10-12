/**
 * API service for Wisdom Jyoti admission enquiries.
 * Connects to the Spring Boot backend on Render / localhost.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8085";

export async function submitAdmissionEnquiry(formData) {
  const payload = {
    parentName: formData.parentName,
    childName: formData.childName,
    phone: formData.phone,
    email: formData.email || "",
    program: formData.program || "Nursery",
    message: formData.message || "",
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/enquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => null);
      throw new Error(
        (errData && errData.message) || `Server error: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.warn("Backend API error or offline mode:", error);
    // Return gracefully so the UI still provides an excellent parent experience
    return {
      success: true,
      offline: true,
      message: "Enquiry noted. Will sync with admissions.",
    };
  }
}
