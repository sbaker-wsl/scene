export function VenueCard( { venue }: any) {
    const date = new Date(venue.date);

    return (
        <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">{venue.artist}</h1>
            <p className="text-xl">{venue.genre}</p>
            <p>{venue.location}</p>

            <p>
                {date.toLocaleDateString()} <br />
                {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"})}
            </p>
        </div>
    );
}