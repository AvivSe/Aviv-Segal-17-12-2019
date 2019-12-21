import React, {useEffect} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {gwtMyBookmarks} from "../redux/weather/weather.selectors";
import WeatherMiniature from "./WeatherMiniature";
import {openSnackbar} from "../redux/ui/ui.actions";

const Flex = styled.div`
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default function Bookmarks() {
  const bookmarks = useSelector(gwtMyBookmarks);
  const dispatch = useDispatch();
  const noBookmarks = !bookmarks || bookmarks.length === 0;
  useEffect(function () {
    if(noBookmarks) {
      dispatch(openSnackbar(`No bookmarks found`));
    }
  }, [dispatch, noBookmarks]);
  return (
    <div className={"mainContent"}>
      <Flex>
        {bookmarks.map(weather => (
          <WeatherMiniature key={weather.uniqId} weather={weather} />
        ))}
      </Flex>
    </div>
  );
}
