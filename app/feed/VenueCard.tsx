import { useState } from "react";
import { Phone } from "lucide-react"
import { createPortal } from "react-dom";
import { useEffect } from "react";

export function VenueCard( { venue, resetSignal }: any) {
    const date = new Date(venue.date);
    const [copied, setCopied] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(Array.isArray(venue.comments) ? venue.comments : []);

    useEffect(() => {
        setShowComments(false);
    }, [resetSignal]);

    useEffect(() => {
        if (!showComments) return;

        fetch(`/api/venues/${venue._id}/comment`)
        .then((res) => res.json())
        .then(setComments);
    }, [showComments]);

    const handlePost = async () => {
        if (!comment.trim()) return;

        const res = await fetch(`/api/venues/${venue._id}/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: comment }),
        });

        if (!res.ok) {
            alert(res.statusText || "Failed to post comment");
            return;
        }

        const updatedComments = await res.json();
        setComments(updatedComments);
        setComment("");
    };

    const handleContact =() => {
        navigator.clipboard.writeText(venue.contact);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <>
        <div className="relative w-full h-screen flwx items-center justify-center">

            {/* Center Content */}
            <div className = "text-center space-y-4">
                <h1 className="text-4xl font-bold">{venue.artist}</h1>
                <p className="text-xl">{venue.genre}</p>
                <p>{venue.location}</p>
                <p>
                    {date.toLocaleDateString()} <br />
                    {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"})}
                </p>
            </div>

            {/* Right Side Buttons */}
            <div className = "absolute right-8 flex flex-col items-center gap-6">
                <button
                    onClick = {handleContact}
                    className="p-1 hover:opacity-70 transition flex-shrink-0"
                    title={copied ? "Copied!" : "Copy Contact"}
                >
                    <Phone size = {30} color = {copied ? "green" : "white"} />
                </button>
                <button
                    onClick={() => setShowComments(!showComments)}
                    className="text-sm text-blue-400 hover:opacity-70"
                    >
                        Comments ({comments.length})
                </button>
            </div>   
        </div>
        
        {showComments &&
      createPortal(
        <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center">
          <div className="bg-gray-900 w-[90%] max-w-md rounded-xl p-4 max-h-[80vh] flex flex-col">

            {/* header */}
            <div className="flex justify-between mb-3">
              <h2 className="text-white">Comments</h2>
              <button className="text-white hover:opacity-70" onClick={() => setShowComments(false)}>
                ✕
              </button>
            </div>

            {/* scrollable area */}
            <div className="flex-1 overflow-y-auto space-y-2">
              {comments.map((c: any, i: number) => (
                <div key={i} className="bg-gray-800 p-2 rounded">
                  <p className="text-white text-sm">{c.text}</p>
                  <p className="text-xs text-gray-400">
                    {c.user?.username}
                  </p>
                </div>
              ))}
            </div>

            {/* input */}
            <div className="mt-3 flex gap-2">
              <input
                className="flex-1 p-2 bg-gray-800 text-white rounded"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button className="bg-blue-500 px-3 rounded text-white" onClick={handlePost}>
                Post
              </button>
            </div>

          </div>
        </div>,
        document.body
      )
    }
  </>
);
}