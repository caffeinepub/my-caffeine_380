import { useCallback, useEffect, useState } from "react";

const KEY = "nosheen_expiry_dates_v1";
const CUSTOM_EVENT = "nosheen_expiry_changed";

function loadDates(): Record<string, string> {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Record<string, string>;
  } catch (_) {}
  return {};
}

function saveDates(dates: Record<string, string>) {
  try {
    localStorage.setItem(KEY, JSON.stringify(dates));
  } catch (_) {}
}

/** Convert BigInt nanoseconds to a JS Date */
function nanoToDate(nanos: bigint): Date {
  return new Date(Number(nanos / 1_000_000n));
}

/** Compute default expiry: connectionDate + 30 days */
function defaultExpiry(connectionDate: bigint): string {
  const ms = Number(connectionDate / 1_000_000n);
  const d = new Date(ms + 30 * 24 * 60 * 60 * 1000);
  return d.toISOString().slice(0, 10);
}

export function getExpiryDateStatic(
  customerId: bigint,
  connectionDate: bigint,
): string {
  const dates = loadDates();
  return dates[customerId.toString()] ?? defaultExpiry(connectionDate);
}

export function setExpiryDateStatic(customerId: bigint, isoDate: string) {
  const dates = loadDates();
  dates[customerId.toString()] = isoDate;
  saveDates(dates);
  window.dispatchEvent(new CustomEvent(CUSTOM_EVENT));
}

export function useExpiryDates() {
  const [expiryDates, setExpiryDates] =
    useState<Record<string, string>>(loadDates);

  useEffect(() => {
    function onChanged() {
      setExpiryDates(loadDates());
    }
    window.addEventListener(CUSTOM_EVENT, onChanged);
    return () => window.removeEventListener(CUSTOM_EVENT, onChanged);
  }, []);

  const getExpiryDate = useCallback(
    (customerId: bigint, connectionDate: bigint): string => {
      return (
        expiryDates[customerId.toString()] ?? defaultExpiry(connectionDate)
      );
    },
    [expiryDates],
  );

  const setExpiryDate = useCallback((customerId: bigint, isoDate: string) => {
    setExpiryDates((prev) => {
      const next = { ...prev, [customerId.toString()]: isoDate };
      saveDates(next);
      return next;
    });
    window.dispatchEvent(new CustomEvent(CUSTOM_EVENT));
  }, []);

  return { expiryDates, getExpiryDate, setExpiryDate };
}

export { nanoToDate, defaultExpiry };
