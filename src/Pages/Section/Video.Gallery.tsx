import Devider from "../../Components/Devider/Devider";
import Subtitle from "../../Components/Texts/Subtitle";
import Title from "../../Components/Texts/Title";
import VideoViewer from "../../Components/Video/VideoViewer";

interface props{
    data : any
}
export default function VideoSection({data} : props){
    return(
        <div className="flex w-full flex-col justify-center items-center py-16">
            <Title text={data.title} />
            <Subtitle text={data.subtitle} />
            <Devider />

            <VideoViewer src={data.video.source} caption={data.video.caption} subCaption={data.video.subcaption} />
        </div>
    )
}
