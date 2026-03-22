import { useEffect, useState } from "react";

export interface CompanySettings {
  name: string;
  address: string;
  email: string;
  whatsapp: string;
  logo: string | null;
}

const KEY = "nosheen_company_settings";
const CUSTOM_EVENT = "nosheen_settings_changed";

const defaults: CompanySettings = {
  name: "নওশীন ব্রডব্যান্ড ইন্টারনেট",
  address: "",
  email: "",
  whatsapp: "",
  logo: null,
};

function loadSettings(): CompanySettings {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...defaults, ...JSON.parse(raw) };
  } catch (_) {}
  return defaults;
}

/**
 * Resize + compress an image data URL so it fits comfortably in localStorage.
 * Max dimension: 256 px, JPEG quality: 0.82
 */
export async function compressLogoDataUrl(dataUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const MAX = 256;
      let { width, height } = img;
      if (width > MAX || height > MAX) {
        if (width > height) {
          height = Math.round((height * MAX) / width);
          width = MAX;
        } else {
          width = Math.round((width * MAX) / height);
          height = MAX;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = () => resolve(dataUrl); // fallback: use original
    img.src = dataUrl;
  });
}

export function useCompanySettings() {
  const [settings, setSettings] = useState<CompanySettings>(loadSettings);

  useEffect(() => {
    // Fires when another tab changes localStorage
    function onStorage(e: StorageEvent) {
      if (e.key === KEY) setSettings(loadSettings());
    }
    // Fires when the same tab saves settings
    function onCustom(e: Event) {
      setSettings((e as CustomEvent<CompanySettings>).detail);
    }
    window.addEventListener("storage", onStorage);
    window.addEventListener(CUSTOM_EVENT, onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(CUSTOM_EVENT, onCustom);
    };
  }, []);

  function save(next: CompanySettings) {
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch (err) {
      // If quota exceeded, try saving without logo
      console.error("localStorage quota exceeded, retrying without logo", err);
      try {
        localStorage.setItem(KEY, JSON.stringify({ ...next, logo: null }));
      } catch (_) {}
    }
    setSettings(next);
    // Notify all other components on the same page
    window.dispatchEvent(
      new CustomEvent<CompanySettings>(CUSTOM_EVENT, { detail: next }),
    );
  }

  return { settings, save };
}
