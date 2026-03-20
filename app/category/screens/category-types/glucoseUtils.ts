// ─── Conversion Constants ─────────────────────────────────────────────────────

export const EXACT_MGDL_TO_MMOL = 0.0555;
export const EXACT_MMOL_TO_MGDL = 18.0182;

// ─── Conversion Functions ─────────────────────────────────────────────────────

export function mgdlToMmol(value: number): number {
  return value * EXACT_MGDL_TO_MMOL;
}

export function mmolToMgdl(value: number): number {
  return value * EXACT_MMOL_TO_MGDL;
}

// ─── Type Definitions ─────────────────────────────────────────────────────────

export type GlucoseUnit = "mmol" | "mgdl";

export const UNIT_LABELS: Record<GlucoseUnit, string> = {
  mmol: "mmol/l",
  mgdl: "mg/dl",
};

// ─── Conversion Tables ────────────────────────────────────────────────────────

export const MGDL_TO_MMOL_TABLE = [
  { mgdl: "40", mmol: "2.2" },
  { mgdl: "45", mmol: "2.5" },
  { mgdl: "50", mmol: "2.8" },
  { mgdl: "55", mmol: "3.1" },
  { mgdl: "60", mmol: "3.3" },
  { mgdl: "65", mmol: "3.6" },
  { mgdl: "70", mmol: "3.9" },
  { mgdl: "75", mmol: "4.2" },
  { mgdl: "80", mmol: "4.4" },
  { mgdl: "85", mmol: "4.7" },
  { mgdl: "90", mmol: "5.0" },
  { mgdl: "95", mmol: "5.3" },
  { mgdl: "100", mmol: "5.6" },
  { mgdl: "110", mmol: "6.1" },
  { mgdl: "120", mmol: "6.7" },
  { mgdl: "130", mmol: "7.2" },
  { mgdl: "140", mmol: "7.8" },
  { mgdl: "150", mmol: "8.3" },
  { mgdl: "160", mmol: "8.9" },
  { mgdl: "170", mmol: "9.4" },
  { mgdl: "180", mmol: "10.0" },
  { mgdl: "190", mmol: "10.6" },
  { mgdl: "200", mmol: "11.1" },
  { mgdl: "220", mmol: "12.2" },
  { mgdl: "240", mmol: "13.3" },
  { mgdl: "260", mmol: "14.4" },
  { mgdl: "280", mmol: "15.6" },
  { mgdl: "300", mmol: "16.7" },
  { mgdl: "320", mmol: "17.8" },
  { mgdl: "340", mmol: "18.9" },
  { mgdl: "360", mmol: "20.0" },
  { mgdl: "380", mmol: "21.1" },
  { mgdl: "400", mmol: "22.2" },
  { mgdl: "420", mmol: "23.3" },
  { mgdl: "440", mmol: "24.4" },
  { mgdl: "460", mmol: "25.6" },
];

export const MMOL_TO_MGDL_TABLE = [
  { mmol: "2.0", mgdl: "36" },
  { mmol: "2.5", mgdl: "45" },
  { mmol: "3.0", mgdl: "54" },
  { mmol: "3.5", mgdl: "63" },
  { mmol: "4.0", mgdl: "72" },
  { mmol: "4.5", mgdl: "81" },
  { mmol: "5.0", mgdl: "90" },
  { mmol: "5.5", mgdl: "99" },
  { mmol: "6.0", mgdl: "108" },
  { mmol: "6.5", mgdl: "117" },
  { mmol: "7.0", mgdl: "126" },
  { mmol: "7.5", mgdl: "135" },
  { mmol: "8.0", mgdl: "144" },
  { mmol: "8.5", mgdl: "153" },
  { mmol: "9.0", mgdl: "162" },
  { mmol: "9.5", mgdl: "171" },
  { mmol: "10.0", mgdl: "180" },
  { mmol: "10.5", mgdl: "189" },
  { mmol: "11.0", mgdl: "198" },
  { mmol: "11.5", mgdl: "207" },
  { mmol: "12.0", mgdl: "216" },
  { mmol: "12.5", mgdl: "225" },
  { mmol: "13.0", mgdl: "234" },
  { mmol: "13.5", mgdl: "243" },
  { mmol: "14.0", mgdl: "252" },
  { mmol: "14.5", mgdl: "261" },
  { mmol: "15.0", mgdl: "270" },
  { mmol: "16.0", mgdl: "288" },
  { mmol: "17.0", mgdl: "306" },
  { mmol: "18.0", mgdl: "324" },
  { mmol: "19.0", mgdl: "342" },
  { mmol: "20.0", mgdl: "360" },
  { mmol: "21.0", mgdl: "378" },
  { mmol: "22.0", mgdl: "396" },
  { mmol: "23.0", mgdl: "414" },
  { mmol: "24.0", mgdl: "432" },
];
