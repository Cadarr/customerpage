import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { blue } from "@mui/material/colors";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useSubmitCustomer from "../../../hooks/useSubmitCustomer";
import { Alert, CircularProgress } from "@mui/material";
import { useState } from "react";

const defaultTheme = createTheme();

const CustomerForm = () => {
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = React.useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [notes, setNotes] = useState("");

  const [vatIdError, setVatIdError] = useState("");

  const submitCustomer = useSubmitCustomer();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setFormError("");
    const data = new FormData(event.currentTarget);
    const customerData = {
      id: data.get("id"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      notes: data.get("notes"),
      vatId: data.get("vatId"),
      addressAddition: data.get("addressAddition"),
      streetAndNumber: data.get("streetAndNumber"),
      postalCode: data.get("postalCode"),
      city: data.get("city"),
      country: data.get("country"),
    };
    try {
      const status = await submitCustomer(customerData);
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setFormError(`Fehler beim Anlegen des Kunden - ${error.message}`);
      } else {
        setFormError("Ein unbekannter Fehler ist aufgetreten");
      }
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
          <Avatar sx={{ m: 1, bgcolor:  blue[500] }}>
            <PersonAddAltOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Kunde anlegen
          </Typography>
          <Box role="form" component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {formError && <Alert severity="error">{formError}</Alert>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Vorname"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
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
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
                  defaultValue="wird automatisch vergeben"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  name="notes"
                  label="Notizen"
                  id="notes"
                  multiline
                  rows={4}
                  inputProps={{ maxLength: 100 }}
                  helperText={`${100 - notes.length} Zeichen verbleibend`}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 3 }}>
                <Typography variant="subtitle1">Steuerangaben</Typography>

                <TextField
                  fullWidth
                  name="vatId"
                  label="Umsatzsteuer-IdNr."
                  id="vatId"
                  error={vatIdError !== ""}
                  helperText={vatIdError || undefined}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 3 }}>
                <Typography variant="subtitle1">Adresse</Typography>
                <TextField fullWidth name="addressAddition" label="Adresszusatz" id="addressAddition" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="streetAndNumber"
                  label="Straße und Hausnummer"
                  id="streetAndNumber"
                  autoComplete="street-address"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="PLZ" fullWidth id="postalCode" name="postalCode" autoComplete="postal-code" />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField label="Ort" fullWidth id="city" name="city" autoComplete="address-level2" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth name="country" label="Land" id="country" autoComplete="country-name" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button fullWidth variant="text">
                  Abbrechen
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button type="submit" fullWidth variant="contained" disabled={!firstName || !lastName || loading}>
                  Kunde anlegen
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
}

export default CustomerForm;