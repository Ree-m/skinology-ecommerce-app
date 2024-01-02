import React, { useEffect, useRef } from 'react';
import { InputLabel, Box, Input } from '@mui/material';
import { useFormikContext } from 'formik';
import { useTheme } from "@mui/material/styles";


const Autocomplete =  (onPlaceSelected ) => {

  const autocompleteInput = useRef(null);
  const { setFieldValue } = useFormikContext();
  const theme = useTheme();

  useEffect(() => {

    const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteInput.current || undefined,
        { types: ['geocode'] }
    );

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      let address = ""
      const addressComponents = place.address_components;

      if (addressComponents) {
        addressComponents.forEach((component) => {
          if (component.types.includes("route")) {
            address = component.long_name;
          }
          setFieldValue("address", address);
          onPlaceSelected(place);
        });
      }
    })

  }, [onPlaceSelected]);


  return (
    <Box>
      <InputLabel htmlFor={"address"}>Address</InputLabel>
      <Input inputRef={autocompleteInput} name="address" id="address" disableUnderline
        sx={{
          width: '100%', border: '1px solid rgba(0,40,100,.12)',  outline:'none', padding:'0 10px' ,borderRadius: '0.3rem', color: theme.palette.text.primary,
          '&:hover': {
            borderColor: theme.palette.text.primary,
          },
          '&:focus-within': {
            borderColor: theme.palette.primary.dark,
            border: `2px solid ${theme.palette.primary.dark}`
          }
        }} />
    </Box>
  );
};

export default Autocomplete;
