import React from 'react';
import { getIn } from 'formik'
import {  TextField, InputLabel, Box } from '@mui/material'

const InputField = (props) => {
    const isTouched = getIn(props.form.touched, props.field.name)
    const errorMessage = getIn(props.form.errors, props.field.name)

    const { label, error, helperText, field, form, ...rest } = props

    return (
        <Box>

            <InputLabel
                shrink={false}
                htmlFor={`${label}`}
            >
                {`${label}`}
            </InputLabel>
            <TextField
                variant="outlined"
                error={error ?? Boolean(isTouched && errorMessage)}
                helperText={helperText ?? ((isTouched && errorMessage) ? errorMessage : undefined)}
                {...rest}
                {...field}
            />
        </Box>

    )
}
export default InputField;
