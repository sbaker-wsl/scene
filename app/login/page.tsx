'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
    const [form, setForm] = useState({email: '', password:''})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // hook up to Clerk later
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6">
            <div className="w-full max-w-md flex flex-col gap-6">

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-white-800">Welcome back</h1>
                    <p className="text-sm text-gray-400 mt-1">Sign in to your account</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-white-700">Email</label>
                        <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm
                                    focus:outline-none focus:ring-2 focus:ring-blue-500
                                    bg-white text-gray-900 placeholder-gray-400"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-white-700">Password</label>
                        <button
                            type="button"
                            className="text-xs text-blue-500 hover:text-blue-600"
                        >
                            Forgot password?
                        </button>
                        </div>
                        <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm
                                    focus:outline-none focus:ring-2 focus:ring-blue-500
                                    bg-white text-gray-900 placeholder-gray-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white
                                text-sm font-medium rounded-lg transition-colors mt-2"
                    >
                        Sign In
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3">
                    <hr className="flex-1 border-gray-200" />
                    <span className="text-xs text-gray-400">or</span>
                    <hr className="flex-1 border-gray-200" />
                </div>

                {/* Link to create account */}
                <p className="text-sm text-center text-gray-500">
                    Don't have an account?{' '}
                    <Link href="/account" className="text-blue-500 hover:text-blue-600 font-medium">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    )
}