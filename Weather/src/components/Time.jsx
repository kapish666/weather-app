import { useState } from 'react'
import moment from 'moment';

function Time() {
    let tame=moment().format('h:mm:ss a');
    const[Itime,setiTime]=useState(tame)
    
    let date=moment().format('dddd Do MMMM YY')
    const[idate,setDate]=useState(date)

    const updateTime=()=>{
        tame=moment().format('h:mm:ss a');
        setiTime(tame)

        date=moment().format('dddd Do MMMM YY')
        setDate(date);
    }
    setInterval( updateTime, 1000);

    setInterval(Itime,1000);

    

    return (
        <>
        <ul className="flex flex-row  items-center justify-center  text-sm font-light gap-4">
            <li>{tame}</li>
            <p>|</p>
            <li>{date}</li>
        </ul>
        <div className='flex flex-row items-center justify-center m-5 font-bold text-2xl pt-6 pb-0'>
            Berlin, DE
        </div>
        </>
    )
}
export default Time;