import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedCity, gwtMyBookmarks } from "../redux/weather/weather.selectors";
import { openSnackbar } from "../redux/ui/ui.actions";
import Weather from "./Weather";
import Zoom from "@material-ui/core/Zoom";
import { Add } from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import { addToMyBookmarks } from "../redux/weather/weather.actions";

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 320px;
  justify-content: center;
`;

const FirstBookmark = styled.div`
  color: ${({ theme }) => theme.palette.primary.main};
`;
export default function Bookmarks() {
  const bookmarks = useSelector(gwtMyBookmarks);
  const dispatch = useDispatch();
  const selectedCity = useSelector(getSelectedCity);

  const noBookmarks = !bookmarks || bookmarks.length === 0;
  useEffect(
    function() {
      if (noBookmarks) {
        dispatch(openSnackbar(`No bookmarks found`));
      }
    },
    [dispatch, noBookmarks]
  );

  function handleAddSelectedAsBookmark() {
    dispatch(addToMyBookmarks(selectedCity.key));
  }
  return (
    <div className={"mainContent"}>
      <Zoom in timeout={1500}>
        <Flex>
          <div>
            {bookmarks.length === 0 && (
              <Flex>
                <Fab onClick={handleAddSelectedAsBookmark} color="primary" aria-label="add">
                  <Add />
                </Fab>
                <FirstBookmark>Add {selectedCity.name} as your first bookmark!</FirstBookmark>
              </Flex>
            )}
            {bookmarks.map(weather => (
              <Weather key={weather.uniqId} weather={weather} />
            ))}
          </div>
        </Flex>
      </Zoom>
    </div>
  );
}
