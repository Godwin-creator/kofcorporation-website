"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type MouseEventHandler,
  type ReactNode,
} from "react";
import { Color, Mesh, Program, Renderer, Triangle } from "ogl";
import { Link } from "@/i18n/navigation";
import "./SpecularButton.css";

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

interface ShaderProps {
  radius: number;
  lineColor: string;
  baseColor?: string;
  intensity: number;
  shineSize: number;
  shineFade: number;
  thickness: number;
  speed: number;
  followMouse: boolean;
  proximity: number;
  autoAnimate: boolean;
}

const PAD = 20;

const VERTEX_SHADER = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform vec2 uCenter;
uniform vec2 uHalfSize;
uniform float uRadius;
uniform float uAngle;
uniform float uPx;
uniform vec3 uLineColor;
uniform vec3 uBaseColor;
uniform float uIntensity;
uniform float uShineSize;
uniform float uShineFade;
uniform float uThickness;
uniform float uBaseWidth;

out vec4 fragColor;

float sdRoundedRect(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

float gaussianLine(float d, float sigma) {
  float x = d / (sigma + 1e-6);
  float k = mix(1.0, 1.6, smoothstep(0.0, 1.5, x));
  return exp(-k * x * x);
}

void main() {
  vec2 p = gl_FragCoord.xy - uCenter;
  float d = sdRoundedRect(p, uHalfSize, uRadius);
  vec2 lightDirection = vec2(cos(uAngle), sin(uAngle));
  float base = (1.0 - smoothstep(0.0, uBaseWidth, abs(d))) * 0.45;
  vec2 normal = normalize(p / (uHalfSize * uHalfSize) + 1e-6);
  float angle = acos(clamp(abs(dot(normal, lightDirection)), 0.0, 1.0));
  float rim = 1.0 - smoothstep(
    uShineSize - uShineFade,
    uShineSize + uShineFade + 1e-4,
    angle
  );
  float line = gaussianLine(d, uThickness);
  float edgeClamp = 1.0 - smoothstep(0.5 * uPx, 3.0 * uPx, abs(d));
  float shine = line * rim * edgeClamp * uIntensity;
  vec3 color = uBaseColor * base + uLineColor * shine;
  float alpha = clamp(base + shine, 0.0, 1.0);
  fragColor = vec4(color, alpha);
}`;

function resolveColor(
  color: string | undefined,
  lightVariable: string,
  darkVariable: string,
  fallback: string,
) {
  const theme = document.documentElement.dataset.theme;
  const value = color ?? `var(${theme === "dark" ? darkVariable : lightVariable})`;

  if (!value.startsWith("var(")) {
    return value;
  }

  const variable = value.slice(4, -1).trim();
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim() || fallback;
}

const SpecularButton = ({
  children,
  size = "lg",
  radius = 0,
  tint = "#ffffff",
  tintOpacity = 0,
  blur = 1,
  textColor,
  lineColor = "#0CACE8",
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
    const button = buttonRef.current;
    const effect = effectRef.current;
    if (!button || !effect) {
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
      dpr,
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const program = new Program(gl, {
      vertex: VERTEX_SHADER,
      fragment: FRAGMENT_SHADER,
      uniforms: {
        uCenter: { value: [0, 0] },
        uHalfSize: { value: [1, 1] },
        uRadius: { value: 0 },
        uAngle: { value: 2.4 },
        uPx: { value: dpr },
        uLineColor: { value: [1, 1, 1] },
        uBaseColor: { value: [0.32, 0.32, 0.32] },
        uIntensity: { value: 1 },
        uShineSize: { value: 0.17 },
        uShineFade: { value: 0.7 },
        uThickness: { value: 1 },
        uBaseWidth: { value: dpr },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });
    effect.appendChild(gl.canvas);

    const size = { width: 1, height: 1 };
    const resize = () => {
      const rect = button.getBoundingClientRect();
      size.width = rect.width;
      size.height = rect.height;
      renderer.setSize(rect.width + PAD * 2, rect.height + PAD * 2);
      program.uniforms.uCenter.value = [
        (PAD + rect.width / 2) * dpr,
        (PAD + rect.height / 2) * dpr,
      ];
      program.uniforms.uHalfSize.value = [
        (rect.width / 2) * dpr,
        (rect.height / 2) * dpr,
      ];
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(button);
    resize();

    let isHovered = false;
    let pointerAngle: number | null = null;
    const updatePointerAngle = (event: PointerEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const normalizedX = (event.clientX - centerX) / (rect.width / 2);
      const normalizedY = (centerY - event.clientY) / (rect.height / 2);
      pointerAngle =
        Math.atan2(2 / rect.height, -2 / rect.width) +
        normalizedX * 0.3 +
        normalizedY * 0.15;
    };
    const handlePointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return;
      }
      isHovered = true;
      updatePointerAngle(event);
    };
    const handlePointerMove = (event: PointerEvent) => {
      if (isHovered && event.pointerType !== "touch") {
        updatePointerAngle(event);
      }
    };
    const handlePointerLeave = () => {
      isHovered = false;
      pointerAngle = null;
    };
    button.addEventListener("pointerenter", handlePointerEnter);
    button.addEventListener("pointermove", handlePointerMove);
    button.addEventListener("pointerleave", handlePointerLeave);

    let angle = 2.4;
    let idleAngle = 2.4;
    let brightness = 0;
    let lastTime = performance.now();
    let animationFrame = 0;
    const lineColorValue = new Color();
    const baseColorValue = new Color();

    const update = (now: number) => {
      animationFrame = requestAnimationFrame(update);
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const props = propsRef.current;

      idleAngle += props.speed * delta;
      const targetAngle = isHovered && props.followMouse && pointerAngle !== null ? pointerAngle : idleAngle;
      const angleDifference = ((targetAngle - angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      angle += angleDifference * (1 - Math.exp(-delta * 7));
      const targetBrightness = isHovered && props.followMouse && pointerAngle !== null ? 1 : 0;
      brightness += (targetBrightness - brightness) * (1 - Math.exp(-delta * 8));

      lineColorValue.set(resolveColor(props.lineColor, "--color-accent", "--color-accent", "#0CACE8"));
      baseColorValue.set(
        resolveColor(
          props.baseColor,
          "--color-accent",
          "--color-primary-light",
          "#0CACE8",
        ),
      );
      program.uniforms.uAngle.value = angle;
      program.uniforms.uRadius.value = Math.min(props.radius, Math.min(size.width, size.height) / 2) * dpr;
      program.uniforms.uLineColor.value = [lineColorValue.r, lineColorValue.g, lineColorValue.b];
      program.uniforms.uBaseColor.value = [baseColorValue.r, baseColorValue.g, baseColorValue.b];
      program.uniforms.uIntensity.value = props.intensity * brightness;
      program.uniforms.uShineSize.value = (props.shineSize * Math.PI) / 180;
      program.uniforms.uShineFade.value = (props.shineFade * Math.PI) / 180;
      program.uniforms.uThickness.value = props.thickness * dpr;
      renderer.render({ scene: mesh });
    };

    // Delay animation start to avoid fast initial frames
    const startTimer = window.setTimeout(() => {
      animationFrame = requestAnimationFrame(update);
    }, 500);

    return () => {
      window.clearTimeout(startTimer);
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      button.removeEventListener("pointerenter", handlePointerEnter);
      button.removeEventListener("pointermove", handlePointerMove);
      button.removeEventListener("pointerleave", handlePointerLeave);
      if (gl.canvas.parentNode === effect) {
        effect.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
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
      <span ref={effectRef} className="specular-button__fx" aria-hidden="true" />
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
