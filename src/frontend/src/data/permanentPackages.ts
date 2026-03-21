import type { Package } from "../backend";

// Permanent package list - always available in the system
export const PERMANENT_PACKAGES: Package[] = [
  {
    id: 1n,
    name: "20 Mbps",
    speed: "20 Mbps",
    monthlyPrice: 525,
    description: "20 Mbps ইন্টারনেট প্যাকেজ",
  },
  {
    id: 2n,
    name: "30 Mbps",
    speed: "30 Mbps",
    monthlyPrice: 600,
    description: "30 Mbps ইন্টারনেট প্যাকেজ",
  },
  {
    id: 3n,
    name: "40 Mbps",
    speed: "40 Mbps",
    monthlyPrice: 735,
    description: "40 Mbps ইন্টারনেট প্যাকেজ",
  },
  {
    id: 4n,
    name: "50 Mbps",
    speed: "50 Mbps",
    monthlyPrice: 840,
    description: "50 Mbps ইন্টারনেট প্যাকেজ",
  },
  {
    id: 5n,
    name: "60 Mbps",
    speed: "60 Mbps",
    monthlyPrice: 1050,
    description: "60 Mbps ইন্টারনেট প্যাকেজ",
  },
];

// Get packageId based on monthly fee
export function getPackageIdByFee(fee: number): bigint {
  if (fee <= 525) return 1n;
  if (fee <= 600) return 2n;
  if (fee <= 735) return 3n;
  if (fee <= 840) return 4n;
  return 5n;
}
