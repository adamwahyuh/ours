import Devider from "../../Components/Devider/Devider";
import WaveformPlayer from "../../Components/Music/WaveformPlayer";
import Subtitle from "../../Components/Texts/Subtitle";
import Title from "../../Components/Texts/Title";

interface musicSectionProps{
    data : any
}

export default function MusicSection ({data} : musicSectionProps){
    return(
        <div className="flex max-w-3xl flex-col items-center justify-center">
            <Title text={data.title} />
            <div className="mt-4">
                <Subtitle text={data.subtitle} />
            </div>
            <Devider />
            <WaveformPlayer audioSrc={data.music.source} title={data.music.title} />
        </div>
    )
}