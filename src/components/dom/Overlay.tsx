"use client";

export default function Overlay() {
    return (
        <div style={{ position: 'relative', width: '100%', zIndex: 10, pointerEvents: 'none' }}>
            {/* Section 1: Intro */}
            <section style={{ height: '200vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
                <div className="sticky top-1/2 -translate-y-1/2">
                    <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 mb-4">
                        LUNAR GPS
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
                        A next-generation positioning system for the lunar surface.
                    </p>
                    <div className="absolute bottom-[-40vh] left-0 w-full animate-bounce text-gray-500">
                        Scroll to Explore
                    </div>
                </div>
            </section>

            {/* Section 2: The Network */}
            <section style={{ height: '200vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: '2rem', paddingLeft: '8rem' }}>
                <div className="max-w-xl bg-black/50 backdrop-blur-md p-8 rounded-2xl border border-white/10 sticky top-1/2 -translate-y-1/2">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        Global Coverage
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Our constellation of 50+ satellites ensures continuous coverage of the entire lunar surface, including the dark side of the moon.
                    </p>
                    <ul className="mt-6 space-y-2 text-gray-400">
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                            Polar & Equatorial Orbits
                        </li>
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                            Sub-meter Accuracy
                        </li>
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                            24/7 Availability
                        </li>
                    </ul>
                </div>
            </section>

            {/* Section 3: The Cluster */}
            <section style={{ height: '200vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', padding: '2rem', paddingRight: '8rem' }}>
                <div className="max-w-xl bg-black/50 backdrop-blur-md p-8 rounded-2xl border border-white/10 text-right sticky top-1/2 -translate-y-1/2">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        Precision Clusters
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        High-density satellite clusters provide redundant signals for critical mission operations, ensuring safety for astronauts and autonomous rovers.
                    </p>
                    <button className="mt-8 px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors pointer-events-auto">
                        View Technical Proposal
                    </button>
                </div>
            </section>

            {/* Spacer for final scroll */}
            <section style={{ height: '100vh' }}></section>
        </div>
    );
}
