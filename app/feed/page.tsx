'use client';

import { useEffect, useState, useRef } from "react";
import { VenueCard } from "./VenueCard";

export default function FeedPage() {
  const [venues, setVenues] = useState([]);
  const [index, setIndex] = useState(0);

  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  useEffect(() => {
    fetch("/api/venues")
    .then((res) => res.json())
    .then(setVenues);
  }, []);

  // mouse wheel
  const handleWheel = (e: WheelEvent) => {
    if (e.deltaY > 0) next();
    else prev();
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  });

  // mobile (touch)
  const handleTouchStart = (e: any) => {
    touchStartY.current = e.touches[0].clientY;
  }

  const handleTouchEnd = (e: any) => {
    touchEndY.current = e.changedTouches[0].clientY;

    const diff = touchStartY.current - touchEndY.current;

    if (diff > 50) next();  // swipe up
    if (diff < -50) prev(); // swipe down
  };

  const next = () => {
    setIndex((i) => Math.min(i+1, venues.length - 1));
  };

  const prev = () => {
    setIndex((i) => Math.max(i - 1, 0));
  };

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