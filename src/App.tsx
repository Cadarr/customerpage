import "./App.css";
import CustomerCard from "./components/common/CustomerCardComponent";
import CustomerForm from "./components/features/CustomerForm/CustomerFormComponent";
import CustomerList from "./components/features/CustomersList/CustomerListComponent";

function App() {
  const customerData = {
    id: 3,
    firstName: "Johannes",
    lastName: "Berger",
    notes: "Johannes ist Jäger.",
    vatId: "DE123456798",
    addressAddition: "Hinterm Hochsitz",
    streetAndNumber: "Jägerweg 3",
    postalCode: "34567",
    city: "Jägerstadt",
    country: "Deutschland",
  };
  const customerData2 = {
    id: 2,
    firstName: "Johannes",
    lastName: "Mengliger",
    notes: undefined,
    vatId: undefined,
    addressAddition: "Hinterm Hochsitz",
    streetAndNumber: undefined,
    postalCode: "34567",
    city: "Jägerstadt",
    country: "Deutschland",
  };
  const customerData3 = {
    id: 123,
    firstName: "Johannes",
    lastName: "Alphons",
    notes: undefined,
    vatId: undefined,
    streetAndNumber: "Golemweg 3B",
    postalCode: "34567",
    city: "Jägerstadt",
  };
  let customers = [
    customerData, customerData2, customerData3
  ];

  
  customers = customers.sort((a, b) => a.lastName.localeCompare(b.lastName));


  return (
    <>
      <CustomerList customers={customers} />
      <CustomerForm />
    </>
  );
}

export default App;
