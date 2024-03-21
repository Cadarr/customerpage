import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

const defaultTheme = createTheme();

const CustomerCard = ({ customer, onEdit, onDelete } : any) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Card sx={{ minWidth: 275, margin: 2  }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Kunde #{customer.id}
          </Typography>
          <Typography variant="h5" component="div">
            {customer.firstName} {customer.lastName}
          </Typography>
          {customer.vatId && (
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Umsatzsteuer-IdNr.: {customer.vatId}
            </Typography>
          )}
          <Typography variant="body2">
            {customer.streetAndNumber}
            {customer.addressAddition && ", " + customer.addressAddition}
            <br />
            {customer.postalCode} {customer.city}
            {customer.country && ", " + customer.country}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => onEdit(customer.id)}>Bearbeiten</Button>
          <Button size="small" onClick={() => onDelete(customer.id)}>Löschen</Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}

export default CustomerCard;
