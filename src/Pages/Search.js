/* eslint import/no-webpack-loader-syntax: off */

import './style.css';
import { useState } from 'react';
import axios from 'axios';



const Search = () => {

    const [data, setData] = useState({});
    const [location, setLocation] = useState('');

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lat={lat}&lon={lon}&units=metric&appid=f4225fc38e68485bacf987920f917c6e`

    const searchLocation = (e) => {
        if (e.key === 'Enter') {
            axios.get(url).then((response) => {
                setData(response.data)
                console.log(response.data)
            })
            setLocation('')
        }
    }

    return ( 
        <section className='app'>
            <div className="search">
                <input 
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    onKeyPress={searchLocation}
                    placeholder='Enter Location'
                    type="text" 
                />
            </div>
            <article className="container">
                <article className="top">
                    <div className="location">
                        <p>{data.name}</p>
                    </div>
                    <div className="temp">
                        {data.main ? <h1>{data.main.temp.toFixed()}&deg;C</h1> : null}
                    </div>
                    <div className="description">
                        {data.weather ? <p>{data.weather[0].main}</p> : null}
                    </div>
                </article>

                {data.name !== undefined && 
                
                <article className="bottom">
                    <div className="feels">
                        {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}&deg;C</p> : null}
                        <p>Feels like </p>
                    </div>
                    <div className="humidity">
                      {data.main ? <p className='bold'>{data.main.humidity}</p> : null}
                        <p>Humitity</p>
                    </div>
                    <div className="wind">
                        {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
                        <p>Wind Speed</p>
                    </div>
                </article>
                }


            </article>
        </section>
     );
}
 
export default Search;