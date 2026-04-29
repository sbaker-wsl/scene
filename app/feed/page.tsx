'use client';

import { useEffect, useState } from "react";
import { VenueCard } from "./VenueCard";

export default function FeedPage() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    fetch("/api/venues")
    .then((res) => res.json())
    .then(setVenues);
  }, []);

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {venues.map((venue: any, index) => (
        <div
          key={index}
          className="h-screen snap-start flex items-center justify-center bg-black text-white"
          >
            <VenueCard venue={venue} />
          </div>
      ))}
    </div>
  )
}