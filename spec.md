# বালিগাঁও ব্রডব্যান্ড ইন্টারনেট — ISP Management System

## Current State
App has hardcoded default values for org names in `useCompanySettings.ts` and several pages. The settings page allows changing these values, but defaults and fallback strings still reference old names throughout the codebase.

Current hardcoded values:
- Reseller name: নওশীন ব্রডব্যান্ড ইন্টারনেট
- Main company brand: Delta Software and Communication Limited
- Director: মুহাম্মদ মনিরুজ্জামান
- Technician: মুহাম্মদ উজ্জল মিয়া (stays same)

## Requested Changes (Diff)

### Add
- Nothing new to add

### Modify
- `useCompanySettings.ts`: Update `defaults` object:
  - `name`: "বালিগাঁও ব্রডব্যান্ড ইন্টারনেট"
  - `resellerName`: "বালিগাঁও ব্রডব্যান্ড ইন্টারনেট"
  - `companyBrand`: "স্বাধীন ওয়াইফাই"
  - `directorName`: "আবুল কাশেম"
  - `technicianName`: "মুহাম্মদ উজ্জল মিয়া" (unchanged)
- `Settings.tsx`: Update all placeholder text and default value strings
- `IdCard.tsx`: Update all hardcoded fallback strings ("নওশীন ব্রডব্যান্ড ইন্টারনেট", "Delta Software and Communication Limited", "মুহাম্মদ মনিরুজ্জামান", "মুহাম্মদ উজ্জল মিয়া") to new values
- `SocialMediaPost.tsx`: Update all hardcoded fallback strings similarly
- `NoticePage.tsx`: Update fallback org name string
- `Layout.tsx`: Update hardcoded "নওশীন ব্রডব্যান্ড" and "Delta Software & Comm. Ltd" display text to use dynamic settings or new values
- `Dashboard.tsx`: Update "Delta Software and Communication Limited" hardcoded strings
- `DebtManagement.tsx`: Update "Delta Software and Communication Limited" hardcoded strings
- `AboutUs.tsx`: Update email from nousheen.broadband.internet@gmail.com to match new org (keep same email for now, email field is not in scope), no other hardcoded names present (already dynamic)

### Remove
- Nothing to remove

## Implementation Plan
1. Update `useCompanySettings.ts` defaults object with new org names
2. Update all fallback/hardcoded strings in IdCard.tsx, SocialMediaPost.tsx, NoticePage.tsx, Layout.tsx, Dashboard.tsx, DebtManagement.tsx, Settings.tsx to use new names
3. Ensure all places that use `settings.name || "নওশীন ব্রডব্যান্ড ইন্টারনেট"` fallback are updated to new reseller name
4. Also clear any saved localStorage so old settings don't persist — add a migration check in useCompanySettings to detect old defaults and replace with new ones
