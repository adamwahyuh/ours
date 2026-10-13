function Polaroid({
    path = '',
    alt = 'Polaroid',
    caption = 'Memories',
}) {
    path = "/ours" + path
    return (
        <figure className="relative w-fit bg-paper p-2 pb-10 sm:p-3 sm:pb-14 md:p-4 md:pb-16 rounded-[3px] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.65)] transition-shadow duration-500 hover:shadow-[0_30px_60px_-12px_rgba(168,56,90,0.55)]">

            <img
                className="block aspect-[4/5] w-24 sm:w-40 md:w-52 object-cover bg-petal/30 saturate-[1.05] sepia-[0.12]"
                src={path}
                alt={alt}
                loading="lazy"
            />
            {/* Warm glow wash over the photo */}
            <span className="pointer-events-none absolute inset-x-2 top-2 sm:inset-x-3 sm:top-3 md:inset-x-4 md:top-4 aspect-[4/5] bg-gradient-to-tr from-rosewood/15 via-transparent to-gold/15 mix-blend-soft-light" />

            <figcaption className="absolute inset-x-0 bottom-1 sm:bottom-2 md:bottom-3 text-center font-windsong text-xl sm:text-2xl md:text-3xl text-wine-800">
                {caption}
            </figcaption>
        </figure>
    );
}

export default Polaroid;
