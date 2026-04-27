// 'use client';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// export default function HomePage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false)

//   const handleProfileClick = async () => {
//     try {
//       setLoading(true)
//       const res = await fetch('/api/auth/me');
//       const data = await res.json();

//       if (data.user) {
//         router.push('/dashboard');
//       } else {
//         router.replace('/login');
//       }
//     } catch (err) {
//       alert(err || 'Error checking authentication');
//       router.push('/login');
//     }
//   }

//   if (loading) {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-950">
//       <div className="flex flex-col items-center gap-6">
        
//         {/* Animated SVG Spinner */}
//         <div className="w-16 h-16">
//           <svg
//             className="animate-spin"
//             viewBox="0 0 50 50"
//           >
//             <circle
//               cx="25"
//               cy="25"
//               r="20"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="4"
//               className="text-gray-700"
//             />
//             <circle
//               cx="25"
//               cy="25"
//               r="20"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="4"
//               strokeLinecap="round"
//               strokeDasharray="90 150"
//               strokeDashoffset="0"
//               className="text-blue-500"
//             />
//           </svg>
//         </div>

//         {/* Text */}
//         <div className="text-center">
//           <p className="text-white text-lg font-medium tracking-wide">
//             Loading your account
//           </p>
//           <p className="text-gray-400 text-sm mt-1">
//             Just a moment...
//           </p>
//         </div>

//       </div>
//     </div>
//   )
//   }

//   return (
//     <main className = "relative bg-black min-h-screen px-6 py-8">
//       {/* User icon - top right */}
//       <button
//         onClick={handleProfileClick}
//         className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-800 transition-colors"
//       >
//         <svg
//           className="w-7 h-7 text-gray-400"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={1.5}
//             d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z"
//           />
//         </svg>
//       </button>

//       <div className="max-w-7xl mx-auto space-y-10">

//         {/*Trending Section */}
//         <section className = "space-y-4">
//           <h2 className = "text-white text-xl font-bold"> Trending</h2>

//           <div className = "flex gap-4 overflow-x-auto pb-2">
//             {/* Event Cards Placeholder */}
//             <div className = "min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
//             <div className = "min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
//             <div className = "min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
//             <div className = "min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
//           </div>
//         </section>

//         {/* Happening Soon Section */}
//         <section className = "space-y-4">
//           <h2 className = "text-white text-xl font-bold"> Happening Soon</h2>

//           <div className = "flex gap-4 overflow-x-auto pb-2">
//             <div className = "min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
//             <div className = "min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
//             <div className = "min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
//           </div>
//         </section>

//         {/* Featured Artists Section */}
//         <section className = "space-y-4">
//           <h2 className = "text-white text-xl font-bold">Featured Artists</h2>

//           <div className = "flex gap-4 overflow-x-auto pb-2">
//             <div className = "min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
//             <div className = "min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
//             <div className = "min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
//           </div>
//         </section>

//       </div>
//     </main>
//   );
// }

'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Venue {
  _id:      string
  name:     string
  location: string
  genre:    string
}

interface Artist {
  _id:    string
  name:   string
  genre:  string
  origin: string
  image?:  string
}

interface Performance {
  artistId:    string
  venueId:     string
  date:        string
  time:        string
  ticketPrice: number
}

type SortOption = 'date-asc' | 'date-desc' | 'price-asc' | 'price-desc' | 'location'

// ─── Placeholder data ─────────────────────────────────────────────────────────
// TODO: Replace with MongoDB API calls once routes are ready.

const ALL_VENUES: Venue[] = [
  { _id: "v1",  name: "The Blue Note",         genre: "jazz",       location: "New York, NY" },
  { _id: "v2",  name: "Fillmore West",          genre: "rock",       location: "San Francisco, CA" },
  { _id: "v3",  name: "Output",                 genre: "electronic", location: "Brooklyn, NY" },
  { _id: "v4",  name: "Apollo Theater",         genre: "hiphop",     location: "Harlem, NY" },
  { _id: "v5",  name: "Troubadour",             genre: "indie",      location: "West Hollywood, CA" },
  { _id: "v6",  name: "9:30 Club",              genre: "rock",       location: "Washington, DC" },
  { _id: "v7",  name: "Jazz at Lincoln Center", genre: "jazz",       location: "New York, NY" },
  { _id: "v8",  name: "Boiler Room",            genre: "electronic", location: "Los Angeles, CA" },
  { _id: "v9",  name: "Stubb's",                genre: "rock",       location: "Austin, TX" },
  { _id: "v10", name: "House of Blues",         genre: "jazz",       location: "Chicago, IL" },
]

const ALL_ARTISTS: Artist[] = [
  { _id: "a1",  name: "Miles Davis",         genre: "jazz",       origin: "Alton, IL", image: "miles_davis.jpg" },
  { _id: "a2",  name: "Radiohead",           genre: "alt",        origin: "Abingdon, UK", image: "radiohead.jpg" },
  { _id: "a3",  name: "Daft Punk",           genre: "electronic", origin: "Paris, FR", image: "daft_punk.jpg" },
  { _id: "a4",  name: "Kendrick Lamar",      genre: "rap",        origin: "Compton, CA", image: "kendrick_lamar.jpg" },
  { _id: "a5",  name: "The Strokes",         genre: "indie",      origin: "New York, NY", image: "the_strokes.jpg" },
  { _id: "a6",  name: "Black Sabbath",       genre: "metal",      origin: "Birmingham, UK", image: "black_sabbath.jpg" },
  { _id: "a7",  name: "Coltrane",            genre: "jazz",       origin: "Hamlet, NC"},
  { _id: "a8",  name: "Aphex Twin",          genre: "electronic", origin: "Limerick, IE"},
  { _id: "a9",  name: "Arctic Monkeys",      genre: "indie",      origin: "Sheffield, UK" },
  { _id: "a10", name: "Run The Jewels",      genre: "rap",        origin: "Atlanta, GA" },
  { _id: "a11", name: "My Chemical Romance", genre: "emo",        origin: "Newark, NJ"},
  { _id: "a12", name: "Metallica",           genre: "metal",      origin: "San Francisco, CA" },
]

const ALL_PERFORMANCES: Performance[] = [
  { artistId: "a1",  venueId: "v1",  date: "2026-07-10", time: "20:00", ticketPrice: 35 },
  { artistId: "a7",  venueId: "v1",  date: "2026-08-02", time: "21:00", ticketPrice: 30 },
  { artistId: "a2",  venueId: "v2",  date: "2026-06-20", time: "19:30", ticketPrice: 55 },
  { artistId: "a9",  venueId: "v2",  date: "2026-09-14", time: "20:00", ticketPrice: 45 },
  { artistId: "a3",  venueId: "v3",  date: "2026-07-05", time: "22:00", ticketPrice: 25 },
  { artistId: "a8",  venueId: "v3",  date: "2025-05-01", time: "23:00", ticketPrice: 20 }, // past
  { artistId: "a4",  venueId: "v4",  date: "2026-07-18", time: "20:00", ticketPrice: 75 },
  { artistId: "a10", venueId: "v4",  date: "2026-08-22", time: "21:00", ticketPrice: 60 },
  { artistId: "a5",  venueId: "v5",  date: "2026-06-28", time: "19:00", ticketPrice: 40 },
  { artistId: "a11", venueId: "v6",  date: "2025-04-15", time: "19:00", ticketPrice: 30 }, // past
  { artistId: "a6",  venueId: "v6",  date: "2026-09-03", time: "20:00", ticketPrice: 65 },
  { artistId: "a12", venueId: "v9",  date: "2027-10-11", time: "19:00", ticketPrice: 90 },
  { artistId: "a1",  venueId: "v7",  date: "2026-08-30", time: "19:30", ticketPrice: 50 },
  { artistId: "a3",  venueId: "v8",  date: "2026-07-25", time: "22:00", ticketPrice: 30 },
  { artistId: "a2",  venueId: "v10", date: "2025-06-05", time: "20:00", ticketPrice: 45 }, // past
]

// Trending + featured are just slices of the data for now
// TODO: replace with actual trending/featured logic from MongoDB (likes, views, etc.)
const TRENDING_VENUES  = ALL_VENUES.slice(0, 5)
const FEATURED_ARTISTS = ALL_ARTISTS.slice(0, 6)

// ─── Helpers ──────────────────────────────────────────────────────────────────

const today = new Date()
today.setHours(0, 0, 0, 0)

function isPast(date: string) {
  return new Date(date) < today
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function sortPerformances(perfs: Performance[], sort: SortOption): Performance[] {
  const future = perfs.filter(p => !isPast(p.date))
  const past   = perfs.filter(p =>  isPast(p.date))

  const sorted = [...future].sort((a, b) => {
    switch (sort) {
      case 'date-asc':   return new Date(a.date).getTime() - new Date(b.date).getTime()
      case 'date-desc':  return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'price-desc': return b.ticketPrice - a.ticketPrice
      case 'price-asc':  return a.ticketPrice - b.ticketPrice
      // TODO: wire up navigator.geolocation + venue coordinates from MongoDB
      case 'location':   return 0
      default:           return 0
    }
  })

  return [...sorted, ...past]
}

// ─── Genre badge colors ───────────────────────────────────────────────────────

const GENRE_COLORS: Record<string, string> = {
  jazz:       "bg-purple-900/60 text-purple-300",
  rock:       "bg-orange-900/60 text-orange-300",
  electronic: "bg-emerald-900/60 text-emerald-300",
  hiphop:     "bg-amber-900/60 text-amber-300",
  indie:      "bg-pink-900/60 text-pink-300",
  punk:       "bg-red-900/60 text-red-300",
  emo:        "bg-blue-900/60 text-blue-300",
  alt:        "bg-gray-700/60 text-gray-300",
  metal:      "bg-slate-900/60 text-slate-300",
  rap:        "bg-yellow-900/60 text-yellow-300",
}

// ─── DetailPopup (same as search page) ───────────────────────────────────────

function DetailPopup({
  type,
  item,
  onClose,
}: {
  type: 'venue' | 'artist'
  item: Venue | Artist
  onClose: () => void
}) {
  const [sort, setSort] = useState<SortOption>('date-asc')

  useEffect(() => {
    function handleKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const performances = ALL_PERFORMANCES.filter(p =>
    type === 'venue' ? p.venueId === item._id : p.artistId === item._id
  )

  const sorted = sortPerformances(performances, sort)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 border border-gray-700 rounded-3xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col"
        style={{ animation: 'modalIn 0.2s ease forwards' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-700 shrink-0">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              {type === 'venue' ? 'Venue' : 'Artist'}
            </p>
            <h2 className="text-lg font-semibold text-white">{item.name}</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {type === 'venue' ? (item as Venue).location : (item as Artist).origin}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors text-xl leading-none mt-1"
          >✕</button>
        </div>

        {/* Sort controls */}
        <div className="px-6 py-3 border-b border-gray-700 shrink-0">
          <p className="text-xs text-gray-500 mb-2">Sort by</p>
          <div className="flex flex-wrap gap-2">
            {([
              { value: 'date-asc',   label: 'Date ↑' },
              { value: 'date-desc',  label: 'Date ↓' },
              { value: 'price-desc', label: 'Price ↓' },
              { value: 'price-asc',  label: 'Price ↑' },
              { value: 'location',   label: '📍 Distance' },
            ] as { value: SortOption; label: string }[]).map(opt => (
              <button
                key={opt.value}
                onClick={() => setSort(opt.value)}
                className={`text-xs px-3 py-1 rounded-full border transition-colors
                  ${sort === opt.value
                    ? 'bg-white text-gray-900 border-white'
                    : 'text-gray-400 border-gray-600 hover:border-gray-400'}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {sort === 'location' && (
            <p className="text-xs text-gray-600 mt-2 italic">Distance sorting coming soon</p>
          )}
        </div>

        {/* Performance list */}
        <div className="overflow-y-auto px-6 py-4 space-y-3">
          {sorted.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-6">No performances found</p>
          )}
          {sorted.map((perf, i) => {
            const past     = isPast(perf.date)
            const artist   = ALL_ARTISTS.find(a => a._id === perf.artistId)
            const venue    = ALL_VENUES.find(v => v._id === perf.venueId)
            const label    = type === 'venue' ? artist?.name : venue?.name
            const sublabel = type === 'venue' ? artist?.genre : (venue as Venue | undefined)?.location

            return (
              <div
                key={i}
                className={`flex items-center justify-between rounded-xl px-4 py-3 border
                  ${past
                    ? 'bg-gray-800/40 border-gray-800 opacity-50'
                    : 'bg-gray-800 border-gray-700'}`}
              >
                <div>
                  <p className={`text-sm font-medium ${past ? 'text-gray-400' : 'text-white'}`}>{label}</p>
                  <p className="text-xs text-gray-500">{sublabel}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {formatDate(perf.date)} · {perf.time}
                    {past && <span className="ml-2 text-gray-600 italic">past</span>}
                  </p>
                </div>
                <p className={`text-sm font-medium ${past ? 'text-gray-500' : 'text-green-400'}`}>
                  ${perf.ticketPrice}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Venue card ───────────────────────────────────────────────────────────────

function VenueCard({ venue, onClick }: { venue: Venue; onClick: () => void }) {
  const upcomingCount = ALL_PERFORMANCES.filter(
    p => p.venueId === venue._id && !isPast(p.date)
  ).length

  return (
    <div
      onClick={onClick}
      className="min-w-[220px] bg-zinc-900 border border-zinc-700 rounded-2xl p-4
                 cursor-pointer hover:border-zinc-500 hover:-translate-y-1
                 transition-all duration-200 shrink-0"
    >
      {/* Genre badge */}
      <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3
        ${GENRE_COLORS[venue.genre] ?? 'bg-gray-700 text-gray-300'}`}>
        {venue.genre}
      </span>
      <p className="text-sm font-semibold text-white mb-0.5">{venue.name}</p>
      <p className="text-xs text-zinc-400 mb-3">{venue.location}</p>
      {upcomingCount > 0 ? (
        <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full">
          {upcomingCount} upcoming
        </span>
      ) : (
        <span className="text-xs text-zinc-600">No upcoming events</span>
      )}
    </div>
  )
}

// ─── Artist card ──────────────────────────────────────────────────────────────

function ArtistCard({ artist, onClick }: { artist: Artist; onClick: () => void }) {
  const upcomingCount = ALL_PERFORMANCES.filter(
    p => p.artistId === artist._id && !isPast(p.date)
  ).length

  return (
    <div
      onClick={onClick}
      className="min-w-[180px] bg-zinc-900 border border-zinc-700 rounded-2xl p-4
                 cursor-pointer hover:border-zinc-500 hover:-translate-y-1
                 transition-all duration-200 shrink-0"
    >
      {/* Avatar circle */}
      <div className="w-full h-32 rounded-xl overflow-hidden mb-3">
          {artist.image ? (
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-zinc-700 flex items-center justify-center">
            <span className="text-sm font-semibold text-white">{artist.name.charAt(0)}</span>
          </div>
        )}
      </div>
      <p className="text-sm font-semibold text-white mb-0.5">{artist.name}</p>
      <p className="text-xs text-zinc-400 mb-3">{artist.origin}</p>
      <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full
        ${GENRE_COLORS[artist.genre] ?? 'bg-gray-700 text-gray-300'}`}>
        {artist.genre}
      </span>
      {upcomingCount > 0 && (
        <p className="text-xs text-blue-400 mt-2">{upcomingCount} upcoming</p>
      )}
    </div>
  )
}

// ─── Upcoming event card ──────────────────────────────────────────────────────

function EventCard({ perf, onClick }: { perf: Performance; onClick: () => void }) {
  const artist = ALL_ARTISTS.find(a => a._id === perf.artistId)
  const venue  = ALL_VENUES.find(v => v._id === perf.venueId)

  return (
    <div
      onClick={onClick}
      className="min-w-[220px] bg-zinc-900 border border-zinc-700 rounded-2xl p-4
                 cursor-pointer hover:border-zinc-500 hover:-translate-y-1
                 transition-all duration-200 shrink-0"
    >
      <p className="text-xs text-blue-400 font-medium mb-2">
        {formatDate(perf.date)} · {perf.time}
      </p>
      <p className="text-sm font-semibold text-white mb-0.5">{artist?.name}</p>
      <p className="text-xs text-zinc-400 mb-3">{venue?.name} · {venue?.location}</p>
      <div className="flex items-center justify-between">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full
          ${GENRE_COLORS[artist?.genre ?? ''] ?? 'bg-gray-700 text-gray-300'}`}>
          {artist?.genre}
        </span>
        <span className="text-sm font-medium text-green-400">${perf.ticketPrice}</span>
      </div>
    </div>
  )
}

// ─── HomePage ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  const router = useRouter()
  const [authLoading, setAuthLoading] = useState(false)
  const [selected, setSelected] = useState<{ type: 'venue' | 'artist'; item: Venue | Artist } | null>(null)

  // Upcoming events — sorted by soonest date, no past events
  const upcomingPerfs = [...ALL_PERFORMANCES]
    .filter(p => !isPast(p.date))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 8)

  const handleProfileClick = async () => {
    try {
      setAuthLoading(true)
      const res  = await fetch('/api/auth/me')
      const data = await res.json()
      data.user ? router.push('/dashboard') : router.replace('/login')
    } catch {
      router.push('/login')
    } finally {
      setAuthLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16">
            <svg className="animate-spin" viewBox="0 0 50 50">
              <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor"
                strokeWidth="4" className="text-gray-700" />
              <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor"
                strokeWidth="4" strokeLinecap="round" strokeDasharray="90 150"
                strokeDashoffset="0" className="text-blue-500" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-white text-lg font-medium tracking-wide">Loading your account</p>
            <p className="text-gray-400 text-sm mt-1">Just a moment...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="relative bg-black min-h-screen px-6 py-8">

      {/* User icon */}
      <button
        onClick={handleProfileClick}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-800 transition-colors"
      >
        <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      </button>

      <div className="max-w-7xl mx-auto space-y-10">

        {/* ── Trending ── */}
        <section className="space-y-4">
          <h2 className="text-white text-xl font-bold">Trending</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {TRENDING_VENUES.map(venue => (
              <VenueCard
                key={venue._id}
                venue={venue}
                onClick={() => setSelected({ type: 'venue', item: venue })}
              />
            ))}
          </div>
        </section>

        {/* ── Upcoming Events ── */}
        <section className="space-y-4">
          <h2 className="text-white text-xl font-bold">Upcoming Events</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {upcomingPerfs.map((perf, i) => {
              const venue = ALL_VENUES.find(v => v._id === perf.venueId)
              return (
                <EventCard
                  key={i}
                  perf={perf}
                  onClick={() => venue && setSelected({ type: 'venue', item: venue })}
                />
              )
            })}
          </div>
        </section>

        {/* ── Featured Artists ── */}
        <section className="space-y-4">
          <h2 className="text-white text-xl font-bold">Featured Artists</h2>
          {/* TODO: replace FEATURED_ARTISTS with artists sorted by likes from MongoDB */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {FEATURED_ARTISTS.map(artist => (
              <ArtistCard
                key={artist._id}
                artist={artist}
                onClick={() => setSelected({ type: 'artist', item: artist })}
              />
            ))}
          </div>
        </section>

      </div>

      {/* Detail popup */}
      {selected && (
        <DetailPopup
          type={selected.type}
          item={selected.item}
          onClose={() => setSelected(null)}
        />
      )}

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  )
}