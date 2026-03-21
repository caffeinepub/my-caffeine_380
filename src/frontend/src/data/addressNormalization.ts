/**
 * Title-case: each word's first letter uppercase, rest lowercase.
 * Handles names like "MD JALAL MIAH" → "Md Jalal Miah"
 */
export function toTitleCase(name: string): string {
  if (!name) return name;
  return name
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((w) => {
      if (!w) return w;
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    })
    .join(" ");
}

// Bengali village name → English display name used in address
const VILLAGE_EN: Record<string, string> = {
  বালিগাঁও: "Baligaw",
  ফরিদপুর: "Faridpur",
  কাটাইয়া: "Kathaiya",
  "পূর্ব বাজুকা": "Purbo Bajuka",
  "পশ্চিম বাজুকা": "Paschim Bajuka",
};

/**
 * Normalize para (neighborhood) spelling to canonical form.
 */
function normalizePara(raw: string): string {
  const s = raw.toLowerCase().trim().replace(/\s+/g, " ");
  if (!s) return "";

  // Islam Para
  if (/^islam\s*para$/.test(s)) return "Islam Para";

  // Nayahati Uttor Para
  if (
    /nayahati\s*uttor|noyahati\s*uttor|\buttorpara\b|\buttor\s*para\b/.test(s)
  )
    return "Nayahati Uttor Para";

  // Nayahati Dokhkhin Para
  if (/nayahati\s*dok|noyahati\s*dok/.test(s)) return "Nayahati Dokhkhin Para";

  // Nayahati Moddo Para
  if (
    /nayahati\s*moddo|noyahati\s*moddo|\bmoddopara\b|\bmoddyopara\b|\bmoddo\s*para\b/.test(
      s,
    )
  )
    return "Nayahati Moddo Para";

  // Purbuhati (various spellings)
  if (/^purb[uo]\s*hati(\s*hati)?$|^porbo\s*hati$/.test(s)) return "Purbuhati";

  // Paschimhati (various spellings)
  if (
    /^poc[io]m\s*hati$|^pocimati$|^poschim\s*hati$|^poscimhati$|^pochimhati$|^poshcimhati$|^paschimhati$/.test(
      s,
    )
  )
    return "Paschimhati";

  // Masjidhati
  if (/moshjid|mosjidhati|masjidhati|mosjid\s*hati|masjid\s*hati/.test(s))
    return "Masjidhati";

  // Shohagpur
  if (/sh[uo]hagpur/.test(s)) return "Shohagpur";

  // Aglavita
  if (/aglavita/.test(s)) return "Aglavita";

  // Membarhati
  if (/\bmember?hati\b/.test(s)) return "Membarhati";

  // Jojo Miah'r Hati
  if (/jojo\s*(miah|pagla)|jojopagla/.test(s)) return "Jojo Miah'r Hati";

  // Mayezhati (Faridpur)
  if (/mayez?\s*hati/.test(s)) return "Mayezhati";

  // Shantipur (Faridpur)
  if (/s[ah]antipur/.test(s)) return "Shantipur";

  // Kajoldigi (Faridpur)
  if (/ka[jg]oldigi/.test(s)) return "Kajoldigi";

  // Aglahati (Faridpur)
  if (/^ag?la\s*hati$|algahati/.test(s)) return "Aglahati";

  // Borobari (Kathaiya)
  if (/\bborobari\b/.test(s)) return "Borobari";

  // Sonabali Hati (Kathaiya)
  if (/\bsonabali\b/.test(s)) return "Sonabali Hati";

  // Purbo Hati → Purbuhati (Faridpur variant)
  if (/^porbo\s*hati$|^purbo\s*hati$|^purbu\s*hati$/.test(s))
    return "Purbuhati";

  // Paschim Hati variants for Faridpur
  if (/^poschim\s*hati$|^poshcim\s*hati$/.test(s)) return "Paschimhati";

  // Bajuka-area paras
  if (/\bnoyabari\b/.test(s)) return "Noyabari";
  if (/\bjalohati\b/.test(s)) return "Jalohati";
  if (/\bpoddarbari\b/.test(s)) return "Poddarbari";
  if (/shankhola/.test(s)) return "Shankhola Hati";
  if (/nojorpurbari/.test(s)) return "Nojorpurbari";
  if (/\bbajar\b|\bbazar\b/.test(s)) return "Bajar";

  // Omrahati
  if (/omrahati/.test(s)) return "Omrahati";

  // Default: apply title case
  return toTitleCase(raw);
}

/**
 * Parse a raw address string (e.g. "Baligaw Islampara" or
 * "NAYAHATI MODDYOPARA, BALIGAW") and return:
 *   village  – Bengali canonical village name (for filtering)
 *   address  – "Para, Village" formatted display string
 *
 * The function auto-corrects order: even if village comes first or last,
 * the output is always "Para, Village".
 */
export function normalizeAddress(raw: string): {
  village: string;
  address: string;
} {
  if (!raw || !raw.trim()) return { village: "", address: "" };

  // Normalize: lowercase, replace commas/extra spaces
  const s = raw.toLowerCase().trim().replace(/[,]+/g, " ").replace(/\s+/g, " ");

  let village = "";
  let paraRaw = s;

  // ── পূর্ব বাজুকা ──────────────────────────────────────────────────
  // Must check before পশ্চিম to avoid false positives on "bajuka" alone.
  // Requires explicit "purbo/purbu" + "bajuka"
  const purboPat = /\b(purbo|purbu)\s*ba[jz]uka\b|purbobajuka/;
  if (purboPat.test(s)) {
    village = "পূর্ব বাজুকা";
    paraRaw = s.replace(purboPat, "").replace(/\s+/g, " ").trim();
  }

  // ── পশ্চিম বাজুকা ─────────────────────────────────────────────────
  else if (
    /\b(poc[io]m|poschim|poshcim)\s*ba[jz]uka\b|pocimbajuka|\bbajgaw\b/.test(s)
  ) {
    village = "পশ্চিম বাজুকা";
    paraRaw = s
      .replace(
        /\b(poc[io]m|poschim|poshcim)\s*ba[jz]uka\b|pocimbajuka|\bbajgaw\b/g,
        "",
      )
      .replace(/\bbajuka\b/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  // "bajuka" alone (no purbo/pocim qualifier) → পশ্চিম বাজুকা
  else if (/\bbajuka\b/.test(s)) {
    village = "পশ্চিম বাজুকা";
    paraRaw = s
      .replace(/\bbajuka\b/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  // ── বালিগাঁও ────────────────────────────────────────────────────────
  else if (/\bbalig[aou]\w*\b|\bbaliguon\b/.test(s)) {
    village = "বালিগাঁও";
    paraRaw = s
      .replace(/\bbalig[aou]\w*\b|\bbaliguon\b/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  // ── ফরিদপুর ─────────────────────────────────────────────────────────
  else if (/\bf[ao]ridpur\b/.test(s)) {
    village = "ফরিদপুর";
    paraRaw = s
      .replace(/\bf[ao]ridpur\b/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  // ── কাটাইয়া ─────────────────────────────────────────────────────────
  else if (/\bkath?a[iy]a\b|\bkatia\b/.test(s)) {
    village = "কাটাইয়া";
    paraRaw = s
      .replace(/\bkath?a[iy]a\b|\bkatia\b/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  // ── Special: Kajoldigi / Kagoldigi → ফরিদপুর ─────────────────────────
  else if (/ka[jg]oldigi/.test(s)) {
    village = "ফরিদপুর";
    paraRaw = "kajoldigi";
  }

  // ── পূর্ব বাজুকা standalone ("purbo bajuka" without the word "bajuka"
  //    being caught above — handles edge case where only "purbo" appears)
  else if (/\b(purbo|purbu)\b/.test(s)) {
    village = "পূর্ব বাজুকা";
    paraRaw = s
      .replace(/\b(purbo|purbu)\b/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  // ── No village detected ────────────────────────────────────────────
  if (!village) {
    return { village: toTitleCase(raw), address: toTitleCase(raw) };
  }

  const para = paraRaw ? normalizePara(paraRaw) : "";
  const villageEn = VILLAGE_EN[village] ?? village;

  if (!para) {
    return { village, address: villageEn };
  }

  return { village, address: `${para}, ${villageEn}` };
}
