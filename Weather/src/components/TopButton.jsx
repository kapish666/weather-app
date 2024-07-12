import React from 'react'

function TopButton({setQuery}) {
    const cities = [
        {
            id: 1,
            name: "London"
        },
        {
            id: 2,
            name: "Mumbai"
        },
        {
            id: 3,
            name: "Tokyo"
        },
        {
            id: 4,
            name: "Berlin"
        },
        {
            id: 5,
            name: "Paris"
        }

    ]
    return (
        <div className='flex items-center justify-around '>
            {
                cities.map((city) => (
                    <button key={city.id} className='text-lg hover:bg-gray-700/20 px-3 py-3 rounded-md transition ease-in' onClick={()=>setQuery({q: city.name})}>
                        {city.name}
                    </button>

                ))}
        </div>
    )
}

export default TopButton;