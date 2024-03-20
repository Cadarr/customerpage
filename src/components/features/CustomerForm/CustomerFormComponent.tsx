import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

export default function CustomerForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      id: data.get("id"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      notes: data.get("notes"),
      vatId: data.get("vatId"),
      addressAddition: data.get("addressAddition"),
      streetAndNumber: data.get("streetAndNumber"),
      postalCode: data.get("postalCode"),
      city: data.get("city"),
      country: data.get("country")
    });
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PersonAddAltOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Kunde anlegen
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Vorname"
                  required
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
                  required
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
                <TextField fullWidth name="notes" label="Notizen" id="notes" multiline rows={4} />
              </Grid>

              <Grid item xs={12} sx={{ mt: 3 }}>
                <Typography variant="subtitle1">Steuerangaben</Typography>

                <TextField fullWidth name="vatId" label="Umsatzsteuer-IdNr." id="vatId" />
              </Grid>

              <Grid item xs={12} sx={{ mt: 3 }}>
                <Typography variant="subtitle1">Adresse</Typography>
                <TextField fullWidth name="addressAddition" label="Adresszusatz" id="addressAddition" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth name="streetAndNumber" label="Straße und Hausnummer" id="streetAndNumber" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="PLZ" fullWidth id="postalCode" name="postalCode" autoFocus />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField label="Ort" fullWidth id="city" name="city" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth name="country" label="Land" id="country" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button fullWidth variant="text">
                  Abbrechen
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button type="submit" fullWidth variant="contained">
                  Kunde anlegen
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
