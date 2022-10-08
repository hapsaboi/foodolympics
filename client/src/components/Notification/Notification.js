import React, { useEffect } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Notifications({ details }) {

  const notify = () => details.type === "success" ? toast.success(details.msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    theme: "colored",
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }) : toast.error(details.msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    theme: "colored",
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });


  useEffect(() => {
    notify();
  }, [details]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default Notifications;
