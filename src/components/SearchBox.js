import React, { useCallback, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import weatherService from "../AccuWeatherService";
import { useDebounce } from "../hooks/useDebounce";
import { useDispatch } from "react-redux";
import { closeSnackbar, openSnackbar } from "../redux/ui/ui.actions";
import { ErrorOutline } from "@material-ui/icons";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";

const StyledAutocomplete = styled(Autocomplete)`
  width: 100%;
`;

const PaperContent = styled(Paper)`
  font-weight: bolder;
  padding: 1rem;
  min-width: 300px;
  color: ${({ theme }) => theme.palette.primary.main};
  display: flex;
  align-items: center;
  margin-bottom: -1rem;

`;

const StyledLocationCity = styled(ErrorOutline)`
  fill: ${({ theme }) => theme.palette.primary.main};
  width: 30px;
  height: 30px;
`;


export default function SearchBox({ defaultValue, onTargetLocked }) {
  const tooltipEnchorElRef = React.useRef();
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
  const [options, setOptions] = useState([]);

  const [locked, setLocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState(defaultValue);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const dispatch = useDispatch();

  const zeroErrors = useCallback(() => {
    setError(null);
    dispatch(closeSnackbar());
    setIsAutocompleteOpen(false);
  }, [dispatch]);

  const isValid = useCallback(
    function(searchTerm) {
      return (
        !searchTerm || options.find(validWord => !searchTerm || validWord.toLowerCase() === searchTerm.toLowerCase())
      );
    },
    [options]
  );

  useEffect(
    function() {
      async function fetchCities() {
        setLoading(true);
        const cities = (await weatherService.autocompleteSearchCities(debouncedSearchTerm)).data;
        if (!!cities && Array.isArray(cities)) {
          setOptions(cities.map(({ LocalizedName, Key }) => LocalizedName));
        }
        setLoading(false);
      }
      fetchCities().catch(() => dispatch(openSnackbar("Something went wrong.")));
    },
    [error, debouncedSearchTerm, dispatch]
  );

  useEffect(
    function() {
      if (searchTerm && searchTerm !== defaultValue && !error && !isAutocompleteOpen && !isValid()) {
        dispatch(openSnackbar("You must pick from list"));
      }
    },
    [defaultValue, error, isAutocompleteOpen, isValid, dispatch, searchTerm]
  );

  useEffect(() => {
    if (!isValid(debouncedSearchTerm)) {
      setError("Please select from list");
      setIsAutocompleteOpen(true);
    } else {
      zeroErrors();
    }
  }, [debouncedSearchTerm, setIsAutocompleteOpen, zeroErrors, isValid]);

  useEffect(() => {
    if (isValid(searchTerm)) {
      setError(null);
    }
  }, [searchTerm, isValid]);

  function handleOptionChange(event, value) {
    if (!!onTargetLocked) {
      onTargetLocked(value);
      setLocked(true);
      zeroErrors();
    }
  }

  function handleInputChange({ target: { value: searchTerm } }) {
    setLocked(false);
    zeroErrors();
    setSearchTerm(searchTerm);
  }

  const isTooltipOpen = !locked && !!error && !!options && options.length !== 0;

  return (
    <>
      <Popper open={isTooltipOpen} anchorEl={tooltipEnchorElRef.current} placement={"top"} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper><PaperContent><StyledLocationCity/>{error}</PaperContent></Paper>
          </Fade>
        )}
      </Popper>
      <StyledAutocomplete
        ref={tooltipEnchorElRef}
        open={isAutocompleteOpen && !locked}
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
            label="Choose City"
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
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
