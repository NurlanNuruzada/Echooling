import React, { useEffect, useState } from "react";
import Styles from "./ConfirmEmail.module.css";
import Done from "../../Components/DoneModal/Done";
import { useLocation } from "react-router";
import { useMutation } from "react-query";
import { ConfirmEmailSend } from "../../Services/AuthService";
const ConfirmEmail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");
  const token = queryParams.get("token");
const buttonsAndRoute = {
    button1:{
        navigate:"/",
        name:"Home",
        color:"green",
        isOpen:"false"
    },
    title:"Please check your email Adress We sent Confirimation Email to your accont!"
}
  const values = {
    token: token,
    userId: userId,
  };
  const [success, setSuccess] = useState(false);
  const { mutate, isLoading, error } = useMutation(ConfirmEmailSend, {
    onSuccess: (resp) => {
      setSuccess(true);
    },
    onError: (error) => {
      // Handle error if needed
    },
  });

  useEffect(() => {
    console.log(values);
    mutate(values);
  }, []); 

  return (
    <div className={Styles.MainContainer}>
      {success && <Done  buttonsAndNagivage={buttonsAndRoute}/>}
    </div>
  );
};

export default ConfirmEmail;
