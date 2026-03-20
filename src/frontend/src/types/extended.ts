import type { Customer } from "../backend";

/** Extended Customer with ISP-specific fields not yet in the backend */
export interface ExtendedCustomer extends Customer {
  username: string;
  password: string;
  carnivalId: string;
  cidNumber: string;
  connectionFeeCash: number;
  connectionFeeDue: number;
  village: string;
  /** Commission percentage: 30 or 40 */
  commissionPercent: number;
}
