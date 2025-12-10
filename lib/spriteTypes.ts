export type SpriteAnimationDefinition = {
  /** which row (0-based) this animation uses in its sheet */
  row: number;
  /** start frame index (column) */
  from: number;
  /** end frame index (inclusive) */
  to: number;
  /** frames per second for this animation (optional) */
  fps?: number;

  /** OPTIONAL overrides: use a different sheet or layout for this animation */
  src?: string;
  frameWidth?: number;
  frameHeight?: number;
  columns?: number;
  rows?: number;
};

export type SpriteSheetConfig = {
  /** default sheet values */
  src: string;
  frameWidth: number;
  frameHeight: number;
  columns: number;
  rows: number;
  animations: Record<string, SpriteAnimationDefinition>;
};

