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

    const handleDateChange = (e: any) => {
      let value = e.target.value.replace("/\D/g,", "");
      if (value.length > 8) return;

      if (value.length >= 5) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4) + "/" + value.slice(4, 8);

      } else if (value.length >= 3) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4);
      }
      setForm({ ...form, date: value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!form.artist || !form.genre || !form.location || !form.date || !form.time) {
            alert("Please fill out all fields");
            return;
        }

        try {

        const [month, day, year] = form.date.split("/");
        const combinedDate = new Date(`${year}-${month}-${day}T${form.time}`);

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
          type="text"
          name="date"
          value={form.date}
          placeholder = "MM/DD/YYYY"
          maxLength = {10} 
          className="w-full p-3 rounded bg-zinc-800"
        />

        <input
          type="time"
          name="time"
          value={form.time}
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