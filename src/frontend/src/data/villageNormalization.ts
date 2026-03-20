/**
 * Normalizes English village address to canonical Bengali village name.
 * Returns one of: বালিগাঁও, ফরিদপুর, কাটাইয়া, পূর্ব বাজুকা, পশ্চিম বাজুকা
 * or the original string if no match.
 */
export function normalizeVillage(raw: string): string {
  if (!raw) return raw;
  const s = raw.toLowerCase().trim();
  const parts = s.split(/[\s,]+/).filter(Boolean);
  const first = parts[0] || "";
  const last = parts[parts.length - 1] || "";

  // পূর্ব বাজুকা — check BEFORE পশ্চিম to avoid false matches
  if (
    first === "purbo" ||
    first === "purbu" ||
    s.includes("purbo bajuka") ||
    s.includes("purbu bazuka") ||
    s.includes("purbobajuka") ||
    s.includes("purbu bajuka")
  ) {
    return "পূর্ব বাজুকা";
  }

  // পশ্চিম বাজুকা
  if (
    first === "pocim" ||
    first === "poschim" ||
    first === "bajgaw" ||
    s.includes("pocim bajuka") ||
    s.includes("poschim bazuka") ||
    s.includes("pocimbajuka") ||
    s.includes("bazuka bazar") ||
    first === "bajuka"
  ) {
    return "পশ্চিম বাজুকা";
  }

  // বালিগাঁও
  if (
    first.startsWith("balig") ||
    first === "baliguon" ||
    last === "baligaw" ||
    last === "baligoun" ||
    last === "baligaon"
  ) {
    return "বালিগাঁও";
  }

  // ফরিদপুর
  if (
    first === "faridpur" ||
    first === "foridpur" ||
    last === "faridpur" ||
    last === "foridpur"
  ) {
    return "ফরিদপুর";
  }

  // কাটাইয়া
  if (
    first === "kathaiya" ||
    first === "kataiya" ||
    first === "kataia" ||
    first === "katia"
  ) {
    return "কাটাইয়া";
  }

  return raw;
}
