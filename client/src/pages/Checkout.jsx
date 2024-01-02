import PayeeDetails from "../PayeeDetails/PayeeDetails";
import { useTheme } from "@mui/material/styles";
import { Container, Typography ,Box} from '@mui/material';

const CheckoutPage = () => {
  const theme = useTheme()

  return (
    <Container>
      <Box>
        <Typography variant="h3" sx={{paddingBottom:'2rem', paddingTop:'1.3rem', fontSize:'2rem',color:theme.palette.text.primary}} >
          Payout Details
        </Typography>

      </Box>
      <PayeeDetails />
    </Container>
  );
};

export default CheckoutPage;
