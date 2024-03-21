import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import GitHubIcon from '@mui/icons-material/GitHub';

const Root = () => {
  const handleGitHubClick = (repositoryName: string) => () => {
    window.open(`https://github.com/Cadarr/${repositoryName}`, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: 'inherit' }}>
              Kundenverwaltung
          </Link>
          </Typography>
          <Button color="inherit" startIcon={<GitHubIcon />} onClick={handleGitHubClick("customerpage")}>
            Client
          </Button>
          <Button color="inherit" startIcon={<GitHubIcon />} onClick={handleGitHubClick("customerservice")}>
            Service
          </Button>
        </Toolbar>
      </AppBar>

      <div id="content">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
