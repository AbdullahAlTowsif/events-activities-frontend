// "use client";

// import { IEvent } from '@/types/event.interface';
// import { IHost } from '@/types/host.interface';
// import { User, Mail, MapPin, Star, Calendar, Users, Phone } from 'lucide-react';
// import Image from 'next/image';


// interface HostProfileProps {
//     host: IHost;
//     event: IEvent;
// }

// export default function HostProfile({ host, event }: HostProfileProps) {
//     return (
//         <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 sticky top-6">
//             <div className="text-center mb-6">
//                 <div className="relative inline-block mb-4">
//                     {host.profilePhoto ? (
//                         <Image
//                             src={host.profilePhoto}
//                             alt={host.name}
//                             width={24}
//                             height={24}
//                             className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
//                         />
//                     ) : (
//                         <div className="w-24 h-24 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center border-4 border-white shadow-lg">
//                             <User className="w-12 h-12 text-white" />
//                         </div>
//                     )}
//                     <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
//                         <Users className="w-4 h-4 text-white" />
//                     </div>
//                 </div>

//                 <h3 className="text-xl font-bold text-slate-900 mb-1">{host.name}</h3>
//                 <p className="text-slate-600 text-sm">Event Host</p>
//             </div>

//             {/* Host Rating */}
//             {host.reviews?.rating && (
//                 <div className="flex items-center justify-center gap-2 mb-6">
//                     <div className="flex">
//                         {[...Array(5)].map((_, i) => (
//                             <Star
//                                 key={i}
//                                 className={`w-5 h-5 ${i < Math.floor(host.reviews.rating)
//                                         ? 'fill-yellow-400 text-yellow-400'
//                                         : 'fill-gray-200 text-gray-200'
//                                     }`}
//                             />
//                         ))}
//                     </div>
//                     <span className="text-slate-700 font-medium">
//                         {host.reviews.rating.toFixed(1)}
//                     </span>
//                 </div>
//             )}

//             {/* Host Details */}
//             <div className="space-y-4 mb-6">
//                 <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                         <Mail className="w-4 h-4 text-blue-600" />
//                     </div>
//                     <div>
//                         <div className="text-sm text-slate-500">Email</div>
//                         <div className="font-medium text-slate-900 truncate">{host.email}</div>
//                     </div>
//                 </div>

//                 {host.contactNumber && (
//                     <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                             <Phone className="w-4 h-4 text-green-600" />
//                         </div>
//                         <div>
//                             <div className="text-sm text-slate-500">Contact</div>
//                             <div className="font-medium text-slate-900">{host.contactNumber}</div>
//                         </div>
//                     </div>
//                 )}

//                 {host.address && (
//                     <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                             <MapPin className="w-4 h-4 text-purple-600" />
//                         </div>
//                         <div>
//                             <div className="text-sm text-slate-500">Address</div>
//                             <div className="font-medium text-slate-900">{host.address}</div>
//                         </div>
//                     </div>
//                 )}

//                 <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                         <Calendar className="w-4 h-4 text-amber-600" />
//                     </div>
//                     <div>
//                         <div className="text-sm text-slate-500">Host Since</div>
//                         <div className="font-medium text-slate-900">
//                             {new Date(event.createdAt).toLocaleDateString()}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Host Bio */}
//             {host.about && (
//                 <div className="mb-6">
//                     <h4 className="font-semibold text-slate-900 mb-2">About the Host</h4>
//                     <p className="text-slate-600 text-sm leading-relaxed">{host.about}</p>
//                 </div>
//             )}

//             {/* Action Buttons */}
//             <div className="space-y-3">
//                 <button className="w-full py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
//                     Message Host
//                 </button>
//                 <button className="w-full py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300">
//                     View All Events
//                 </button>
//             </div>
//         </div>
//     );
// }



"use client";

import { IEvent } from '@/types/event.interface';
import { IHost } from '@/types/host.interface';
import { User, Mail, MapPin, Star, Calendar, Users, Phone } from 'lucide-react';
import Image from 'next/image';


interface HostProfileProps {
    host: IHost;
    event: IEvent;
}

export default function HostProfile({ host, event }: HostProfileProps) {
    // Calculate average rating from reviews array
    const calculateAverageRating = () => {
        if (!host.reviews || host.reviews.length === 0) return 0;
        
        const totalRating = host.reviews.reduce((sum, review) => sum + review.rating, 0);
        return totalRating / host.reviews.length;
    };

    const averageRating = calculateAverageRating();
    const totalReviews = host.reviews?.length || 0;

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 sticky top-6">
            <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                    {host.profilePhoto ? (
                        <Image
                            src={host.profilePhoto}
                            alt={host.name}
                            width={24}
                            height={24}
                            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center border-4 border-white shadow-lg">
                            <User className="w-12 h-12 text-white" />
                        </div>
                    )}
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                    </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-1">{host.name}</h3>
                <p className="text-slate-600 text-sm">Event Host</p>
            </div>

            {/* Host Rating */}
            {totalReviews > 0 && (
                <div className="flex flex-col items-center justify-center gap-2 mb-6">
                    <div className="flex items-center gap-2">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-5 h-5 ${
                                        i < Math.floor(averageRating)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'fill-gray-200 text-gray-200'
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="text-slate-700 font-medium text-lg">
                            {averageRating.toFixed(1)}
                        </span>
                    </div>
                </div>
            )}

            {/* Host Details */}
            <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                        <div className="text-sm text-slate-500">Email</div>
                        <div className="font-medium text-slate-900 truncate">{host.email}</div>
                    </div>
                </div>

                {host.contactNumber && (
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                            <Phone className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                            <div className="text-sm text-slate-500">Contact</div>
                            <div className="font-medium text-slate-900">{host.contactNumber}</div>
                        </div>
                    </div>
                )}

                {host.address && (
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                            <MapPin className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                            <div className="text-sm text-slate-500">Address</div>
                            <div className="font-medium text-slate-900">{host.address}</div>
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                        <div className="text-sm text-slate-500">Host Since</div>
                        <div className="font-medium text-slate-900">
                            {new Date(event.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Host Bio */}
            {host.about && (
                <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 mb-2">About the Host</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{host.about}</p>
                </div>
            )}

            {/* Show message if no reviews yet */}
            {totalReviews === 0 && (
                <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
                    <div className="flex items-center gap-2 text-amber-700">
                        <Star className="w-4 h-4" />
                        <span className="text-sm font-medium">No reviews yet</span>
                    </div>
                    <p className="text-amber-600 text-sm mt-1">
                        Be the first to review this host after attending an event!
                    </p>
                </div>
            )}

            {/* Recent Reviews Preview */}
            {host.reviews && host.reviews.length > 0 && (
                <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 mb-3">Recent Reviews</h4>
                    <div className="space-y-3">
                        {host.reviews.slice(0, 2).map((review) => (
                            <div key={review.id} className="p-3 bg-slate-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3 h-3 ${
                                                    i < review.rating
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'fill-gray-200 text-gray-200'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs text-slate-500">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                {review.comment && (
                                    <p className="text-slate-600 text-sm line-clamp-2">
                                        &quot;{review.comment}&quot;
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
                <button className="w-full py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                    Message Host
                </button>
                <button className="w-full py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300">
                    View All Events
                </button>
            </div>
        </div>
    );
}