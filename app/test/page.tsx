
import { useEffect } from 'react';
import { cookies } from 'next/headers';
import { getUser } from '@/lib/getUser';

export default function TestPage() {
	const user = getUser();
	return <div className = "text-white">{user.username}</div>;
}
