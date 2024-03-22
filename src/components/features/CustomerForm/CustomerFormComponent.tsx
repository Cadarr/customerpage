import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import useSubmitCustomer from "../../../hooks/useSubmitCustomer";
import { Alert, CircularProgress } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";

interface CustomerFormProps {
  customer?: Customer;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ customer }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [formError, setFormError] = useState("");
  const [vatIdError, setVatIdError] = useState("");
  const [loading, setLoading] = useState(false);
  const [changed, setChanged] = useState(false);

  const [customerData, setCustomerData] = useState<Customer>(
    customer || {
      id: "",
      firstName: "",
      lastName: "",
      notes: "",
      vatId: "",
      addressAddition: "",
      streetAndNumber: "",
      postalCode: "",
      city: "",
      country: "",
    }
  );

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
          setVatIdError(msg.message === "The VAT ID is invalid." ? t("ungueltigeUmStId") : t("unverifizierteUmStId"));
        } else {
          setFormError(msg.message + " " + formError);
        }
      });
      if (serviceError.message) {
        setFormError((prevError) => `${serviceError.message} ${prevError}`);
      }
    }

    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs" >
      <Box
        sx={{
          marginTop: 6,
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "#ffffff"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.main }}>
          {customer ? <Person3OutlinedIcon /> : <PersonAddAltOutlinedIcon />}
        </Avatar>
        <Typography component="h1" variant="h5">
          {customer ? t("kundeBearbeiten") : t("kundeAnlegen")}
        </Typography>
        <Box role="form" component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {formError && <Alert severity="error">{formError}</Alert>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={t("vorname")}
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
                label={t("nachname")}
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
                label={t("kundenNr")}
                id="id"
                disabled
                defaultValue={customer?.id || t("wirdAutomatischVergeben")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                value={customerData.notes}
                onChange={handleChange}
                name="notes"
                label={t("notizen")}
                id="notes"
                multiline
                rows={4}
                inputProps={{ maxLength: 100 }}
                helperText={`${100 - (customerData.notes ? customerData.notes.length : 0)} ${t("zeichenVerbleibend")}`}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 3 }}>
              <Typography variant="subtitle1">{t("steuerangaben")}</Typography>

              <TextField
                fullWidth
                value={customerData.vatId}
                onChange={handleChange}
                name="vatId"
                label={t("umsatzsteuerIdNr")}
                id="vatId"
                error={vatIdError !== ""}
                helperText={vatIdError || undefined}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 3 }}>
              <Typography variant="subtitle1">{t("adresse")}</Typography>
              <TextField
                fullWidth
                value={customerData.addressAddition}
                onChange={handleChange}
                name="addressAddition"
                label={t("adresszusatz")}
                id="addressAddition"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                value={customerData.streetAndNumber}
                onChange={handleChange}
                name="streetAndNumber"
                label={t("strasseUndHausnummer")}
                id="streetAndNumber"
                autoComplete="street-address"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                value={customerData.postalCode}
                onChange={handleChange}
                label={t("plz")}
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
                label={t("ort")}
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
                label={t("land")}
                id="country"
                autoComplete="country-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button component={Link} to="/" fullWidth variant="text">
                {t("abbrechen")}
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!changed || !customerData.firstName.trim() || !customerData.lastName.trim() || loading}
              >
                {customer ? t("kundeBearbeiten") : t("kundeAnlegen")}
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: theme.palette.primary.main,
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
  );
};

export default CustomerForm;
