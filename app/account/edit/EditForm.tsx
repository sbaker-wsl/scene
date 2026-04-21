'use client'

import { useState } from 'react'

export default function EditForm() {
    const [profile, setProfile] = useState ({
        bio: '',
        location: '',
        image: null as File | null,
        imagePreview: '' as string,
    })

    const [saved, setSaved] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProfile({...profile, [e.target.name]: e.target.value})
        setSaved(false)
    }

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setProfile ({
            ...profile,
            image: file,
            imagePreview: URL.createObjectURL(file)
        })
        setSaved(false)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        //save to MongoDB later
        setSaved(true)
    }

     return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-md">

            {/* Profile picture */}
            <div className="flex flex-col gap-2 items-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex
                                items-center justify-center border-2 border-gray-300">
                {profile.imagePreview ? (
                    <img
                    src={profile.imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-3xl text-gray-400">?</span>
                )}
                </div>
                <label className="text-sm text-blue-500 hover:text-blue-600 cursor-pointer font-medium">
                    Change photo
                    <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                />
                </label>
            </div>

             <hr className="border-gray-200" />

            {/* Bio */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-white-700">Bio</label>
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
                <label className="text-sm font-medium text-white-700">Location</label>
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