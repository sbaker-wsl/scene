'use client'

import { useState, useEffect } from 'react'
import SearchBar from './SearchBar'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Performance {
  artistId: string
  venueId:  string
  date:     string   // ISO string e.g. "2025-06-14"
  time:     string   // e.g. "20:00"
  ticketPrice: number
}

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
}

type SortOption = 'date-asc' | 'date-desc' | 'price-asc' | 'price-desc' | 'location'

// ─── Placeholder data ─────────────────────────────────────────────────────────
// TODO: Remove ALL_VENUES, ALL_ARTISTS, ALL_PERFORMANCES once MongoDB is connected.
// Replace with useEffect API calls — see commented block inside Page().

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
  { _id: "a1",  name: "Miles Davis",         genre: "jazz",       origin: "Alton, IL" },
  { _id: "a2",  name: "Radiohead",           genre: "alt",        origin: "Abingdon, UK" },
  { _id: "a3",  name: "Daft Punk",           genre: "electronic", origin: "Paris, FR" },
  { _id: "a4",  name: "Kendrick Lamar",      genre: "rap",        origin: "Compton, CA" },
  { _id: "a5",  name: "The Strokes",         genre: "indie",      origin: "New York, NY" },
  { _id: "a6",  name: "Black Sabbath",       genre: "metal",      origin: "Birmingham, UK" },
  { _id: "a7",  name: "Coltrane",            genre: "jazz",       origin: "Hamlet, NC" },
  { _id: "a8",  name: "Aphex Twin",          genre: "electronic", origin: "Limerick, IE" },
  { _id: "a9",  name: "Arctic Monkeys",      genre: "indie",      origin: "Sheffield, UK" },
  { _id: "a10", name: "Run The Jewels",      genre: "rap",        origin: "Atlanta, GA" },
  { _id: "a11", name: "My Chemical Romance", genre: "emo",        origin: "Newark, NJ" },
  { _id: "a12", name: "Metallica",           genre: "metal",      origin: "San Francisco, CA" },
]

// Performances link artists to venues with a date, time, and ticket price
const ALL_PERFORMANCES: Performance[] = [
  { artistId: "a1",  venueId: "v1",  date: "2026-07-10", time: "20:00", ticketPrice: 35  },
  { artistId: "a7",  venueId: "v1",  date: "2026-08-02", time: "21:00", ticketPrice: 30  },
  { artistId: "a2",  venueId: "v2",  date: "2026-06-20", time: "19:30", ticketPrice: 55  },
  { artistId: "a9",  venueId: "v2",  date: "2026-09-14", time: "20:00", ticketPrice: 45  },
  { artistId: "a3",  venueId: "v3",  date: "2026-07-05", time: "22:00", ticketPrice: 25  },
  { artistId: "a8",  venueId: "v3",  date: "2026-02-01", time: "23:00", ticketPrice: 20  }, // past
  { artistId: "a4",  venueId: "v4",  date: "2026-07-18", time: "20:00", ticketPrice: 75  },
  { artistId: "a10", venueId: "v4",  date: "2026-08-22", time: "21:00", ticketPrice: 60  },
  { artistId: "a5",  venueId: "v5",  date: "2026-06-28", time: "19:00", ticketPrice: 40  },
  { artistId: "a11", venueId: "v6",  date: "2026-04-15", time: "19:00", ticketPrice: 30  }, // past
  { artistId: "a6",  venueId: "v6",  date: "2026-09-03", time: "20:00", ticketPrice: 65  },
  { artistId: "a12", venueId: "v9",  date: "2026-10-11", time: "19:00", ticketPrice: 90  },
  { artistId: "a1",  venueId: "v7",  date: "2026-08-30", time: "19:30", ticketPrice: 50  },
  { artistId: "a3",  venueId: "v8",  date: "2026-07-25", time: "22:00", ticketPrice: 30  },
  { artistId: "a2",  venueId: "v10", date: "2026-01-05", time: "20:00", ticketPrice: 45  }, // past
]

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
      // TODO: 'location' sort requires user coordinates — wire up navigator.geolocation
      // and compare against venue.coordinates once those are stored in MongoDB
      case 'location':   return 0
      default:           return 0
    }
  })

  // Past dates always go to the bottom
  return [...sorted, ...past]
}

// ─── Popup ────────────────────────────────────────────────────────────────────

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

  // Get performances for this venue or artist
  const performances = ALL_PERFORMANCES.filter(p =>
    type === 'venue'
      ? p.venueId  === item._id
      : p.artistId === item._id
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
              {type === 'venue'
                ? (item as Venue).location
                : (item as Artist).origin}
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
            <p className="text-xs text-gray-600 mt-2 italic">
              {/* TODO: wire up navigator.geolocation and venue coordinates from MongoDB */}
              Distance sorting coming soon
            </p>
          )}
        </div>

        {/* Performance list */}
        <div className="overflow-y-auto px-6 py-4 space-y-3">
          {sorted.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-6">No upcoming performances</p>
          )}
          {sorted.map((perf, i) => {
            const past    = isPast(perf.date)
            const artist  = ALL_ARTISTS.find(a => a._id === perf.artistId)
            const venue   = ALL_VENUES.find(v => v._id === perf.venueId)
            const label   = type === 'venue' ? artist?.name : venue?.name
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
                  <p className={`text-sm font-medium ${past ? 'text-gray-400' : 'text-white'}`}>
                    {label}
                  </p>
                  <p className="text-xs text-gray-500">{sublabel}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {formatDate(perf.date)} · {perf.time}
                    {past && <span className="ml-2 text-gray-600 italic">past</span>}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${past ? 'text-gray-500' : 'text-green-400'}`}>
                    ${perf.ticketPrice}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Result cards ─────────────────────────────────────────────────────────────

function VenueResult({ venue, onClick }: { venue: Venue; onClick: () => void }) {
  const upcomingCount = ALL_PERFORMANCES.filter(
    p => p.venueId === venue._id && !isPast(p.date)
  ).length

  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 cursor-pointer hover:border-gray-500 transition-colors"
    >
      <div>
        <p className="text-sm font-medium text-white">{venue.name}</p>
        <p className="text-xs text-gray-400">{venue.location}</p>
      </div>
      <div className="flex items-center gap-2">
        {upcomingCount > 0 && (
          <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full">
            {upcomingCount} upcoming
          </span>
        )}
        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">{venue.genre}</span>
        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">Venue</span>
      </div>
    </div>
  )
}

function ArtistResult({ artist, onClick }: { artist: Artist; onClick: () => void }) {
  const upcomingCount = ALL_PERFORMANCES.filter(
    p => p.artistId === artist._id && !isPast(p.date)
  ).length

  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 cursor-pointer hover:border-gray-500 transition-colors"
    >
      <div>
        <p className="text-sm font-medium text-white">{artist.name}</p>
        <p className="text-xs text-gray-400">{artist.origin}</p>
      </div>
      <div className="flex items-center gap-2">
        {upcomingCount > 0 && (
          <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full">
            {upcomingCount} upcoming
          </span>
        )}
        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">{artist.genre}</span>
        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">Artist</span>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const [query, setQuery]     = useState('')
  const [filter, setFilter]   = useState('all')
  const [selected, setSelected] = useState<{ type: 'venue' | 'artist'; item: Venue | Artist } | null>(null)

  // TODO: Replace hardcoded arrays with MongoDB data once API routes are ready.
  // const [venues, setVenues]   = useState<Venue[]>([])
  // const [artists, setArtists] = useState<Artist[]>([])
  // const [performances, setPerformances] = useState<Performance[]>([])
  //
  // useEffect(() => {
  //   fetch('/api/venues/all').then(r => r.json()).then(d => setVenues(d.venues))
  //   fetch('/api/artists').then(r => r.json()).then(d => setArtists(d.artists))
  //   fetch('/api/performances').then(r => r.json()).then(d => setPerformances(d.performances))
  // }, [])
  //
  // Then replace ALL_VENUES, ALL_ARTISTS, ALL_PERFORMANCES with the state vars above.

  const q = query.trim().toLowerCase()

  const matchedVenues: Venue[] =
    filter === 'artists'
      ? []
      : ALL_VENUES.filter(v =>
          q === '' ||
          v.name.toLowerCase().includes(q) ||
          v.location.toLowerCase().includes(q) ||
          v.genre.toLowerCase().includes(q)
        )

  const matchedArtists: Artist[] =
    filter === 'venues'
      ? []
      : ALL_ARTISTS.filter(a =>
          q === '' ||
          a.name.toLowerCase().includes(q) ||
          a.origin.toLowerCase().includes(q) ||
          a.genre.toLowerCase().includes(q)
        )

  const total = matchedVenues.length + matchedArtists.length

  return (
    <div className="flex flex-col items-center gap-6 px-6 pt-5">
      <div className="w-full max-w-2xl">
        <SearchBar
          query={query}
          filter={filter}
          onQueryChange={setQuery}
          onFilterChange={setFilter}
        />
      </div>

      <div className="w-full max-w-2xl space-y-6">

        {q !== '' && (
          <p className="text-xs text-gray-500">
            {total} result{total !== 1 ? 's' : ''} for{' '}
            <span className="text-white font-medium">&quot;{query}&quot;</span>
          </p>
        )}

        {/* Venues section */}
        {matchedVenues.length > 0 && (
          <div>
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Venues</h3>
            <div className="space-y-2">
              {matchedVenues.map(v => (
                <VenueResult
                  key={v._id}
                  venue={v}
                  onClick={() => setSelected({ type: 'venue', item: v })}
                />
              ))}
            </div>
          </div>
        )}

        {/* Artists section */}
        {matchedArtists.length > 0 && (
          <div>
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Artists</h3>
            <div className="space-y-2">
              {matchedArtists.map(a => (
                <ArtistResult
                  key={a._id}
                  artist={a}
                  onClick={() => setSelected({ type: 'artist', item: a })}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {q !== '' && total === 0 && (
          <p className="text-sm text-gray-500 text-center py-8">
            No results for &quot;{query}&quot;
          </p>
        )}

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
      `}</style>
    </div>
  )
}