"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import SpriteAnimation from "@/components/SpriteAnimation";
import { swordsmanSpriteConfig } from "@/data/swordsmanSprites";

export type CharacterState = "idle" | "run" | "action" | "wave";

interface CompanionCharacterProps {
  state: CharacterState;
}

const MAX_HP = 4;

type KnightState =
  | "idle"
  | "taunt"
  | "patrol"
  | "callToAction"
  | "hoverReaction"
  | "hitReaction"
  | "death"
  | "deathIdle";

type AmbientAction = "taunt" | "patrol" | "callToAction";

type TimeoutHandle = ReturnType<typeof setTimeout>;

const TAUNT_PHRASES = [
  "You shall not pass.",
  "State machines? I eat them for breakfast.",
  "Click me if you're brave enough.",
];

const CALL_TO_ACTION_PHRASES = [
  "Charge into my projects!",
  "My CV has higher DPS than you think.",
  "Need a Senior dev? I come with tools included.",
];

const HOVER_PHRASES = [
  "Careful with that mouse...",
  "Looking for a hidden combo?",
];

const HIT_PHRASES_HIGH = ["Nice try."];
const HIT_PHRASES_MEDIUM = ["My armor is SOLID, unlike some code."];
const HIT_PHRASES_LOW = ["Okay okay, that actually hurt..."];

export default function CompanionCharacter({
  state,
}: CompanionCharacterProps) {
  const [hp, setHp] = useState(MAX_HP);
  const [isHit, setIsHit] = useState(false);
  const [knightState, setKnightState] = useState<KnightState>("idle");
  const [currentAnimation, setCurrentAnimation] = useState<string>("idle");
  const [speechBubble, setSpeechBubble] = useState<{
    text: string;
    id: number;
  } | null>(null);
  const [hasBeenAttacked, setHasBeenAttacked] = useState(false);
  const [hasScrolledToContact, setHasScrolledToContact] = useState(false);
  const [knightPosition, setKnightPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [patrolDirection, setPatrolDirection] = useState<"right" | "left">("right");
  const [lastAmbientAction, setLastAmbientAction] = useState<AmbientAction | null>(null);

  const ambientTimerRef = useRef<TimeoutHandle | null>(null);
  const speechTimerRef = useRef<TimeoutHandle | null>(null);
  const firstActionRef = useRef(true);

  const clearAllTimers = () => {
    if (ambientTimerRef.current) {
      clearTimeout(ambientTimerRef.current);
      ambientTimerRef.current = null;
    }
  };

  const clearSpeechTimer = () => {
    if (speechTimerRef.current) {
      clearTimeout(speechTimerRef.current);
      speechTimerRef.current = null;
    }
  };

  const showBubble = useCallback((text: string, duration: number = 4000) => {
    clearSpeechTimer();
    const id = Date.now();
    setSpeechBubble({ text, id });
    speechTimerRef.current = setTimeout(() => {
      setSpeechBubble(null);
      speechTimerRef.current = null;
    }, duration);
  }, []);

  const getRandomPhrase = (phrases: string[]) =>
    phrases[Math.floor(Math.random() * phrases.length)];

  const selectAmbientAction = useCallback((): AmbientAction => {
    const availableActions: AmbientAction[] = [];
    if (lastAmbientAction !== "taunt") availableActions.push("taunt");
    if (lastAmbientAction !== "patrol") availableActions.push("patrol");
    if (lastAmbientAction !== "callToAction") availableActions.push("callToAction");

    const actionsToChooseFrom = availableActions.length > 0 ? availableActions : ["taunt", "patrol", "callToAction"];

    const tauntAvailable = actionsToChooseFrom.includes("taunt");
    const patrolAvailable = actionsToChooseFrom.includes("patrol");
    const callToActionAvailable = actionsToChooseFrom.includes("callToAction");

    let totalWeight = 0;
    if (tauntAvailable) totalWeight += 0.3;
    if (patrolAvailable) totalWeight += 0.3;
    if (callToActionAvailable) totalWeight += 0.4;

    const random = Math.random() * totalWeight;
    let cumulative = 0;
    let action: AmbientAction = actionsToChooseFrom[0] as AmbientAction;

    if (tauntAvailable) {
      cumulative += 0.3;
      if (random < cumulative) {
        action = "taunt";
      }
    }
    if (random >= cumulative && patrolAvailable) {
      cumulative += 0.3;
      if (random < cumulative) {
        action = "patrol";
      }
    }
    if (random >= cumulative && callToActionAvailable) {
      action = "callToAction";
    }

    return action;
  }, [lastAmbientAction]);

  useEffect(() => {
    const isIdleAnimation = currentAnimation === "idle" || currentAnimation === "idleAtk";
    if (hp === 0 || knightState !== "idle" || isHovered || !isIdleAnimation) {
      return;
    }

    const scheduleAmbientAction = () => {
      const isFirstAction = firstActionRef.current;
      firstActionRef.current = false;

      const delay = isFirstAction
        ? 4000 + Math.random() * 2000
        : 10000 + Math.random() * 8000;

      ambientTimerRef.current = setTimeout(() => {
        const isIdleAnimation = currentAnimation === "idle" || currentAnimation === "idleAtk";
        if (hp === 0 || knightState !== "idle" || isHovered || !isIdleAnimation) {
          scheduleAmbientAction();
          return;
        }

        const action = selectAmbientAction();
        setLastAmbientAction(action);

        clearAllTimers();
        setKnightPosition({ x: 0, y: 0 });

        switch (action) {
          case "taunt": {
            setKnightState("taunt");
            setCurrentAnimation("attack");
            showBubble(getRandomPhrase(TAUNT_PHRASES), 4000);

            const tauntTimer = setTimeout(() => {
              setCurrentAnimation("idle");
              setKnightPosition({ x: 0, y: 0 });
              setKnightState("idle");
              scheduleAmbientAction();
            }, 2000);

            ambientTimerRef.current = tauntTimer as TimeoutHandle;
            break;
          }

          case "patrol": {
            setKnightState("patrol");
            setCurrentAnimation("walk");
            const moveDistance = 20 + Math.random() * 10;

            setPatrolDirection("right");
            setKnightPosition({ x: moveDistance, y: 0 });

            const patrolTimer1 = setTimeout(() => {
              setPatrolDirection("left");
              setKnightPosition({ x: 0, y: 0 });

              const patrolTimer2 = setTimeout(() => {
                setCurrentAnimation("idle");
                setKnightState("idle");
                setPatrolDirection("right");
                scheduleAmbientAction();
              }, 1200);

              ambientTimerRef.current = patrolTimer2 as TimeoutHandle;
            }, 2500);

            ambientTimerRef.current = patrolTimer1 as TimeoutHandle;

            if (Math.random() > 0.5) {
              showBubble("Just patrolling the codebase...", 4000);
            }
            break;
          }

          case "callToAction": {
            setKnightState("callToAction");
            setCurrentAnimation("march");
            const moveRight = 15 + Math.random() * 10;
            const moveUp = -(5 + Math.random() * 5);

            setKnightPosition({ x: moveRight, y: moveUp });
            showBubble(getRandomPhrase(CALL_TO_ACTION_PHRASES), 4000);

            const ctaTimer1 = setTimeout(() => {
              setKnightPosition({ x: 0, y: 0 });

              const ctaTimer2 = setTimeout(() => {
                setCurrentAnimation("idle");
                setKnightState("idle");
                scheduleAmbientAction();
              }, 500);

              ambientTimerRef.current = ctaTimer2 as TimeoutHandle;
            }, 2500);

            ambientTimerRef.current = ctaTimer1 as TimeoutHandle;
            break;
          }
        }
      }, delay);
    };

    scheduleAmbientAction();

    return () => {
      clearAllTimers();
    };
  }, [hp, knightState, isHovered, currentAnimation, lastAmbientAction, showBubble, selectAmbientAction]);

  const handleMouseEnter = () => {
    if (hp === 0) return;

    setIsHovered(true);
    clearAllTimers();
    clearSpeechTimer();

    setKnightState("hoverReaction");
    setCurrentAnimation("idleAtk");
    showBubble(getRandomPhrase(HOVER_PHRASES), 4000);
    setKnightPosition({ x: 0, y: 0 });
  };

  const handleMouseLeave = () => {
    if (hp === 0) return;

    setIsHovered(false);
    setKnightState("idle");
    setCurrentAnimation(hasBeenAttacked ? "idleAtk" : "idle");
  };

  const handleClick = () => {
    if (hp === 0) return;

    clearAllTimers();
    clearSpeechTimer();
    setIsHovered(false);
    setKnightPosition({ x: 0, y: 0 });

    const newHp = Math.max(0, hp - 1);
    setHp(newHp);
    setIsHit(true);
    setKnightState("hitReaction");
    setCurrentAnimation("hit");

    if (!hasBeenAttacked) {
      setHasBeenAttacked(true);
    }

    let hitPhrase = "";
    if (newHp >= 3) {
      hitPhrase = getRandomPhrase(HIT_PHRASES_HIGH);
    } else if (newHp >= 2) {
      hitPhrase = getRandomPhrase(HIT_PHRASES_MEDIUM);
    } else if (newHp >= 1) {
      hitPhrase = getRandomPhrase(HIT_PHRASES_LOW);
    }

    if (hitPhrase) {
      showBubble(hitPhrase, 4000);
    }

    setTimeout(() => {
      setIsHit(false);
      setTimeout(() => {
        if (newHp > 0) {
          setCurrentAnimation(hasBeenAttacked ? "idleAtk" : "idle");
          setKnightState("idle");
        }
      }, 400);
    }, 100);
  };

  useEffect(() => {
    if (hp === 0 && knightState !== "death" && knightState !== "deathIdle") {
      clearAllTimers();
      clearSpeechTimer();
      setKnightState("death");
      setCurrentAnimation("death");
      setKnightPosition({ x: 0, y: 0 });
      setIsHovered(false);

      showBubble("Please contact the dev to revive me.", 3600000); // 1 hour (effectively permanent)

      if (!hasScrolledToContact) {
        setHasScrolledToContact(true);
        setTimeout(() => {
          const contactElement = document.getElementById("contact");
          if (contactElement) {
            contactElement.scrollIntoView({ behavior: "smooth" });
          }
        }, 500);
      }
    }
  }, [hp, knightState, hasScrolledToContact, showBubble]);

  const handleDeathFinished = () => {
    if (hp === 0 && knightState === "death") {
      setKnightState("deathIdle");
      setCurrentAnimation("deathIdle");
    }
  };

  useEffect(() => {
    if (hp > 0 && knightState === "idle") {
      setCurrentAnimation(hasBeenAttacked ? "idleAtk" : "idle");
    }
  }, [hp, knightState, hasBeenAttacked]);

  const renderHPBar = () => {
    const filled = "█".repeat(hp);
    const empty = "░".repeat(MAX_HP - hp);
    return `HP: ${filled}${empty}`;
  };

  const isIdleBobbing =
    hp > 0 &&
    (currentAnimation === "idle" || currentAnimation === "idleAtk") &&
    !isHovered &&
    knightState === "idle" &&
    knightPosition.x === 0 &&
    knightPosition.y === 0;

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="relative">
        <AnimatePresence>
          {speechBubble && (
            <motion.div
              key={speechBubble.id}
              initial={{ opacity: 0, y: 10, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-full left-0 mb-2 bg-background border border-foreground/20 rounded px-3 py-2 shadow-lg max-w-[200px] z-50"
            >
              <p className="text-xs text-foreground/80 font-mono">
                {speechBubble.text}
              </p>
              <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-background" />
              <div className="absolute top-full left-4 w-0 h-0 border-l-[3px] border-r-[3px] border-t-[3px] border-transparent border-t-foreground/20 translate-y-[-1px]" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="cursor-pointer relative"
          animate={{
            x: knightPosition.x,
            y: knightPosition.y,
          }}
          transition={{
            duration: knightPosition.x !== 0 || knightPosition.y !== 0 ? 1.5 : 0,
            ease: "easeInOut",
          }}
        >
          <motion.div
            animate={{
              scale: isHit ? [1, 0.98, 1] : isIdleBobbing ? [1, 1.02, 1] : 1,
              x: isHit ? [0, -2, 2, -2, 0] : 0,
              y: isIdleBobbing ? [0, -4, 0] : 0,
            }}
            transition={{
              duration: isHit ? 0.1 : 3,
              ease: "easeInOut",
              repeat: isHit ? 0 : isIdleBobbing ? Infinity : 0,
            }}
          >
            <div className="relative flex flex-col items-center gap-6">
              <div
                style={{
                  filter: hp === 0 ? "grayscale(100%) opacity(0.5)" : "none",
                  transform:
                    patrolDirection === "left" && knightState === "patrol"
                      ? "scale(2) scaleX(-1)"
                      : "scale(2)",
                  transformOrigin: "center",
                }}
              >
                <SpriteAnimation
                  config={swordsmanSpriteConfig}
                  animation={currentAnimation}
                  playing={
                    hp > 0 ||
                    currentAnimation === "death" ||
                    currentAnimation === "deathIdle"
                  }
                  paused={false}
                  loop={
                    currentAnimation === "idle" ||
                    currentAnimation === "idleAtk" ||
                    currentAnimation === "march" ||
                    currentAnimation === "walk" ||
                    currentAnimation === "deathIdle"
                  }
                  onFinished={handleDeathFinished}
                />
              </div>

              <div className="bg-background/90 backdrop-blur-sm border border-foreground/20 rounded px-3 py-2">
                <p className="text-xs font-mono text-foreground/80">
                  {renderHPBar()}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
