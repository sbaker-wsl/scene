'use client';

import { useEffect } from 'react';

export default function TestPage() {
	useEffect(() => {
		async function fetchTest() {
			try {
				const res = await fetch('/api/users');
				const data = await res.json();
				console.log('API response:',data);
			} catch (err) {
				console.error('API fetch failed:', err);
			}
		}
		fetchTest();
	}, []);

	return <div>Check your browser console for API output.</div>;
}
