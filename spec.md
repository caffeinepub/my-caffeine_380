# নওশীন ব্রডব্যান্ড ইন্টারনেট

## Current State
The app has a sidebar with pages: dashboard, customers, finance, debts, notice, network, call, idcard, socialmedia, settings. No "About Us" page exists. The dashboard shows KPI cards. IdCard page generates customer ID cards. NoticePage and SocialMediaPost generate notices/posters.

## Requested Changes (Diff)

### Add
- New "About Us" page (`AboutUs.tsx`) accessible from the menu bar.
  - Shows two team members:
    - প্রতিষ্ঠাতা পরিচালক: মুহাম্মদ মনিরুজ্জামান, Mobile: +8801607930157, Email: nousheen.broadband.internet@gmail.com
    - টেকনিক্যাল ম্যানেজার: মুহাম্মদ উজ্জল মিয়া, Mobile: +8801648388329, Email: nousheen.broadband.internet@gmail.com
  - Professional card layout, info icon in menu.
- New nav item "aboutus" in Layout.tsx navItems and Page type in both Layout.tsx and App.tsx.
- In Dashboard.tsx: small team info widget (card/banner) showing both persons' names and titles.

### Modify
- `Layout.tsx`: Add "aboutus" to Page type and navItems array (with Info icon, appropriate color).
- `App.tsx`: Add "aboutus" to Page type, add lazy import of AboutUs, add case in renderPage.
- `IdCard.tsx`: After the ID card is generated (in the generated card view), add a small footer section below the card showing:
  - প্রতিষ্ঠাতা পরিচালক: মুহাম্মদ মনিরুজ্জামান (WhatsApp: +8801607930157)
  - টেকনিক্যাল ম্যানেজার: মুহাম্মদ উজ্জল মিয়া (WhatsApp: +8801648388329)
  - No email. Small, subtle text below the card.
- `NoticePage.tsx`: Add a footer line below generated notice text:
  - তত্ত্বাবধানে: মুহাম্মদ মনিরুজ্জামান
  - প্রযুক্তিগত সহযোগিতায়: মুহাম্মদ উজ্জল মিয়া
- `SocialMediaPost.tsx`: Add footer to the poster canvas:
  - তত্ত্বাবধানে: মুহাম্মদ মনিরুজ্জামান
  - প্রযুক্তিগত সহযোগিতায়: মুহাম্মদ উজ্জল মিয়া
- `Dashboard.tsx`: Add a compact team info section (small card or banner at top) showing both members' names and titles.

### Remove
- Nothing removed.

## Implementation Plan
1. Create `src/frontend/src/pages/AboutUs.tsx` - professional About Us page with two team member cards.
2. Update `src/frontend/src/components/Layout.tsx` - add `"aboutus"` to Page type and navItems (use `Info` icon from lucide-react, iconColor `"#6366F1"`).
3. Update `src/frontend/src/App.tsx` - add `"aboutus"` to Page type, lazy import AboutUs, add case in renderPage.
4. Update `src/frontend/src/pages/Dashboard.tsx` - add small team info card near top of dashboard.
5. Update `src/frontend/src/pages/IdCard.tsx` - after generating a card, show small footer below with two team members (name + WhatsApp only, no email).
6. Update `src/frontend/src/pages/NoticePage.tsx` - add footer text after notice display.
7. Update `src/frontend/src/pages/SocialMediaPost.tsx` - add footer text to poster canvas/render.
