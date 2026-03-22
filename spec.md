# নওশীন ব্রডব্যান্ড ইন্টারনেট

## Current State
SocialMediaPost.tsx-এ ১০টি builtin ক্যাটাগরি আছে, প্রতিটির জন্য color/gradient এবং canvas decoration আছে। তবে কিছু ক্যাটাগরির থিম ইউজারের চাহিদা অনুযায়ী সঠিক নয়।

## Requested Changes (Diff)

### Add
- জরুরি বার্তা (urgent): লাল/হলুদ থিম, সতর্কতা আইকন (warning triangle, exclamation)
- সমস্যার নোটিশ (problem): নীল/ধূসর থিম, টেকনিক্যাল আইকন (gear/tool symbol)
- ঈদের শুভেচ্ছা (eid): সবুজ/সোনালি থিম, ইসলামিক প্যাটার্ন (crescent+star, geometric)
- নববর্ষের শুভেচ্ছা (newyear): লাল/সোনালি থিম, উৎসবমুখর গ্রাফিক্স (fireworks, confetti)
- বিশেষ অফার (offer): আধুনিক ঝকঝকে থিম, ডিসকাউন্ট ব্যাজ (shimmer, % badge, stars)
- প্রতিষ্ঠাবার্ষিকী (anniversary): নীল/সোনালি থিম, আনুষ্ঠানিক ডিজাইন (medallion, ribbons)

### Modify
- POSTER_COLORS: urgent → red/yellow, problem → blue/gray, offer → dark purple shimmer, newyear → red/gold, anniversary → navy/gold
- drawDecorations: rewrite each category's canvas drawing to match the new themes with unique, professional decorations
- POSTER_SYMBOLS: update emoji/text to match new themes

### Remove
- Old color schemes that don't match the new themes

## Implementation Plan
1. Update POSTER_COLORS for each category with new color values
2. Update POSTER_SYMBOLS for each category
3. Rewrite drawDecorations function with rich, unique canvas drawings per category:
   - urgent: red bg, warning triangles, hazard stripes, exclamation marks
   - problem: blue/gray bg, gear icons, wrench symbols, circuit-like pattern
   - eid: deep green bg, crescent moon, Islamic geometric star pattern, golden arabesque
   - newyear: red/gold bg, firework bursts, confetti, festive sparkles
   - offer: dark shimmer bg, glowing %, discount badge circle, sparkle stars
   - anniversary: navy/gold bg, medallion circle, ribbon bows, formal ornament
4. Keep all other functionality (category management, facebook, download) intact
