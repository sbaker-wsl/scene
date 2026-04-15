'use client'

import { useState } from 'react'
import SearchBar from './SearchBar'

export default function SearchPage() {
	const [results, setResults] = useState<{ query: string; filter: string } | null>(null)

	const handleSearch = ({query, filter }: { query: string; filter: string}) => {
		// replace w actual API call or filter logic
		setResults({query, filter})
	}

	return ( 
		<div className = "flex flex-col gap-6">
			<h1 className = "text-xl font-semibold text-gray-800">Search</h1>
			<SearchBar onSearch = {handleSearch} />

			{results && (
				<p className="text-sm text-gray-500">
					Searching for <span className="font-medium text-white-800">"{results.query}"</span> in{' '}
					<span className="font-medium text-white-800">{results.filter}</span>
				</p>
			)}
		</div>
	)
}