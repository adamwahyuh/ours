import Devider from "../../Components/Devider/Devider";
import PhotoWithModal from "../../Components/Photo/PhotoWithModal";
import Subtitle from "../../Components/Texts/Subtitle";
import Title from "../../Components/Texts/Title";

interface photosGalleryProps {
    data : any
}

export default function PhotosGallerySection({data} : photosGalleryProps) {

    return (
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            {/* Grid Container: 2 kolom di Mobile, 3 kolom di Desktop */}
            <div className="flex flex-col items-center justify-center">
                <Title text="Core Memory" />
                <Subtitle text="forever remember as our love" />
            </div>
            <Devider />
            <div className="grid grid-cols-2 md:grid-cols-3">
                {data.photos.map((photo : any, idx : number) => (
                    <PhotoWithModal 
                        key={idx}
                        src={photo.source} 
                        alt={photo.message.header.right}
                        labelLeft={photo.message.header.left}
                        labelRight={photo.message.header.right}
                        signature={{ name : photo.message.footer.right.up, note : photo.message.footer.right.down}}
                        // Override class bawaan agar foto responsif mengikuti grid dan berbentuk kotak presisi
                        thumbnailClassName="w-full aspect-square" 
                    > 
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 tracking-wide uppercase text-[#4a3b2c]">
                            {photo.message.body.title}
                        </h3>
                        <p className="opacity-90">
                            {photo.message.body.messages.map((msg : string, idx : number) => {
                                return (
                                    <p className={`text-base sm:text-lg leading-[32px] text-[#4a3b2c] font-serif ${idx > 0 ? 'mt-4' : ''}`}>
                                                {msg}
                                    </p>
                                )
                            })}
                            <br /><br />
                        </p>
                    </PhotoWithModal>
                ))}
            </div>
        </div>
    )
}