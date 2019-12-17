import React, {useEffect} from "react";
import SearchBox from "./SearchBox";
import useGeolocation from "react-hook-geolocation";

export default function Home() {
  const geolocation = useGeolocation();
  console.log(geolocation);
  return (
    <div className={'mainContent'}>
      <SearchBox value={{name:"Israel"}}/>
    </div>
  );
}
