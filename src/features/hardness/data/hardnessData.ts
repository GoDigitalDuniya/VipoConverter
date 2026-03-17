export type HardnessItem = {
  id: string;
  standard: "ASTM" | "DIN";
  table: string;
  title: string;
};

export const hardnessData: HardnessItem[] = [
  {
    id: "astm-1",
    standard: "ASTM",
    table: "Tab. 1",
    title: "Non Austenitic steel (Rockwell C Hardness Range)",
  },
  {
    id: "astm-2",
    standard: "ASTM",
    table: "Tab. 2",
    title: "Non Austenitic steel (Rockwell B Hardness Range)",
  },
  {
    id: "astm-3",
    standard: "ASTM",
    table: "Tab. 3",
    title: "Nickel and High-Nickel Alloys",
  },
  {
    id: "astm-3a",
    standard: "ASTM",
    table: "Tab. 3A",
    title: "Nickel & High Nickel Alloys for Knoop Indenter",
  },
  {
    id: "astm-4",
    standard: "ASTM",
    table: "Tab. 4",
    title: "Cartridge Brass (70% Copper 30% Zinc Alloy)",
  },
  {
    id: "astm-5",
    standard: "ASTM",
    table: "Tab. 5",
    title: "Austenitic Stainless Steel Plate in Annealed Condition",
  },
  {
    id: "astm-6",
    standard: "ASTM",
    table: "Tab. 6",
    title: "Austenitic Stainless Steel Sheet (Rockwell Hardness C)",
  },
  {
    id: "astm-6a",
    standard: "ASTM",
    table: "Tab. 6A",
    title: "Austenitic Stainless Steel Sheet (Rockwell Hardness B)",
  },
  {
    id: "astm-7",
    standard: "ASTM",
    table: "Tab. 7",
    title: "Copper, No.102 to 142 Inclusive",
  },
  {
    id: "astm-8",
    standard: "ASTM",
    table: "Tab. 8",
    title: "Alloyed White Irons",
  },

  // DIN
  {
    id: "din-a1",
    standard: "DIN",
    table: "Tab. A1",
    title: "Unalloyed and low-alloy steels and cast iron",
  },
  {
    id: "din-b2",
    standard: "DIN",
    table: "Tab. B2",
    title: "Quenching and Tempering steels in quenched tempered conditions",
  },
  {
    id: "din-b3",
    standard: "DIN",
    table: "Tab. B3",
    title: "Quenching and Tempering steels in untreated, soft annealed or normalized",
  },
  {
    id: "din-b4",
    standard: "DIN",
    table: "Tab. B4",
    title: "Quenching and tempering steels in quenched condition",
  },
  {
    id: "din-c2",
    standard: "DIN",
    table: "Tab. C2",
    title: "Cold working steels",
  },
  {
    id: "din-d2",
    standard: "DIN",
    table: "Tab. D2",
    title: "High Speed steels of steel grades X80W...",
  },
  {
    id: "din-f2",
    standard: "DIN",
    table: "Tab. F2",
    title: "Cartridge Brass (70% copper,30% zinc alloy)",
  },
];