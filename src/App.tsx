import { useEffect, useState } from "react";
import "./App.css";
import CustomerForm from "./components/features/CustomerForm/CustomerFormComponent";
import CustomerList from "./components/features/CustomersList/CustomerListComponent";
import useGetCustomers from "./hooks/useGetCustomers";
import { Alert, CircularProgress, Container } from "@mui/material";
import { blue } from "@mui/material/colors";

function App() {
  const [appError, setAppError] = useState("");
  const [loading, setLoading] = useState(false);

  const [customers, setCustomers] = useState([]); // Initialisiere den Kunden-Zustand als leeres Array
  const fetchCustomers = useGetCustomers(); // Verwende den benutzerdefinierten Hook

  useEffect(() => {
    const loadCustomers = async () => {
      setLoading(true);
      setAppError("");
      try {
        const fetchedCustomers = await fetchCustomers();
        setCustomers(fetchedCustomers); // Aktualisiere den Zustand mit den abgerufenen Kunden
      } catch (error) {
        console.error("Fehler beim Laden der Kunden:", error);
        setAppError("Fehler beim Laden der Kunden: " + error);
        setLoading(false);
      }
      setLoading(false);
    };
    loadCustomers();
  }, [fetchCustomers]); // Abhängigkeiten, um den Effekt auszulösen

  return (
    <>
      {appError && <Alert severity="error">{appError}</Alert>}
      <Container>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: blue[500],
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
      </Container>

      <CustomerList customers={customers} />
      <CustomerForm />
    </>
  );
}

export default App;
