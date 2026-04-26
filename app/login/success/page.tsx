
import { cookies } from 'next/headers';
import { getUser } from '@/lib/getUser';

export default async function SuccessPage() {
    const user = await getUser();
    console.log(user);
    return (
        <div className = "text-center">
            <div className = "text-white">
                Hello {user.username}!
            </div>
        </div>
    );
}
