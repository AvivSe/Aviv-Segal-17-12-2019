import React from "react";
import SearchBox from "./SearchBox";
import Weather from "./Weather";
import { useSelector } from "react-redux";
import { getIsPending, getSelectedCity, getSelectedCityWeather } from "../redux/weather/weather.selectors";
import Zoom from "@material-ui/core/Zoom";
import styled from "styled-components";
import HeroloAnimation from "./standalone/HeroloAnimation";

const Wrapper = styled.div`
  display: flex;
  align-content: center;
  width: 100%;
`;
export default function Home() {
  const selectedCity = useSelector(getSelectedCity());
  const weather = useSelector(getSelectedCityWeather());
  const isPending = useSelector(getIsPending);
  return (
    <div className={"mainContent"} style={{ maxWidth: "1080px" }}>
      <SearchBox fallbackCity={selectedCity.name} />
      {isPending && <HeroloAnimation text="Loading..." />}
      {!!weather && !isPending && (
        <Zoom in={!!weather}>
          <Wrapper>{<Weather weather={weather} />}</Wrapper>
        </Zoom>
      )}
    </div>
  );
}
