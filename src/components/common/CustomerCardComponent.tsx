import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const defaultTheme = createTheme();

interface CustomerCardProps {
  customer: Customer;
  onDelete: (id: string) => void;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onDelete }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Card
        sx={{
          minWidth: 275,
          maxWidth: 345,
          margin: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {" "}
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
          <Typography variant="body2">
            <br />
            {customer.notes}
          </Typography>
        </CardContent>
        <CardActions>
          <Button component={Link} to={`/editCustomer/${customer.id}`} size="small">
            Bearbeiten
          </Button>
          <Button size="small" onClick={() => onDelete(customer.id)}>
            Löschen
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
};

export default CustomerCard;
