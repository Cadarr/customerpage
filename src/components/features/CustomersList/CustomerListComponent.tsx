import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
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
import { useEffect, useState } from "react";
import useGetCustomers from "../../../hooks/useGetCustomers";
import { Link } from "react-router-dom";

const defaultTheme = createTheme();

const CustomerList = () => {
  const [appError, setAppError] = useState("");
  const [loading, setLoading] = useState(false);

  const [customers, setCustomers] = useState([]);
  const fetchCustomers = useGetCustomers();

  useEffect(() => {
    const loadCustomers = async () => {
      setLoading(true);
      setAppError("");
      try {
        const fetchedCustomers = await fetchCustomers();
        setCustomers(fetchedCustomers);
      } catch (error) {
        console.error("Fehler beim Laden der Kunden:", error);
        setAppError("Fehler beim Laden der Kunden: " + error);
        setLoading(false);
      }
      setLoading(false);
    };
    loadCustomers();
  }, [fetchCustomers]);

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
          {appError && <Alert severity="error">{appError}</Alert>}
          <Container>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: blue[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Container>
          <Link to={"/createcustomer"}>
            <Button variant="contained">+ Neuer Kunde</Button>
          </Link>
          <Grid container spacing={2} sx={{ display: "flex", alignItems: "stretch" }}>
            {customers.map((customer: any) => (
              <Grid key={customer.id} sx={{ display: "flex" }}>
                <CustomerCard
                  key={customer.id}
                  customer={customer}
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
