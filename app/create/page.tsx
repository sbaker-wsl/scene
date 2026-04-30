"use client";

import { useState } from "react";
import { redirect } from "next/navigation"
import { useRouter } from "next/navigation";

export default function CreateVenuesPage() {
    const router = useRouter();

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

        const year = new Date(form.date).getFullYear();
        const currentYear = new Date().getFullYear();
        if (year < currentYear || year > currentYear + 5) {
            alert(`Please enter a date between ${currentYear} and ${currentYear + 5}`);
            return;
        }


        try {

        const combinedDate = new Date(`${form.date}T${form.time}`);

        const res = await fetch("/api/venues", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                artist: form.artist.trim().toLowerCase(),
                genre: form.genre,
                location: form.location.trim().toLowerCase(),
                date: combinedDate,
            }),
        });

        const data = await res.json();
        
        if (!res.ok) {
            throw new Error(data.message || "Failed to create venue");
        }


        // success
        alert("New venue created!");
        router.push("/feed");
        
    } catch (err: any) {
        console.error(err);
        alert("Error creating venue: " + err.message);
    }
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
          maxLength = {10} 
          min={new Date().toISOString().split("T")[0]}
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