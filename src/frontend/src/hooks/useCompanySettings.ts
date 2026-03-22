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
    localStorage.setItem(KEY, JSON.stringify(next));
    setSettings(next);
    // Notify all other components on the same page
    window.dispatchEvent(
      new CustomEvent<CompanySettings>(CUSTOM_EVENT, { detail: next }),
    );
  }

  return { settings, save };
}
