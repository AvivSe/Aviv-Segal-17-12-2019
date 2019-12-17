import React from "react";
import { openSnackbar } from "../redux/ui/ui.actions";
import { useDispatch } from "react-redux";
import WeatherMiniature from "./WeatherMiniature";
import styled from "styled-components"

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
`;
export default function Favorites() {
  const dispatch = useDispatch();
  return (
    <div className={"mainContent"}>
      <Flex>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 3, 3, 3, 3, 3, 24, 2, 125, 1, 25, 1, 3, 1, 34, 213, 4].map(item => (
          <WeatherMiniature />
        ))}
      </Flex>
    </div>
  );
}
