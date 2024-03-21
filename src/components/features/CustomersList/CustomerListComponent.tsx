import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import CustomerCard from "../../common/CustomerCardComponent";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { Link } from "react-router-dom";

const defaultTheme = createTheme();

interface CustomerListProps {
  customers: Customer[];
  onDeleteCustomer: (id: string) => Promise<void>;
}

const CustomerList = ({ customers, onDeleteCustomer }: CustomerListProps) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: '100%',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: defaultTheme.palette.primary.main }}>
            <GroupsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Unsere wunderbaren Kunden
          </Typography>
          <Link to={"/createCustomer"}>
            <Button variant="contained" startIcon={<PersonAddAltOutlinedIcon/>} sx={{ m: 3 }}>Neuer Kunde</Button>
          </Link>
          <Grid container spacing={2} justifyContent="center">
            {customers.map((customer: any) => (
              <Grid key={customer.id} xs={12} sm={6} md={4} lg={3}>
                <CustomerCard customer={customer} onDelete={onDeleteCustomer} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CustomerList;
