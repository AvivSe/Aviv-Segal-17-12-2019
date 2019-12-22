import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import MuiSnackbar from "@material-ui/core/Snackbar";
import MuiBottomNavigation from "@material-ui/core/BottomNavigation";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Paper from "@material-ui/core/Paper";
import { ErrorOutline } from "@material-ui/icons";
import Card from "@material-ui/core/Card";

export const ResponsiveText = styled.span`
  font-size: ${({ fontSize = 2 }) => `${fontSize}rem`};
  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: ${({ fontSize = 2 }) => `${fontSize / 1.5}rem`};
  }
  ${({ theme }) => theme.breakpoints.down("xs")} {
    font-size: ${({ fontSize = 2 }) => `${fontSize / 2}rem`};
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-content: ${({ alignContent }) => alignContent};
`;
export const DailyForecastsHelper = styled.div`
  background-color: rgba(0, 0, 0, 0.01);
`;
export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledDailyIcon = styled.svg`
  max-width: 5rem;
  height: unset;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    max-width: 4rem;
  }
  ${({ theme }) => theme.breakpoints.down("xs")} {
    max-width: 40px;
  }
`;

export const StyledIconButton = styled(IconButton)`
  svg {
    fill: #ffffff;
  }
`;

export const StyledMuiSnackbar = styled(MuiSnackbar)`
  .MuiSnackbarContent-message {
    font-size: 1rem;
  }
`;

export const StyledMuiBottomNavigation = styled(MuiBottomNavigation)`
  top: auto !important;
  bottom: 0 !important;
  position: fixed;
  width: 100vw;

  display: none;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    display: flex;
  }

  background-color: ${({ theme }) => theme.palette.primary.main} !important;
  .MuiSvgIcon-root {
    fill: ${({ theme }) => theme.palette.primary.contrastText};
  }
  .MuiBottomNavigationAction-label {
    color: ${({ theme }) => theme.palette.primary.contrastText};
  }
  .Mui-selected {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }
`;

export const StyledAutocomplete = styled(Autocomplete)`
  width: 100%;
  max-width: 520px;
`;

export const PaperContent = styled(Paper)`
  font-weight: bolder;
  padding: 1rem;
  min-width: 300px;
  color: ${({ theme }) => theme.palette.primary.main};
  display: flex;
  align-items: center;
  margin-bottom: -1rem;
`;

export const StyledLocationCity = styled(ErrorOutline)`
  fill: ${({ theme }) => theme.palette.primary.main};
  width: 30px;
  height: 30px;
`;

export const CurrentWeatherHelper = styled.div`
  padding: ${({ miniature }) => (miniature ? 0.5 : 2)}rem;
  max-width: ${({ miniature }) => (miniature ? "320px" : null)};
`;
export const StyledCard = styled(Card)`
  margin: 0.5rem;
  .MuiCardMedia-root {
    height: 240px;
  }

  .mainSvg {
    height: 50vh;
    margin: auto;
  }

  width: 100%;

  background-color: rgba(0, 0, 0, 0.04); // TODO: Blur
`;

export const StyledMainIcon = styled.svg`
  width: 7rem;
  height: unset;
  margin-inline-end: 2.5rem;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 3rem;
    margin-inline-end: 0.5rem;
  }
`;

export const MainContentHelper = styled.div`
  .mainContent {
    margin: 1rem auto 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100%;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 0 0.5rem;
    .mainContent {
      padding-block-end: 56px;
    }
  }
`;

export const StyledLink = styled.a`
  color: ${({ theme }) => theme.palette.primary.contrastText};
  text-decoration: none;
  font-size: 1.5rem;
  :visited {
    color: ${({ theme }) => theme.palette.primary.contrastText};
  }
`;

export const DailyForecasts = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;

  ${({ theme }) => theme.breakpoints.down("xs")} {
    flex-direction: column;
    align-content: center;
  }
  
  .contrast {
    color:  ${({ theme }) => theme.palette.primary.contrastText} !important;
     background-color:  ${({ theme }) => theme.palette.primary.main} !important;
   }
   
  .day {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0;
    margin: 0.25rem;
    text-align: center;
    justify-content: flex-start;
    align-items: center;

    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 0.4rem;
    
    ${({ theme }) => theme.breakpoints.up("sm")} {
      width: 300px;
      height: 350px;
    }

    .dayHeader {
      font-size: .9rem;
    }
    .dayName {
      font-size: 1.1rem;
    }
    .bold {
      font-weight: bold;
    }
    .withRadius {
      border-radius: .3rem;
    }
    
    .primary {
      color:  ${({ theme }) => theme.palette.primary.main};
    }
    
    .dayTime,
    .nightTime {
      margin-block-start: 0.5rem;
      min-width: 100px;
      ${({ theme }) => theme.breakpoints.up("sm")} {
        min-height: 150px;
        min-width: unset;
        border-block-start: 1px solid  rgba(0,0,0,0.3);
      }
    }

    ${({ theme }) => theme.breakpoints.up("sm")} {
      .dailyTimeLabel {
        text-align: start;
        :first-child {
          font-size: .9rem;
          font-weight: lighter;
          border-bottom: 1px solid rgba(0,0,0,0.3);
          border-right: 1px solid  rgba(0,0,0,0.3);
          border-bottom-right-radius: 0.5rem;
          width: 35px !important;
          padding: .2rem;
        }
      }
    }

    .dailyText {
      min-height: 25px;
    }
    .degree {
      font-size: 1.2rem;
    }
    .degreeLetter {
      font-size: 0.9rem;
    }
    > * {
      width: 100%;
    }
  }
`;

export const FlexibleColumn = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  ${({ theme }) => theme.breakpoints.down("xs")} {
    flex-direction: row;
  }
`;
