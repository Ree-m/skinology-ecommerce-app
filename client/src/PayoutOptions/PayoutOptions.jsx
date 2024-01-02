import React, { useEffect } from 'react';
import { Box, Container, Radio, Typography, Grid, Button } from "@mui/material";
import { useState } from "react";
import InputField from '../InputField';
import { useTheme } from "@mui/material/styles";
import { Field } from "formik";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCcPaypal } from '@fortawesome/free-brands-svg-icons';
import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
import CustomStyledButton from './CustomStyledButton';
import Cookies from 'js-cookie';


// dummy payout options
const dummyPayoutOptions = {
  payout_options: ["paypal", "check", "bank", "stripe"],
  bank_fields: ["account_number", "routing_number", "account_type"]
};
const dummyPayoutOptions2 = {
  payout_options: ["paypal", "check", "bank"],
  bank_fields: ["account_number", "routing_number", "account_type"]
};

const dummyPayoutOptions3 = {
  payout_options: ["paypal"],
  bank_fields: ["account_number", "routing_number", "account_type"]
};


export default function PayoutOptions() {
  const [selectedValue, setSelectedValue] = useState("");
  // real payout options
  // const [payoutOptions, setPayoutOptions] = useState<Array<string>>([""]);

  // dummy payout options
  const [payoutOptions, setPayoutOptions] = useState(dummyPayoutOptions.payout_options);
  const theme = useTheme();


  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };




  return (
    <Container maxWidth="xl" sx={{
      boxShadow: 3, marginTop: '2rem', backgroundColor: 'white', paddingBottom: '2rem'
    }}>
      <Typography variant="h5" sx={{ borderBottom: 1, borderColor: 'rgba(0,40,100,.12)', paddingTop: '1rem', paddingBottom: '1rem', width: '100%' }}>
        Payout Options
      </Typography>
      <Grid container spacing={2} sx={{ paddingBottom: '2.5rem', paddingTop: '2rem' }}>
        {payoutOptions.map((option) => {
          if (option.toLowerCase() === 'paypal') {
            return (
              <Grid key={option} item xs={12} sx={selectedValue === 'Paypal' ? { backgroundColor: 'lightblue', color: theme.palette.secondary.main, border: `1px solid ${theme.palette.secondary.main}`, margin: '0.3rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' } : { border: '1px solid rgba(0,40,100,.12)', margin: '0.3rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
                <label>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                      <Radio
                        value="Paypal"
                        checked={selectedValue === 'Paypal'}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item>
                      <FontAwesomeIcon icon={faCcPaypal} style={selectedValue === 'Paypal' ? { color: theme.palette.secondary.main } : { color: theme.palette.text.primary }} />
                    </Grid>
                    <Grid item>
                      <Typography sx={selectedValue === 'Paypal' ? { color: theme.palette.secondary.main } : { color: theme.palette.text.primary }}>Paypal</Typography>
                    </Grid>
                  </Grid>
                </label>
              </Grid>
            );
          }


          if (option.toLowerCase() === 'bank') {
            return (

              <Grid item xs={12} sx={selectedValue === 'Bank' ? { backgroundColor: 'lightblue', color: theme.palette.secondary.main, border: `1px solid ${theme.palette.secondary.main}`, margin: '0.3rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' } : { border: '1px solid rgba(0,40,100,.12)', margin: '0.3rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
                <label>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                      <Radio
                        value="Bank"
                        checked={selectedValue === 'Bank'}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item>
                      <AccountBalanceIcon style={selectedValue === 'Bank' ? { color: theme.palette.secondary.main } : { color: theme.palette.text.primary }} />
                    </Grid>
                    <Grid item>
                      <Typography sx={selectedValue === 'Bank' ? { color: theme.palette.secondary.main } : { color: theme.palette.text.primary }}>Bank</Typography>
                    </Grid>
                  </Grid>
                </label>
              </Grid>
            )
          }
          if (option.toLowerCase() === 'check') {
            return (
              <Grid key={option} item xs={12} sx={selectedValue === 'Check' ? { backgroundColor: 'lightblue', color: theme.palette.secondary.main, border: `1px solid ${theme.palette.secondary.main}`, margin: '0.3rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' } : { border: '1px solid rgba(0,40,100,.12)', margin: '0.3rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
                <label>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                      <Radio
                        value="Check"
                        checked={selectedValue === 'Check'}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item>
                      <FontAwesomeIcon icon={faMoneyCheck} style={selectedValue === 'Check' ? { color: theme.palette.secondary.main } : { color: theme.palette.text.primary }} />
                    </Grid>
                    <Grid item>
                      <Typography sx={selectedValue === 'Check' ? { color: theme.palette.secondary.main } : { color: theme.palette.text.primary }}>Check</Typography>
                    </Grid>
                  </Grid>
                </label>
              </Grid>
            );
          }

          if (option.toLowerCase() === "stripe") {
            return (
              <Grid item xs={12} sx={selectedValue === 'Stripe' ? { backgroundColor: 'lightblue', color: theme.palette.secondary.main, border: `1px solid ${theme.palette.secondary.main}`, margin: '0.3rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' } : { border: '1px solid rgba(0,40,100,.12)', margin: '0.3rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
                <label>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                      <Radio
                        value="Stripe"
                        checked={selectedValue === 'Stripe'}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item>
                      <FontAwesomeIcon icon={faMoneyCheck} style={selectedValue === 'Stripe' ? { color: theme.palette.secondary.main } : { color: theme.palette.text.primary }} />
                    </Grid>
                    <Grid item>
                      <Typography sx={selectedValue === 'Stripe' ? { color: theme.palette.secondary.main } : { color: theme.palette.text.primary }}>Stripe</Typography>
                    </Grid>
                  </Grid>
                </label>
              </Grid>
            )
          }
          return null;
        })
        }



      </Grid>

      <Box sx={{ borderBottom: 1, borderColor: 'rgba(0,40,100,.12)', paddingBottom: '4rem' }}>
        <Typography variant="h5" color={`${theme.palette.text.primary}`} fontWeight={600} paddingBottom='1rem'>PayPal Details</Typography>
        <Box sx={{ backgroundColor: '#f8f9fa', border: '1px solid rgba(0,40,100,.12)', paddingTop: '1rem', paddingLeft: '1rem', paddingBottom: '2.5rem', width: '50%' }}>
          <Field
            name="paypalEmail"
            label="Paypal Email"
            size="medium"
            sx={{ width: '80%', backgroundColor: "white" }}
            component={InputField}
          />
        </Box>
      </Box>

      <Box sx={{ textAlign: 'right' }}>
        {/* <Button
          type="submit"
          variant="outlined"
          size="large"
          // disabled={formikProps.isSubmitting}
          sx={{
            color: 'white', marginTop: '1rem', paddingTop: '0.5rem', backgroundColor: theme.palette.primary.main, borderRadius: '0', ':hover': {
              backgroundColor: 'rgba(70, 127, 207, 0.85)', boxShadow: '0 5px 15px rgba(145, 92, 182, .4)'
            }
          }}
        >
          Submit Details
        </Button> */}

      </Box>


    </Container >
  );
}
