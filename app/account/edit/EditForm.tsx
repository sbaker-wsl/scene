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
            router.replace('/dashboard')
        } catch (err) {
            alert(err || 'Error saving changes')
        }
    }

    /*
    const handleBack = async (e: React.FormEvent) {

    }
    */

     return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-6 space-y-6"
            >
            {/* Header */}
            <div className="text-center">
                <h2 className="text-xl font-semibold text-white">Edit Profile</h2>
                <p className="text-sm text-gray-400">Update your personal info</p>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Bio</label>
                <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                placeholder="Tell us a little about yourself..."
                rows={4}
                required
                className="px-4 py-3 rounded-xl text-sm bg-gray-800 text-white
                            placeholder-gray-500 border border-gray-700
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                            transition resize-none"
                />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Location</label>
                <input
                name="location"
                value={profile.location}
                onChange={handleChange}
                placeholder="City, Country"
                required
                className="px-4 py-3 rounded-xl text-sm bg-gray-800 text-white
                            placeholder-gray-500 border border-gray-700
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                            transition"
                />
            </div>

            {/* Save Button */}
            <button
                type="submit"
                className="w-full py-3 rounded-xl font-medium text-white
                        bg-blue-600 hover:bg-blue-700
                        transition-all duration-200 shadow-md hover:shadow-lg"
            >
                Save Changes
            </button>

            {/* Success Message */}
            {saved && (
                <p className="text-sm text-green-400 text-center animate-fade-in">
                Changes saved successfully!
                </p>
            )}
        </form>
    )
}