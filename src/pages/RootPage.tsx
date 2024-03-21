import { Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <Typography variant="h3" component="h1">
        Kundenverwaltung
      </Typography>
      <div id="content">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
