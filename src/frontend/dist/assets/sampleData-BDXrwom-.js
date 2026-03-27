import { S as ServiceStatus } from "./index-DlwMr6e1.js";
const VILLAGES = ["বালিগাঁও", "ফরিদপুর", "কাটাইয়া", "পূর্ব বাজুকা", "পশ্চিম বাজুকা"];
[
  {
    id: 1n,
    name: "user001",
    phone: "01711-234567",
    email: "user001@example.com",
    area: "বালিগাঁও",
    address: "বাসা ৪৫, বালিগাঁও",
    packageId: 1n,
    monthlyFee: 600,
    dueAmount: 0,
    status: ServiceStatus.active,
    connectionDate: BigInt(Date.now() - 1e3 * 60 * 60 * 24 * 120) * 1000000n,
    username: "user001",
    password: "pass001",
    carnivalId: "CRN-001",
    cidNumber: "CID-2024-001",
    connectionFeeCash: 1e3,
    connectionFeeDue: 0,
    village: "বালিগাঁও",
    commissionPercent: 30
  },
  {
    id: 2n,
    name: "user002",
    phone: "01812-345678",
    email: "user002@example.com",
    area: "ফরিদপুর",
    address: "ফ্ল্যাট ৩বি, ফরিদপুর",
    packageId: 2n,
    monthlyFee: 900,
    dueAmount: 900,
    status: ServiceStatus.active,
    connectionDate: BigInt(Date.now() - 1e3 * 60 * 60 * 24 * 85) * 1000000n,
    username: "user002",
    password: "pass002",
    carnivalId: "CRN-002",
    cidNumber: "CID-2024-002",
    connectionFeeCash: 1500,
    connectionFeeDue: 500,
    village: "ফরিদপুর",
    commissionPercent: 40
  },
  {
    id: 3n,
    name: "user003",
    phone: "01611-456789",
    email: "user003@example.com",
    area: "কাটাইয়া",
    address: "বাসা ৭৮, কাটাইয়া",
    packageId: 1n,
    monthlyFee: 600,
    dueAmount: 1200,
    status: ServiceStatus.suspended,
    connectionDate: BigInt(Date.now() - 1e3 * 60 * 60 * 24 * 200) * 1000000n,
    username: "user003",
    password: "pass003",
    carnivalId: "CRN-003",
    cidNumber: "CID-2024-003",
    connectionFeeCash: 500,
    connectionFeeDue: 500,
    village: "কাটাইয়া",
    commissionPercent: 30
  },
  {
    id: 4n,
    name: "user004",
    phone: "01911-567890",
    email: "user004@example.com",
    area: "পূর্ব বাজুকা",
    address: "বাসা ২৩, পূর্ব বাজুকা",
    packageId: 3n,
    monthlyFee: 1200,
    dueAmount: 0,
    status: ServiceStatus.active,
    connectionDate: BigInt(Date.now() - 1e3 * 60 * 60 * 24 * 45) * 1000000n,
    username: "user004",
    password: "pass004",
    carnivalId: "CRN-004",
    cidNumber: "CID-2024-004",
    connectionFeeCash: 2e3,
    connectionFeeDue: 0,
    village: "পূর্ব বাজুকা",
    commissionPercent: 40
  },
  {
    id: 5n,
    name: "user005",
    phone: "01511-678901",
    email: "user005@example.com",
    area: "পশ্চিম বাজুকা",
    address: "ফ্ল্যাট ৫এ, পশ্চিম বাজুকা",
    packageId: 3n,
    monthlyFee: 1200,
    dueAmount: 0,
    status: ServiceStatus.inactive,
    connectionDate: BigInt(Date.now() - 1e3 * 60 * 60 * 24 * 300) * 1000000n,
    username: "user005",
    password: "pass005",
    carnivalId: "CRN-005",
    cidNumber: "CID-2023-005",
    connectionFeeCash: 2e3,
    connectionFeeDue: 0,
    village: "পশ্চিম বাজুকা",
    commissionPercent: 30
  },
  {
    id: 6n,
    name: "user006",
    phone: "01711-789012",
    email: "user006@example.com",
    area: "বালিগাঁও",
    address: "বাসা ১০, বালিগাঁও",
    packageId: 2n,
    monthlyFee: 900,
    dueAmount: 0,
    status: ServiceStatus.active,
    connectionDate: BigInt(Date.now() - 1e3 * 60 * 60 * 24 * 60) * 1000000n,
    username: "user006",
    password: "pass006",
    carnivalId: "CRN-006",
    cidNumber: "CID-2024-006",
    connectionFeeCash: 1500,
    connectionFeeDue: 0,
    village: "বালিগাঁও",
    commissionPercent: 40
  }
];
const samplePackages = [
  {
    id: 1n,
    name: "বেসিক প্যাকেজ",
    speed: "10 Mbps",
    monthlyPrice: 600,
    description: "ব্যক্তিগত ব্যবহারের জন্য সাশ্রয়ী প্যাকেজ"
  },
  {
    id: 2n,
    name: "স্ট্যান্ডার্ড প্যাকেজ",
    speed: "20 Mbps",
    monthlyPrice: 900,
    description: "পরিবারের জন্য আদর্শ প্যাকেজ"
  },
  {
    id: 3n,
    name: "প্রিমিয়াম প্যাকেজ",
    speed: "50 Mbps",
    monthlyPrice: 1200,
    description: "ব্যবসায়িক ও উচ্চ ব্যবহারকারীদের জন্য"
  },
  {
    id: 4n,
    name: "এন্টারপ্রাইজ প্যাকেজ",
    speed: "100 Mbps",
    monthlyPrice: 2500,
    description: "বড় ব্যবসা ও অফিসের জন্য"
  }
];
[
  {
    id: 1n,
    customerId: 1n,
    amount: 600,
    date: BigInt(Date.now() - 1e3 * 60 * 60 * 24 * 5) * 1000000n,
    paymentMethod: "বিকাশ",
    month: 3n,
    year: 2026n,
    note: ""
  },
  {
    id: 2n,
    customerId: 4n,
    amount: 1200,
    date: BigInt(Date.now() - 1e3 * 60 * 60 * 24 * 3) * 1000000n,
    paymentMethod: "নগদ",
    month: 3n,
    year: 2026n,
    note: ""
  },
  {
    id: 3n,
    customerId: 6n,
    amount: 900,
    date: BigInt(Date.now() - 1e3 * 60 * 60 * 24 * 1) * 1000000n,
    paymentMethod: "রকেট",
    month: 3n,
    year: 2026n,
    note: ""
  },
  {
    id: 4n,
    customerId: 2n,
    amount: 900,
    date: BigInt(Date.now() - 1e3 * 60 * 60 * 24 * 8) * 1000000n,
    paymentMethod: "বিকাশ",
    month: 2n,
    year: 2026n,
    note: ""
  },
  {
    id: 5n,
    customerId: 1n,
    amount: 600,
    date: BigInt(Date.now() - 1e3 * 60 * 60 * 24 * 35) * 1000000n,
    paymentMethod: "নগদ",
    month: 2n,
    year: 2026n,
    note: ""
  }
];
export {
  VILLAGES as V,
  samplePackages as s
};
