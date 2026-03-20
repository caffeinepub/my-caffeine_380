import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
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
export interface Package {
    id: bigint;
    name: string;
    description: string;
    speed: string;
    monthlyPrice: number;
}
export interface UserProfile {
    name: string;
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
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAdminAccounts(): Promise<Array<AdminAccount>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCustomer(id: bigint): Promise<Customer>;
    getCustomers(): Promise<Array<Customer>>;
    getNode(id: bigint): Promise<Node>;
    getNodes(): Promise<Array<Node>>;
    getPackage(id: bigint): Promise<Package>;
    getPackages(): Promise<Array<Package>>;
    getPayment(id: bigint): Promise<Payment>;
    getPayments(): Promise<Array<Payment>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    loginAdminAccount(email: string, password: string): Promise<string>;
    removeAdminAccount(email: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
