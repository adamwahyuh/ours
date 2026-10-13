import { useRef } from "react";

import Devider from "../../Components/Devider/Devider";
import WaveformPlayer from "../../Components/Music/WaveformPlayer";
import Subtitle from "../../Components/Texts/Subtitle";
import Title from "../../Components/Texts/Title";

interface MusicSectionProps {
    data: any;
}

export default function MusicSection({data}: MusicSectionProps) {
    const currentAudioRef = useRef<HTMLAudioElement | null>(null);

    const handlePlay = (audio: HTMLAudioElement) => {
        if (
            currentAudioRef.current &&
            currentAudioRef.current !== audio
        ) {
            currentAudioRef.current.pause();
            currentAudioRef.current.currentTime = 0;
        }

        currentAudioRef.current = audio;
    };

    return (
        <div className="flex w-full max-w-2xl flex-col items-center justify-center px-4 py-16">
            <Title text={data.title} />
            <div className="mt-2">
                <Subtitle text={data.subtitle} />
            </div>

            <Devider />

            <div className="flex w-full flex-col gap-4">
                {data.musics.map((music : any, idx : number) => (
                    <WaveformPlayer
                        key={idx}
                        audioSrc={music.source}
                        title={music.title}
                        onPlay={handlePlay}
                    />
                ))}
            </div>
        </div>
    );
}
