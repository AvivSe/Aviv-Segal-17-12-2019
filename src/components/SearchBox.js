import React, {useCallback, useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import weatherService from "../AccuWeatherService";
import {useDebounce} from "../hooks/useDebounce";
import {useDispatch} from "react-redux";
import {closeSnackbar, openSnackbar} from "../redux/ui/ui.actions";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import {addToMap, setSelectedCity} from "../redux/weather/weather.actions";
import {PaperContent, StyledAutocomplete, StyledLocationCity} from "./styled";
import {getCityDisplayName} from "../utils/tiny";
import {Clear} from "@material-ui/icons";

export default function SearchBox() {
  const tooltipEnchorElRef = React.useRef();
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [cityLabelToKeyMap, setCityLabelToNameMap] = useState({});

  const [locked, setLocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const dispatch = useDispatch();

  const zeroErrors = useCallback(() => {
    setError(null);
    dispatch(closeSnackbar());
    setIsAutocompleteOpen(false);
  }, [dispatch]);

  const isValid = useCallback(
    function(searchTerm) {
      return options.find(validWord => !searchTerm || validWord.toLowerCase() === searchTerm.toLowerCase());
    },
    [options]
  );
  useEffect(
    function() {
      if (!!debouncedSearchTerm && debouncedSearchTerm !== "") {
        async function fetchCities() {
          setLoading(true);
          const cities = await weatherService.autocompleteSearchCities(debouncedSearchTerm);
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
          dispatch(openSnackbar(e));
        });
      }
    },
    [debouncedSearchTerm, dispatch]
  );

  useEffect(() => {
    if (!isValid(debouncedSearchTerm)) {
      setError("Please select from list");
      setIsAutocompleteOpen(true);
    } else {
      zeroErrors();
    }
  }, [debouncedSearchTerm, setIsAutocompleteOpen, zeroErrors, isValid, locked]);

  useEffect(() => {
    if (isValid(searchTerm)) {
      setError(null);
    }
  }, [searchTerm, isValid]);

  function handleOptionChange(event, value) {
    if (!!value && options.find(validWord => validWord.toLowerCase() === value.toLowerCase())) {
      dispatch(setSelectedCity(cityLabelToKeyMap[value]));
      setLocked(true);
      zeroErrors();
    } else {
      setError("Please select from list");
    }
  }

  function handleInputChange({ target: { value: searchTerm } }) {
    setLocked(false);
    zeroErrors();
    setSearchTerm(searchTerm);
  }

  function handleInputClick() {
    setIsAutocompleteOpen(true);
  }

  const isTooltipOpen = !locked && !!error && !!options && options.length !== 0;

  return (
    <>
      <Popper open={isTooltipOpen} anchorEl={tooltipEnchorElRef.current} placement={"top"} transition>
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
        onOpen={() => {
          setIsAutocompleteOpen(true);
        }}
        onClose={() => {
          setIsAutocompleteOpen(false);
        }}
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
