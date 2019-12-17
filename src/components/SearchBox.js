import React, { useCallback, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import weatherService from "../AccuWeatherService";
import { useDebounce } from "../hooks/useDebounce";
import { useDispatch } from "react-redux";
import {closeSnackbar, openSnackbar} from "../redux/ui/ui.actions";
const StyledAutocomplete = styled(Autocomplete)`
  width: 100%;
`;

export default function SearchBox({ defaultValue, onTargetLocked }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(defaultValue);
  const dispatch = useDispatch();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [error, setError] = useState(null);
  const [locked, setLocked] = useState(false);
  const zeroErrors = useCallback(()=> {
      setError(null);
      dispatch(closeSnackbar());
      setOpen(false);
  },[dispatch]);

  const isValid = useCallback(
    function(searchTerm) {
      return !searchTerm || options.find(validWord => !searchTerm || validWord.toLowerCase() === searchTerm.toLowerCase());
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
      if (searchTerm && searchTerm !== defaultValue && !error && !open && !isValid()) {
        dispatch(openSnackbar("You must pick from list"));
      }
    },
    [defaultValue, error, open, isValid, dispatch, searchTerm]
  );

  useEffect(() => {
    if (!isValid(debouncedSearchTerm)) {
      setError("Please select from list");
      setOpen(true);
    } else {
      zeroErrors();
    }
  }, [debouncedSearchTerm, setOpen, zeroErrors, isValid]);

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

  return (
    <>
      {!locked && !!error && !!options && options.length !== 0 && <div>{error}</div>}
      <StyledAutocomplete
        open={open && !locked}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
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
