import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import MuiSnackbar from "@material-ui/core/Snackbar";
import MuiBottomNavigation from "@material-ui/core/BottomNavigation";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Paper from "@material-ui/core/Paper";
import { ErrorOutline } from "@material-ui/icons";
import Card from "@material-ui/core/Card";

const lowTransparent = "rgba(0,0,0,.05)";
const transparent = "rgba(0,0,0,.2)";

export const Row = styled.div`
  display: flex;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-content: ${({ alignContent }) => alignContent};
  ${({ theme }) => theme.breakpoints.up("sm")} {
    > .getterBottom {
      margin-top: -3rem;
    }
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ColumnCentered = styled(Column)`
  justify-content: center;
  align-items: center;
  align-content: center;
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
  ${({ theme: { type } }) => type !== "dark"} {
    .MuiInputLabel-outlined {
      color: ${({ theme }) => theme.palette.primary.contrastText} !important;
    }
    .MuiTextField-root {
      background-color: ${({
        theme: {
          palette: {
            primary: { dark }
          }
        }
      }) => dark} !important;
    }
    .MuiInputBase-root {
      color: ${({ theme }) => theme.palette.primary.contrastText} !important;
    }
  }
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
  min-width: ${({ miniature }) => (miniature ? "320px" : null)};
`;
export const StyledCard = styled(Card)`
  margin: 0.5rem;
  .MuiCardMedia-root {
    height: 240px;
  }

  .head {
    text-align: end;
    height: 5px;
  }

  .mainSvg {
    height: 50vh;
    margin: auto;
  }

  width: 100%;

  background-color: ${lowTransparent};
`;

export const IconHelper = styled.svg`
  width: ${({ size }) => size || 2}rem;
  fill: ${({ theme, fill }) => fill || theme.palette.primary.contrastText};
`;

export const FavoriteIconHelper = styled.svg`
  fill: ${({ theme: { type, palette } }) => (type === "dark" ? "#ff374a" : palette.primary.main)};
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

  .day {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0;
    margin: 0.25rem;
    text-align: center;
    justify-content: flex-start;
    align-items: center;

    background-color: ${({ theme }) => (theme.type === "dark" ? transparent : lowTransparent)};
    border-radius: 0.1rem;

    ${({ theme }) => theme.breakpoints.up("sm")} {
      width: 300px;
      height: 350px;
    }

    .dayHeader {
      font-size: 0.9rem;
    }
    .today {
      font-weight: bold;
      color: ${({ theme: { palette, type } }) => (type === "dark" ? palette.primary.text : palette.primary.main)};
    }
    .dayName {
      font-size: 1.1rem;
    }
    .bold {
      font-weight: bold;
    }
    .withRadius {
      border-radius: 0.3rem;
    }

    .dayTime,
    .nightTime {
      margin-block-start: 0.5rem;
      min-width: 100px;
      ${({ theme }) => theme.breakpoints.up("sm")} {
        min-height: 150px;
        min-width: unset;
        border-block-start: 1px solid ${({ theme }) => theme.palette.secondary.dark};
      }
    }

    ${({ theme }) => theme.breakpoints.up("sm")} {
      .dailyTimeLabel {
        text-align: start;
        :first-child {
          font-size: 0.7rem;
          font-weight: lighter;
          text-align: center;
          background-color: ${({ theme }) => theme.palette.secondary.dark};
          color: ${({ theme }) => theme.palette.primary.contrastText} !important;
          width: 60px !important;
          padding: 0.2rem;
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
      font-size: 0.7rem;
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

export const LookingAhead = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => (theme.type === "dark" ? transparent : lowTransparent)};
  margin: 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.palette.secondary.dark};
  border-bottom: 1px solid ${({ theme }) => theme.palette.secondary.dark};
  padding-bottom: 1rem;
  > :first-child {
    color: ${({ theme }) => theme.palette.primary.contrastText};
    background-color: ${({ theme }) => theme.palette.secondary.dark};
    font-size: 0.7rem;
    padding: 0.4rem;
  }
  > :not(:first-child) {
    text-align: center;
    width: 100%;

    ${({ theme }) => theme.breakpoints.up("md")} {
      margin-top: -1rem;
    }
  }
`;
