import React from "react";

import { CustomerService } from "./CustomerService";

export default {
  title: "Card/CustomerService",
  component: CustomerService,
};

const CustomerServiceLate = () => <CustomerService />;
export const CustomerServiceLates = CustomerServiceLate.bind({});
