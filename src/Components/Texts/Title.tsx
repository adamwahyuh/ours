function Title ({text = "Your Title Text"}){
    return (
        <h1 className="text-romance text-center font-windsong font-medium text-5xl sm:text-7xl leading-[1.3] px-2 drop-shadow-[0_0_24px_rgba(242,184,198,0.35)]">
            {text}
        </h1>
    )
}

export default Title
