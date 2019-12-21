import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { gwtMyBookmarks } from "../redux/weather/weather.selectors";
import { openSnackbar } from "../redux/ui/ui.actions";
import Weather from "./Weather";
import Grow from "@material-ui/core/Grow";

const Flex = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Bookmarks() {
  const bookmarks = useSelector(gwtMyBookmarks);
  const dispatch = useDispatch();
  const noBookmarks = !bookmarks || bookmarks.length === 0;
  useEffect(
    function() {
      if (noBookmarks) {
        dispatch(openSnackbar(`No bookmarks found`));
      }
    },
    [dispatch, noBookmarks]
  );
  return (
    <div className={"mainContent"}>
      <Flex>
        {bookmarks.map(weather => (
          <Weather key={weather.uniqId} weather={weather} />
        ))}
      </Flex>
    </div>
  );
}
