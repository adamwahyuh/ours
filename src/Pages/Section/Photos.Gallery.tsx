import Devider from "../../Components/Devider/Devider";
import PhotoWithModal from "../../Components/Photo/PhotoWithModal";
import Subtitle from "../../Components/Texts/Subtitle";
import Title from "../../Components/Texts/Title";

interface photosGalleryProps {
    data : any
}

// Scattered-on-a-table tilt for each polaroid
const tilts = [-4, 3, -2, 5, -3, 2]

export default function PhotosGallerySection({data} : photosGalleryProps) {

    return (
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-16">
            <div className="flex flex-col items-center justify-center gap-2">
                <Title text={data.title} />
                <Subtitle text={data.subtitle} />
            </div>
            <Devider />
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6 sm:gap-x-7 sm:gap-y-8">
                {data.photos.map((photo : any, idx : number) => (
                    <PhotoWithModal
                        key={idx}
                        src={photo.source}
                        alt={photo.message.header.right}
                        labelLeft={photo.message.header.left}
                        labelRight={photo.message.header.right}
                        signature={{ name : photo.message.footer.right.up, note : photo.message.footer.right.down}}
                        rotation={tilts[idx % tilts.length]}
                        thumbnailClassName="w-full aspect-square"
                    >
                        <h3 className="mb-3 font-windsong text-4xl text-rosewood leading-snug">
                            {photo.message.body.title}
                        </h3>
                        {photo.message.body.messages.map((msg : string, i : number) => (
                            <p key={i} className={i > 0 ? "mt-4" : ""}>
                                {msg}
                            </p>
                        ))}
                    </PhotoWithModal>
                ))}
            </div>
        </div>
    )
}
