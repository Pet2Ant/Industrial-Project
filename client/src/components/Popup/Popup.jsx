import React from "react";
import Swal from "sweetalert2";

const Popup = ({ title, text, icon, timer, showConfirmButton }) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    timer: timer,
    showConfirmButton: showConfirmButton,
  });
};

export default Popup;
