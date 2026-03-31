export default function VenuesPage() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold text-center mb-6">Music Venues</h1>
            <p className="text-center text-gray-600">Discover music venues near you!</p>

            <div className="mt-10 grid gird-cols-1 md:grid
            -cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 bg-white rounded shadow">Venue 1</div>
                <div className="p-4 bg-white rounded shadow">Venue 2</div>
                <div className="p-4 bg-white rounded shadow">Venue 3</div>
            </div>
        </div>
    )
}