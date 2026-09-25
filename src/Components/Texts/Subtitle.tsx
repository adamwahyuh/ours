interface subtitleProps{
    text : string
}
export default function Subtitle({text} : subtitleProps){
    return(
        <p className="max-w-lg text-sm sm:text-base font-serif italic text-[#fdf0d5]/90 font-normal leading-relaxed tracking-wide">
            {text}
        </p>
    )
}