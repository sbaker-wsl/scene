'use client'

import { useState } from 'react'

export default function ProfileForm() {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        password: '',
        location: '',
        bio: '',
    })
    const [saved, setSaved]  = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProfile({...profile, [e.target.name]: e.target.value})
        setSaved(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        // also add a lot of logic here for handling what signup is doing
        e.preventDefault()
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: profile.name,
                    email: profile.email,
                    password: profile.password,
                    location: profile.location,
                    bio: profile.bio,
                })
            })
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.error || 'Signup failed')
            }
            console.log('Signup response:', data)
            setSaved(true)
        } catch (err: any) {
            console.error(err.message)
        }
    }

    return (
        <form onSubmit = {handleSubmit} className = "flex flex-col gap-5 w-full max-w-md">

            {/* Name */}
            <div className = "flex flex-col gap-1">
                <label className = "text-sm font-medium text-white">Name</label>
                <input
                name = "name"
                value = {profile.name}
                onChange = {handleChange}
                required
                placeholder = "Your username"
                className ="px-4 py-2 border border-gray-300 rounded-lg text-sm
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            bg-white text-gray-900 placeholder-gray-400"
                />
            </div>

            {/* Email */}
            <div className = "flex flex-col gap-1">
                <label className = "text-sm font-medium text-white">Email</label>
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

            {/* Password */}
            <div className = "flex flex-col gap-1">
                <label className = "text-sm font-medium text-white">Password</label>
                <input
                name = "password"
                type = "password"
                value = {profile.password}
                onChange = {handleChange}
                required
                placeholder = "Create a password"
                className ="px-4 py-2 border border-gray-300 rounded-lg text-sm
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            bg-white text-gray-900 placeholder-gray-400"
                />
            </div>

            {/* Location */}
            <div className = "flex flex-col gap-1">
                <label className = "text-sm font-medium text-white"> Location </label>
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
                <label className = "text-sm font-medium text-white">Bio</label>
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

            {/* Submit button */}
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