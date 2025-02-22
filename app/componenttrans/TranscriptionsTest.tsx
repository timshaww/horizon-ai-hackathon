// app/components/TranscriptionsTest.tsx
import { useEffect } from 'react';
import { useMaybeRoomContext } from '@livekit/components-react';
import { RoomEvent, TranscriptionSegment } from 'livekit-client';

export default function TranscriptionsTest() {
    const room = useMaybeRoomContext();

    useEffect(() => {
        if (!room) {
            return;
        }

        // Mock transcription event
        const mockTranscription = () => {
            let now = Date.now();
            const mockSegment: TranscriptionSegment = {
                language: 'en-US',
                startTime: now - 2000,
                endTime: now,
                final: true,
                lastReceivedTime: now,
                id: '1',
                text: 'This is a test transcription.',
                firstReceivedTime: now - 2000,
            };
            console.log("Emitting transcription event: ", mockSegment);
            room.emit(RoomEvent.TranscriptionReceived, [mockSegment]);
        };

        // Trigger the mock transcription event after 2 seconds
        const timer = setTimeout(mockTranscription, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, [room]);

    return null;
}