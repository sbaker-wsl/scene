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
		<div className = "flex flex-col items-center gap-6 px-6 pt-5">
			<div className = "w-full max-w-2xl">
				<SearchBar onSearch = {handleSearch} />
			</div>

			{results && (
				<p className="text-sm text-gray-500">
					Searching for <span className="font-medium text-white">"{results.query}"</span> in{' '}
					<span className="font-medium text-white">{results.filter}</span>
				</p>
			)}
		</div>
	)
}