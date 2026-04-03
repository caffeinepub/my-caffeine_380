import { useEffect, useState } from "react";

export interface CompanySettings {
  name: string;
  address: string;
  email: string;
  whatsapp: string;
  logo: string | null;
  directorName: string;
  technicianName: string;
  companyBrand: string;
  resellerName: string;
}

const KEY = "nosheen_company_settings";
const CUSTOM_EVENT = "nosheen_settings_changed";
const IDB_NAME = "naosheen-pwa-store";
const IDB_STORE = "settings";

const defaults: CompanySettings = {
  name: "নওশীন ব্রডব্যান্ড ইন্টারনেট",
  address: "",
  email: "",
  whatsapp: "",
  logo: null,
  directorName: "মুহাম্মদ মনিরুজ্জামান",
  technicianName: "মুহাম্মদ উজ্জল মিয়া",
  companyBrand: "Delta Software and Communication Limited",
  resellerName: "নওশীন ব্রডব্যান্ড ইন্টারনেট",
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
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

/**
 * Save logo as 192×192 and 512×512 PNGs to IndexedDB so the Service Worker
 * can serve them as /dynamic-icon-192.png and /dynamic-icon-512.png for the PWA manifest.
 */
async function savePwaIconToIDB(dataUrl: string): Promise<void> {
  return new Promise((resolve) => {
    try {
      const img = new Image();
      img.onload = () => {
        function renderIcon(size: number): string {
          const canvas = document.createElement("canvas");
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext("2d")!;
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, size, size);
          const srcSize = Math.min(img.width, img.height);
          const sx = (img.width - srcSize) / 2;
          const sy = (img.height - srcSize) / 2;
          ctx.drawImage(img, sx, sy, srcSize, srcSize, 0, 0, size, size);
          return canvas.toDataURL("image/png");
        }

        const png192 = renderIcon(192);
        const png512 = renderIcon(512);
        const png180 = renderIcon(180); // iOS apple-touch-icon

        const req = indexedDB.open(IDB_NAME, 1);
        req.onupgradeneeded = (e: Event) => {
          (e.target as IDBOpenDBRequest).result.createObjectStore(IDB_STORE);
        };
        req.onsuccess = (e: Event) => {
          const db = (e.target as IDBOpenDBRequest).result;
          const tx = db.transaction(IDB_STORE, "readwrite");
          const store = tx.objectStore(IDB_STORE);
          store.put(png192, "pwa_icon_192");
          store.put(png512, "pwa_icon_512");
          store.put(png180, "pwa_icon_ios");
          store.put(png192, "pwa_icon");
          tx.oncomplete = () => resolve();
          tx.onerror = () => resolve();
        };
        req.onerror = () => resolve();
      };
      img.onerror = () => resolve();
      img.src = dataUrl;
    } catch (_) {
      resolve();
    }
  });
}

export function useCompanySettings() {
  const [settings, setSettings] = useState<CompanySettings>(loadSettings);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === KEY) setSettings(loadSettings());
    }
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

  async function save(next: CompanySettings) {
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch (err) {
      console.error("localStorage quota exceeded, retrying without logo", err);
      try {
        localStorage.setItem(KEY, JSON.stringify({ ...next, logo: null }));
      } catch (_) {}
    }
    setSettings(next);
    window.dispatchEvent(
      new CustomEvent<CompanySettings>(CUSTOM_EVENT, { detail: next }),
    );

    if (next.logo) {
      await savePwaIconToIDB(next.logo);
      window.dispatchEvent(
        new CustomEvent("nosheen_manifest_update", { detail: Date.now() }),
      );
      const appleLink = document.querySelector<HTMLLinkElement>(
        'link[rel="apple-touch-icon"]',
      );
      if (appleLink) appleLink.href = next.logo;
    }
  }

  return { settings, save };
}
