/* eslint import/no-webpack-loader-syntax: off */

import './style.css';
import { useState, useEffect } from "react";


const APIEndpoint = `https://api.openweathermap.org/data/2.5/weather?`
const APIKey = `f4225fc38e68485bacf987920f917c6e`

const Main = () => {

    const [myPos, setMyPos] = useState();
    const [data, setData] = useState();

    useEffect(() => {
        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition((position) => {
                setMyPos(position)
            })
        }
    }, []);

    console.log(myPos?.coords.latitude)

    useEffect(() => {
        fetch(`${APIEndpoint}lat=${myPos?.coords.latitude}&lon=${myPos?.coords.longitude}&appid=${APIKey}&units=metric`)
        .then(res => res.json())
        .then(result => {
            setData(result)
        })
    }, [myPos]);

    console.log(data)

    return ( 
    <section className='app'>
     <article className="container">
                <article className="top">
                    <div className="location">
                        <p>{data?.name}</p>
                    </div>
                    <div className="temp">
                        {data?.main ? <h1>{data?.main.temp.toFixed()}&deg;C</h1> : null}
                    </div>
                    <div className="description">
                        {data?.weather ? <p>{data?.weather[0].main}</p> : null}
                    </div>
                </article>

                {data?.name !== undefined && 
                
                <article className="bottom">
                    <div className="feels">
                        {data?.main ? <p className='bold'>{data?.main.feels_like.toFixed()}&deg;C</p> : null}
                        <p>Feels like </p>
                    </div>
                    <div className="humidity">
                      {data?.main ? <p className='bold'>{data?.main.humidity}</p> : null}
                        <p>Humidity</p>
                    </div>
                    <div className="wind">
                        {data?.wind ? <p className='bold'>{data?.wind.speed.toFixed()} MPH</p> : null}
                        <p>Wind Speed</p>
                    </div>
                </article>
                }
            </article>
    
    </section>
     );
}
 
export default Main;