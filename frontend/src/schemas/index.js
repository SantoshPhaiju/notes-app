import * as Yup from "yup";

export const signupSchema = Yup.object({
  username: Yup.string().min(2).max(25).required("Please Enter Your Username"),
  email: Yup.string().email().required("Enter your email"),
  password: Yup.string()
    .min(6)
    .required("Password must be atleast 6 character"),
  cpassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords donot match"),
});
