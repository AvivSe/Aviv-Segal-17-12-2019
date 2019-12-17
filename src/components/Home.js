import React, {useEffect} from "react";
import SearchBox from "./SearchBox";
import useGeolocation from "react-hook-geolocation";
import Weather from "./Weather";

export default function Home() {
  const geolocation = useGeolocation();
  console.log(geolocation);

  return (
    <div className={'mainContent'} style={{maxWidth: '720px'}}>
      <SearchBox/>
      <Weather/>
    </div>
  );
}
