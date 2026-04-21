'use client'

import { useState } from 'react'

export default function ProfileForm() {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        location: '',
        bio: '',
    })
    const [saved, setSaved]  = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProfile({...profile, [e.target.name]: e.target.value})
        setSaved(false)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // hook up to Clerk + MongoDB later
        setSaved(true)
    }

    return (
        <form onSubmit = {handleSubmit} className = "flex flex-col gap-5 w-full max-w-md">
            
            {/* Name */}
            <div className = "flex flex-col gap-1">
                <label className = "text-sm font-medium text-white-700">Name</label>
                <input
                name = "name"
                value = {profile.name}
                onChange = {handleChange}
                required
                placeholder = "Your name"
                className ="px-4 py-2 border border-gray-300 rounded-lg text-sm
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            bg-white text-gray-900 placeholder-gray-400"
                />
            </div>

            {/* Email */}
            <div className = "flex flex-col gap-1">
                <label className = "text-sm font-medium text-white-700">Email</label>
                <input
                name = "email"
                type = "email"
                value = {profile.email}
                onChange = {handleChange}
                required
                placeholder = "your@email.com"
                className ="px-4 py-2 border border-gray-300 rounded-lg text-sm
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            bg-white text-gray-900 placeholder-gray-400"
                />
            </div>

            {/* Location */}
            <div className = "flex flex-col gap-1">
                <label className = "text-sm font-medium text-white-700"> Location </label>
                <input
                name = "location"
                value = {profile.location}
                onChange = {handleChange}
                required
                placeholder = "City, State"
                className ="px-4 py-2 border border-gray-300 rounded-lg text-sm
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            bg-white text-gray-900 placeholder-gray-400"
                />
            </div>

            {/* Bio */}
            <div className = "flex flex-col gap-1">
                <label className = "text-sm font-medium text-white-700">Bio</label>
                <textarea
                name = "bio"
                value = {profile.bio}
                onChange = {handleChange}
                placeholder = "Tell us a little about yourself..."
                rows = {4}
                className ="px-4 py-2 border border-gray-300 rounded-lg text-sm
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            bg-white text-gray-900 placeholder-gray-400 resize-none"
                />
            </div>

            {/* Sign out placeholder */}
            <div className = "flex flex-col gap-2 pt-2">
                <button
                type = "submit"
                className ="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white
                            text-sm font-medium rounded-lg transition-colors"
                >
                Create Account
                </button>
                
            </div>

            {saved && (
                <p className="text-sm text-green-500 text-center">
                Account created!
                </p>
            )}
        </form>
    )
}