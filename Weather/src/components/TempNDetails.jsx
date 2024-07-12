import { FaThermometerEmpty } from "react-icons/fa";
import React from 'react'
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";



function TempNDetails({weather:{
  details,icon, temp, temp_min,temp_max,sunrise, sunset, speed , humidity,feels_like, 
},units
}
)
// object destructuring -> weather.details -> details and so on...
 {
  const verticalInfo = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Feels like",
      value: `${feels_like.toFixed()}°`
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: "Humidity",
      value: `${humidity}%`
    },
    {
      id: 3,
      Icon: FiWind,
      title: "Wind",
      value: `${speed.toFixed()} ${units==="metric" ? "km/h" : "m/s"}`
    }
  ];
  const HorizontalInfo = [
    {
      "id": "1",
      "Icon": GiSunrise,
      "title": "Sunrise",
      "value": sunrise,
    },
    {
      "id": "2",
      "Icon": GiSunset,
      "title": "Sunset",
      "value": sunset,
    },
    {
      "id": "3",
      "Icon": MdKeyboardArrowUp,
      "title": "High",
      "value": `${temp_max.toFixed()}°`
    },
    {
      "id": "4",
      "Icon": MdKeyboardArrowDown,
      "title": "Low",
      "value":`${temp_min.toFixed()}°`
    }
  ];

  return (
    <div className=" mb-8">
      <div className=' text-lg font-light capitalize text-cyan-300 flex justify-center items-center '>
        <p>{details}</p>
      </div>
      <div className='flex justify-center items-center '>
        <img src={icon} alt="cloud img" width={60} />
      </div>
      <div className='flex flex-row justify-between items-center pt-'>
        <p className=' text-6xl items-center'>{temp.toFixed()}°</p>

        <div className=' flex flex-col gap-2 font-light space-y-1 items-start'>

          {
            verticalInfo.map(({ id, Icon, title, value }) => (
              <div
                key={id}
                className="flex text-sm items-center justify-center font-light "
              >
                <Icon size={18} className="mr-1" />
                {`${title}:`}
                <span className="font-medium ml-1">{value}</span>

              </div>

            ))}
        </div>
        
      </div>
      <div className=' flex  gap-16 font-light mt-10 justify-center items-center'>

          {
            HorizontalInfo.map(({ id, Icon, title, value }) => (
              <div
                key={id}
                className="flex text-sm items-center justify-center font-light "
              >
                <Icon size={18} className="mr-1" />
                {`${title}:`}
                <span className="font-medium ml-1">{value}</span>

              </div>

            ))}
        </div>
    </div>
  );
};

export default TempNDetails
