interface subtitleProps{
    text : string
}
export default function Subtitle({text} : subtitleProps){
    return(
        <p className="max-w-lg px-4 text-center text-lg sm:text-xl font-serif italic text-champagne/85 font-normal leading-relaxed tracking-wide">
            {text}
        </p>
    )
}
