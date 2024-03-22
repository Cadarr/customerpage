import { useTranslation } from "react-i18next";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const { t } = useTranslation();

  const error : any = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>{t("oops")}</h1>
      <p>{t("unerwarteterFehler")}</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;