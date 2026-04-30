import { useState } from "react";
import { Phone } from "lucide-react"

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
            <div className = "relative flex items-center justify-center">
                {venue.contact && (
                <button
                    onClick = {handleContact}
                    className="absolute right-0 p-1 hover:opacity-70 transition"
                    title={copied ? "Copied!" : "Copy Contact"}
                >
                    <Phone size = {20} color = {copied ? "green" : "white"} />
                </button>
                )}
                <h1 className="text-4xl font-bold">{venue.artist}</h1>
            </div>

            <p className="text-xl">{venue.genre}</p>
            <p>{venue.location}</p>

            <p>
                {date.toLocaleDateString()} <br />
                {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"})}
            </p>
        </div>
    );
}