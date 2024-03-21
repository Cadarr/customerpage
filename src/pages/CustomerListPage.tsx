import { Button, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

const CustomerListPage = () => {
  return (
    <>
      <Typography variant="h4" component="h2">
        Kunden anzeigen
      </Typography>
      <Link to={'/createcustomer'}><Button>Kunde anlegen</Button></Link>
      <Link to={'/editcustomer/1'}><Button>Kunde bearbeiten</Button></Link>

    </>
  );
};

export default CustomerListPage;