import React, { useEffect, useState } from 'react'
import TopButton from './components/TopButton'
import SearchCity from './components/SearchCity'
import TempNDetails from './components/TempNDetails'
import Forcast from './components/Forcast'
import getDataFormatted from './services/weatherSrvices'
import TimeL from './components/TimeL'

function App() {
	const [query, setQuery] = useState({ q: 'london' })
	const [units, setUnits] = useState('metric')
	const [weather, setWeather] = useState(null)
	const [details,setDetails]=useState("")



	const getWeather = async () => {
		await getDataFormatted({ ...query,units,details}).then(data => {
			setWeather(data)
			setDetails(data.details)
		});
		
	};

	useEffect(() => {
		getWeather();
	}, [query, units,details])


	// const formatBackground = () => {
	// 	if (!weather) return "from-cyan-600 to-blue-600";
	// 	const threshold = units === "metric" ? 30 : 60;
	// 	if (weather.temp <= threshold) return "from-cyan-600 to-blue-600"
	// 	else return "from-yellow-600 to-yellow-300";
	// }
	const formatBackground = () => {
		if (!weather) return "from-cyan-600 to-blue-600";
	
		const backgroundClasses = {
			Clouds: "from-blue-800 to-gray-400 ",
			Haze: "from-black to-gray-400",
			// Clear: "from-orange-600 to-yellow-400",
			Rain: "from-blue-700 to-gray-400"
		};
		return backgroundClasses[details] || "from-cyan-600 to-blue-600";
	};

	return (
		<div className={`rounded-md mx-auto w-fit mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 transition delay-300 ease-in-out ${formatBackground()}`}>
			<TopButton setQuery={setQuery} />
			<SearchCity setQuery={setQuery} setUnits={setUnits} />
			{weather && (
				<>
					<TimeL weather={weather} />
					<TempNDetails weather={weather} units={units} />
					<Forcast title="3 hr step forcast" data={weather.hourly} />
					<Forcast title="Daily forcast" data={weather.daily} />

				</>
			)
			}
		</div>
	);
};

export default App;
