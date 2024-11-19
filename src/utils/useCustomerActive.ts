import { useState } from "react";


export const useCustomerActive = () => {
  const [customerActive, setCustomerActive] = useState(null);

  const activateCustomer = (customer: any) => {
    setCustomerActive(customer); // Activate a customer
  };

  const clearCustomer = () => {
    setCustomerActive(null); // Clear active customer
  };

  return {
    customerActive,
    activateCustomer,
    clearCustomer,
  };
};
