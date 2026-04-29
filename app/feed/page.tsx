'use client';

import { useEffect, useState, useRef } from "react";
import { VenueCard } from "./VenueCard";

export default function FeedPage() {
  const [venues, setVenues] = useState([]);
  const [index, setIndex] = useState(0);

  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const SWIPE_THRESHOLD = 50;

  const isAnimating = useRef(false);

  useEffect(() => {
    fetch("/api/venues")
    .then((res) => res.json())
    .then(setVenues);
  }, []);

  const isScrolling = useRef(false);

  // mouse wheel
  const handleWheel = (e: WheelEvent) => {
    if (isScrolling.current) return;
    if (Math.abs(e.deltaY) < 30) return;

    isScrolling.current = true;

    move(e.deltaY > 0 ? "up" : "down");
    
    setTimeout(() => {
      isScrolling.current = false;
    }, 600);
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  });

  const hasSwiped = useRef(false);

  // mobile (touch)
  const handleTouchStart = (e: any) => {
    touchStartY.current = e.touches[0].clientY;
    hasSwiped.current = false;
  }

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
  };

  const handleTouchEnd = (e: any) => {
    if (hasSwiped.current) return;

    touchEndY.current = e.changedTouches[0].clientY;

    const diff = touchStartY.current - touchEndY.current;

    if (Math.abs(diff) < SWIPE_THRESHOLD) return;

    hasSwiped.current = true;

    if (diff > 0) move("up");  // swipe up
    else move("down"); // swipe down
  };

  const move = (direction: "up" | "down") => {
    if (isAnimating.current) return;

    isAnimating.current = true;

    setIndex((prevIndex) => {
      let newIndex = direction === "up" ? prevIndex + 1 : prevIndex-1;

      return Math.max(0, Math.min(newIndex, venues.length - 1));
    });

    setTimeout(() => {
      isAnimating.current = false;
    }, 600);
  };

  useEffect(() => {
    const el = document.body;
    
    el.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div className="h-screen overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}>
      <div
        className="transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateY(-${index * 100}vh)`,
        }}
      >
        {venues.map((venue: any, i) => (
          <div
            key={i}
            className="h-screen flex items-center justify-center bg-black text-white"
          >
            <VenueCard venue={venue} />
          </div>
        ))}
      </div>
    </div>
  );
}