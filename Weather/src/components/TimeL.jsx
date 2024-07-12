import React from 'react'

function TimeL({weather: {formattedLocalTime, name,country} }) {
    return (
        <>
        <p className="flex flex-row  items-center justify-center  text-sm font-light gap-4">
                {formattedLocalTime}
        </p>
        <div className='flex flex-row items-center justify-center font-bold text-2xl pt-4'>
           {` ${name}, ${country}`}
        </div>
        </>
    );
};

export default TimeL
