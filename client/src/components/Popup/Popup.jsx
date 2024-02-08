import React from "react";
import Swal from "sweetalert2";

const Popup = ({
  title,
  text,
  icon,
  timer,
  showConfirmButton,
  showCloseButton,
  confirmFunction,
  cancelFunction,
  anotherFunction,
  showDenyButton,
  confirmButtonText,
  denyButtonText,
  allowOutsideClick,
  allowEscapeKey
}) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    timer: timer,
    showConfirmButton: showConfirmButton,
    showCloseButton: showCloseButton,
    showDenyButton: showDenyButton,
    confirmButtonText: confirmButtonText,
    denyButtonText: denyButtonText,
    allowOutsideClick: allowOutsideClick,
    allowEscapeKey: allowEscapeKey
  })
    .then((result) => {
      if (result.isConfirmed) {
        confirmFunction();
      }
    }
    ).catch((error) => {
      anotherFunction();
    }).finally(() => {
      if (text === "You have successfully cancelled your application. \n Try again?") {
        cancelFunction();
      }
    });
  }

export default Popup;
