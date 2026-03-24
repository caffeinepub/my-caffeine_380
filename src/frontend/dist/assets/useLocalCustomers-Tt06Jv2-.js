import { r as reactExports, S as ServiceStatus } from "./index-Cqep3MYd.js";
import { g as getPackageIdByFee } from "./permanentPackages-CnZQ-KNe.js";
function toTitleCase(name) {
  if (!name) return name;
  return name.trim().replace(/\s+/g, " ").split(" ").map((w) => {
    if (!w) return w;
    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  }).join(" ");
}
const VILLAGE_EN = {
  বালিগাঁও: "Baligaw",
  ফরিদপুর: "Faridpur",
  কাটাইয়া: "Kathaiya",
  "পূর্ব বাজুকা": "Purbo Bajuka",
  "পশ্চিম বাজুকা": "Paschim Bajuka"
};
function normalizePara(raw) {
  const s = raw.toLowerCase().trim().replace(/\s+/g, " ");
  if (!s) return "";
  if (/^islam\s*para$/.test(s)) return "Islam Para";
  if (/nayahati\s*uttor|noyahati\s*uttor|\buttorpara\b|\buttor\s*para\b/.test(s))
    return "Nayahati Uttor Para";
  if (/nayahati\s*dok|noyahati\s*dok/.test(s)) return "Nayahati Dokhkhin Para";
  if (/nayahati\s*moddo|noyahati\s*moddo|\bmoddopara\b|\bmoddyopara\b|\bmoddo\s*para\b/.test(
    s
  ))
    return "Nayahati Moddo Para";
  if (/^purb[uo]\s*hati(\s*hati)?$|^porbo\s*hati$/.test(s)) return "Purbuhati";
  if (/^poc[io]m\s*hati$|^pocimati$|^poschim\s*hati$|^poscimhati$|^pochimhati$|^poshcimhati$|^paschimhati$/.test(
    s
  ))
    return "Paschimhati";
  if (/moshjid|mosjidhati|masjidhati|mosjid\s*hati|masjid\s*hati/.test(s))
    return "Masjidhati";
  if (/sh[uo]hagpur/.test(s)) return "Shohagpur";
  if (/aglavita/.test(s)) return "Aglavita";
  if (/\bmember?hati\b/.test(s)) return "Membarhati";
  if (/jojo\s*(miah|pagla)|jojopagla/.test(s)) return "Jojo Miah'r Hati";
  if (/mayez?\s*hati/.test(s)) return "Mayezhati";
  if (/s[ah]antipur/.test(s)) return "Shantipur";
  if (/ka[jg]oldigi/.test(s)) return "Kajoldigi";
  if (/^ag?la\s*hati$|algahati/.test(s)) return "Aglahati";
  if (/\bborobari\b/.test(s)) return "Borobari";
  if (/\bsonabali\b/.test(s)) return "Sonabali Hati";
  if (/^porbo\s*hati$|^purbo\s*hati$|^purbu\s*hati$/.test(s))
    return "Purbuhati";
  if (/^poschim\s*hati$|^poshcim\s*hati$/.test(s)) return "Paschimhati";
  if (/\bnoyabari\b/.test(s)) return "Noyabari";
  if (/\bjalohati\b/.test(s)) return "Jalohati";
  if (/\bpoddarbari\b/.test(s)) return "Poddarbari";
  if (/shankhola/.test(s)) return "Shankhola Hati";
  if (/nojorpurbari/.test(s)) return "Nojorpurbari";
  if (/\bbajar\b|\bbazar\b/.test(s)) return "Bajar";
  if (/omrahati/.test(s)) return "Omrahati";
  return toTitleCase(raw);
}
function normalizeAddress(raw) {
  if (!raw || !raw.trim()) return { village: "", address: "" };
  const s = raw.toLowerCase().trim().replace(/[,]+/g, " ").replace(/\s+/g, " ");
  let village = "";
  let paraRaw = s;
  const purboPat = /\b(purbo|purbu)\s*ba[jz]uka\b|purbobajuka/;
  if (purboPat.test(s)) {
    village = "পূর্ব বাজুকা";
    paraRaw = s.replace(purboPat, "").replace(/\s+/g, " ").trim();
  } else if (/\b(poc[io]m|poschim|poshcim)\s*ba[jz]uka\b|pocimbajuka|\bbajgaw\b/.test(s)) {
    village = "পশ্চিম বাজুকা";
    paraRaw = s.replace(
      /\b(poc[io]m|poschim|poshcim)\s*ba[jz]uka\b|pocimbajuka|\bbajgaw\b/g,
      ""
    ).replace(/\bbajuka\b/g, "").replace(/\s+/g, " ").trim();
  } else if (/\bbajuka\b/.test(s)) {
    village = "পশ্চিম বাজুকা";
    paraRaw = s.replace(/\bbajuka\b/g, "").replace(/\s+/g, " ").trim();
  } else if (/\bbalig[aou]\w*\b|\bbaliguon\b/.test(s)) {
    village = "বালিগাঁও";
    paraRaw = s.replace(/\bbalig[aou]\w*\b|\bbaliguon\b/g, "").replace(/\s+/g, " ").trim();
  } else if (/\bf[ao]ridpur\b/.test(s)) {
    village = "ফরিদপুর";
    paraRaw = s.replace(/\bf[ao]ridpur\b/g, "").replace(/\s+/g, " ").trim();
  } else if (/\bkath?a[iy]a\b|\bkatia\b/.test(s)) {
    village = "কাটাইয়া";
    paraRaw = s.replace(/\bkath?a[iy]a\b|\bkatia\b/g, "").replace(/\s+/g, " ").trim();
  } else if (/ka[jg]oldigi/.test(s)) {
    village = "ফরিদপুর";
    paraRaw = "kajoldigi";
  } else if (/\b(purbo|purbu)\b/.test(s)) {
    village = "পূর্ব বাজুকা";
    paraRaw = s.replace(/\b(purbo|purbu)\b/g, "").replace(/\s+/g, " ").trim();
  }
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
const KEY = "nosheen_customers_v6";
const CUSTOM_EVENT = "nosheen_customers_changed";
function serialize(c) {
  return {
    ...c,
    id: c.id.toString(),
    packageId: c.packageId.toString(),
    connectionDate: c.connectionDate.toString()
  };
}
function deserialize(obj) {
  return {
    ...obj,
    id: BigInt(obj.id),
    packageId: BigInt(obj.packageId),
    connectionDate: BigInt(obj.connectionDate)
  };
}
function dateToNano(dateStr) {
  return BigInt(new Date(dateStr).getTime()) * 1000000n;
}
const RAW_SEED = [
  [
    1,
    "Md Jalal Miah",
    "ja4321",
    "01311411152",
    "1279832",
    "277465",
    "Baligaw Islampara",
    840,
    "2025-10-07"
  ],
  [
    2,
    "Md Moniruzzaman",
    "mo4321",
    "01751823925",
    "1279856",
    "277466",
    "Baligoun Shuhagpur",
    600,
    "2025-10-06"
  ],
  [
    3,
    "Mohammad Uzzal Miah",
    "mo4321",
    "01724467213",
    "1279896",
    "277467",
    "Baligoun Islampara",
    600,
    "2025-10-06"
  ],
  [
    4,
    "Md Mokhlasur Rahman",
    "mo4321",
    "01717649268",
    "1280046",
    "277468",
    "Baligoun Islampara",
    600,
    "2025-10-07"
  ],
  [
    5,
    "Halima Khatun",
    "ha4321",
    "01715283900",
    "1280083",
    "277469",
    "Baligoun Islampara",
    600,
    "2025-10-07"
  ],
  [
    6,
    "Mst. Asahan Akter",
    "as4321",
    "01321510249",
    "1280102",
    "277470",
    "Baligoun Islampara",
    600,
    "2025-10-07"
  ],
  [
    7,
    "Md Mukhles Miah",
    "mu4321",
    "01581764265",
    "1280108",
    "277471",
    "Baligoun Islampara",
    600,
    "2025-10-07"
  ],
  [
    8,
    "Jem Miah",
    "je4321",
    "01321646851",
    "1280168",
    "277472",
    "Baligoun Islampara",
    600,
    "2025-10-07"
  ],
  [
    9,
    "Sakila Begum",
    "sa4321",
    "01568764266",
    "1280265",
    "277473",
    "Baligoun Mosjidhati",
    600,
    "2025-10-07"
  ],
  [
    10,
    "Md Azizur Rahman",
    "az4321",
    "01735574554",
    "1280996",
    "277474",
    "Baligoun Nayahati Dokkhin Para",
    600,
    "2025-10-08"
  ],
  [
    11,
    "Akashi Begum",
    "ak4321",
    "01717168622",
    "1282167",
    "277475",
    "Baligoun memberhati",
    600,
    "2025-10-10"
  ],
  [
    12,
    "Mst Roksana",
    "ro4321",
    "01791974459",
    "1282172",
    "277476",
    "Baligoun memberhati",
    600,
    "2025-10-10"
  ],
  [
    13,
    "Rufiqul Islam",
    "ru4321",
    "01878347551",
    "1282438",
    "277477",
    "Baliguon Pocimati",
    600,
    "2025-10-11"
  ],
  [
    14,
    "Md Sadek Miah",
    "sa4321",
    "01831883095",
    "1282710",
    "277478",
    "Baligoun Noyahati Moddopara",
    600,
    "2025-10-12"
  ],
  [
    15,
    "Md Josim Uddin",
    "jo4321",
    "01568331946",
    "1282934",
    "277479",
    "Baligoun Uttorpara",
    600,
    "2025-10-12"
  ],
  [
    16,
    "Kobir Hosen",
    "ko4321",
    "01779606491",
    "1283521",
    "277480",
    "Faridpur poshcimhati",
    600,
    "2025-10-13"
  ],
  [
    17,
    "Osman Miah",
    "os4321",
    "01740905268",
    "1283854",
    "277481",
    "Foridpur Mayez Hati",
    600,
    "2025-10-14"
  ],
  [
    18,
    "Md Anuwar Hossian",
    "an4321",
    "01732880613",
    "1283917",
    "277482",
    "Foridpur Purbuhati",
    600,
    "2025-10-14"
  ],
  [
    19,
    "Saiful",
    "sa4321",
    "01307970003",
    "1284021",
    "277483",
    "Foridpur Mayez Hati",
    600,
    "2025-10-14"
  ],
  [
    20,
    "Md. Imran Hossain",
    "im4321",
    "01338144416",
    "1284089",
    "277484",
    "Foridpur Purbo Hati",
    600,
    "2025-10-14"
  ],
  [
    21,
    "Mst Sania Bagum",
    "sa4321",
    "01576460384",
    "1284128",
    "277485",
    "Foridpur Purbuhati Hati",
    600,
    "2025-10-14"
  ],
  [
    22,
    "Monchor Ali",
    "mo4321",
    "01781708350",
    "1284308",
    "277486",
    "Baligoun Aglavita",
    600,
    "2025-10-15"
  ],
  [
    23,
    "Md Rejaul",
    "re4321",
    "01603567918",
    "1285634",
    "277487",
    "Baligoun Pocimhati",
    600,
    "2025-10-18"
  ],
  [
    24,
    "Dulal Mia",
    "du4321",
    "01785606843",
    "1285849",
    "277488",
    "Baligoun Islampara",
    600,
    "2025-10-18"
  ],
  [
    25,
    "Md Shorif Uddin",
    "sh4321",
    "01832611043",
    "1287641",
    "277489",
    "Baligoun Islampara",
    600,
    "2025-10-23"
  ],
  [
    26,
    "Ajman Miah",
    "aj4321",
    "01333509606",
    "1288131",
    "277490",
    "Faridpur Mayez Hati",
    600,
    "2025-10-24"
  ],
  [
    27,
    "Sujon Ali",
    "su4321",
    "01987390857",
    "1288499",
    "277491",
    "Baligaon Noyahati Uttorpara",
    700,
    "2025-10-25"
  ],
  [
    28,
    "RAKIB MIAH",
    "ra4321",
    "01763511772",
    "1288797",
    "277492",
    "Baligoun Poschim Hati",
    600,
    "2025-10-26"
  ],
  [
    29,
    "MD. Mahboobur Rahman",
    "ma4321",
    "01303741020",
    "1289867",
    "277493",
    "Kathaiya",
    600,
    "2025-10-28"
  ],
  [
    30,
    "MD RIFAT MIA",
    "ri4321",
    "01804808957",
    "1291326",
    "277494",
    "Baligoun Purbuhati",
    600,
    "2025-11-01"
  ],
  [
    31,
    "ANUWARA BEGUM",
    "an4321",
    "01620605373",
    "1291400",
    "277495",
    "Faridpur Aglahati",
    600,
    "2025-11-01"
  ],
  [
    32,
    "MD ISMAIL",
    "is3121",
    "01540069212",
    "1294020",
    "277496",
    "NAYAHATI MODDYOPARA BALIGAW",
    600,
    "2025-11-08"
  ],
  [
    33,
    "Anoyar Hossain",
    "an3121",
    "01831958996",
    "1294359",
    "277497",
    "Baligoun Pocimhati",
    600,
    "2025-11-09"
  ],
  [
    34,
    "Shohag Miya",
    "Sh4321",
    "01717763920",
    "1294669",
    "277498",
    "Kathaiya Pocimhati",
    600,
    "2025-11-10"
  ],
  [
    35,
    "Md Kasam Miah",
    "ka4321",
    "01717934672",
    "1294686",
    "277499",
    "Kataia Borobari",
    600,
    "2025-11-10"
  ],
  [
    36,
    "Md Sirajul Islam Talukder",
    "si4321",
    "01626571287",
    "1294816",
    "277500",
    "Kataia Pocimhati",
    600,
    "2025-11-10"
  ],
  [
    37,
    "Azizul",
    "az4321",
    "01640675748",
    "1294979",
    "277501",
    "Baligoun Pocimhati",
    600,
    "2025-11-11"
  ],
  [
    38,
    "KHADIJA BEGUM",
    "kh4321",
    "01615764643",
    "1295061",
    "277502",
    "AGLA HATI FARIDPUR",
    600,
    "2025-11-11"
  ],
  [
    39,
    "Md Salman Talukdar",
    "sa4321",
    "01304316670",
    "1295128",
    "277503",
    "Kathaiya Pocimhati",
    600,
    "2025-11-11"
  ],
  [
    40,
    "SHUKKUR ALI",
    "sh4321",
    "01777112761",
    "1295656",
    "277504",
    "NAYAHATI MODDO PARA BALIGAW",
    600,
    "2025-11-13"
  ],
  [
    41,
    "Md Imon Mia Talukder",
    "im4321",
    "01614595117",
    "1296380",
    "277505",
    "Kataia Borobari",
    600,
    "2025-11-15"
  ],
  [
    42,
    "Md Humayun Rashid",
    "hu4321",
    "01327055038",
    "1296388",
    "277506",
    "Kataia Sonabali Bari",
    600,
    "2025-11-15"
  ],
  [
    43,
    "MST. AKLIMA",
    "ak4321",
    "01746039383",
    "1297500",
    "277507",
    "NAYAHATI MODDO PARA BALIGAW",
    600,
    "2025-11-19"
  ],
  [
    44,
    "SHAHJAHAN MIAH",
    "sh4321",
    "01723561342",
    "1297743",
    "277508",
    "ISLAM PARA BALIGAW",
    600,
    "2025-11-19"
  ],
  [
    45,
    "Md. Abdullah Khan",
    "ab4321",
    "01306267304",
    "1298135",
    "277509",
    "Kataia Sonabali Bari",
    600,
    "2025-11-21"
  ],
  [
    46,
    "Md Bashir Ahamad Khan",
    "ba4321",
    "01778995228",
    "1298321",
    "277510",
    "Kataia Sonabali Bari",
    600,
    "2025-11-22"
  ],
  [
    47,
    "Mst Rina Begum",
    "ri4321",
    "01789291391",
    "1298425",
    "277511",
    "Baligoun Islampara",
    600,
    "2025-11-23"
  ],
  [
    48,
    "Mst Forida Khatun",
    "fo4321",
    "01724278414",
    "1299732",
    "277512",
    "Foridpur Mayez Hati",
    600,
    "2025-11-28"
  ],
  [
    49,
    "Md Asaduzzaman",
    "as4321",
    "01753713835",
    "1300666",
    "277513",
    "Baligoun Omrahati",
    600,
    "2025-12-01"
  ],
  [
    50,
    "Amir Hossain",
    "am4321",
    "01784776231",
    "1300991",
    "277514",
    "Baligoun Purbohati",
    600,
    "2025-12-02"
  ],
  [
    51,
    "Md Altab Hossain",
    "al4321",
    "01732118287",
    "1301362",
    "277515",
    "Baligoun Pocimhati",
    600,
    "2025-12-04"
  ],
  [
    52,
    "Md Mohiuddin Talukder",
    "mo4321",
    "01762477419",
    "1301637",
    "277516",
    "Kataia Borobari",
    600,
    "2025-12-05"
  ],
  [
    53,
    "Sahabuddin Ahmad",
    "sa4321",
    "01757417501",
    "1301680",
    "277517",
    "Foridpur Mayez Hati",
    600,
    "2025-12-05"
  ],
  [
    54,
    "Md Iqbal",
    "iq4321",
    "01740098826",
    "1303182",
    "277518",
    "Baligoun Shohagpur",
    600,
    "2025-12-11"
  ],
  [
    55,
    "Lima Bagum",
    "li4321",
    "01568123738",
    "1303305",
    "277519",
    "Baligoun Jojo Pagla",
    600,
    "2025-12-12"
  ],
  [
    56,
    "Zuma Akter",
    "zu4321",
    "01949842927",
    "1303312",
    "277520",
    "Baligaon Membarhati",
    525,
    "2025-12-12"
  ],
  [
    57,
    "Liton Miah",
    "li4321",
    "01626346257",
    "1303315",
    "277521",
    "Foridpur Mayez Hati",
    600,
    "2025-12-12"
  ],
  [
    58,
    "MD Enamul Haque",
    "em4321",
    "01327858808",
    "1303412",
    "277522",
    "BALIGAON PURBUHATI",
    600,
    "2025-12-12"
  ],
  [
    59,
    "Md Asmot Ali",
    "as4321",
    "01738101175",
    "1303527",
    "277523",
    "Baligoun Omrahati",
    600,
    "2025-12-13"
  ],
  [
    60,
    "Md. Sohag Miah",
    "sh4321",
    "01540107524",
    "1303893",
    "277524",
    "Baligoun Shohagpur",
    600,
    "2025-12-14"
  ],
  [
    61,
    "Md. Ruhul Amin Talukder",
    "rh4321",
    "01726776421",
    "1303954",
    "277525",
    "Kataia Moshjid hati",
    699,
    "2025-12-15"
  ],
  [
    62,
    "Takmina",
    "ta4321",
    "01540219984",
    "1304201",
    "277526",
    "Baligoun Shohagpur",
    600,
    "2025-12-16"
  ],
  [
    63,
    "Hanif Mia",
    "ha4321",
    "01318714171",
    "1304232",
    "277527",
    "Baligoun Purbohati",
    600,
    "2025-12-16"
  ],
  [
    64,
    "Md Nazrul Islam",
    "na4321",
    "01871210342",
    "1304410",
    "277528",
    "Baligoun Jojopagla",
    600,
    "2025-12-17"
  ],
  [
    65,
    "Md Azman Miah",
    "az4321",
    "01623440903",
    "1304820",
    "277529",
    "Baligoun Nayahati Dokkhin Para",
    600,
    "2025-12-18"
  ],
  [
    66,
    "Mohammad Mufizul Islam",
    "mo4321",
    "01716712078",
    "1304903",
    "277530",
    "Baligoun Poscimhati",
    600,
    "2025-12-19"
  ],
  [
    67,
    "Md Abdu Shukur Talukder",
    "ab4321",
    "01717885025",
    "1305251",
    "277531",
    "Kataia Pocimhati",
    600,
    "2025-12-21"
  ],
  [
    68,
    "Rakibul Hasan",
    "ra4321",
    "01605126713",
    "1305509",
    "277532",
    "Foridpur Pochimhati",
    600,
    "2025-12-22"
  ],
  [
    69,
    "Md Johirul Islam",
    "jo4321",
    "01626013604",
    "1306273",
    "277533",
    "Foridpur Mayez Hati",
    600,
    "2025-12-26"
  ],
  [
    70,
    "Md Salah Uddin",
    "sa4321",
    "01835821833",
    "1307291",
    "277534",
    "Kataia Pocimhati",
    600,
    "2025-12-31"
  ],
  [
    71,
    "Md Romjan Miah",
    "ro4321",
    "01816041272",
    "1307293",
    "277535",
    "Foridpur Purbuhati",
    600,
    "2025-12-31"
  ],
  [
    72,
    "Jaynal Mia",
    "ja4321",
    "01746047551",
    "1307296",
    "277536",
    "Foridpur Purbuhati",
    600,
    "2025-12-31"
  ],
  [
    73,
    "Ujjal Mia",
    "uj4321",
    "01941767901",
    "1307776",
    "277537",
    "Baligoun Purbuhati",
    600,
    "2026-01-02"
  ],
  [
    74,
    "Mst Ruksana Akter",
    "ru4321",
    "01307994326",
    "1307884",
    "277538",
    "Katia Sonabali",
    600,
    "2026-01-02"
  ],
  [
    75,
    "Md Tamiz Uddin",
    "ta4321",
    "01772768320",
    "1307967",
    "277539",
    "Kataia Sonabali Bari",
    600,
    "2026-01-03"
  ],
  [
    76,
    "Mahi Alam",
    "ma4321",
    "01602981256",
    "1308066",
    "277540",
    "Kataia Pocimhati",
    600,
    "2026-01-03"
  ],
  [
    77,
    "Md Sabbir Mia",
    "sa4321",
    "01737008876",
    "1308148",
    "277541",
    "Kataia Pocimhati",
    600,
    "2026-01-03"
  ],
  [
    78,
    "Md Zalal Mia",
    "za4321",
    "01732420983",
    "1308642",
    "277542",
    "Baligoun Memberhati",
    600,
    "2026-01-06"
  ],
  [
    79,
    "Musto Mia",
    "mu4321",
    "01760481221",
    "1308717",
    "277543",
    "Baligoun Omrahati",
    600,
    "2026-01-06"
  ],
  [
    80,
    "Sab Mia",
    "sa4321",
    "01858398644",
    "1308887",
    "277544",
    "Baligoun Memberhati",
    600,
    "2026-01-07"
  ],
  [
    81,
    "Amberali",
    "am4321",
    "01763511773",
    "1309663",
    "277545",
    "Foridpur Mayez Hati",
    600,
    "2026-01-11"
  ],
  [
    82,
    "Anisur Rahman",
    "an4321",
    "01626418836",
    "1310665",
    "277546",
    "Foridpur Porbo Hati",
    600,
    "2026-01-17"
  ],
  [
    83,
    "Mst. Mahfuja Begum",
    "ma4321",
    "01323817888",
    "1312125",
    "277547",
    "Foridpur Purbohati Hati",
    600,
    "2026-01-27"
  ],
  [
    84,
    "Md. Ashu Miah",
    "as4321",
    "01796424350",
    "1312126",
    "277548",
    "Foridpur Purbuhati",
    600,
    "2026-01-27"
  ],
  [
    85,
    "Ripa Akter",
    "ri4321",
    "01846060405",
    "1313379",
    "277549",
    "Foridpur Mayez Hati",
    600,
    "2026-01-31"
  ],
  [
    86,
    "MD Abbas Uddin",
    "ab4321",
    "01732667159",
    "1314305",
    "277550",
    "Foridpur Pochimhati",
    600,
    "2026-02-06"
  ],
  [
    87,
    "Md. Shaheen Miah",
    "sh4321",
    "01712124695",
    "1314439",
    "277551",
    "Pocim Bajuka Bajar",
    600,
    "2026-02-07"
  ],
  [
    88,
    "Md. Jahangir",
    "ja4321",
    "01342409874",
    "1314539",
    "277552",
    "Pocim Bajuka Noyabari",
    600,
    "2026-02-07"
  ],
  [
    89,
    "Mst Sanjida",
    "sa4321",
    "01726379179",
    "1314695",
    "277553",
    "Pocim Bajuka Noyabari",
    600,
    "2026-02-08"
  ],
  [
    90,
    "Md Sorap Miah",
    "so4321",
    "01727850824",
    "1315400",
    "277554",
    "Bajgaw Jalohati",
    600,
    "2026-02-14"
  ],
  [
    91,
    "Md Fajlur Rahman",
    "fa4321",
    "01726775676",
    "1315502",
    "277555",
    "Purbobajuka poddarbari",
    699,
    "2026-02-14"
  ],
  [
    92,
    "Sabneher",
    "sa4321",
    "01576827136",
    "1315729",
    "277556",
    "Baligoun Purbohati",
    600,
    "2026-02-16"
  ],
  [
    93,
    "Sonia",
    "so4321",
    "01338144398",
    "1315736",
    "277557",
    "Baligoun Purbohati",
    525,
    "2026-02-16"
  ],
  [
    94,
    "Ziaur Rahman",
    "zi4321",
    "01928950946",
    "1315817",
    "277558",
    "Foridpur Algahati",
    600,
    "2026-02-16"
  ],
  [
    95,
    "Mst Jayeda Khatun",
    "ja4321",
    "01731639653",
    "1316499",
    "277559",
    "Foridpur pochimhati",
    600,
    "2026-02-21"
  ],
  [
    96,
    "Md Rafiqul Islam",
    "ra4321",
    "01963233450",
    "1316757",
    "277560",
    "Bajuka bajar",
    600,
    "2026-02-23"
  ],
  [
    97,
    "Sabbir Ahammod",
    "sa4321",
    "01569195414",
    "1316812",
    "277561",
    "Pocim Bajuka Noyabari",
    600,
    "2026-02-23"
  ],
  [
    98,
    "Mojahid Mia",
    "mo4321",
    "01615763990",
    "1316895",
    "277562",
    "Foridpur pocimhati",
    600,
    "2026-02-24"
  ],
  [
    99,
    "Md Emamul",
    "em4321",
    "01790200237",
    "1317484",
    "277563",
    "Baligaw Purbohati",
    600,
    "2026-02-28"
  ],
  [
    100,
    "Md Alamgir Hossain",
    "al4321",
    "01332681661",
    "1317832",
    "277564",
    "Kagoldigi",
    600,
    "2026-03-03"
  ],
  [
    101,
    "Mst Quen",
    "qu4321",
    "01742939180",
    "1317887",
    "277565",
    "Purbo Bajuka",
    600,
    "2026-03-03"
  ],
  [
    102,
    "Faijur Rahman",
    "",
    "01566053650",
    "",
    "277723",
    "Baligoun Purbuhati",
    600,
    "2026-03-08"
  ],
  [
    103,
    "Md Shbuz Mia",
    "",
    "01321646836",
    "",
    "281328",
    "Foridpur Purbuhati",
    600,
    "2026-03-12"
  ],
  [
    104,
    "Md Kazal Bashar",
    "",
    "01600453617",
    "",
    "281366",
    "Baligaw Islampara",
    600,
    "2026-03-12"
  ],
  [
    105,
    "Md Ataher Ali",
    "",
    "01843429224",
    "",
    "281378",
    "Foridpur Santipur",
    600,
    "2026-03-13"
  ],
  [
    106,
    "SheikhJashimUddin",
    "",
    "01751000727",
    "",
    "281468",
    "Pocimbajuka shankhola hati",
    600,
    "2026-03-14"
  ],
  [
    107,
    "MstFatamaAkter",
    "",
    "01707205533",
    "",
    "281502",
    "Purbo bajuka nojorpurbari",
    600,
    "2026-03-14"
  ]
];
function buildSeedCustomers() {
  return RAW_SEED.map(
    ([
      id,
      rawUsername,
      password,
      phone,
      carnivalId,
      cidNumber,
      rawAddress,
      monthlyFee,
      dateStr
    ]) => {
      const username = toTitleCase(rawUsername);
      const { village, address } = normalizeAddress(rawAddress);
      return {
        id: BigInt(id),
        name: username,
        phone,
        email: "",
        area: village,
        address,
        packageId: getPackageIdByFee(monthlyFee),
        monthlyFee,
        dueAmount: 0,
        status: ServiceStatus.active,
        connectionDate: dateToNano(dateStr),
        username,
        password,
        carnivalId,
        cidNumber,
        connectionFeeCash: 0,
        connectionFeeDue: 0,
        village,
        commissionPercent: 30
      };
    }
  );
}
function loadCustomers() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.length > 0) return parsed.map(deserialize);
    }
  } catch (_) {
  }
  const seed = buildSeedCustomers();
  try {
    localStorage.setItem(KEY, JSON.stringify(seed.map(serialize)));
  } catch (_) {
  }
  return seed;
}
function notifyCustomersChanged(updated) {
  window.dispatchEvent(
    new CustomEvent(CUSTOM_EVENT, { detail: updated })
  );
}
function useLocalCustomers() {
  const [customers, setCustomers] = reactExports.useState(loadCustomers);
  reactExports.useEffect(() => {
    function onStorage(e) {
      if (e.key === KEY) setCustomers(loadCustomers());
    }
    function onCustom(e) {
      setCustomers(e.detail);
    }
    window.addEventListener("storage", onStorage);
    window.addEventListener(CUSTOM_EVENT, onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(CUSTOM_EVENT, onCustom);
    };
  }, []);
  const addCustomers = reactExports.useCallback((newCustomers) => {
    setCustomers((prev) => {
      const maxId = prev.reduce((m, c) => c.id > m ? c.id : m, 0n);
      const withIds = newCustomers.map((c, i) => ({
        ...c,
        id: maxId + BigInt(i + 1)
      }));
      const updated = [...prev, ...withIds];
      try {
        localStorage.setItem(KEY, JSON.stringify(updated.map(serialize)));
      } catch (_) {
      }
      notifyCustomersChanged(updated);
      return updated;
    });
  }, []);
  const updateCustomer = reactExports.useCallback((updated) => {
    setCustomers((prev) => {
      const next = prev.map((c) => c.id === updated.id ? updated : c);
      try {
        localStorage.setItem(KEY, JSON.stringify(next.map(serialize)));
      } catch (_) {
      }
      notifyCustomersChanged(next);
      return next;
    });
  }, []);
  const deleteCustomer = reactExports.useCallback((id) => {
    setCustomers((prev) => {
      const next = prev.filter((c) => c.id !== id);
      try {
        localStorage.setItem(KEY, JSON.stringify(next.map(serialize)));
      } catch (_) {
      }
      notifyCustomersChanged(next);
      return next;
    });
  }, []);
  return { customers, addCustomers, updateCustomer, deleteCustomer };
}
export {
  normalizeAddress as n,
  toTitleCase as t,
  useLocalCustomers as u
};
