import Devider from "../../Components/Devider/Devider";
import Subtitle from "../../Components/Texts/Subtitle";
import Title from "../../Components/Texts/Title";
import VideoViewer from "../../Components/Video/VideoViewer";

interface props{
    data : any
}
export default function VideoSection({data} : props){
    return(
        <div className="flex flex-col justify-center items-center">
            <Title text={data.title} />
            <Subtitle text={data.subtitle} />
            <Devider />

            <VideoViewer src={data.video.source} caption={data.video.caption} subCaption={data.video.subcaption} />
        </div>
    )
}