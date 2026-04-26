
import { cookies } from 'next/headers';
import { getUser } from '@/lib/getUser';

export default async function TestPage() {
	const user = await getUser();
	console.log(user);
	return <div className = "text-white">{user.username}</div>;
}
