import React, { useEffect, useState } from "react";
import Styles from "./ConfirmEmail.module.css";
import Done from "../../Components/DoneModal/Done";
import { useLocation } from "react-router";
import { useSearchParams } from "react-router-dom";
import { useMutation } from "react-query";
const ConfirmEmail = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const QueryParams = new URLSearchParams(location.search);
  const UserId = QueryParams.get("userId");
  const token = QueryParams.get("token");
  useEffect(() => {}, [location.search]);
  console.log(QueryParams.get("userId"));
  console.log(QueryParams.get("token")   );
  const [Success, SetSuccess] = useState(false);
  const { mutate, isLoading, Error } = useMutation(
    (values) => ConfirmEmail(values),
    {
      onSuccess: (resp) => {
        SetSuccess(true);
      },
      onError: (error) => {
        console.log("error");
      },
    }
  );
  const value = {
    initialValues: {
      token: token,
      UserId: UserId,
    },
  };
  useEffect(() => {
    mutate();
  }, []);
  return <div className={Styles.MainContainer}>{Success && <Done />}</div>;
};

export default ConfirmEmail;
