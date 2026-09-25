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
        <div className="flex max-w-3xl flex-col items-center justify-center">
        <Title text={data.title} />

        <div className="mt-4">
            <Subtitle text={data.subtitle} />
        </div>

        <Devider />

        {data.musics.map((music : any, idx : number) => {
            return(
                <WaveformPlayer
                    key={idx}
                    audioSrc={music.source}
                    title={music.title}
                    onPlay={handlePlay}
                />
            )
        })}
        </div>
    );
}