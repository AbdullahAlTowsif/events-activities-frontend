"use client";

import { AlertCircle, Trash2 } from 'lucide-react';
import { IEvent } from '@/types/event.interface';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { format } from 'date-fns';

interface DeleteEventDialogProps {
    event: IEvent;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => Promise<void>;
}

export default function DeleteEventDialog({ event, open, onOpenChange, onConfirm }: DeleteEventDialogProps) {
    const formatDate = (dateString: string) => {
        return format(new Date(dateString), 'MMM dd, yyyy h:mm a');
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-red-600">
                        <Trash2 className="w-5 h-5" />
                        Delete Event
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this event? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            All event data, including participant information and payments, will be permanently removed.
                        </AlertDescription>
                    </Alert>

                    <div className="bg-slate-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 mb-2">Event Details</h4>
                        <div className="space-y-2 text-sm text-slate-600">
                            <p><span className="font-medium">Title:</span> {event.title}</p>
                            <p><span className="font-medium">Date:</span> {formatDate(event.dateTime)}</p>
                            <p><span className="font-medium">Location:</span> {event.location}</p>
                            <p><span className="font-medium">Type:</span> {event.type}</p>
                            <p><span className="font-medium">Status:</span> {event.status}</p>
                            <p><span className="font-medium">Participants:</span> {
                                event.participants?.filter(p => p.status === 'ACCEPTED').length || 0
                            } confirmed</p>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Event
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
