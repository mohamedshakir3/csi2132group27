import * as React from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import { Countries } from "../public/Countries"

export default function CountrySelect() {
  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ 
        border: none,
        padding: 0 0 0 2rem,
        height: 50px,
        width: 150px,
        color: rgb(103, 137, 120),
        boxShadow: inset 3.069px 6.292px 10px 0px rgba(156, 154, 154, 0.43),
          inset -8px -8px 8px white,
        border-radius: 1.5rem,
      }}
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label} ({option.code}) +{option.phone}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  )
}
