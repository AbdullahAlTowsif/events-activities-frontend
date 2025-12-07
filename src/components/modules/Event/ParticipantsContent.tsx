// "use client";

// import { useEffect, useState } from 'react';
// import { Users, User, Calendar } from 'lucide-react';
// import { getParticipants } from '@/services/event/event.service';
// import { IEvent } from '@/types/event.interface';
// import Image from 'next/image';
// import { IParticipant } from '@/types/participant.interface';

// // interface Participant {
// //     id: string;
// //     name: string;
// //     email: string;
// //     profilePhoto?: string;
// //     joinedAt: string;
// // }

// interface ParticipantsContentProps {
//     eventId: string;
//     event: IEvent;
// }

// export default function ParticipantsContent({ eventId, event }: ParticipantsContentProps) {
//     const [participants, setParticipants] = useState<IParticipant[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchParticipants();
//     }, [eventId]);

//     const fetchParticipants = async () => {
//         setLoading(true);
//         try {
//             const result = await getParticipants(eventId);
//             console.log("result from participants", result);
//             if (result.success) {
//                 setParticipants(result.data || []);
//             }
//         } catch (error) {
//             console.error('Error fetching participants:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
//                 <div className="flex items-center justify-center py-8">
//                     <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
//             <div className="flex items-center gap-3 mb-6">
//                 <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                     <Users className="w-5 h-5 text-blue-600" />
//                 </div>
//                 <div>
//                     <h3 className="text-xl font-bold text-slate-900">Event Participants</h3>
//                     <p className="text-slate-600">
//                         {participants.length} {participants.length === 1 ? 'person' : 'people'} joined this event
//                     </p>
//                 </div>
//             </div>

//             {participants.length === 0 ? (
//                 <div className="text-center py-8">
//                     <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
//                         <User className="w-8 h-8 text-slate-400" />
//                     </div>
//                     <h4 className="text-lg font-semibold text-slate-700 mb-2">No participants yet</h4>
//                     <p className="text-slate-500">Be the first to join this exciting event!</p>
//                 </div>
//             ) : (
//                 <div className="space-y-4">
//                     {participants.map((participant) => (
//                         <div
//                             key={participant.id}
//                             className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
//                         >
//                             <div className="flex items-center gap-3">
//                                 <div className="relative">
//                                     {participant.profilePhoto ? (
//                                         <Image
//                                             src={participant.profilePhoto}
//                                             alt={participant.name}
//                                             className="w-12 h-12 rounded-full object-cover"
//                                         />
//                                     ) : (
//                                         <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
//                                             <span className="text-white font-bold">
//                                                 {participant.name}
//                                             </span>
//                                         </div>
//                                     )}
//                                 </div>
//                                 <div>
//                                     <h4 className="font-semibold text-slate-900">{participant.name}</h4>
//                                     <p className="text-sm text-slate-500">{participant.userEmail}</p>
//                                 </div>
//                             </div>

//                             <div className="flex items-center gap-2 text-sm text-slate-500">
//                                 <Calendar className="w-4 h-4" />
//                                 <span>
//                                     Joined {new Date(participant.joinedAt).toLocaleDateString()}
//                                 </span>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {/* Participant Stats */}
//             <div className="mt-6 pt-6 border-t border-slate-200">
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     <div className="text-center">
//                         <div className="text-2xl font-bold text-slate-900">{participants.length}</div>
//                         <div className="text-sm text-slate-500">Total Joined</div>
//                     </div>
//                     <div className="text-center">
//                         <div className="text-2xl font-bold text-slate-900">
//                             {event.maxParticipants ? event.maxParticipants - participants.length : '∞'}
//                         </div>
//                         <div className="text-sm text-slate-500">Spots Left</div>
//                     </div>
//                     <div className="text-center">
//                         <div className="text-2xl font-bold text-slate-900">
//                             {event.minParticipants || 0}
//                         </div>
//                         <div className="text-sm text-slate-500">Minimum Required</div>
//                     </div>
//                     <div className="text-center">
//                         <div className="text-2xl font-bold text-slate-900">
//                             {event.maxParticipants || '∞'}
//                         </div>
//                         <div className="text-sm text-slate-500">Maximum Allowed</div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }




"use client";

import { useEffect, useState } from 'react';
import { Users, User, Calendar, CheckCircle, XCircle, Clock, LogOut } from 'lucide-react';
import { getParticipants } from '@/services/event/event.service';
import { IEvent } from '@/types/event.interface';
import Image from 'next/image';
import { IParticipant } from '@/types/participant.interface';

// Define the union type directly if you don't want to modify your enum interface
type JoinStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'LEFT';

interface ParticipantWithUser extends IParticipant {
    user?: {
        name: string;
        profilePhoto?: string;
        email: string;
    };
}

interface ParticipantsContentProps {
    eventId: string;
    event: IEvent;
}

export default function ParticipantsContent({ eventId, event }: ParticipantsContentProps) {
    const [participants, setParticipants] = useState<ParticipantWithUser[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchParticipants();
    }, [eventId]);

    const fetchParticipants = async () => {
        setLoading(true);
        try {
            const result = await getParticipants(eventId);
            console.log("Participants result:", result);
            if (result.success) {
                setParticipants(result.data || []);
            }
        } catch (error) {
            console.error('Error fetching participants:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status: string, paid: boolean) => {
        // Cast to our JoinStatus type
        const joinStatus = status as JoinStatus;

        switch (joinStatus) {
            case 'ACCEPTED':
                return (
                    <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Accepted
                    </span>
                );
            case 'PENDING':
                return (
                    <span className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                        <Clock className="w-3 h-3" />
                        Pending
                    </span>
                );
            case 'REJECTED':
                return (
                    <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                        <XCircle className="w-3 h-3" />
                        Rejected
                    </span>
                );
            case 'LEFT':
                return (
                    <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                        <LogOut className="w-3 h-3" />
                        Left
                    </span>
                );
            default:
                return (
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                        {status}
                    </span>
                );
        }
    };

    const getPaymentBadge = (paid: boolean) => {
        return paid ? (
            <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                Paid
            </span>
        ) : (
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                Unpaid
            </span>
        );
    };

    // Helper function to check status
    const checkStatus = (participant: ParticipantWithUser, status: JoinStatus): boolean => {
        return participant.status === status;
    };

    // Filter participants
    const activeParticipants = participants.filter(p => !checkStatus(p, 'LEFT'));
    const confirmedParticipants = participants.filter(p => checkStatus(p, 'ACCEPTED'));
    const pendingParticipants = participants.filter(p => checkStatus(p, 'PENDING'));
    const leftParticipants = participants.filter(p => checkStatus(p, 'LEFT'));

    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
                <div className="flex items-center justify-center py-8">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900">Event Participants</h3>
                    <p className="text-slate-600">
                        {activeParticipants.length} {activeParticipants.length === 1 ? 'person' : 'people'} joined this event
                        {leftParticipants.length > 0 && (
                            <span className="text-slate-400 ml-2">
                                ({leftParticipants.length} left)
                            </span>
                        )}
                    </p>
                </div>
            </div>

            {activeParticipants.length === 0 ? (
                <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-slate-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-700 mb-2">No active participants</h4>
                    <p className="text-slate-500">Be the first to join this exciting event!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {participants.map((participant) => {
                        const isLeft = checkStatus(participant, 'LEFT');
                        return (
                            <div
                                key={participant.id}
                                className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl transition-colors gap-4 ${isLeft
                                        ? 'bg-gray-50 opacity-70'
                                        : 'bg-slate-50 hover:bg-slate-100'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        {participant.user?.profilePhoto ? (
                                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                                <Image
                                                    src={participant.user.profilePhoto}
                                                    alt={participant.user.name || 'Participant'}
                                                    width={48}
                                                    height={48}
                                                    className="object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isLeft
                                                    ? 'bg-gradient-to-r from-gray-400 to-gray-500'
                                                    : 'bg-gradient-to-r from-blue-500 to-purple-500'
                                                }`}>
                                                <span className="text-white font-bold">
                                                    {participant.user?.name?.charAt(0)?.toUpperCase() ||
                                                        participant.userEmail?.charAt(0)?.toUpperCase() || 'U'}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className={`font-semibold ${isLeft ? 'text-gray-600' : 'text-slate-900'
                                            }`}>
                                            {participant.user?.name || 'Anonymous User'}
                                            {isLeft && ' (Left)'}
                                        </h4>
                                        <p className={`text-sm ${isLeft ? 'text-gray-400' : 'text-slate-500'
                                            }`}>
                                            {participant.userEmail}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col md:items-end gap-2">
                                    <div className="flex items-center gap-2">
                                        {getStatusBadge(participant.status, participant.paid)}
                                        {event.joiningFee && !isLeft && getPaymentBadge(participant.paid)}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <Calendar className="w-4 h-4" />
                                        <span>
                                            {isLeft ? 'Left on ' : 'Joined on '}
                                            {new Date(participant.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Participant Stats */}
            <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900">
                            {confirmedParticipants.length}
                        </div>
                        <div className="text-sm text-slate-500">Confirmed</div>
                        <div className="text-xs text-slate-400">
                            ({confirmedParticipants.filter(p => p.paid).length} paid)
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900">
                            {pendingParticipants.length}
                        </div>
                        <div className="text-sm text-slate-500">Pending</div>
                        <div className="text-xs text-slate-400">
                            Awaiting host approval
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900">
                            {leftParticipants.length}
                        </div>
                        <div className="text-sm text-slate-500">Left</div>
                        <div className="text-xs text-slate-400">
                            No longer attending
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900">
                            {event.maxParticipants
                                ? event.maxParticipants - confirmedParticipants.length
                                : '∞'
                            }
                        </div>
                        <div className="text-sm text-slate-500">Spots Left</div>
                        <div className="text-xs text-slate-400">
                            For new participants
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Stats */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-lg font-bold text-slate-900">
                        {event.minParticipants || 0}
                    </div>
                    <div className="text-sm text-slate-500">Min Required</div>
                    <div className="text-xs text-slate-400 mt-1">
                        {confirmedParticipants.length >= (event.minParticipants || 0)
                            ? '✓ Minimum reached'
                            : `${(event.minParticipants || 0) - confirmedParticipants.length} more needed`
                        }
                    </div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <div className="text-lg font-bold text-slate-900">
                        {event.maxParticipants || '∞'}
                    </div>
                    <div className="text-sm text-slate-500">Max Allowed</div>
                    <div className="text-xs text-slate-400 mt-1">
                        {event.maxParticipants && confirmedParticipants.length >= event.maxParticipants
                            ? '✓ Event is full'
                            : event.maxParticipants
                                ? `${event.maxParticipants - confirmedParticipants.length} spots available`
                                : 'No limit'
                        }
                    </div>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-xl">
                    <div className="text-lg font-bold text-slate-900">
                        {confirmedParticipants.filter(p => p.paid).length}
                    </div>
                    <div className="text-sm text-slate-500">Paid Participants</div>
                    <div className="text-xs text-slate-400 mt-1">
                        {event.joiningFee
                            ? `$${confirmedParticipants.filter(p => p.paid).length * (event.joiningFee || 0)} collected`
                            : 'Free event'
                        }
                    </div>
                </div>
            </div>

            {/* Status Legend */}
            <div className="mt-6 pt-6 border-t border-slate-200">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Status Legend</h4>
                <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-100 border border-green-300 rounded-full"></div>
                        <span className="text-sm text-slate-600">Accepted - Confirmed participant</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-amber-100 border border-amber-300 rounded-full"></div>
                        <span className="text-sm text-slate-600">Pending - Awaiting approval</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-100 border border-red-300 rounded-full"></div>
                        <span className="text-sm text-slate-600">Rejected - Application declined</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded-full"></div>
                        <span className="text-sm text-slate-600">Left - Participant left event</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
