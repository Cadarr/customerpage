import { AppBar, Box, Button, Toolbar, Typography, Link as MuiLink, ButtonGroup } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import ApiOutlinedIcon from "@mui/icons-material/ApiOutlined";
import TranslateIcon from "@mui/icons-material/Translate";
import { useTheme } from "@mui/material/styles";


import { useTranslation } from "react-i18next";

const Root = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();


  const handleGitHubClick = (repositoryName: string) => () => {
    window.open(`https://github.com/Cadarr/${repositoryName}`, "_blank", "noopener,noreferrer");
  };
  const handleApiClick = () => () => {
    window.open(`${import.meta.env.VITE_CUSTOMER_SERVICE_URL}/swagger-ui/index.html`, "_blank", "noopener,noreferrer");
  };
  const handleChangeLanguage = (language: string) => () => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ bgcolor: theme.palette.secondary.main }} >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              {t("kundenverwaltung")}
            </Link>
          </Typography>
          <Button color="inherit" startIcon={<GitHubIcon />} onClick={handleGitHubClick("customerpage")}>
            Client
          </Button>
          <Button color="inherit" startIcon={<GitHubIcon />} onClick={handleGitHubClick("customerservice")}>
            Service
          </Button>
          <Button color="inherit" startIcon={<ApiOutlinedIcon />} onClick={handleApiClick()}>
            API
          </Button>
          <ButtonGroup variant="text" aria-label="Basic button group" sx={{ ml: 2,  alignItems: 'center' }}>
          <TranslateIcon />
          <Button color="inherit" size="small" onClick={handleChangeLanguage("de")} sx={{ minWidth: 0 }}  >
            DE
          </Button>
          <Button color="inherit" size="small" onClick={handleChangeLanguage("kl")}>
            KL
          </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>

      <div id="content">
        <Outlet />
      </div>

      <Box component="footer" sx={{ mt: 30, textAlign: "center" }}>
        <MuiLink href="https://coaching.cards/impressum/" target="_blank" rel="noopener noreferrer">
          {t("impressum")}
        </MuiLink>
      </Box>
    </>
  );
};

export default Root;
