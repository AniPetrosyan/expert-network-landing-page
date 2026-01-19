export type ExpertSubmission = {
  fullName: string;
  email: string;
  linkedinLink: string;
  yearsOfExperience: string;
  expertiseAreas: string;
  phoneNumber?: string;
  currentRole?: string;
  currentCompany?: string;
  consent: boolean;
  feedback?: boolean;
  resumeFileName?: string | null;
  resumeFile?: File | null;
};

async function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // reader.result is a data URL like "data:application/pdf;base64,AAAA"
      const result = typeof reader.result === "string" ? reader.result : "";
      const base64 = result.split(",")[1] || "";
      resolve(base64);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export async function submitExpertToSheets(payload: ExpertSubmission): Promise<void> {
  const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
  if (!scriptUrl) {
    throw new Error("Missing VITE_GOOGLE_SCRIPT_URL in .env.local");
  }

  // Send as JSON (supports both with/without resume). For file, embed base64.
  const hasFile = Boolean(payload.resumeFile);
  const requestBody: any = {
    fullName: payload.fullName,
    email: payload.email,
    linkedinLink: payload.linkedinLink,
    yearsOfExperience: payload.yearsOfExperience,
    expertiseAreas: payload.expertiseAreas,
    phoneNumber: payload.phoneNumber,
    currentRole: payload.currentRole,
    currentCompany: payload.currentCompany,
    consent: payload.consent,
    feedback: payload.feedback,
  };
  if (hasFile && payload.resumeFile) {
    requestBody.resumeFileName = payload.resumeFile.name;
    requestBody.resumeMimeType = payload.resumeFile.type || "application/octet-stream";
    requestBody.resumeBase64 = await readFileAsBase64(payload.resumeFile);
  }

  // Important: omit Content-Type to avoid CORS preflight (Apps Script doesn't handle OPTIONS)
  const response = await fetch(scriptUrl, {
    method: "POST",
    body: JSON.stringify(requestBody),
  });

  // Apps Script can return 200 with text; treat non-2xx as failure
  const rawText = await response.text().catch(() => "");
  let parsed: unknown;
  try {
    parsed = rawText ? JSON.parse(rawText) : undefined;
  } catch {
    // ignore JSON parse errors
  }
  if (!response.ok) {
    const details =
      typeof parsed === "object" && parsed && "error" in (parsed as any)
        ? `: ${(parsed as any).error}`
        : rawText
        ? `: ${rawText}`
        : "";
    throw new Error(`Submission failed (${response.status})${details}`);
  }
  if (parsed && typeof parsed === "object" && "ok" in parsed && (parsed as any).ok === false) {
    const errMsg = (parsed as any).error ? String((parsed as any).error) : "Unknown server error";
    throw new Error(`Submission failed: ${errMsg}`);
  }
}


