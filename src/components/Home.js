import React from "react";
import SearchBox from "./SearchBox";
import Weather from "./Weather";

export default function Home({ fallbackCity = { name: "Tel Aviv", key: "215854" }}) {

  return (
    <div className={'mainContent'} style={{maxWidth: '1080px'}}>
      <SearchBox fallbackCity={fallbackCity.name}/>
      <Weather/>
    </div>
  );
}
