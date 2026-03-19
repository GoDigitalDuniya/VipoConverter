export type SizeRow = Record<string, string>;

export type SizeUnit = {
  key: string;
  label: string;
};

export type SizeCategory = {
  key: string;
  label: string;
  units: SizeUnit[];
  rows: SizeRow[];
};

export type SizeChartData = {
  key: string;
  label: string;
  categories: SizeCategory[];
};

export const shoeSizeData: SizeChartData = {
  key: "shoe-size",
  label: "Shoe Size",
  categories: [
    {
      key: "men",
      label: "Men",
      units: [
        { key: "us",    label: "US" },
        { key: "eur",   label: "EUR" },
        { key: "uk",    label: "UK" },
        { key: "inch",  label: "inch" },
        { key: "cm",    label: "cm" },
      ],
      rows: [
        { us: "6",    eur: "39",      uk: "5.5",  inch: "9.25",    cm: "23.5" },
        { us: "6.5",  eur: "39-40",   uk: "6",    inch: "9.5",     cm: "24.1" },
        { us: "7",    eur: "40",      uk: "6.5",  inch: "9.625",   cm: "24.4" },
        { us: "7.5",  eur: "40-41",   uk: "7",    inch: "9.75",    cm: "24.8" },
        { us: "8",    eur: "41",      uk: "7.5",  inch: "9.9375",  cm: "25.4" },
        { us: "8.5",  eur: "41-42",   uk: "8",    inch: "10.125",  cm: "25.7" },
        { us: "9",    eur: "42",      uk: "8.5",  inch: "10.25",   cm: "26"   },
        { us: "9.5",  eur: "42-43",   uk: "9",    inch: "10.4375", cm: "26.7" },
        { us: "10",   eur: "43",      uk: "9.5",  inch: "10.5625", cm: "27"   },
        { us: "10.5", eur: "43-44",   uk: "10",   inch: "10.75",   cm: "27.3" },
        { us: "11",   eur: "44",      uk: "10.5", inch: "10.9375", cm: "27.9" },
        { us: "11.5", eur: "44-45",   uk: "11",   inch: "11.125",  cm: "28.3" },
        { us: "12",   eur: "45",      uk: "11.5", inch: "11.25",   cm: "28.6" },
        { us: "13",   eur: "46",      uk: "12.5", inch: "11.5625", cm: "29.4" },
        { us: "14",   eur: "47",      uk: "13.5", inch: "11.875",  cm: "30.2" },
        { us: "15",   eur: "48",      uk: "14.5", inch: "12.1875", cm: "31"   },
        { us: "16",   eur: "49",      uk: "15.5", inch: "12.5",    cm: "31.8" },
      ],
    },
    {
      key: "women",
      label: "Women",
      units: [
        { key: "us",   label: "US" },
        { key: "eur",  label: "EUR" },
        { key: "uk",   label: "UK" },
        { key: "inch", label: "inch" },
        { key: "cm",   label: "cm" },
      ],
      rows: [
        { us: "4",    eur: "35",      uk: "2",    inch: "8.1875",  cm: "20.8" },
        { us: "4.5",  eur: "35-36",   uk: "2.5",  inch: "8.375",   cm: "21.3" },
        { us: "5",    eur: "36",      uk: "3",    inch: "8.5",     cm: "21.6" },
        { us: "5.5",  eur: "36-37",   uk: "3.5",  inch: "8.75",    cm: "22.2" },
        { us: "6",    eur: "37",      uk: "4",    inch: "8.875",   cm: "22.5" },
        { us: "6.5",  eur: "37-38",   uk: "4.5",  inch: "9.0625",  cm: "23"   },
        { us: "7",    eur: "38",      uk: "5",    inch: "9.25",    cm: "23.5" },
        { us: "7.5",  eur: "38-39",   uk: "5.5",  inch: "9.375",   cm: "23.8" },
        { us: "8",    eur: "39",      uk: "6",    inch: "9.5",     cm: "24.1" },
        { us: "8.5",  eur: "39-40",   uk: "6.5",  inch: "9.6875",  cm: "24.6" },
        { us: "9",    eur: "40",      uk: "7",    inch: "9.875",   cm: "25.1" },
        { us: "9.5",  eur: "40-41",   uk: "7.5",  inch: "10",      cm: "25.4" },
        { us: "10",   eur: "41",      uk: "8",    inch: "10.1875", cm: "25.9" },
        { us: "10.5", eur: "41-42",   uk: "8.5",  inch: "10.5",    cm: "26.2" },
        { us: "11",   eur: "42",      uk: "9",    inch: "10.3125", cm: "26.7" },
        { us: "11.5", eur: "42-43",   uk: "9.5",  inch: "10.6875", cm: "27.1" },
        { us: "12",   eur: "43",      uk: "10",   inch: "10.875",  cm: "27.6" },
      ],
    },
    {
      key: "youth",
      label: "Youth",
      units: [
        { key: "us",   label: "US" },
        { key: "eur",  label: "EUR" },
        { key: "uk",   label: "UK" },
        { key: "inch", label: "inch" },
        { key: "cm",   label: "cm" },
      ],
      rows: [
        { us: "1",    eur: "32", uk: "1",    inch: "7.25",  cm: "18.4" },
        { us: "1.5",  eur: "33", uk: "1.5",  inch: "7.5",   cm: "19.1" },
        { us: "2",    eur: "33", uk: "2",    inch: "7.625", cm: "19.4" },
        { us: "2.5",  eur: "34", uk: "2.5",  inch: "7.75",  cm: "19.7" },
        { us: "3",    eur: "34", uk: "3",    inch: "8",     cm: "20.3" },
        { us: "3.5",  eur: "35", uk: "3.5",  inch: "8.125", cm: "20.6" },
        { us: "4",    eur: "36", uk: "4",    inch: "8.25",  cm: "21"   },
        { us: "4.5",  eur: "36", uk: "4.5",  inch: "8.5",   cm: "21.6" },
        { us: "5",    eur: "37", uk: "5",    inch: "8.625", cm: "21.9" },
        { us: "5.5",  eur: "37", uk: "5.5",  inch: "8.75",  cm: "22.2" },
        { us: "6",    eur: "38", uk: "6",    inch: "9",     cm: "22.9" },
        { us: "6.5",  eur: "38", uk: "11.5", inch: "9.125", cm: "23.2" },
        { us: "7",    eur: "39", uk: "12",   inch: "9.25",  cm: "23.5" },
        { us: "12.5", eur: "29", uk: "12.5", inch: "9.5",   cm: "24.1" },
        { us: "13",   eur: "30", uk: "13",   inch: "9.625", cm: "24.4" },
        { us: "13.5", eur: "31", uk: "14",   inch: "9.75",  cm: "24.8" },
      ],
    },
    {
      key: "kids",
      label: "Kids",
      units: [
        { key: "us",   label: "US" },
        { key: "eur",  label: "EUR" },
        { key: "uk",   label: "UK" },
        { key: "inch", label: "inch" },
        { key: "cm",   label: "cm" },
      ],
      rows: [
        { us: "5.5",  eur: "21", uk: "4.5", inch: "5",     cm: "12.7" },
        { us: "6",    eur: "22", uk: "5",   inch: "5.125", cm: "13"   },
        { us: "6.5",  eur: "22", uk: "5.5", inch: "5.25",  cm: "13.3" },
        { us: "7",    eur: "23", uk: "6",   inch: "5.5",   cm: "14"   },
        { us: "7.5",  eur: "23", uk: "6.5", inch: "5.625", cm: "14.3" },
        { us: "8",    eur: "24", uk: "7",   inch: "5.75",  cm: "14.6" },
        { us: "8.5",  eur: "25", uk: "7.5", inch: "6",     cm: "15.2" },
        { us: "9",    eur: "25", uk: "8",   inch: "6.125", cm: "15.6" },
        { us: "9.5",  eur: "26", uk: "8.5", inch: "6.25",  cm: "15.9" },
        { us: "10",   eur: "27", uk: "9",   inch: "6.5",   cm: "16.5" },
        { us: "10.5", eur: "27", uk: "9.5", inch: "6.625", cm: "16.8" },
        { us: "11",   eur: "28", uk: "10",  inch: "6.75",  cm: "17.1" },
        { us: "11.5", eur: "29", uk: "10.5",inch: "7",     cm: "17.8" },
        { us: "12",   eur: "30", uk: "11",  inch: "7.125", cm: "18.1" },
      ],
    },
    {
      key: "infants",
      label: "Infants",
      units: [
        { key: "us",   label: "US" },
        { key: "eur",  label: "EUR" },
        { key: "uk",   label: "UK" },
        { key: "inch", label: "inch" },
        { key: "cm",   label: "cm" },
      ],
      rows: [
        { us: "0.5", eur: "16", uk: "0",   inch: "3.25",  cm: "8.3"  },
        { us: "1",   eur: "16", uk: "0.5", inch: "3.5",   cm: "8.9"  },
        { us: "1.5", eur: "17", uk: "1",   inch: "3.625", cm: "9.2"  },
        { us: "2",   eur: "17", uk: "1",   inch: "3.75",  cm: "9.5"  },
        { us: "2.5", eur: "18", uk: "1.5", inch: "4",     cm: "10.2" },
        { us: "3",   eur: "18", uk: "2",   inch: "4.125", cm: "10.5" },
        { us: "3.5", eur: "19", uk: "2.5", inch: "4.25",  cm: "10.8" },
        { us: "4",   eur: "19", uk: "3",   inch: "4.5",   cm: "11.4" },
        { us: "4.5", eur: "20", uk: "3.5", inch: "5.625", cm: "11.7" },
        { us: "5",   eur: "20", uk: "4",   inch: "4.75",  cm: "12.1" },
      ],
    },
  ],
};