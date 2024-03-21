import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import useAuth from "../../context-client/hooks/useAuth";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const PaymentStatus = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const collection_status = queryParams.get("collection_status");
  const merchant_order_id = queryParams.get("merchant_order_id");

  // const collection_id = queryParams.get("collection_id");
  // const payment_id = queryParams.get("payment_id");
  const { user } = useAuth0();
  const { auth } = useAuth();

  console.log(collection_status);
  console.log(merchant_order_id);

  const putApproved = async () => {
    let id = "";

    if (user !== undefined) {
      id = user.id;
      console.log(id);
    } else if (auth !== undefined) {
      id = auth.id;
      console.log(id);
    }
    const response = await axios.put(`${VITE_BACKEND_URL}/update/${id}`, {
      status: collection_status,
      ticket: merchant_order_id,
    });
    return;
  };

  if (collection_status === "approved") {
    putApproved();
  }

  return (
    <div>
      <h2>Pago Confirmado</h2>
    </div>
  );
};

export default PaymentStatus;
