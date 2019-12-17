import React, {useEffect, useState} from "react";
import SearchBox from "./SearchBox";
import useGeolocation from "react-hook-geolocation";
import Weather from "./Weather";

export default function Home({ defaultValue = "Tel Aviv"}) {
  const geolocation = useGeolocation();
  const [city, setCity] = useState(defaultValue);
  console.log(geolocation);

  function handleCityTargetLocked(city){
    setCity(city);
  }
  return (
    <div className={'mainContent'} style={{maxWidth: '720px'}}>
      <SearchBox defaultValue={defaultValue} onTargetLocked={handleCityTargetLocked}/>
      <Weather city={city}/>
    </div>
  );
}
