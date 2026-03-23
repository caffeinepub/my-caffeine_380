# নওশীন ব্রডব্যান্ড ইন্টারনেট

## Current State
Social media poster module has 10 built-in categories with dark gradient backgrounds and abstract canvas decorations (gears, stars, etc). No illustrative/thematic imagery related to each occasion.

## Requested Changes (Diff)

### Add
- New built-in categories: আন্তর্জাতিক মাতৃভাষা দিবস, লাইন মেরামত কাজ, বিল রিমাইন্ডার, নিরাপদ ইন্টারনেট সচেতনতা, গ্রাহক প্রশংসা
- Soft pastel/light gradient backgrounds for all categories (replace dark backgrounds)
- Canvas-drawn thematic illustrations for each category:
  - স্বাধীনতা দিবস → Savar Smritisoudho (National Martyrs Monument) drawn with canvas
  - আন্তর্জাতিক মাতৃভাষা দিবস → Shaheed Minar drawn with canvas
  - নববর্ষ/পহেলা বৈশাখ → Bangla New Year symbols (alpona, fish, pot)
  - জরুরি ঘোষণা → Warning/alert icons (triangle, bell, siren)
  - লাইন মেরামত কাজ → Technician/cable repair illustration
  - নতুন অফার/বিশেষ অফার → Promotional graphics (ribbon, discount badge, stars)
  - বিল রিমাইন্ডার → Bill/invoice icon with calendar
  - নিরাপদ ইন্টারনেট সচেতনতা → Cyber security symbols (shield, lock, wifi)
  - গ্রাহক প্রশংসা → Gratitude symbols (heart, stars, hands)
  - ঈদের শুভেচ্ছা → Crescent moon, mosque silhouette
  - বিজয় দিবস → Victory elements, Bangladesh flag colors
  - প্রতিষ্ঠাবার্ষিকী → Anniversary cake, ribbons
  - সাধারণ শুভেচ্ছা → Flowers, celebration

### Modify
- All POSTER_COLORS: change from dark (`from`/`to`) to soft light gradient colors
- drawDecorations(): completely rewrite to add thematic illustrated drawings per category
- Background rendering: use soft diagonal or radial gradient (light pastel tones)

### Remove
- Dark/heavy color backgrounds (deep navy, dark red, dark green)

## Implementation Plan
1. Update POSTER_COLORS to use soft pastel gradient colors per category
2. Add new category keys: motherlanguage, linemaintenance, billreminder, internetsafety, customerappreciation
3. Add labels and symbols for new categories
4. Rewrite drawDecorations() to draw thematic canvas illustrations for all categories
5. Update background generation to use soft gradient
6. Ensure all new categories appear in the dropdown
