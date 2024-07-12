import React, { useState } from 'react'
import { FaChevronUp } from 'react-icons/fa';


function Forcast({title, data}) {
    const [drawr, setDrawr]=useState(true)
    return (
        <div >
            <div className='flex justify-between text-center'>  
           {title}
           <FaChevronUp className={`font-light text-gray-200 ${!drawr &&'rotate-180' }`}onClick={()=>setDrawr(!drawr)}/>
            </div>
            <hr className='my-2' />
            <div iv className={`${drawr? "h-fit":"h-0" } relative transition delay-300 flex justify-between overflow-hidden`}>
                {data.map((d,index)=>(
                        <ul
                            key={index}
                        className='flex flex-col gap-1'>
                            <li>{d.title }</li>
                            <img src={d.icon} alt="" width={30}/>
                            <li>{`${d.temp.toFixed()}°`}</li>
                        </ul>
                ))}
            </div>
        </div>
    )
}

export default Forcast
