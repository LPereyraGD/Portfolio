"use client";

import { useEffect, useState, useRef } from "react";
import type { SpriteSheetConfig, SpriteAnimationDefinition } from "@/lib/spriteTypes";

interface SpriteAnimationProps {
  config: SpriteSheetConfig;
  animation: string;
  className?: string;
  style?: React.CSSProperties;
  onFrameChange?: (frame: number) => void;
  paused?: boolean;
  playing?: boolean;
  loop?: boolean;
  fpsOverride?: number;
  onFinished?: () => void;
}

export default function SpriteAnimation({
  config,
  animation,
  className = "",
  style,
  onFrameChange,
  paused = false,
  playing = true,
  loop = true,
  fpsOverride,
  onFinished,
}: SpriteAnimationProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const frameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const animationRef = useRef<number>(0);

  // Get the active animation definition, fallback to first animation if not found
  const animationKeys = Object.keys(config.animations);
  const animDef: SpriteAnimationDefinition | undefined =
    config.animations[animation] ?? (animationKeys.length > 0 ? config.animations[animationKeys[0]] : undefined);

  // Compute effective values by merging defaults with overrides
  const effectiveSrc = animDef?.src ?? config.src;
  const frameWidth = animDef?.frameWidth ?? config.frameWidth;
  const frameHeight = animDef?.frameHeight ?? config.frameHeight;
  const columns = animDef?.columns ?? config.columns;
  const rows = animDef?.rows ?? config.rows;

  // Pre-load image immediately when component mounts or src changes
  useEffect(() => {
    const img = new Image();
    img.src = effectiveSrc;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => {
      setImageError(true);
      setImageLoaded(false);
    };
  }, [effectiveSrc]);

  // Determine fps
  const fps = fpsOverride ?? animDef?.fps ?? 8;

  useEffect(() => {
    if (!animDef || !playing || paused) {
      return;
    }

    const frameCount = animDef.to - animDef.from + 1;
    const frameDuration = 1000 / fps;

    const animate = (currentTime: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = currentTime;
      }

      const elapsed = currentTime - lastTimeRef.current;

      if (elapsed >= frameDuration) {
        setCurrentFrame((prev) => {
          const next = prev + 1;

          // Handle looping vs non-looping
          if (next >= frameCount) {
            if (loop) {
              frameRef.current = 0;
              onFrameChange?.(0);
              return 0;
            } else {
              // Non-looping: stay on last frame and call onFinished
              frameRef.current = frameCount - 1;
              onFrameChange?.(frameCount - 1);
              onFinished?.();
              return frameCount - 1;
            }
          }

          frameRef.current = next;
          onFrameChange?.(next);
          return next;
        });
        lastTimeRef.current = currentTime;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      lastTimeRef.current = 0;
    };
  }, [animDef, animation, paused, playing, loop, fps, onFrameChange, onFinished]);

  // Reset frame when animation changes
  useEffect(() => {
    if (animDef) {
      setCurrentFrame(0);
      frameRef.current = 0;
      lastTimeRef.current = 0;
    }
  }, [animation, animDef]);

  // Track image source changes to reload
  const [currentSrc, setCurrentSrc] = useState(effectiveSrc);
  useEffect(() => {
    if (effectiveSrc !== currentSrc) {
      setCurrentSrc(effectiveSrc);
      setImageLoaded(false);
      setImageError(false);
    }
  }, [effectiveSrc, currentSrc]);

  if (!animDef) {
    return (
      <div className={className} style={style}>
        <div className="text-xs text-red-500">Animation "{animation}" not found</div>
      </div>
    );
  }

  const frameIndex = animDef.from + currentFrame;
  const column = frameIndex % columns;
  const row = animDef.row;

  const backgroundPositionX = -column * frameWidth;
  const backgroundPositionY = -row * frameHeight;

  return (
    <div
      className={className}
      style={{
        width: `${frameWidth}px`,
        height: `${frameHeight}px`,
        backgroundImage: imageLoaded ? `url(${effectiveSrc})` : "none",
        backgroundSize: `${columns * frameWidth}px ${rows * frameHeight}px`,
        backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
        imageRendering: "pixelated" as const,
        opacity: imageLoaded ? 1 : 0,
        ...style,
      }}
    >
      {/* Hidden img to preload - track current src for reloading */}
      <img
        key={effectiveSrc}
        src={effectiveSrc}
        alt=""
        className="hidden"
        onLoad={() => setImageLoaded(true)}
        onError={() => {
          setImageError(true);
          setImageLoaded(false);
        }}
      />
    </div>
  );
}

