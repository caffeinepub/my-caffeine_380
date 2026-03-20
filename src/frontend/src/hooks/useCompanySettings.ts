import { useEffect, useState } from "react";

export interface CompanySettings {
  name: string;
  address: string;
  email: string;
  whatsapp: string;
  logo: string | null;
}

const KEY = "nosheen_company_settings";

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
    function onStorage(e: StorageEvent) {
      if (e.key === KEY) setSettings(loadSettings());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function save(next: CompanySettings) {
    localStorage.setItem(KEY, JSON.stringify(next));
    setSettings(next);
  }

  return { settings, save };
}
