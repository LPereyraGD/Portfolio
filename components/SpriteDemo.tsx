"use client";

import SpriteAnimation from "@/components/SpriteAnimation";
import { swordsmanSpriteConfig } from "@/data/swordsmanSprites";

export function SpriteDemo() {
  return (
    <div className="p-4">
      <SpriteAnimation
        config={swordsmanSpriteConfig}
        animation="idle"
        playing
        loop
        className="scale-[2.5]"
      />
    </div>
  );
}

