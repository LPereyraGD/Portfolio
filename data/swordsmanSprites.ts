import type { SpriteSheetConfig } from "@/lib/spriteTypes";

export const swordsmanSpriteConfig: SpriteSheetConfig = {
  // Default sheet can just be the idle sheet; most properties will be overridden by animations.
  src: "/sprites/Swordsman_Idle.png",
  frameWidth: 38, // TODO: adjust to real frame size
  frameHeight: 38, // TODO: adjust to real frame size
  columns: 3, // TODO: adjust to real columns
  rows: 3, // TODO: adjust to real rows
  animations: {
    idle: {
      // Uses the default idle sheet and layout (Swordsman_Idle.png)
      row: 0,
      from: 0,
      to: 2,
      fps: 7,
      // If needed I can still override frameWidth/columns here.
    },
    idleAtk: {
      // Idle animation after being attacked for the first time
      src: "/sprites/Swordsman_IdleAtk.png",
      frameWidth: 38, // TODO: adjust to real frame size
      frameHeight: 38,
      columns: 3, // TODO: adjust to real columns
      rows: 2, // TODO: adjust to real rows
      row: 0,
      from: 0,
      to: 1,
      fps: 5,
    },
    hit: {
      // Use a completely different PNG for the hit animation
      src: "/sprites/Swordsman_Hit.png",
      frameWidth: 38, // TODO: real numbers
      frameHeight: 38,
      columns: 3,
      rows: 2,
      row: 0,
      from: 0,
      to: 1,
      fps: 5,
    },
    attack: {
      // Attack animation for taunt action
      src: "/sprites/Swordsman_Atk1.png",
      frameWidth: 38, // TODO: adjust to real frame size
      frameHeight: 38,
      columns: 3, // TODO: adjust to real columns (appears to be 3x3 grid)
      rows: 3, // TODO: adjust to real rows
      row: 0,
      from: 0,
      to: 3, // TODO: adjust to real frame count
      fps: 9,
    },
    death: {
      src: "/sprites/Swordsman_Death.png",
      frameWidth: 38, // TODO: real numbers
      frameHeight: 38,
      columns: 3,
      rows: 2,
      row: 0,
      from: 0,
      to: 3,
      fps: 6,
    },
    deathIdle: {
      src: "/sprites/Swordsman_Death_Idle.png",
      frameWidth: 38, // TODO: adjust to real frame size
      frameHeight: 38,
      columns: 1, // TODO: adjust to real columns
      rows: 1, // TODO: adjust to real rows
      row: 0,
      from: 0,
      to: 1, // TODO: adjust to real frame count
      fps: 1,
    },
    march: {
      src: "/sprites/Swordsman_March.png",
      frameWidth: 38, // TODO: adjust to real frame size
      frameHeight: 38,
      columns: 3, // TODO: adjust to real columns
      rows: 2, // TODO: adjust to real rows
      row: 0,
      from: 0,
      to: 1, // TODO: adjust to real frame count
      fps: 5,
    },
    walk: {
      src: "/sprites/Swordsman_Walk.png",
      frameWidth: 38, // TODO: adjust to real frame size
      frameHeight: 38,
      columns: 4, // TODO: adjust to real columns
      rows: 3, // TODO: adjust to real rows
      row: 0,
      from: 0,
      to: 2, // TODO: adjust to real frame count
      fps: 11,
    },
  },
};
