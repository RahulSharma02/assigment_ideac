import * as yup from "yup";

const employeeSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  salary: yup
    .number()
    .required("Salary is required")
    .typeError("Salary must be a number")
    .positive("Salary must be a positive number")
    .integer("Salary must be an integer"),
  gender: yup.string().required("Gender is required"),
  country: yup.string().required("Country is required"),
  agreeTerms: yup
    .boolean()
    .required("You must agree to terms")
    .oneOf([true], "You must agree to terms"),
  experience: yup
    .number()
    .required("Experience is required")
    .typeError("Salary must be a number")
    .min(1, "Experience is required"),
  jobTitle: yup
    .string()
    .required("Job Title is required")
    .min(1, "Enter a valid Job Title"),
});

export { employeeSchema };
