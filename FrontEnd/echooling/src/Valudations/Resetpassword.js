import * as Yup from "yup";
import { object, string, ref } from "yup";
const Resetpassword = Yup.object({
  password: Yup.string()
    .min(8, "Password too short")
    .max(255, "Password too long")
    .required("Password field is required!")
    .test(
      "uppercase",
      "Password must contain at least 1 uppercase letter",
      (value) => /[A-Z]/.test(value)
    )
    .test(
      "lowercase",
      "Password must contain at least 1 lowercase letter",
      (value) => /[a-z]/.test(value)
    )
    .test("digit", "Password must contain at least 1 digit", (value) =>
      /\d/.test(value)
    )
    .test(
      "specialCharacter",
      "Password must contain at least 1 special character",
      (value) => /[@$!%*?&]/.test(value)
    ),
    confirmPassword: string()
    .required("Please re-type your password")
    .oneOf([ref("password")], "Passwords does not match"),
});

export default Resetpassword;