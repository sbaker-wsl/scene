import { useState } from "react";

export function VenueCard( { venue }: any) {
    const date = new Date(venue.date);
    const [copied, setCopied] = useState(false);

    const handleContact =() => {
        navigator.clipboard.writeText(venue.contact);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">{venue.artist}</h1>
            <p className="text-xl">{venue.genre}</p>
            <p>{venue.location}</p>

            <p>
                {date.toLocaleDateString()} <br />
                {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"})}
            </p>

            {venue.contact && (
                <button
                    onClick = {handleContact}
                    className="mt-2 px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition"
                >
                    {copied ? "Copied!" : "Copy Contact"}
                </button>
            )}
        </div>
    );
}