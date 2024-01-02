import React from 'react';
import { Box, Container, Typography, Grid, InputLabel, Select, MenuItem } from "@mui/material";
import { Formik, Form, Field, FormikProvider } from "formik";
import AutoComplete from './AutoComplete'
import * as yup from "yup";
import InputField from '../InputField';
import { useState } from "react";
import PayoutOptions from "../PayoutOptions/PayoutOptions";
import CustomPhoneInput from "./PhoneInput";
import countries from './countries';


const validationSchema = yup.object().shape({
    name: yup.string().required("Required"),
    address: yup.string().required("Required"),
    city: yup.string(),
    zipCode: yup.string(),
    paypalEmail: yup.string().email("Invalid email address"),
    payeeType: yup.string(),
    country: yup.string(),
});


export default function PayeeDetails() {
    const [payeeType, setPayeeType] = useState("Company");
    const [phone, setPhone] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);

    const parseAddressComponents = (addressComponents) => {
        let city = '';
        let stateRegion = '';
        let zipCode = '';
        let country = '';
        let addressLine2 = '';

        addressComponents.forEach((component) => {
            if (component.types.includes("sublocality_level_1")) {
                addressLine2 = component.long_name;
            }
            else if (component.types.includes("locality")) {
                city = component.long_name;
            } else if (component.types.includes("administrative_area_level_1")) {
                stateRegion = component.short_name;
            } else if (component.types.includes("postal_code")) {
                zipCode = component.long_name;
            } else if (component.types.includes("country")) {
                country = component.long_name;
            }
        });

        return { city, stateRegion, zipCode, country, addressLine2 };
    };

    const onPlaceSelected = (place, setFieldValue) => {
        // Get the address components from the place object
        const addressComponents = place.address_components;
        const parsedAddress = parseAddressComponents(addressComponents);
        setFieldValue("addressLine2", parsedAddress.addressLine2);
        setFieldValue("city", parsedAddress.city);
        setFieldValue("stateRegion", parsedAddress.stateRegion);
        setFieldValue("zipCode", parsedAddress.zipCode);
        setFieldValue("country", parsedAddress.country);

    };

    const handlePayeeTypeChange = (e) => {
        setPayeeType(e.target.value);
    };


    return (

        <Box maxWidth="xl">

            <Formik
                initialValues={{
                    name: "",
                    phone: "",
                    payeeType: "Company",
                    address: "",
                    addressLine2: "",
                    city: "",
                    stateRegion: "",
                    country: "",
                    zipCode: "",
                    paypalEmail: "",
                }}
                validationSchema={validationSchema}

                onSubmit={(
                    values,
                    formikHelpers
                ) => {
                    alert(JSON.stringify(values, null, 2));
                    formikHelpers.resetForm();
                    formikHelpers.setFieldValue("address", "");
                    formikHelpers.setFieldValue("phone", "");
                    formikHelpers.setSubmitting(false);
                }}
            >
                {(formikProps) => (
                    <FormikProvider value={formikProps}>

                        <Form>
                            <Container sx={{
                                backgroundColor: 'white',
                                boxShadow: 3

                            }}>

                                <Typography variant="h5" sx={{ borderBottom: 1, borderColor: 'rgba(0,40,100,.12)', paddingTop: '1rem', paddingBottom: '1rem', width: '100%' }}>
                                    Payment Details
                                </Typography>
                                <Grid container spacing={2} sx={{ borderBottom: 1, borderColor: 'rgba(0,40,100,.12)', paddingBottom: '2.5rem', paddingTop: '2rem', }}>
                                    <Grid item xs={12} sm={6}>

                                        <Field
                                            name="name"
                                            label="Payee Name"
                                            size="medium"
                                            fullWidth
                                            component={InputField}
                                        />

                                    </Grid>
                                    <Grid item xs={12} sm={6}>

                                        <InputLabel id="payeeType">Payee Type</InputLabel>
                                        <Select
                                            labelId="payeeType"
                                            id="payeeTypeSelect"
                                            value={payeeType}
                                            onChange={handlePayeeTypeChange}
                                            autoWidth
                                            label="Payee Type"
                                            fullWidth
                                        >
                                            <MenuItem value={"Company"}>Company</MenuItem>
                                            <MenuItem value={"Personal"}>Personal</MenuItem>
                                            <MenuItem value={"Other"}>Other</MenuItem>
                                        </Select>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <CustomPhoneInput
                                            value={phone}
                                            onChange={setPhone}
                                            name='phone'
                                            id='phone'
                                        />
                                    </Grid>


                                </Grid>


                                <Grid container spacing={2} sx={{ paddingTop: '2rem', paddingBottom: '2.5rem' }}>
                                    <Grid item xs={12} sm={6} >
                                        <AutoComplete onPlaceSelected={(place) => onPlaceSelected(place, formikProps.setFieldValue)} />

                                    </Grid>
                                    <Grid item xs={12} sm={6}>

                                        <Field
                                            name="addressLine2"
                                            label="Address, Line #2"
                                            size="medium"
                                            fullWidth
                                            component={InputField}
                                        />

                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>

                                        <Field
                                            name="city"
                                            label="City"
                                            size="medium"
                                            fullWidth
                                            component={InputField}
                                        />

                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>

                                        <Field
                                            name="stateRegion"
                                            label="State / Region"
                                            size="medium"
                                            fullWidth
                                            component={InputField}
                                            sx={{ backgroundColor: '#f8f9fa' }}
                                        />

                                    </Grid>

                                    <Grid item xs={12} sm={6} md={4}>

                                        <Field
                                            name="zipCode"
                                            label="Zip code"
                                            size="medium"
                                            fullWidth
                                            component={InputField}
                                        />

                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <InputLabel id="country">Country</InputLabel>
                                        <Select
                                            name="country"
                                            labelId="country"
                                            id="countrySelect"
                                            value={formikProps.values.country}
                                            onChange={(e) => formikProps.setFieldValue("country", e.target.value)}
                                            autoWidth
                                            label="Country"
                                            fullWidth
                                        >
                                            {countries.map((country) => (
                                                <MenuItem key={country.code} value={country.name}>{country.name}</MenuItem>
                                            ))}

                                        </Select>
                                    </Grid>

                                </Grid>

                            </Container>
                            <PayoutOptions country={formikProps.values.country} />



                        </Form>
                    </FormikProvider>

                )}
            </Formik>
        </Box >

    );
}
