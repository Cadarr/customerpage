import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Kundenverwaltung
          </Typography>
          <Button color="inherit">GitHub</Button>
        </Toolbar>
      </AppBar>

      <div id="content">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
