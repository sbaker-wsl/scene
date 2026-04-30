import { useState } from "react";
import { Phone } from "lucide-react"

export function VenueCard( { venue }: any) {
    const date = new Date(venue.date);
    const [copied, setCopied] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(venue.comments || []);

    const handleContact =() => {
        navigator.clipboard.writeText(venue.contact);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <>
        <div className="text-center space-y-4">
            <div className = "relative flex items-center justify-center">
                <button
                    onClick = {handleContact}
                    className="absolute right-0 p-1 hover:opacity-70 transition"
                    title={copied ? "Copied!" : "Copy Contact"}
                >
                    <Phone size = {20} color = {copied ? "green" : "white"} />
                </button>
                <button
                    onClick={() => setShowComments(!showComments)}
                    className="text-sm text-blue-400 hover:opacity-70"
                    >
                        Comments ({comments.length})
                    </button>
                
                <h1 className="text-4xl font-bold">{venue.artist}</h1>
            </div>

            <p className="text-xl">{venue.genre}</p>
            <p>{venue.location}</p>

            <p>
                {date.toLocaleDateString()} <br />
                {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"})}
            </p>
        </div>
        {showComments && (
  <div
    className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    onClick={() => setShowComments(false)}
  >
    <div
      className="bg-gray-900 w-[90%] max-w-md rounded-xl p-4 flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-white font-semibold">Comments</h2>
        <button
          onClick={() => setShowComments(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      {/* Comments list */}
      <div className="flex-1 overflow-y-auto space-y-3 max-h-60">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm">No comments yet</p>
        ) : (
          comments.map((c: any, i: number) => (
            <div key={i} className="bg-gray-800 p-2 rounded">
              <p className="text-sm text-white">{c.text}</p>
              <p className="text-xs text-gray-500">
                {c.user?.username || "Anonymous"}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="mt-3 flex gap-2">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 p-2 bg-gray-800 text-white rounded"
        />
        <button
          onClick={async () => {
            if (!comment.trim()) return;

            const res = await fetch(`/api/venues/${venue._id}/comment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text: comment }),
            });

            const data = await res.json();

            setComments(data.comments); // update UI
            setComment("");
          }}
          className="bg-blue-500 px-3 rounded text-white"
        >
          Post
        </button>
      </div>
    </div>
  </div>
    )}
    </>
    
);
}