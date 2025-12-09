"use client";

import { useState, useEffect } from 'react';
import { Star, Quote, TrendingUp, Award, Heart } from 'lucide-react';
import { getAllReviews, IReview } from '@/services/review/review.service';
import Image from 'next/image';

export default function TopThreeReviews() {
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await getAllReviews();

                if (response.success && response.data) {
                    const topReviews: IReview[] = [...response.data]
                        .sort((a, b) => b.rating - a.rating)
                        .slice(0, 3);

                    setReviews(topReviews);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <Star className="w-6 h-6 text-blue-600 animate-pulse" />
                        </div>
                    </div>
                    <p className="text-lg font-medium text-slate-600">Loading amazing reviews...</p>
                </div>
            </div>
        );
    }

    if (reviews.length === 0) {
        return null;
    }

    const badges = [
        { icon: Award, label: "Top Rated", color: "from-amber-500 to-orange-500" },
        { icon: TrendingUp, label: "Trending", color: "from-blue-500 to-cyan-500" },
        { icon: Heart, label: "Most Loved", color: "from-rose-500 to-pink-500" }
    ];

    return (
        <section className="py-20 px-4 bg-linear-to-b from-white to-slate-50">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-linear-to-r from-blue-500 to-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <Star size={16} className="animate-pulse" />
                        <span>Trusted by Thousands</span>
                    </div>

                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="text-slate-900">Customer </span>
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">Reviews</span>
                    </h2>

                    <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                        Got questions? We&apos;ve got answers! Find everything you need to know about using our platform. Can&apos;t find what you&apos;re looking for? Contact our support team.
                    </p>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {reviews.map((review, index) => {
                        const Badge = badges[index];
                        const isHovered = hoveredCard === index;

                        return (
                            <div
                                key={review.id}
                                onMouseEnter={() => setHoveredCard(index)}
                                onMouseLeave={() => setHoveredCard(null)}
                                className={`relative bg-white rounded-3xl shadow-xl p-8 border border-slate-100 transition-all duration-500 ${isHovered ? 'transform -translate-y-4 shadow-2xl' : ''
                                    } ${index === 0 ? 'md:scale-105' : ''}`}
                            >
                                {/* Decorative Background Gradient */}
                                <div className={`absolute inset-0 bg-linear-to-br ${Badge.color} opacity-5 rounded-3xl transition-opacity duration-500 ${isHovered ? 'opacity-10' : ''
                                    }`}></div>

                                {/* Badge */}
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <div className={`flex items-center gap-2 bg-linear-to-r ${Badge.color} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg`}>
                                        <Badge.icon size={16} />
                                        <span>{Badge.label}</span>
                                    </div>
                                </div>

                                {/* Ranking Number */}
                                <div className="absolute -top-3 -right-3 w-12 h-12 bg-linear-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white">
                                    #{index + 1}
                                </div>

                                {/* Quote Icon */}
                                <div className={`absolute top-6 left-6 transition-transform duration-500 ${isHovered ? 'scale-110 rotate-6' : ''
                                    }`}>
                                    <div className={`bg-linear-to-br ${Badge.color} opacity-20 rounded-2xl p-4`}>
                                        <Quote className="w-8 h-8 text-slate-900" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative pt-16">
                                    {/* Star Rating */}
                                    <div className="flex items-center justify-center gap-1 mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-7 h-7 transition-all duration-300 ${i < review.rating
                                                        ? 'fill-yellow-400 text-yellow-400 drop-shadow-sm'
                                                        : 'fill-slate-200 text-slate-200'
                                                    } ${isHovered && i < review.rating ? 'scale-110' : ''}`}
                                            />
                                        ))}
                                    </div>

                                    {/* Review Comment */}
                                    <div className="mb-8 min-h-[140px]">
                                        <p className="text-slate-700 text-base leading-relaxed text-center italic">
                                            &quot;{review.comment || 'No comment provided'}&quot;
                                        </p>
                                    </div>

                                    {/* Divider */}
                                    <div className="w-16 h-1 bg-linear-to-r from-transparent via-slate-300 to-transparent mx-auto mb-6"></div>

                                    {/* Reviewer Info */}
                                    <div className="flex flex-col items-center">
                                        <div className={`relative mb-3 transition-transform duration-500 ${isHovered ? 'scale-110' : ''
                                            }`}>
                                            {review.reviewer.profilePhoto ? (
                                                <Image
                                                    src={review.reviewer.profilePhoto}
                                                    alt={review.reviewer.name}
                                                    width={16}
                                                    height={16}
                                                    className={`w-16 h-16 rounded-full object-cover shadow-lg border-2 border-white`}
                                                />
                                            ) : (
                                                <div className={`w-16 h-16 rounded-full bg-linear-to-br ${Badge.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                                                    {review.reviewer.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                            )}
                                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            </div>
                                        </div>

                                        <p className="font-bold text-slate-900 text-lg mb-1">
                                            {review.reviewer.name}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <p className="text-sm text-slate-500 font-medium">Verified Customer</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Decorative Element */}
                                <div className={`absolute bottom-0 right-0 w-32 h-32 bg-linear-to-tl ${Badge.color} opacity-5 rounded-tl-[100px] transition-opacity duration-500 ${isHovered ? 'opacity-10' : ''
                                    }`}></div>
                            </div>
                        );
                    })}
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Reviews', value: '2,500+', color: 'text-blue-600', gradient: 'from-blue-500 to-cyan-500' },
                        { label: 'Average Rating', value: '4.9/5', color: 'text-purple-600', gradient: 'from-purple-500 to-pink-500' },
                        { label: 'Happy Customers', value: '98%', color: 'text-emerald-600', gradient: 'from-emerald-500 to-teal-500' },
                        { label: '5-Star Reviews', value: '2,300+', color: 'text-amber-600', gradient: 'from-amber-500 to-orange-500' }
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl p-6 text-center shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                        >
                            <div className="relative inline-block mb-3">
                                <div className={`absolute inset-0 bg-linear-to-r ${stat.gradient} opacity-10 rounded-lg blur-xl transition-opacity group-hover:opacity-20`}></div>
                                <div className={`relative text-4xl font-bold ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                                    {stat.value}
                                </div>
                            </div>
                            <div className="text-slate-600 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-12 text-center">
                    <div className="inline-block bg-linear-to-r from-blue-600 to-purple-600 rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                            Ready to Join Our Happy Community?
                        </h3>
                        <p className="text-blue-100 mb-6 max-w-2xl">
                            Experience the excellence that thousands of satisfied customers are raving about.
                        </p>
                        <button className="bg-white text-blue-600 font-bold py-4 px-8 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl">
                            Get Started Today
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
