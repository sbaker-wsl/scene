'use client'
import { useState } from 'react'

const FILTER_OPTIONS = [
    { value: 'all',      label: 'All'},
    { value: 'name',     label: 'Name'},
    { value: 'genre',    label: 'Genre'},
    { value: 'date',     label: 'Date'},
    { value: 'location', label: 'Location'},
]

type Props = {
    onSearch: (params: { query: string; filter: string}) => void
}

export default function SearchBar({ onSearch }: Props) {
    const [query, setQuery] = useState(' ')
    const [filter, setFilter] = useState('all')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch({ query, filter})
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center w-full">

            {/* Filter dropdown */}
            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="h-10 px-3 text-sm border border-gray-300 rounded-l-lg
                        bg-gray-50 text-gray-600 focus:outline-none focus:ring-2
                        focus:ring-blue-500"
            >
                {FILTER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
                ))}
            </select>

            {/* Text input */}
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 h-10 px-4 text-sm border-y border-gray-300
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        bg-white text-gray-900 placeholder-gray-400"
            />

            {/* Submit button */}
            <button
                type="submit"
                className="h-10 px-4 bg-blue-500 hover:bg-blue-600 text-white
                        rounded-r-lg transition-colors focus:outline-none
                        focus:ring-2 focus:ring-blue-500"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
            </button>

        </form>
    )
}