import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { blue } from "@mui/material/colors";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useSubmitCustomer from "../../../hooks/useSubmitCustomer";
import { Alert, CircularProgress } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

interface CustomerFormProps {
  customer?: Customer;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ customer }) => {
  const [formError, setFormError] = useState("");
  const [vatIdError, setVatIdError] = useState("");
  const [loading, setLoading] = useState(false);
  const [changed, setChanged] = useState(false);

  const [customerData, setCustomerData] = useState<Customer>({
    id: customer?.id || 0,
    firstName: customer?.firstName || "",
    lastName: customer?.lastName || "",
    notes: customer?.notes || "",
    vatId: customer?.vatId || "",
    addressAddition: customer?.addressAddition || "",
    streetAndNumber: customer?.streetAndNumber || "",
    postalCode: customer?.postalCode || "",
    city: customer?.city || "",
    country: customer?.country || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
    setChanged(true);
  };

  const submitCustomer = useSubmitCustomer();
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setFormError("");
    try {
      if (await submitCustomer(customerData)) navigate("/");
    } catch (error) {
      setLoading(false);
      const serviceError = error as ServiceError;
      serviceError.messages?.forEach((msg) => {
        if (msg.property === "vatId") {
          setVatIdError(
            msg.message === "The VAT ID is invalid."
              ? "Ungültige Umsatzsteuer-IdNr."
              : "Umsatzsteuer-IdNr. konnte nicht verifiziert werden."
          );
        } else {
          setFormError(msg.message + " " + formError);
        }
      });
      if (serviceError.message) setFormError(serviceError.message + " " + formError);
    }

    setLoading(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
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
            {customer ? <Person3OutlinedIcon /> : <PersonAddAltOutlinedIcon />}
          </Avatar>
          <Typography component="h1" variant="h5">
            {customer ? "Kunde bearbeiten" : "Kunde anlegen"}
          </Typography>
          <Box role="form" component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {formError && <Alert severity="error">{formError}</Alert>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Vorname"
                  value={customerData.firstName}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  fullWidth
                  id="firstName"
                  name="firstName"
                  autoComplete="given-name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nachname"
                  value={customerData.lastName}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  fullWidth
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="id"
                  label="Kunden-Nr."
                  id="id"
                  disabled
                  defaultValue={customer?.id || "wird automatisch vergeben"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={customerData.notes}
                  onChange={handleChange}
                  name="notes"
                  label="Notizen"
                  id="notes"
                  multiline
                  rows={4}
                  inputProps={{ maxLength: 100 }}
                  helperText={`${100 - (customerData.notes ? customerData.notes.length : 0)} Zeichen verbleibend`}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 3 }}>
                <Typography variant="subtitle1">Steuerangaben</Typography>

                <TextField
                  fullWidth
                  value={customerData.vatId}
                  onChange={handleChange}
                  name="vatId"
                  label="Umsatzsteuer-IdNr."
                  id="vatId"
                  error={vatIdError !== ""}
                  helperText={vatIdError || undefined}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 3 }}>
                <Typography variant="subtitle1">Adresse</Typography>
                <TextField
                  fullWidth
                  value={customerData.addressAddition}
                  onChange={handleChange}
                  name="addressAddition"
                  label="Adresszusatz"
                  id="addressAddition"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={customerData.streetAndNumber}
                  onChange={handleChange}
                  name="streetAndNumber"
                  label="Straße und Hausnummer"
                  id="streetAndNumber"
                  autoComplete="street-address"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  value={customerData.postalCode}
                  onChange={handleChange}
                  label="PLZ"
                  fullWidth
                  id="postalCode"
                  name="postalCode"
                  autoComplete="postal-code"
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  value={customerData.city}
                  onChange={handleChange}
                  label="Ort"
                  fullWidth
                  id="city"
                  name="city"
                  autoComplete="address-level2"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={customerData.country}
                  onChange={handleChange}
                  fullWidth
                  name="country"
                  label="Land"
                  id="country"
                  autoComplete="country-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Link to={"/"}>
                  <Button fullWidth variant="text">
                    Abbrechen
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={!changed || !customerData.firstName || !customerData.lastName || loading}
                >
                  {customer ? "Kunde bearbeiten" : "Kunde anlegen"}
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
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CustomerForm;
