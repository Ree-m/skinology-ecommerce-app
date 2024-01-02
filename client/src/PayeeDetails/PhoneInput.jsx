import React from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { styled } from '@mui/material/styles';
import { Box, InputLabel } from "@mui/material";

const MUIStyledPhoneInput = styled(PhoneInput)(({ theme }) => {

    const borderColor = 'rgba(0,40,100,.12)';
    const inputPadding = '0.375rem 0.75rem';

    return {
        ' &.PhoneInput': {

            border: `1px solid ${borderColor}`,
            outline: 'none',
            fontSize: '1rem',
            fontFamily: theme.typography.fontFamily,
            color: theme.palette.text.primary,
            padding: inputPadding,
            borderRadius: '0.3rem',
            '&:hover': {
                borderColor: theme.palette.text.primary,
            },
            '&:focus-within': {
                borderColor: theme.palette.primary.dark,
                border: `2px solid ${theme.palette.primary.dark}`
            }
        },
        '& .PhoneInputInput': {
            flex: 1,
            border: '0',
            outline: 'none',
            fontSize: '1rem',
            fontFamily: theme.typography.fontFamily,
            color: theme.palette.text.primary,
            padding: inputPadding,
        },
        '& .PhoneInputCountrySelect': {
            color: '#495057',
            paddingRight: '1rem',
            paddingBottom: '10rem',
            paddingTop: '3rem',
            cursor: 'pointer',
            borderRight: `1px solid ${borderColor}`,
            borderTopLeftRadius: theme.shape.borderRadius,
            borderBottomLeftRadius: theme.shape.borderRadius,
            height: '100%',
            '&:hover': {
                borderColor: 'pink',
            },
            ':focus': {
                borderColor: 'pink',
            }

        }
    }
});

export default function CustomPhoneInput( {value, onChange,id,name} ) {
    return (
        <Box>
            <InputLabel
            htmlFor={id}
            >
                Phone Number
            </InputLabel>
            <MUIStyledPhoneInput
            id={id}
            name={name}
                placeholder="Enter phone number"
                value={value}
                onChange={onChange}
                defaultCountry='US'

            />
        </Box>

    );
}
