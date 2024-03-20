import "./App.css";
import CustomerForm from "./components/features/CustomerForm/CustomerFormComponent";
import CustomerList from "./components/features/CustomersList/CustomerListComponent";


function App() {

  return (
    <>
      <CustomerList />      
      <CustomerForm />
    </>
  );
}

export default App;
