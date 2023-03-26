import './App.css';
import React, { useEffect, useState } from "react";
import Select from 'react-select'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
//import Weather from './Components/Weather';


const options = [
  { value: 'India', label: 'India' },
  { value: 'UK', label: 'UK' },
]

const options2 = [
  { country:'', value: '', label: 'Select State' },
  { country:'India', value: 'Chennai', label: 'Chennai' },
  { country:'India', value: 'Bangalore', label: 'Bangalore' },
  { country:'UK', value: 'London', label: 'London' }
]


export default function App() {
  
  return (
    <div className="App">
      
        <Weather />
      
    </div>
  );
}

const WeatherDetails = (props) =>{
  const {data} = props;
  return(
    <div>
    {data.name}, {data.sys.country}. Weather <br />
    {data.main.temp}  {data.weather[0].description}
  </div> 
  )
}

function Weather(weatherData) {
  const [data, setData] = useState([]);
  const [country, setcountry] = useState();
  const [state, setstatee] = useState();
  const [stateOption,setstateOption] = useState([])


  const OnSelectionChange2 = (selectedOption)=> {
    setstatee(selectedOption.value)
    console.log(selectedOption)
  }
  const OnSelectionChange = (selectedOption)=> {
    setcountry(selectedOption.value)
    let states = []
    options2.map((statee)=>{
      if(statee.country===selectedOption.value){
        states.push({value:statee.value,label:statee.label})
      }
    })
    setstateOption(states)
    //setstateOption([{value:'Jana',label:'Vj Jana'}])
    console.log(country)
  }

  const getWeatherDetails = async ()=>{
    await fetch(`${process.env.REACT_APP_API_URL}/weather/?q=${state},${country}&units=metric&APPID=dfbbc9612ad3e9bbc36199bcfacbefe4`)
    .then(res => res.json())
    .then(result => {
      setData(result)
      console.log(result);
    });
    <WeatherDetails data={data} />

  }

    return(
      <div className='bodyy'>
      <h1>Weather App</h1>
      <div>
        <div className='row'>
          <div className='col'>
          <Select options={options} onChange={OnSelectionChange} />
          </div>
          <div className='col'>
          <Select options={stateOption} onChange={OnSelectionChange2} />
          </div>
          <div className='col'>
          <button onClick={getWeatherDetails} >Submit</button>
          </div>
        </div>
      {data.cod!=undefined ? <div>
        <div className='weatherbox'> 
        <div className='text-left'> 
    {data.name}, {data.sys.country}. Weather <br /> </div>
    <div className='text-left-temp'>{data.main.temp} &#8451; </div>
    <img src='https://www.noaa.gov/sites/default/files/styles/square_width_650/public/2021-02/FocusArea__Weather-02.jpg?h=5dc006f5&itok=20VGa8_F' />
     <br />
    <div className='text-left'> 
    {data.weather[0].description}
    </div>
    </div>
    <br /><br />
    <div className='row'>
      <div className='col'>
        High/Low <span> {data.main.temp_max}/{data.main.temp_min}</span>
        <br />
        <span>---------------------------</span>
        <br />
        Humidity  <span> {data.main.humidity}%</span>
        <br />
        <span>---------------------------</span>
        <br />
        Pressure  <span> {data.main.pressure}hpa</span>
        <br />
        <span>---------------------------</span>
        <br />
        Visibility <span>  {data.visibility/1000} km</span>
        <br />
        <span>---------------------------</span>
      </div>
      <div className='col'>
        Wind <span> {data.wind.speed} km/hr <br /></span>
        <span>---------------------------</span>
        <br />
        Wind Direction  <span> {data.main.humidity}%</span>
        <br />
        <span>---------------------------</span>
        <br />
        Sunrise <span>  {new Date(data.sys.sunrise).toString().slice(16,24)}</span>
        <br />
        <span>---------------------------</span>
        <br />
        Sunset  <span> {new Date(data.sys.sunset).toString().slice(16,24)}</span>
        <br />
        <span>---------------------------</span>
      </div>
    </div>  
    
  </div> : <div />}
  </div>
    </div>
    )
  
}