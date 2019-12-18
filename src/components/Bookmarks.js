import React from "react";
import WeatherMiniature from "./WeatherMiniature";
import styled from "styled-components"

const Flex = styled.div`
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
export default function Bookmarks() {
  //const dispatch = useDispatch();
  return (
    <div className={"mainContent"}>
      <Flex>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 3, 3, 3, 3, 3, 24, 2, 125, 1, 25, 1, 3, 1, 34, 213, 4].map((item,i) => (
          <WeatherMiniature key={item + ' ' + i} />
        ))}
      </Flex>
    </div>
  );
}
