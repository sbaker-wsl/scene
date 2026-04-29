'use client'

import { useState, useEffect } from 'react'

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetch(`/api/venues?q=${query}`)
        .then((res) => res.json())
        .then(setVenues);
    }, 300); // debounce

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="p-4 text-white" bg-black>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search artists, genres, locations..."
        className="w-full p-3 rounded bg-gray-800 text-white"
      />

      <div className="mt-4 space-y-3">
        {venues.map((venue: any) => (
          <div
            key={venue._id}
            className="p-4 bg-gray-900 rounded"
          >
            <h2 className="font-bold">{venue.artist}</h2>
            <p className="text-sm text-gray-400">
              {venue.genre} • {venue.location}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}