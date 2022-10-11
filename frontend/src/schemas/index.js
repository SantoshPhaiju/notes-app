import * as Yup from "yup";

export const signupSchema = Yup.object({
  username: Yup.string().min(2).max(25).required("Please Enter Your Username"),
  email: Yup.string().email().required("Enter your email"),
  password: Yup.string()
    .min(8)
    .required("Password must be atleast 8 character"),
  cpassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords donot match"),
});

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Enter Your email"),
  password: Yup.string().min(6).required()
})

export const emailSchema = Yup.object({
  email: Yup.string().email().required("Enter Your email"),
})

export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .min(8)
    .required("Password must be atleast 8 character"),
  cpassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords donot match"),
})


export const addNoteSchema = Yup.object({
  title: Yup.string().min(3).required("Title must be at least 3 character long"),
  description: Yup.string().min(10).required("Description must be at least 10 characters long."),
  category: Yup.string().required("Category cannot be empty"),
})
