import React from "react";
import {Toast} from "react-bootstrap";
import {useThemeContext} from "../hooks/useThemeContext";

export const AppToast = ({ show, title, closeToast, children }) => {
  const {darkMode} = useThemeContext();
  const theme = darkMode ? 'dark' : 'light';

  setTimeout(() => closeToast(), 2000);

  return (
    <Toast bg={theme} show={show} onClose={closeToast} className="position-fixed bottom-0 end-0 m-2">
      <Toast.Header className="justify-content-between">
        <strong className="mr-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>{children}</Toast.Body>
    </Toast>
  );
}
