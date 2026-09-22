"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import "./HeroImageSlider.css";

const IMAGES = ["/images/hero-image.png", "/images/hero-image1.png"] as const;
const GRID_COLUMNS = 3;
const GRID_ROWS = 4;
const TOTAL_PIECES = GRID_COLUMNS * GRID_ROWS;

type Piece = {
  id: number;
  targetIndex: number;
  currentIndex: number;
};

function getPieceStyle(index: number) {
  const col = index % GRID_COLUMNS;
  const row = Math.floor(index / GRID_COLUMNS);

  return {
    left: `${(col / GRID_COLUMNS) * 100}%`,
    top: `${(row / GRID_ROWS) * 100}%`,
    width: `${100 / GRID_COLUMNS}%`,
    height: `${100 / GRID_ROWS}%`,
  };
}

function createPieces() {
  const order = Array.from({ length: TOTAL_PIECES }, (_, index) => index);

  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  return order.map((targetIndex, index) => ({
    id: targetIndex,
    targetIndex,
    currentIndex: index,
  }));
}

export default function HeroImageSlider() {
  const [pieces, setPieces] = useState<Piece[]>(() => createPieces());
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [dragOrigin, setDragOrigin] = useState({ x: 0, y: 0 });
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMobileImage, setActiveMobileImage] = useState(0);
  const [phase, setPhase] = useState<"initial" | "puzzle1" | "result1" | "preview2" | "puzzle2" | "result2" | "preview1">("initial");
  const [puzzleIndex, setPuzzleIndex] = useState<0 | 1>(0);
  const boardRef = useRef<HTMLDivElement | null>(null);

  const targetImage = IMAGES[puzzleIndex];
  const baseImage = targetImage;
  const isSolved = pieces.every((piece) => piece.currentIndex === piece.targetIndex);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const updateDevice = () => setIsMobile(mediaQuery.matches);

    updateDevice();
    mediaQuery.addEventListener("change", updateDevice);

    return () => mediaQuery.removeEventListener("change", updateDevice);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveMobileImage((current) => (current === 0 ? 1 : 0));
    }, 10000);

    return () => window.clearInterval(timer);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      return undefined;
    }

    if (phase === "initial") {
      const timer = window.setTimeout(() => setPhase("puzzle1"), 10000);
      return () => window.clearTimeout(timer);
    }

    if (phase === "puzzle1" || phase === "puzzle2") {
      if (!isSolved) {
        return undefined;
      }

      const nextPhase = phase === "puzzle1" ? "result1" : "result2";
      const timer = window.setTimeout(() => setPhase(nextPhase), 0);
      return () => window.clearTimeout(timer);
    }

    if (phase === "result1") {
      const timer = window.setTimeout(() => setPhase("preview2"), 10000);
      return () => window.clearTimeout(timer);
    }

    if (phase === "preview2") {
      const timer = window.setTimeout(() => {
        setPuzzleIndex(1);
        setPieces(createPieces());
        setPhase("puzzle2");
      }, 10000);
      return () => window.clearTimeout(timer);
    }

    if (phase === "result2") {
      const timer = window.setTimeout(() => setPhase("preview1"), 5000);
      return () => window.clearTimeout(timer);
    }

    if (phase === "preview1") {
      const timer = window.setTimeout(() => {
        setPuzzleIndex(0);
        setPieces(createPieces());
        setPhase("puzzle1");
      }, 5000);
      return () => window.clearTimeout(timer);
    }

    return undefined;
  }, [phase, isMobile, isSolved]);

  useEffect(() => {
    if (isMobile) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setDraggedId(null);
      setHoveredSlot(null);
      setDragPosition({ x: 0, y: 0 });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [phase, isMobile]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>, piece: Piece) => {
    if (!boardRef.current || (phase !== "puzzle1" && phase !== "puzzle2")) {
      return;
    }

    const rect = boardRef.current.getBoundingClientRect();
    const pointerX = event.clientX - rect.left;
    const pointerY = event.clientY - rect.top;

    setDraggedId(piece.id);
    setDragOrigin({ x: pointerX, y: pointerY });
    setDragPosition({ x: 0, y: 0 });
    setHoveredSlot(piece.currentIndex);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleBoardPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (draggedId === null || !boardRef.current) {
      return;
    }

    const rect = boardRef.current.getBoundingClientRect();
    const pointerX = event.clientX - rect.left;
    const pointerY = event.clientY - rect.top;
    const col = Math.min(GRID_COLUMNS - 1, Math.max(0, Math.floor((pointerX / rect.width) * GRID_COLUMNS)));
    const row = Math.min(GRID_ROWS - 1, Math.max(0, Math.floor((pointerY / rect.height) * GRID_ROWS)));
    const nextSlot = row * GRID_COLUMNS + col;

    setHoveredSlot(nextSlot);
    setDragPosition({
      x: pointerX - dragOrigin.x,
      y: pointerY - dragOrigin.y,
    });
  };

  const handleBoardPointerUp = () => {
    if (draggedId === null || (phase !== "puzzle1" && phase !== "puzzle2")) {
      return;
    }

    const draggedPiece = pieces.find((piece) => piece.id === draggedId);

    if (draggedPiece && hoveredSlot !== null) {
      const currentSlot = draggedPiece.currentIndex;

      setPieces((previous) => {
        const next = previous.map((piece) => ({ ...piece }));
        const targetPiece = next.find((piece) => piece.currentIndex === hoveredSlot && piece.id !== draggedId);
        const draggedPieceInState = next.find((piece) => piece.id === draggedId);

        if (!draggedPieceInState) {
          return next;
        }

        if (targetPiece) {
          targetPiece.currentIndex = currentSlot;
        }

        draggedPieceInState.currentIndex = hoveredSlot;
        return next;
      });
    }

    setDraggedId(null);
    setHoveredSlot(null);
    setDragPosition({ x: 0, y: 0 });
  };

  const draggedPiece = draggedId !== null ? pieces.find((piece) => piece.id === draggedId) ?? null : null;
  const dragGuideSlot = draggedPiece?.targetIndex ?? null;

  if (isMobile) {
    return (
      <div className="hero-image-slider hero-image-slider--mobile" aria-label="Alternance d'images mobile">
        <div className="hero-image-slider__frame hero-image-slider__frame--mobile">
          {IMAGES.map((image, index) => (
            <motion.div
              key={image}
              className="hero-image-slider__mobile-panel"
              initial={false}
              animate={{
                opacity: activeMobileImage === index ? 1 : 0,
                scale: activeMobileImage === index ? (index === 0 ? 1 : 1.04) : 0.96,
                x: activeMobileImage === index ? 0 : index === 1 ? 18 : -18,
                filter: activeMobileImage === index ? "blur(0px)" : "blur(1.5px)",
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <Image
                src={image}
                alt=""
                fill
                priority
                className="hero-image-slider__img"
                sizes="(max-width: 1023px) 340px, 500px"
              />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (phase === "initial") {
    return (
      <div className="hero-image-slider" aria-label="Image initiale du hero">
        <div className="hero-image-slider__frame">
          <div className="hero-image-slider__background">
            <Image src={IMAGES[0]} alt="" fill className="hero-image-slider__img" priority sizes="(max-width: 1023px) 0px, 500px" />
          </div>
        </div>
      </div>
    );
  }

  if (phase === "result1" || phase === "preview1") {
    return (
      <div className="hero-image-slider" aria-label="Image de prévisualisation">
        <div className="hero-image-slider__frame">
          <div className="hero-image-slider__background">
            <Image src={IMAGES[0]} alt="" fill className="hero-image-slider__img" priority sizes="(max-width: 1023px) 0px, 500px" />
          </div>
        </div>
      </div>
    );
  }

  if (phase === "result2" || phase === "preview2") {
    return (
      <div className="hero-image-slider" aria-label="Image de prévisualisation">
        <div className="hero-image-slider__frame">
          <div className="hero-image-slider__background">
            <Image src={IMAGES[1]} alt="" fill className="hero-image-slider__img" priority sizes="(max-width: 1023px) 0px, 500px" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-image-slider" aria-label="Puzzle image">
      <div className="hero-image-slider__frame" ref={boardRef} onPointerMove={handleBoardPointerMove} onPointerUp={handleBoardPointerUp} onPointerLeave={handleBoardPointerUp}>
        <div className="hero-image-slider__background">
          <Image src={baseImage} alt="" fill className="hero-image-slider__img" priority sizes="(max-width: 1023px) 0px, 500px" />
        </div>

        {draggedId !== null && (
          <div
            className="hero-image-slider__drag-guide"
            style={{
              backgroundImage: `url(${targetImage})`,
              opacity: 0.22,
              filter: "blur(2px)",
            }}
            aria-hidden="true"
          />
        )}

        {dragGuideSlot !== null && draggedId !== null && (
          <div
            className="hero-image-slider__slot-highlight"
            style={getPieceStyle(dragGuideSlot)}
            aria-hidden="true"
          />
        )}

        {pieces.map((piece) => {
          const isDragging = draggedId === piece.id;
          const config = getPieceStyle(piece.currentIndex);

          return (
            <button
              key={piece.id}
              type="button"
              className={`hero-image-slider__piece ${piece.currentIndex === piece.targetIndex ? "hero-image-slider__piece--locked" : ""} ${isDragging ? "hero-image-slider__piece--dragging" : ""}`}
              onPointerDown={(event) => handlePointerDown(event, piece)}
              style={{
                ...config,
                backgroundImage: `url(${targetImage})`,
                backgroundSize: `${GRID_COLUMNS * 100}% ${GRID_ROWS * 100}%`,
                backgroundPosition: `${(piece.targetIndex % GRID_COLUMNS) / (GRID_COLUMNS - 1) * 100}% ${Math.floor(piece.targetIndex / GRID_COLUMNS) / (GRID_ROWS - 1) * 100}%`,
                transform: isDragging ? `translate(${dragPosition.x}px, ${dragPosition.y}px)` : "translate(0, 0)",
                zIndex: isDragging ? 10 : 5,
              }}
              aria-label={`Pièce ${piece.id + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
