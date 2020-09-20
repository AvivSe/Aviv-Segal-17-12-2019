import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import weatherService from "../AccuWeatherService";
import { useDebounce } from "../hooks/useDebounce";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/ui/ui.actions";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { addToMap, setSelectedCity } from "../redux/weather/weather.actions";
import { PaperContent, StyledAutocomplete, StyledLocationCity } from "./styled";
import { getCityDisplayName } from "../utils/tiny";

export default function SearchBox() {
  const tooltipEnchorElRef = React.useRef();
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [cityLabelToKeyMap, setCityLabelToNameMap] = useState({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const dispatch = useDispatch();

  useEffect(
    function() {
      if (!!debouncedSearchTerm && debouncedSearchTerm !== "") {
        async function fetchCities() {
          setLoading(true);
          const cities = await weatherService.autocompleteSearchCities(debouncedSearchTerm.toString().split(",")[0]);
          if (!!cities && Array.isArray(cities)) {
            const _cityLabelToKeyMap = {};
            setOptions(
              cities.map(city => {
                dispatch(addToMap(city));
                const label = getCityDisplayName(city);
                _cityLabelToKeyMap[label] = city.key;
                return label;
              })
            );
            setCityLabelToNameMap(_cityLabelToKeyMap);
          }
          setLoading(false);
        }
        fetchCities().catch(e => {
          dispatch(openSnackbar(e.message));
        });
      }
    },
    [debouncedSearchTerm, dispatch]
  );

  function handleOptionChange(event, value) {
    if(!value) {
      setOptions([]);
    } else if (options.some(validWord => validWord.toLowerCase() === value.toLowerCase())) {
      dispatch(setSelectedCity(cityLabelToKeyMap[value]));
    } else {
      setError("Please select from list");
    }
  }

  function handleInputChange({ target: { value: searchTerm } }) {
    setSearchTerm(searchTerm);
  }

  function handleInputClick() {
    setIsAutocompleteOpen(true);
  }

  function handleInputKeyPress(e) {
    if (e.key === "Enter" && !!options[0]) {
      handleOptionChange(e, options[0]);
      setIsAutocompleteOpen(false);
    }
  }

  function handleAutoCompleteOpen() {
    setIsAutocompleteOpen( true);
  }
  function handleAutoCompleteClose() {
    setOptions([]);
    setIsAutocompleteOpen( false);
  }
  const isPopperOpen = Boolean(isAutocompleteOpen && error);

  return (
    <>
      <Popper open={isPopperOpen} anchorEl={tooltipEnchorElRef.current} placement={"top"} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <PaperContent>
                <StyledLocationCity />
                {error}
              </PaperContent>
            </Paper>
          </Fade>
        )}
      </Popper>
      <StyledAutocomplete
        ref={tooltipEnchorElRef}
        open={isAutocompleteOpen}
        onOpen={handleAutoCompleteOpen}
        onClose={handleAutoCompleteClose}
        value={searchTerm}
        getOptionSelected={(option, value) => option.indexOf(value) !== -1}
        getOptionLabel={option => option}
        options={options}
        loading={loading}
        onChange={handleOptionChange}
        freeSolo
        renderInput={params => (
          <TextField
            {...params}
            label="Search City"
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
            onClick={handleInputClick}
            onKeyPress={handleInputKeyPress}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <div>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </div>
              )
            }}
          />
        )}
      />
    </>
  );
}
