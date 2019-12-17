import React, { useEffect, useState } from "react";
import "isomorphic-fetch";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";

const StyledAutocomplete = styled(Autocomplete)`
  width: 720px;

  ${({ theme }) => theme.breakpoints.down("md")} {
    width: 600px;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 300px;
  }
`;

export default function SearchBox({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch("https://country.register.gov.uk/records.json?page-size=5000");
      const countries = await response.json();

      if (active) {
        setOptions(Object.keys(countries).map(key => countries[key].item[0]));
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleOptionSelected = () => {
    return (option, value) => option.name === value.name;
  };

  const handleOptionChange = (event, value) => {
    if (!!onChange) {
      onChange();
    }
  };

  return (
    <StyledAutocomplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      value={value}
      getOptionSelected={handleOptionSelected}
      getOptionLabel={option => option.name}
      options={options}
      loading={loading}
      onChange={handleOptionChange}
      renderInput={params => (
        <TextField
          {...params}
          label="Choose City"
          fullWidth
          variant="outlined"
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
  );
}
