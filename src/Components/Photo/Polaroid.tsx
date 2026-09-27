import React, { useState } from 'react';

function Polaroid({ 
    path = '', 
    alt = 'Polaroid', 
    caption = 'Memories', 
    rotation = 0 
}) {
    const [isHovered, setIsHovered] = useState(false);

    path = "/birthday" + path
    return (
        <div 
            className="w-fit bg-white p-4 pb-12 shadow-md transition-all duration-300 ease-out hover:shadow-2xl hover:z-10 cursor-pointer border border-gray-100"
            style={{ 
                // Menggunakan inline style agar nilai rotasi dinamis dari prop bisa diterapkan
                transform: `rotate(${isHovered ? 0 : rotation}deg) scale(${isHovered ? 1.05 : 1})` 
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img 
                // Menggunakan aspect-square agar proporsi gambar rapi seperti polaroid asli
                className="block aspect-square w-64 object-cover bg-gray-50" 
                src={path} 
                alt={alt} 
            />
            <p className="mt-4 text-center font-betani text-2xl text-gray-800 tracking-wide">
                {caption}
            </p>
        </div>
    );
}

export default Polaroid;