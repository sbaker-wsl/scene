"use client";

import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Venue {
  _id: string;
  name: string;
  location: string;
  genre: "jazz" | "rock" | "electronic" | "hiphop" | "indie" | "punk" | "emo" | "alt" | "metal" | "rap";
  capacity: number;
  rating: number;
  agePolicy: string;
  openingTime: string;
  closingTime: string;
}

type NewVenueForm = {
    name: string;
    location: string;
    genre: string;
    capacity: string;
    rating: string;
    agePolicy: string;
    openingTime: string;
    closingTime: string;
};

// ─── Hardcoded data ───────────────────────────────────────────────────────────

const ALL_VENUES: Venue[] = [
  { _id: "1",  name: "The Blue Note",          location: "New York, NY",        genre: "jazz",       capacity: 240,  rating: 4.8, agePolicy: "21+",      openingTime: "20:00", closingTime: "02:00" },
  { _id: "2",  name: "Fillmore West",          location: "San Francisco, CA",   genre: "rock",       capacity: 1150, rating: 4.9, agePolicy: "All ages", openingTime: "19:00", closingTime: "23:00" },
  { _id: "3",  name: "Output",                 location: "Brooklyn, NY",        genre: "electronic", capacity: 600,  rating: 4.7, agePolicy: "21+",      openingTime: "22:00", closingTime: "04:00" },
  { _id: "4",  name: "Boiler Room",            location: "Los Angeles, CA",     genre: "electronic", capacity: 400,  rating: 4.6, agePolicy: "21+",      openingTime: "22:00", closingTime: "04:00" },
  { _id: "5",  name: "Jazz at Lincoln Center", location: "New York, NY",        genre: "jazz",       capacity: 1000, rating: 4.9, agePolicy: "All ages", openingTime: "19:30", closingTime: "23:00" },
  { _id: "6",  name: "Troubadour",             location: "West Hollywood, CA",  genre: "indie",      capacity: 500,  rating: 4.7, agePolicy: "21+",      openingTime: "19:00", closingTime: "02:00" },
  { _id: "7",  name: "9:30 Club",              location: "Washington, DC",      genre: "rock",       capacity: 1200, rating: 4.9, agePolicy: "All ages", openingTime: "19:00", closingTime: "23:00" },
  { _id: "8",  name: "Apollo Theater",         location: "Harlem, NY",          genre: "hiphop",     capacity: 1506, rating: 4.8, agePolicy: "All ages", openingTime: "18:00", closingTime: "23:00" },
  { _id: "9",  name: "Terminal 5",             location: "New York, NY",        genre: "rock",       capacity: 3000, rating: 4.5, agePolicy: "21+",      openingTime: "19:00", closingTime: "02:00" },
  { _id: "10", name: "The Roxy",               location: "Atlanta, GA",         genre: "indie",      capacity: 1000, rating: 4.6, agePolicy: "All ages", openingTime: "20:00", closingTime: "02:00" },
  { _id: "11", name: "Stubb's",                location: "Austin, TX",          genre: "rock",       capacity: 2600, rating: 4.8, agePolicy: "All ages", openingTime: "18:00", closingTime: "23:00" },
  { _id: "12", name: "Rex Club",               location: "Paris, FR",           genre: "electronic", capacity: 600,  rating: 4.7, agePolicy: "18+",      openingTime: "23:00", closingTime: "06:00" },
  { _id: "13", name: "The Catalyst",           location: "Santa Cruz, CA",      genre: "indie",      capacity: 750,  rating: 4.5, agePolicy: "All ages", openingTime: "19:00", closingTime: "23:00" },
  { _id: "14", name: "House of Blues",         location: "Chicago, IL",         genre: "jazz",       capacity: 1400, rating: 4.6, agePolicy: "21+",      openingTime: "19:00", closingTime: "02:00" },
  { _id: "15", name: "Vinyl",                  location: "Atlanta, GA",         genre: "hiphop",     capacity: 300,  rating: 4.7, agePolicy: "21+",      openingTime: "21:00", closingTime: "03:00" },
  { _id: "16", name: "El Rey Theatre",         location: "Los Angeles, CA",     genre: "indie",      capacity: 770,  rating: 4.6, agePolicy: "All ages", openingTime: "19:00", closingTime: "23:00" },
  { _id: "17", name: "Gramercy Theatre",       location: "New York, NY",        genre: "rock",       capacity: 900,  rating: 4.5, agePolicy: "All ages", openingTime: "19:00", closingTime: "23:00" },
  { _id: "18", name: "Echoplex",               location: "Los Angeles, CA",     genre: "electronic", capacity: 500,  rating: 4.4, agePolicy: "21+",      openingTime: "21:00", closingTime: "02:00" },
  { _id: "19", name: "City Winery",            location: "Nashville, TN",       genre: "jazz",       capacity: 300,  rating: 4.8, agePolicy: "21+",      openingTime: "17:00", closingTime: "23:00" },
  { _id: "20", name: "Revolution Live",        location: "Fort Lauderdale, FL", genre: "rock",       capacity: 1700, rating: 4.6, agePolicy: "18+",      openingTime: "19:00", closingTime: "02:00" },
];

const PAGE_SIZE = 6;

const GENRES: Venue["genre"][] = ["jazz", "rock", "electronic", "hiphop", "indie", "punk", "emo", "alt", "metal", "rap"];

const AGE_POLICIES = ["All ages", "18+", "21+"];
// ─── Genre badge styles ───────────────────────────────────────────────────────

const GENRE_STYLES: Record<Venue["genre"], string> = {
    jazz:       "bg-purple-100 text-purple-800",
    rock:       "bg-orange-100 text-orange-900",
    electronic: "bg-emerald-100 text-emerald-800",
    hiphop:     "bg-amber-100 text-amber-900",
    indie:      "bg-pink-100 text-pink-800",
    punk:       "bg-red-100 text-red-800",
    emo:        "bg-blue-100 text-blue-800",
    alt:        "bg-gray-100 text-gray-800",
    metal:      "bg-slate-100 text-slate-800",
    rap:        "bg-yellow-100 text-yellow-800",
};

const EMPTY_FORM: NewVenueForm = {
    name: "",
    location: "",
    genre: "",
    capacity: "",
    rating: "",
    agePolicy: "",
    openingTime: "",
    closingTime: "",
};

// ─── Add Venue Modal ─────────────────────────────────────────────────────────

function AddVenueModal({
  onClose,
  onAdd,
  initialVenue,
}: {
  onClose: () => void;
  onAdd: (venue: Venue) => void;
  initialVenue?: Venue;
}) {
  const [form, setForm] = useState<NewVenueForm>(initialVenue ? {
    name: initialVenue.name,
    location: initialVenue.location,
    genre: initialVenue.genre,
    capacity: String(initialVenue.capacity),
    rating: String(initialVenue.rating),
    agePolicy: initialVenue.agePolicy,
    openingTime: initialVenue.openingTime,
    closingTime: initialVenue.closingTime,
  } 
  : EMPTY_FORM);

  const [errors, setErrors] = useState<Partial<Record<keyof NewVenueForm, string>>>({});
 
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);
 
  function set(field: keyof NewVenueForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }
 
  function validate(): boolean {
    const e: Partial<NewVenueForm> = {};
    if (!form.name.trim())     e.name     = "Required";
    if (!form.location.trim()) e.location = "Required";
    if (!form.genre)           e.genre    = "Required";
    if (!form.capacity || isNaN(Number(form.capacity))) e.capacity = "Must be a number";
    if (!form.rating   || isNaN(Number(form.rating)) || Number(form.rating) > 5)
                               e.rating   = "0 – 5";
    if (!form.agePolicy)       e.agePolicy = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }
 
  function handleSubmit() {
    if (!validate()) return;
  
    const newVenue: Venue = {
      // TODO: replace with real MongoDB _id after saving to DB
      _id: initialVenue?._id ??      crypto.randomUUID(),
      name:      form.name.trim(),
      location:  form.location.trim(),
      genre:     form.genre as Venue["genre"],
      capacity:  Number(form.capacity),
      rating:    parseFloat(Number(form.rating).toFixed(1)),
      agePolicy: form.agePolicy,
      openingTime: form.openingTime,
      closingTime: form.closingTime,
    };
 
    // TODO: POST to /api/venues and use the returned document instead
    // const res = await fetch("/api/venues", { method: "POST", body: JSON.stringify(newVenue) });
    // const saved = await res.json();
    // onAdd(saved);
 
    onAdd(newVenue);
    onClose();
  }
 
  const inputClass = (field: keyof NewVenueForm) =>
    `w-full rounded-xl border px-3 py-2 text-sm text-gray-800 outline-none transition-colors
     ${errors[field] ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-gray-400 focus:bg-white"}`;
 
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-300 rounded-3xl shadow-2xl w-full max-w-md"
        style={{ animation: "modalIn 0.2s ease forwards" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-600">
          <h2 className="text-lg font-semibold text-gray-900">Add a venue</h2>
          <button
            onClick={onClose}
            className="text-black hover:text-gray-600 transition-colors text-xl leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
 
        {/* Form */}
        <div className="px-6 py-5 space-y-4">
 
          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-black mb-1">Venue name</label>
            <input
              type="text"
              placeholder="e.g. Mr. Smalls"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className={inputClass("name")}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
 
          {/* Location */}
          <div>
            <label className="block text-xs font-medium text-black mb-1">Location</label>
            <input
              type="text"
              placeholder="e.g. Pittsburgh, PA"
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              className={inputClass("location")}
            />
            {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
            {/* TODO: replace with a real address / map picker */}
          </div>
 
          {/* Genre */}
          <div>
            <label className="block text-xs font-medium text-black mb-1">Genre</label>
            <select
              value={form.genre}
              onChange={(e) => set("genre", e.target.value)}
              className={inputClass("genre")}
            >
              <option value="">Select a genre</option>
              {GENRES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            {errors.genre && <p className="text-xs text-red-500 mt-1">{errors.genre}</p>}
          </div>
 
          {/* Capacity + Rating side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-black mb-1">Capacity</label>
              <input
                type="number"
                placeholder="e.g. 500"
                value={form.capacity}
                onChange={(e) => set("capacity", e.target.value)}
                className={inputClass("capacity")}
              />
              {errors.capacity && <p className="text-xs text-red-500 mt-1">{errors.capacity}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-black mb-1">Rating (0–5)</label>
              <input
                type="number"
                placeholder="e.g. 4.5"
                step="0.1"
                min="0"
                max="5"
                value={form.rating}
                onChange={(e) => set("rating", e.target.value)}
                className={inputClass("rating")}
              />
              {errors.rating && <p className="text-xs text-red-500 mt-1">{errors.rating}</p>}
            </div>
          </div>

            
          <div className = "grid grid-cols-2 gap-3">
            <div>
                <label className = "block text-xs font-medium text-black mb-1">Opening time</label>
                <input
                type = "time"
                value = {form.openingTime}
                onChange = {(e) => set("openingTime", e.target.value)}
                className = {inputClass("openingTime")}
                />
            </div> 
            <div>
                <label className = "block text-xs font-medium text-black mb-1">Closing time</label>
                <input
                type = "time"
                value = {form.closingTime}
                onChange = {(e) => set("closingTime", e.target.value)}
                className = {inputClass("closingTime")}
                />
            </div>
        </div>

          {/* Age policy */}
          <div>
            <label className="block text-xs font-medium text-black mb-1">Age policy</label>
            <div className="flex gap-2">
              {AGE_POLICIES.map((policy) => (
                <button
                  key={policy}
                  onClick={() => set("agePolicy", policy)}
                  className={`
                    flex-1 rounded-xl py-2 text-sm font-medium border transition-colors
                    ${form.agePolicy === policy
                      ? "bg-gray-700 text-white border-gray-900"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-400"}
                  `}
                >
                  {policy}
                </button>
              ))}
            </div>
            {errors.agePolicy && <p className="text-xs text-red-500 mt-1">{errors.agePolicy}</p>}
          </div>
        </div>
 
        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl py-2.5 text-sm font-medium border border-gray-600 text-black hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 rounded-xl py-2.5 text-sm font-medium bg-gray-700 text-white hover:bg-gray-700 transition-colors"
          >
            Add venue
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Venue Modal ──────────────────────────────────────────────────────────────
 
function VenueModal({ venue, onClose, onEdit }: { venue: Venue; onClose: () => void; onEdit: () => void }) {
  // Close on Escape key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);
 
  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      {/* Modal panel — stop click from closing when clicking inside */}
      <div
        className="relative bg-gray-400 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
        style={{ animation: "modalIn 0.2s ease forwards" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Map placeholder ── */}
        <div className="relative h-48 bg-gray-300 flex items-center justify-center overflow-hidden">
          {/* Grid lines to suggest a map */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#8d96a7" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
 
          {/* Buildings placeholder */}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1 px-6">
            {[40, 64, 52, 80, 44, 68, 36, 56, 72, 48].map((h, i) => (
              <div
                key={i}
                className="bg-gray-400 rounded-t-sm flex-1"
                style={{ height: `${h}px`, opacity: 0.6 + (i % 3) * 0.1 }}
              />
            ))}
          </div>
 
          {/* Pin */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-8 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            <div className="w-0.5 h-3 bg-red-500" />
          </div>
 
          {/* Distance placeholder badge */}
          <div className="absolute top-3 right-3 bg-gray-200 rounded-full px-3 py-1 text-xs font-medium text-gray-500 shadow border border-gray-200">
            📍 Distance coming soon
          </div>
        </div>
 
        {/* ── Content ── */}
        <div className="p-6">
          {/* Header row */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-2 ${GENRE_STYLES[venue.genre]}`}>
                {venue.genre}
              </span>
              <h2 className="text-2xl font-semibold text-black">{venue.name}</h2>
              <p className="text-sm text-black mt-0.5">{venue.location}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-600 transition-colors text-xl leading-none mt-1"
              aria-label="Close"
            >
              ✕
            </button>
        </div>
 
          {/* Stats row */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              { label: "Capacity",   value: venue.capacity.toLocaleString() },
              { label: "Rating",     value: `★ ${venue.rating.toFixed(1)}` },
              { label: "Age policy", value: venue.agePolicy },
              { label: "Hours",      value: `${venue.openingTime} - ${venue.closingTime}` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-200 rounded-xl p-3 text-center border border-gray-100">
                <p className="text-xs text-black mb-1">{label}</p>
                <p className="text-sm font-medium text-black">{value}</p>
              </div>
            ))}
          </div>
 
          {/* Upcoming events placeholder */}
          <div className="mb-5">
            <h3 className="text-sm font-medium text-black mb-2">Upcoming events</h3>
            <div className="space-y-2">
              {["Fri May 2", "Sat May 10", "Thu May 22"].map((date) => (
                <div key={date} className="flex items-center gap-3 bg-gray-200 rounded-xl px-4 py-3 border border-gray-100">
                  <div className="w-2 h-2 rounded-full bg-black shrink-0" />
                  <p className="text-sm text-gray-600 italic">{date} — event details coming soon</p>
                </div>
              ))}
            </div>
          </div>
 
          {/* CTA */}
          <div className = "flex gap-3">
            <button
                onClick = {onEdit}
                className = "flex-1 rounded-xl py-3 text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            > Edit Venue 
            </button>
            <button className="w-full bg-black text-white rounded-xl py-3 text-sm font-medium hover:bg-gray-700 transition-colors">
                Get directions
            </button>
            </div>
        </div>
      </div>
    </div>
  );
}

// ─── VenueCard ────────────────────────────────────────────────────────────────

function VenueCard({ venue, animationDelay, onClick, onDelete }: { venue: Venue; animationDelay: number; onClick: () => void; onDelete: (e: React.MouseEvent) => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        opacity: 0,
        animation: "fadeSlideIn 0.35s ease forwards",
        animationDelay: `${animationDelay}ms`,
      }}
      className="
        bg-gray-600 rounded-2xl border border-gray-200 p-5
        hover:border-gray-400 hover:-translate-y-1 hover:shadow-md
        transition-all duration-200 cursor-pointer
      "
    >
        <button 
            onClick = {onDelete}
            className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full text-gray-300 hover:bg-red-50 hover:text-red-400 transition-colors text-sm"
            aria-label="Delete venue"
        >
            ✕
        </button>

      <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3 ${GENRE_STYLES[venue.genre]}`}>
        {venue.genre}
      </span>
      <h2 className="text-base font-medium text-white mb-0.5">{venue.name}</h2>
      <p className="text-sm text-white mb-4">{venue.location}</p>
      <div className="flex gap-4 text-xs text-gray-400 border-t border-white pt-3">
        <span>Cap. {venue.capacity.toLocaleString()}</span>
        <span>★ {venue.rating.toFixed(1)}</span>
        <span>{venue.agePolicy}</span>
        <span>{venue.openingTime} - {venue.closingTime}</span>
      </div>
    </div>
  );
}

// ─── Spinner ──────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <div className="flex justify-center gap-1.5 py-8" aria-label="Loading">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-white animate-bounce"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  );
}

// ─── VenuesPage ───────────────────────────────────────────────────────────────

export default function VenuesPage() {
  const [venues, setVenues]   = useState<Venue[]>([]);
  const [page, setPage]       = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selected, setSelected] = useState<Venue | null>(null);
  const [allVenues, setAllVenues] = useState<Venue[]>(ALL_VENUES);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);

  const sentinelRef = useRef<HTMLDivElement>(null);

  // Load next page from the hardcoded array
  function loadMore() {
    if (loading || !hasMore) return;

    setLoading(true);

    // Simulate a slight delay so the spinner is visible
    setTimeout(() => {
      const start = page * PAGE_SIZE;
      const next  = ALL_VENUES.slice(start, start + PAGE_SIZE);

      setVenues((prev) => [...prev, ...next]);
      setPage((prev) => prev + 1);
      setHasMore(start + PAGE_SIZE < ALL_VENUES.length);
      setLoading(false);
    }, 400);
  }

  // Observe the sentinel to trigger loadMore on scroll
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMore(); },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  });

  function handleAdd(venue: Venue) {
    setAllVenues((prev) => [venue, ...prev]);
    setVenues((prev) => [venue, ...prev]);
}

  return (
    <div className="min-h-screen bg-black px-6 py-10">
      <div className="max-w-4xl mx-auto">

        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Music Venues</h1>
          <p className="text-gray-500 mb-4">Discover music venues near you — scroll to load more</p>
            

            <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                <span className= "text-lg leading-none">+</span> Add a venue
            </button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {venues.map((venue, i) => (
            <VenueCard
              key={venue._id}
              venue={venue}
              animationDelay={(i % PAGE_SIZE) * 60}
              onClick={() => setSelected(venue)}
              onDelete = {(e) => {
                e.stopPropagation();
                setAllVenues((prev) => prev.filter((v) => v._id !== venue._id));
                setVenues((prev) => prev.filter((v) => v._id !== venue._id));
                // TODO: DELETE /api/venues/${venue._id}
            }}
            />
          ))}
        </div>

        <div ref={sentinelRef} className="mt-4">
          {loading && <Spinner />}
          {!hasMore && (
            <p className="text-center text-sm text-gray-400 py-8">
              You&apos;ve seen all venues
            </p>
          )}
        </div>
      </div>

      {selected && (
        <VenueModal 
            venue={selected} 
            onClose={() => setSelected(null)} 
            onEdit={() => {
                setEditingVenue(selected)
                setSelected(null);
            }}
        />
      )}

      {editingVenue && (
        <AddVenueModal
            initialVenue={editingVenue}
            onClose={() => setEditingVenue(null)}
            onAdd = {(updated) => {
                setAllVenues((prev) => prev.map((v) => v._id === updated._id ? updated : v));
                setVenues((prev) => prev.map((v) => v._id === updated._id ? updated : v));
                setEditingVenue(null);
            }}
        />
      )}

      {showAddForm && (
        <AddVenueModal
            onClose={() => setShowAddForm(false)}
            onAdd={handleAdd}
        />
      )}

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}


/*
class User {
    private name : string;
    private email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    
    }

    getName(): string {
        return this.name;
    }
}

export default function VenuesPage() {
    const user = new User("nothin so far", "sweetums!@gmail.com");
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold text-center mb-6">Music Venues</h1>
            <p className="text-center text-gray-600">Discover music venues near you!</p>

            <div className="mt-10 grid gird-cols-1 md:grid
            -cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 bg-white rounded shadow">Venue 1</div>
                <div className="p-4 bg-white rounded shadow">Venue 2</div>
                <div className="p-4 bg-white rounded shadow">Venue 3</div>
                <div className="p-4 bg-white rounded shadow">{user.getName()}</div>
            </div>
        </div>
    )
}

*/