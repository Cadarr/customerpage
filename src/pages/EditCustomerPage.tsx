import { Button, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const EditCustomerPage = () => {
  const { customerId } = useParams();
  return (
    <>
      <Typography variant="h4" component="h2">
        Kunde { customerId } bearbeiten
      </Typography>
      <Link to={'/'}><Button>Abbrechen</Button></Link>
    </>
  );
};

export default EditCustomerPage;