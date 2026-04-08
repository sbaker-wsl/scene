export default function HomePage() {
  return (
    <main className="bg-black min-h-screen px-6 py-8">

      <div className="max-w-7xl mx-auto space-y-10">

        {/* Trending Section */}
        <section className="space-y-4">
          <h2 className="text-white text-xl font-bold"> Trending</h2>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {/* Event Cards Placeholder */}
            <div className="min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
            <div className="min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
            <div className="min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
            <div className="min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
          </div>
        </section>

        {/* Happening Soon Section */}
        <section className="space-y-4">
          <h2 className="text-white text-xl font-bold"> Happening Soon</h2>

          <div className="flex gap-4 overflow-x-auto pb-2">
            <div className="min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
            <div className="min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
            <div className="min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
          </div>
        </section>

        {/* Featured Artists Section */}
        <section className="space-y-4">
          <h2 className="text-white text-xl font-bold"> Featured Artists</h2>

          <div className="flex gap-4 overflow-x-auto pb-2">
            <div className="min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
            <div className="min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
            <div className="min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
          </div>
        </section>

      </div>
    </main>
  );
}