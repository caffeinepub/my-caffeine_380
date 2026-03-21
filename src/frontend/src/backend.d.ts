import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AdvanceRechargeDue {
    id: string;
    userName: string;
    createdAt: bigint;
    dueMonth: string;
    serial: bigint;
    address: string;
    mobile: string;
    carnivalId: string;
    dueAmount: number;
}
export type Time = bigint;
export interface Package {
    id: bigint;
    name: string;
    description: string;
    speed: string;
    monthlyPrice: number;
}
export interface Expense {
    id: string;
    date: string;
    createdAt: bigint;
    rate: number;
    unit: string;
    description: string;
    serial: bigint;
    category: string;
    amount: number;
}
export interface Customer {
    id: bigint;
    status: ServiceStatus;
    area: string;
    name: string;
    email: string;
    connectionDate: Time;
    address: string;
    phone: string;
    monthlyFee: number;
    packageId: bigint;
    dueAmount: number;
}
export interface CustomerFinancialOverride {
    connectionFeeCash: number;
    cidNumber: string;
    connectionFeeDue: number;
}
export interface Payment {
    id: bigint;
    month: bigint;
    paymentMethod: string;
    date: Time;
    note: string;
    year: bigint;
    customerId: bigint;
    amount: number;
}
export interface TechnicianSalaryDue {
    id: string;
    technicianName: string;
    createdAt: bigint;
    dueMonth: string;
    serial: bigint;
    totalDue: number;
    dueAmount: number;
}
export interface AdminAccount {
    name: string;
    email: string;
}
export interface Node {
    id: bigint;
    status: string;
    name: string;
    connectedCustomers: bigint;
    location: string;
}
export interface DebtSummary {
    totalPayables: number;
    totalReceivables: number;
}
export interface ConnectionFeeDue {
    id: string;
    userName: string;
    cidNumber: string;
    createdAt: bigint;
    dueMonth: string;
    serial: bigint;
    address: string;
    mobile: string;
    dueAmount: number;
}
export interface CommissionDue {
    id: string;
    commissionSource: string;
    totalCommission: number;
    paidCommission: number;
    createdAt: bigint;
    dueMonth: string;
    serial: bigint;
    outstandingCommission: number;
}
export interface UserProfile {
    name: string;
}
export interface WholesalerDue {
    id: string;
    date: string;
    createdAt: bigint;
    rate: number;
    dueBill: number;
    productName: string;
    serial: bigint;
    paidBill: number;
    totalAmount: number;
    address: string;
    quantity: number;
    mobile: string;
    wholesalerName: string;
    amount: number;
}
export enum ServiceStatus {
    active = "active",
    inactive = "inactive",
    suspended = "suspended"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addAdminAccount(email: string, password: string, name: string): Promise<void>;
    addAdvanceRechargeDue(record: AdvanceRechargeDue): Promise<void>;
    addCommissionDue(record: CommissionDue): Promise<void>;
    addConnectionFeeDue(record: ConnectionFeeDue): Promise<void>;
    addExpense(expense: Expense): Promise<void>;
    addTechnicianSalaryDue(record: TechnicianSalaryDue): Promise<void>;
    addWholesalerDue(record: WholesalerDue): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteAdvanceRechargeDue(id: string): Promise<void>;
    deleteCommissionDue(id: string): Promise<void>;
    deleteConnectionFeeDue(id: string): Promise<void>;
    deleteExpense(expenseId: string): Promise<void>;
    deleteTechnicianSalaryDue(id: string): Promise<void>;
    deleteWholesalerDue(id: string): Promise<void>;
    getAdminAccounts(): Promise<Array<AdminAccount>>;
    getAdvanceRechargeDues(): Promise<Array<AdvanceRechargeDue>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCommissionDues(): Promise<Array<CommissionDue>>;
    getConnectionFeeDues(): Promise<Array<ConnectionFeeDue>>;
    getCustomer(id: bigint): Promise<Customer>;
    getCustomerFinancials(): Promise<Array<CustomerFinancialOverride>>;
    getCustomers(): Promise<Array<Customer>>;
    getDebtSummary(): Promise<DebtSummary>;
    getExpenses(): Promise<Array<Expense>>;
    getNode(id: bigint): Promise<Node>;
    getNodes(): Promise<Array<Node>>;
    getPackage(id: bigint): Promise<Package>;
    getPackages(): Promise<Array<Package>>;
    getPayment(id: bigint): Promise<Payment>;
    getPayments(): Promise<Array<Payment>>;
    getTechnicianSalaryDues(): Promise<Array<TechnicianSalaryDue>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWholesalerDues(): Promise<Array<WholesalerDue>>;
    isCallerAdmin(): Promise<boolean>;
    loginAdminAccount(email: string, password: string): Promise<string>;
    removeAdminAccount(email: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateAdvanceRechargeDue(record: AdvanceRechargeDue): Promise<void>;
    updateCommissionDue(record: CommissionDue): Promise<void>;
    updateConnectionFeeDue(record: ConnectionFeeDue): Promise<void>;
    updateCustomerFinancial(override: CustomerFinancialOverride): Promise<void>;
    updateExpense(expense: Expense): Promise<void>;
    updateTechnicianSalaryDue(record: TechnicianSalaryDue): Promise<void>;
    updateWholesalerDue(record: WholesalerDue): Promise<void>;
}
