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
import { blue } from "@mui/material/colors";
import GroupsIcon from "@mui/icons-material/Groups";

const defaultTheme = createTheme();

const CustomerList = ({ customers }: any) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: blue[500] }}>
            <GroupsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Kunden anzeigen
          </Typography>
          <Button variant="contained">+ Neuer Kunde</Button>
          <Grid container spacing={2} sx={{ display: "flex", alignItems: "stretch" }}>
            {customers.map((customer: any) => (
              <Grid key={customer.id} sx={{ display: "flex" }}>
                <CustomerCard
                  key={customer.id}
                  customer={customer}
                  onEdit={(id: any) => alert(`Bearbeiten für Kunde #${id}`)}
                  onDelete={(id: any) => alert(`Löschen für Kunde #${id}`)}
                />{" "}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CustomerList;
