'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditForm() {
    const [profile, setProfile] = useState ({
        bio: '',
        location: '',
    })

    const [saved, setSaved] = useState(false)

    const router = useRouter()

    useEffect(() => {
        const loadUser = async () => {
            const res = await fetch('/api/user/me')
            const data = await res.json()

            if (!data.user) {
                router.push('/login')
                return
            }

            setProfile({
                bio: data.user.bio || '',
                location: data.user.location || '',
            })
        }

        loadUser()
    }, [router])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProfile({...profile, [e.target.name]: e.target.value})
        setSaved(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        try {
            const res = await fetch('/api/user/update', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(profile)
            })
            
            if (!res.ok) {
                throw new Error('Failed to save changes')
            }

            setSaved(true)
        } catch (err) {
            alert(err || 'Error saving changes')
        }
    }

     return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-md">

             <hr className="border-gray-200" />

            {/* Bio */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-white">Bio</label>
                <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                placeholder="Tell us a little about yourself..."
                rows={4}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            bg-white text-gray-900 placeholder-gray-400 resize-none"
                />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-white">Location</label>
                <input
                name="location"
                value={profile.location}
                onChange={handleChange}
                placeholder="City, Country"
                required
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            bg-white text-gray-900 placeholder-gray-400"
                />
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2 pt-2">
                <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white
                            text-sm font-medium rounded-lg transition-colors"
                >
                Save Changes
                </button>
            </div>

            {saved && (
                <p className="text-sm text-green-500 text-center">Changes saved!</p>
            )}

        </form>
    )
}