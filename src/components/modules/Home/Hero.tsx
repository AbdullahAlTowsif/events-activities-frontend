"use client";

import { useState, useEffect } from 'react';
import { Search, Users, Calendar, MapPin, ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');
    const [typedText, setTypedText] = useState('');
    const [charIndex, setCharIndex] = useState(0);
    const [rotatingCategory, setRotatingCategory] = useState(0);

    const categories = ['All', 'Music', 'Sports', 'Gaming', 'Food', 'Outdoor', 'Tech', 'Art'];

    const activities = [
        'a concert',
        'a hiking trip',
        'board game night',
        'a tech meetup',
        'a yoga class',
        'a cooking workshop'
    ];

    const rotatingCategories = ['Concerts', 'Sports Events', 'Hiking Trips', 'Gaming Nights', 'Art Shows', 'Tech Meetups'];

    // Rotating category effect
    useEffect(() => {
        const interval = setInterval(() => {
            setRotatingCategory((prev) => (prev + 1) % rotatingCategories.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    // Typing animation effect
    useEffect(() => {
        if (charIndex < activities.length) {
            const currentActivity = activities[charIndex];
            let i = 0;
            setTypedText('');

            const typingInterval = setInterval(() => {
                if (i <= currentActivity.length) {
                    setTypedText(currentActivity.substring(0, i));
                    i++;
                } else {
                    clearInterval(typingInterval);
                    setTimeout(() => {
                        setCharIndex((prev) => (prev + 1) % activities.length);
                    }, 2000);
                }
            }, 100);

            return () => clearInterval(typingInterval);
        }
    }, [charIndex]);

    const handleSearch = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery, 'in', location);
    };

    const floatingIcons = [
        { Icon: Calendar, delay: '0s', duration: '3s', top: '15%', left: '10%' },
        { Icon: Users, delay: '0.5s', duration: '3.5s', top: '25%', right: '15%' },
        { Icon: MapPin, delay: '1s', duration: '4s', top: '70%', left: '12%' },
        { Icon: Sparkles, delay: '1.5s', duration: '3.2s', top: '80%', right: '10%' }
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Animated Background Blobs */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '2s' }}></div>

                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px),
                                         linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}></div>
                </div>
            </div>

            {/* Floating Icons */}
            {floatingIcons.map((item, idx) => {
                const Icon = item.Icon;
                return (
                    <div
                        key={idx}
                        className="absolute opacity-10 z-0"
                        style={{
                            top: item.top,
                            left: item.left,
                            right: item.right,
                            animation: `float ${item.duration} ease-in-out infinite`,
                            animationDelay: item.delay
                        }}
                    >
                        <Icon className="w-16 h-16 text-blue-400" />
                    </div>
                );
            })}

            {/* Main Content - Centered */}
            <div className="container mx-auto px-4 py-12 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-full shadow-lg mb-8">
                        <Sparkles className="w-4 h-4 text-white" />
                        <span className="text-sm font-medium text-white">Connect Through Shared Experiences</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight text-slate-900 mb-6">
                        <span className="block mb-2">Never Miss Out on</span>
                        <span className="relative inline-block">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all duration-500">
                                {rotatingCategories[rotatingCategory]}
                            </span>
                            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 transform origin-left transition-transform duration-500"></span>
                        </span>
                    </h1>

                    {/* Description with typing animation */}
                    <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto">
                        Find companions for
                        <span className="inline-block min-w-[250px] ml-2 font-semibold text-indigo-600">
                            {typedText}
                            <span className="inline-block w-1 h-6 ml-1 bg-indigo-500 animate-pulse"></span>
                        </span>
                        <br />
                        Connect with like-minded people and turn interests into shared memories.
                    </p>

                    {/* Search Section */}
                    <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 mb-10 border border-slate-200">
                        <form onSubmit={handleSearch} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="What activity are you looking for?"
                                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                                    />
                                </div>

                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="City or area"
                                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                                    />
                                </div>
                            </div>

                            {/* Category Filters */}
                            <div className="flex flex-wrap gap-2 justify-center">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() => {/* Handle category click */ }}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${category === 'All'
                                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl'
                                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:scale-105 border border-slate-200'}`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold text-lg px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    <Search size={22} />
                                    Find Activities
                                    <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={22} />
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-10 mb-10">
                        {[
                            { label: 'Active Members', value: '10K+', Icon: Users, color: 'text-blue-500' },
                            { label: 'Monthly Events', value: '500+', Icon: Calendar, color: 'text-indigo-500' },
                            { label: 'Cities Covered', value: '50+', Icon: MapPin, color: 'text-purple-500' }
                        ].map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <stat.Icon className={`w-6 h-6 ${stat.color}`} />
                                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                                        {stat.value}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-600">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50">
                            <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                                Explore Events
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>

                        <button className="px-8 py-4 bg-white border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-blue-400 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">
                            Create an Event
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0 z-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path
                        d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
                        className="fill-white"
                    />
                </svg>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
        </section>
    );
}






// "use client";

// import { useState, useEffect } from 'react';
// import { Search, Users, Calendar, MapPin, ArrowRight, Sparkles } from 'lucide-react';

// export default function EnhancedHero() {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [location, setLocation] = useState('');
//     const [typedText, setTypedText] = useState('');
//     const [charIndex, setCharIndex] = useState(0);
//     const [rotatingCategory, setRotatingCategory] = useState(0);

//     const categories = ['All', 'Music', 'Sports', 'Gaming', 'Food', 'Outdoor', 'Tech', 'Art'];

//     const activities = [
//         'a concert',
//         'a hiking trip',
//         'board game night',
//         'a tech meetup',
//         'a yoga class',
//         'a cooking workshop'
//     ];

//     const rotatingCategories = ['Concerts', 'Sports Events', 'Hiking Trips', 'Gaming Nights', 'Art Shows', 'Tech Meetups'];

//     // Rotating category effect
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setRotatingCategory((prev) => (prev + 1) % rotatingCategories.length);
//         }, 2500);
//         return () => clearInterval(interval);
//     }, []);

//     // Typing animation effect
//     useEffect(() => {
//         if (charIndex < activities.length) {
//             const currentActivity = activities[charIndex];
//             let i = 0;
//             setTypedText('');

//             const typingInterval = setInterval(() => {
//                 if (i <= currentActivity.length) {
//                     setTypedText(currentActivity.substring(0, i));
//                     i++;
//                 } else {
//                     clearInterval(typingInterval);
//                     setTimeout(() => {
//                         setCharIndex((prev) => (prev + 1) % activities.length);
//                     }, 2000);
//                 }
//             }, 100);

//             return () => clearInterval(typingInterval);
//         }
//     }, [charIndex]);

//     const handleSearch = (e: { preventDefault: () => void; }) => {
//         e.preventDefault();
//         console.log('Searching for:', searchQuery, 'in', location);
//     };

//     const floatingIcons = [
//         { Icon: Calendar, delay: '0s', duration: '3s', top: '15%', left: '10%' },
//         { Icon: Users, delay: '0.5s', duration: '3.5s', top: '25%', right: '15%' },
//         { Icon: MapPin, delay: '1s', duration: '4s', top: '70%', left: '12%' },
//         { Icon: Sparkles, delay: '1.5s', duration: '3.2s', top: '80%', right: '10%' }
//     ];

//     return (
//         <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
//             {/* Animated Background Blobs */}
//             <div className="absolute inset-0 z-0">
//                 <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
//                 <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
//                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
//             </div>

//             {/* Floating Icons */}
//             {floatingIcons.map((item, idx) => {
//                 const Icon = item.Icon;
//                 return (
//                     <div
//                         key={idx}
//                         className="absolute opacity-10 z-0"
//                         style={{
//                             top: item.top,
//                             left: item.left,
//                             right: item.right,
//                             animation: `float ${item.duration} ease-in-out infinite`,
//                             animationDelay: item.delay
//                         }}
//                     >
//                         <Icon className="w-16 h-16 text-white" />
//                     </div>
//                 );
//             })}

//             {/* Main Content - Centered */}
//             <div className="container mx-auto px-4 py-12 relative z-10">
//                 <div className="max-w-4xl mx-auto text-center">
//                     {/* Badge */}
//                     <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-8">
//                         <Sparkles className="w-4 h-4 text-yellow-300" />
//                         <span className="text-sm font-medium">Connect Through Shared Experiences</span>
//                     </div>

//                     {/* Main Headline */}
//                     <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white mb-6">
//                         <span className="block mb-2">Never Miss Out on</span>
//                         <span className="relative inline-block">
//                             <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 transition-all duration-500">
//                                 {rotatingCategories[rotatingCategory]}
//                             </span>
//                             <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 transform origin-left transition-transform duration-500"></span>
//                         </span>
//                     </h1>

//                     {/* Description with typing animation */}
//                     <p className="text-xl text-gray-200 leading-relaxed mb-10 max-w-2xl mx-auto">
//                         Find companions for
//                         <span className="inline-block min-w-[250px] ml-2 font-semibold text-pink-300">
//                             {typedText}
//                             <span className="inline-block w-1 h-6 ml-1 bg-pink-400 animate-pulse"></span>
//                         </span>
//                         <br />
//                         Connect with like-minded people and turn interests into shared memories.
//                     </p>

//                     {/* Search Section */}
//                     <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 mb-10 border border-white/20">
//                         <form onSubmit={handleSearch} className="space-y-6">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div className="relative">
//                                     <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                                     <input
//                                         type="text"
//                                         value={searchQuery}
//                                         onChange={(e) => setSearchQuery(e.target.value)}
//                                         placeholder="What activity are you looking for?"
//                                         className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
//                                     />
//                                 </div>

//                                 <div className="relative">
//                                     <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                                     <input
//                                         type="text"
//                                         value={location}
//                                         onChange={(e) => setLocation(e.target.value)}
//                                         placeholder="City or area"
//                                         className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Category Filters */}
//                             <div className="flex flex-wrap gap-2 justify-center">
//                                 {categories.map((category) => (
//                                     <button
//                                         key={category}
//                                         type="button"
//                                         onClick={() => {/* Handle category click */}}
//                                         className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${category === 'All'
//                                             ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
//                                             : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20'}`}
//                                     >
//                                         {category}
//                                     </button>
//                                 ))}
//                             </div>

//                             <div className="flex justify-center">
//                                 <button
//                                     type="submit"
//                                     className="group inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold text-lg px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
//                                 >
//                                     <Search size={22} />
//                                     Find Activities
//                                     <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={22} />
//                                 </button>
//                             </div>
//                         </form>
//                     </div>

//                     {/* Stats */}
//                     <div className="flex flex-wrap justify-center gap-10 mb-10">
//                         {[
//                             { label: 'Active Members', value: '10K+', Icon: Users, color: 'text-pink-400' },
//                             { label: 'Monthly Events', value: '500+', Icon: Calendar, color: 'text-purple-400' },
//                             { label: 'Cities Covered', value: '50+', Icon: MapPin, color: 'text-indigo-400' }
//                         ].map((stat, idx) => (
//                             <div key={idx} className="text-center">
//                                 <div className="flex items-center justify-center gap-2 mb-2">
//                                     <stat.Icon className={`w-6 h-6 ${stat.color}`} />
//                                     <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">
//                                         {stat.value}
//                                     </span>
//                                 </div>
//                                 <p className="text-sm text-gray-300">{stat.label}</p>
//                             </div>
//                         ))}
//                     </div>

//                     {/* CTA Buttons */}
//                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                         <button className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
//                             <span className="relative z-10 flex items-center justify-center gap-2 text-white">
//                                 Explore Events
//                                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                             </span>
//                         </button>

//                         <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-full font-semibold text-lg text-white hover:bg-white/20 transition-all duration-300 hover:scale-105">
//                             Create an Event
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Bottom Wave */}
//             <div className="absolute bottom-0 left-0 right-0 z-0">
//                 <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
//                     <path
//                         d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
//                         fill="white"
//                         fillOpacity="0.1"
//                     />
//                 </svg>
//             </div>

//             {/* CSS Animations */}
//             <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-20px); }
//         }
//       `}</style>
//         </section>
//     );
// }
