import { BiSearch, BiCurrentLocation } from "react-icons/bi"
import React, { useState } from 'react'

const SearchCity = ({ setQuery, setUnits }) => {

    const [city, setCity] = useState("");
    const handelSearchClick = () => {
        if (city !== "") setQuery({ q: city })
    }

    const handleCurrntLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                setQuery({ lat: latitude, lon: longitude })
            })
        }
    }

    return (
        <div className='flex flex-row justify-center my-6 gap-5'>
            <div className="flex flex-row  items-center justify-center gap-1">
                <button className="text-xl font-medium transition ease-out hover:scale-125"
                    onClick={() => setUnits("metric")}
                >
                    °C
                </button>
                <p>/</p>
                <button className="text-xl font-medium transition ease-out hover:scale-125"
                    onClick={() => setUnits("imperial")}
                >
                    °F
                </button>

            </div>
            <div className="flex flex-row w-3/4 items-center justify-center 
        space-x-4">
                <input type="text" placeholder='search city...' className=' text-gray-500 p-3 rounded-md w-full font-light focus:outline-none shadow-xl capitalize placeholder:lowercase'
                    value={city}
                    onChange={(e) => setCity(e.currentTarget.value)}
                />
                <BiSearch
                    size={30} className="hover:scale-125 cursor-pointer transition ease-out"
                    onClick={handelSearchClick}
                />
                <BiCurrentLocation
                    size={30} className="hover:scale-125 cursor-pointer transition ease-out"
                    onClick={handleCurrntLocation}
                />
            </div>
        </div>
    )
}

export default SearchCity
