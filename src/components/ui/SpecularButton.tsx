"use client";

import {
  useEffect,
  lazy,
  useRef,
  useState,
  Suspense,
  type CSSProperties,
  type MouseEventHandler,
  type ReactNode,
} from "react";
import { Link } from "@/i18n/navigation";
import type { ShaderProps } from "./SpecularCanvasEffect";
import "./SpecularButton.css";

const SpecularCanvasEffect = lazy(() => import("./SpecularCanvasEffect"));

type ButtonSize = "sm" | "md" | "lg";

export interface SpecularButtonProps {
  children?: ReactNode;
  size?: ButtonSize;
  radius?: number;
  tint?: string;
  tintOpacity?: number;
  blur?: number;
  textColor?: string;
  lineColor?: string;
  baseColor?: string;
  intensity?: number;
  shineSize?: number;
  shineFade?: number;
  thickness?: number;
  speed?: number;
  followMouse?: boolean;
  proximity?: number;
  autoAnimate?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  href?: string;
  className?: string;
  "aria-label"?: string;
  "aria-expanded"?: boolean;
  title?: string;
}

const SpecularButton = ({
  children,
  size = "lg",
  radius = 0,
  tint = "#ffffff",
  tintOpacity = 0,
  blur = 1,
  textColor,
  lineColor = "var(--color-accent)",
  baseColor,
  intensity = 1,
  shineSize = 10,
  shineFade = 40,
  thickness = 1,
  speed = 0.35,
  followMouse = true,
  proximity = 250,
  autoAnimate = false,
  onClick,
  type = "button",
  href,
  className = "",
  "aria-label": ariaLabel,
  "aria-expanded": ariaExpanded,
  title,
}: SpecularButtonProps) => {
  const buttonRef = useRef<HTMLElement>(null);
  const effectRef = useRef<HTMLSpanElement>(null);
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const propsRef = useRef<ShaderProps>({
    radius,
    lineColor,
    baseColor,
    intensity,
    shineSize,
    shineFade,
    thickness,
    speed,
    followMouse,
    proximity,
    autoAnimate,
  });

  useEffect(() => {
    propsRef.current = {
      radius,
      lineColor,
      baseColor,
      intensity,
      shineSize,
      shineFade,
      thickness,
      speed,
      followMouse,
      proximity,
      autoAnimate,
    };
  }, [
    radius,
    lineColor,
    baseColor,
    intensity,
    shineSize,
    shineFade,
    thickness,
    speed,
    followMouse,
    proximity,
    autoAnimate,
  ]);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updatePointer = () => setHasFinePointer(pointerQuery.matches);
    const frame = window.requestAnimationFrame(updatePointer);
    pointerQuery.addEventListener("change", updatePointer);

    return () => {
      window.cancelAnimationFrame(frame);
      pointerQuery.removeEventListener("change", updatePointer);
    };
  }, []);

  const buttonStyle = {
    "--sb-radius": `${radius}px`,
    "--sb-tint": tint,
    "--sb-tint-opacity": tintOpacity,
    "--sb-blur": `${blur}px`,
    "--sb-text-color": textColor ?? "var(--color-primary)",
  } as CSSProperties;

  const content = (
    <>
      <span ref={effectRef} className="specular-button__fx" aria-hidden="true">
        {hasFinePointer && (
          <Suspense fallback={null}>
            <SpecularCanvasEffect
              buttonRef={buttonRef}
              effectRef={effectRef}
              propsRef={propsRef}
            />
          </Suspense>
        )}
      </span>
      <span className="specular-button__label">{children}</span>
    </>
  );
  const buttonClassName = `specular-button specular-button--${size}${className ? ` ${className}` : ""}`;

  if (href) {
    return (
      <Link
        ref={(element) => {
          buttonRef.current = element;
        }}
        href={href}
        className={buttonClassName}
        style={buttonStyle}
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        title={title}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={(element) => {
        buttonRef.current = element;
      }}
      type={type}
      onClick={onClick}
      className={buttonClassName}
      style={buttonStyle}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      title={title}
    >
      {content}
    </button>
  );
};

export default SpecularButton;
