export interface PolaroidPhoto {
  id: string;
  url: string;
  caption: string;
  date: string;
  rotation: number;
  sticker: string;
}

export interface SpecialReason {
  id: number;
  title: string;
  tagline: string;
  detail: string;
  icon: string;
  emoji: string;
  bgColor: string;
  accentColor: string;
}

export interface MysteryBox {
  id: number;
  label: string;
  boxColor: string;
  ribbonColor: string;
  prizeTitle: string;
  prizeDescription: string;
  prizeIcon: string;
}
