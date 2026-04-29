"use client";

import { useState } from "react";

export default function CreateVenuesPage() {
    const [form, setForm] = useState({
        artist: "",
        genre: "",
        location: "",
        date: "",
        time: "",
    });

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!form.artist || !form.genre || !form.location || !form.date || !form.time) {
            alert("Please fill out all fields");
            return;
        }

        const combinedDate = new Date(`${form.date}T${form.time}`);

        const res = await fetch("/api/venues", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                artist: form.artist,
                genre: form.genre,
                location: form.location,
                date: combinedDate,
            }),
        });

        const data = await res.json();
        console.log(data);
    };

    return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold">Add Venue</h1>

        <input
          name="artist"
          placeholder="Artist"
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-800"
        />

        <input
          name="genre"
          placeholder="Genre"
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-800"
        />

        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-800"
        />

        <input
          type="date"
          name="date"
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-800"
        />

        <input
          type="time"
          name="time"
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-800"
        />

        <button
          type="submit"
          className="w-full bg-white text-black p-3 rounded font-semibold"
        >
          Create Venue
        </button>
      </form>
    </div>
  );
}