import * as Yup from "yup";

const RegisterScema = Yup.object({
    name : Yup.string()
    .min(2,"too Short!")
    .max(55,"too Long!")
    .required("name is requred!"),
    password: Yup.string()
    .min(10,"too short")
    .max(255,"too long")
    .required("password field is requred!"),
    userName: Yup.string()
    .min(10,"too short")
    .max(255,"too long")
    .required("userName field is requred!"),
    email: Yup.string()
    .email("invalid email")
    .min(10,"too short")
    .max(255,"too long")
    .required("email field is requred!")
    ,phoneNumber: Yup.string()
    .min(10,"too short")
    .max(255,"too long")
})

export default RegisterScema