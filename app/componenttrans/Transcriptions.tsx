import { useEffect, useState } from "react";
import {
    TranscriptionSegment,
    Participant,
    TrackPublication,
    RoomEvent,
} from "livekit-client";
import { useMaybeRoomContext } from "@livekit/components-react";

export default function Transcriptions() {
    const room = useMaybeRoomContext();
    const [transcriptions, setTranscriptions] = useState<{ [id: string]: TranscriptionSegment }>({});

    useEffect(() => {
        if (!room) {
            return;
        }

        const updateTranscriptions = (
            segments: TranscriptionSegment[],
            participant?: Participant,
            publication?: TrackPublication
        ) => {
            setTranscriptions((prev) => {
                const newTranscriptions = { ...prev };
                for (const segment of segments) {
                    newTranscriptions[segment.id] = segment;
                }
                return newTranscriptions;
            });
        };

        room.on(RoomEvent.TranscriptionReceived, updateTranscriptions);
        return () => {
            room.off(RoomEvent.TranscriptionReceived, updateTranscriptions);
        };
    }, [room]);

    return (
        <ul>
            {Object.values(transcriptions)
                .sort((a, b) => a.firstReceivedTime - b.firstReceivedTime)
                .map((segment) => (
                    <li key={segment.id}>{segment.text}</li>
                ))}
        </ul>
    )
}