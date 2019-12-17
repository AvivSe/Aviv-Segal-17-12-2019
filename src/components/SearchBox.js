import React, {useCallback, useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import weatherService from "../AccuWeatherService";
import {useDebounce} from "../hooks/useDebounce";
import {useDispatch} from "react-redux";
import {openSnackbar} from "../redux/ui/ui.actions";
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
  const [error, setError]= useState(null);

  const isValid = useCallback(function(searchTerm) {
    console.log(searchTerm);
    return !searchTerm || options.find(validWord=>validWord===searchTerm);
  }, [options]);

  useEffect( function(){
       async function fetchCities() {
         setLoading(true);
         const cities = (await weatherService.autocompleteSearchCities(debouncedSearchTerm)).data;
         if(!!cities && Array.isArray(cities)) {
           setOptions(cities.map(({LocalizedName, Key}) => LocalizedName));
         }
         setLoading(false);
       }
       fetchCities().catch(()=>dispatch(openSnackbar("Something went wrong.")));
  }, [error, debouncedSearchTerm, dispatch]);

  useEffect( function(){
    if(searchTerm && searchTerm !== defaultValue && !error && !open && !isValid()) {
      dispatch(openSnackbar("You must pick from list"))
    }
  }, [defaultValue, error,open, isValid, dispatch, searchTerm]);

  useEffect(()=> {
    if(!isValid(debouncedSearchTerm)){
      setError("Please select from list");
    } else {
      setError(null);
    }
  }, [debouncedSearchTerm, isValid]);

  useEffect(()=> {
    if(isValid(searchTerm)){
      setError(null);
    }
  }, [searchTerm, isValid]);
   function handleOptionChange(event, value){
     if (!!onTargetLocked) {
      onTargetLocked(value);
       setError(null);
     }
  }

  function handleInputChange({ target: { value: searchTerm } }){
    setSearchTerm(searchTerm);
    if(!isValid(searchTerm)){
      dispatch(openSnackbar(searchTerm + " is not valid."));
      setError("Please select from list");
    } else {
      setError(null);
    }
  }

  return (<>
    {!!error && !!options && options.length !== 0 && <div style={{color:"red"}}>{error}</div>}
    <StyledAutocomplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      value={searchTerm}
      getOptionSelected={(option, value)=> option.indexOf(value) !== -1}
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
    /></>
  );
}
