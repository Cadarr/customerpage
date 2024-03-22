import { Avatar, Box, Button, Container, Grid, Typography } from "@mui/material";
import CustomerCard from "../../common/CustomerCardComponent";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";

interface CustomerListProps {
  customers: Customer[];
  onDeleteCustomer: (id: string) => Promise<void>;
}

const CustomerList = ({ customers, onDeleteCustomer }: CustomerListProps) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.main }}>
          <GroupsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t("unsereKunden")}
        </Typography>
        <Link to={"/createCustomer"}>
          <Button variant="contained" startIcon={<PersonAddAltOutlinedIcon />} sx={{ m: 3 }}>
            {t("neuerKunde")}
          </Button>
        </Link>
        <Grid container spacing={2} justifyContent="center">
          {customers.map((customer: any) => (
            <Grid item key={customer.id} xs={12} sm={6} md={4} lg={3}>
              <CustomerCard customer={customer} onDelete={onDeleteCustomer} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default CustomerList;
