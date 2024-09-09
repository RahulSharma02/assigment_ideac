import React, { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  TextField,
  Select,
  Radio,
  FormControlLabel,
  RadioGroup,
  Box,
  FormLabel,
  MenuItem,
  Button,
  Grid2 as Grid,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { Employee } from "../../utils/types";
import { employeeSchema } from "../../utils/schema";
import { COUNTRIES } from "../../utils/constants";

// Define a type that excludes 'id' from Employee for form purposes
type EmployeeFormInputs = Omit<Employee, "id">;

type formProps = {
  onSubmit: (data: Employee) => void;
  Employee?: Employee | null;
};

const EmployeeForm: React.FC<formProps> = ({ onSubmit, Employee }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<EmployeeFormInputs>({
    resolver: yupResolver(employeeSchema),
  });

  useEffect(() => {
    if (Employee) {
      reset(Employee);
    }
  }, [Employee, reset]);

  const handleFormSubmit: SubmitHandler<EmployeeFormInputs> = (formData) => {
    onSubmit({
      ...formData,
      id: Employee?.id || Date.now(),
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{
        maxHeight: "80vh",
        overflow: "auto",
        padding: 2,
      }}
    >
      {/* Name field */}
      <TextField
        label="Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
        margin="normal"
      />

      {/* Job Title field */}
      <TextField
        label="Job Title"
        {...register("jobTitle")}
        error={!!errors.jobTitle}
        helperText={errors.jobTitle?.message}
        fullWidth
        margin="normal"
      />

      {/* Salary field */}
      <TextField
        label="Salary"
        type="number" // Ensure this field only accepts numbers
        {...register("salary")}
        error={!!errors.salary}
        helperText={errors.salary?.message}
        fullWidth
        margin="normal"
      />

      {/* Gender field using Controller */}
      <FormLabel component="legend" sx={{ fontSize: 12 }}>
        Gender
      </FormLabel>
      <Controller
        name="gender"
        control={control}
        defaultValue={Employee?.gender || ""}
        render={({ field }) => (
          <RadioGroup row {...field}>
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
        )}
      />
      {errors.gender && <p className="error">{errors.gender.message}</p>}

      {/* Country field using Controller */}
      <FormLabel component="legend" sx={{ fontSize: 12 }}>
        Country
      </FormLabel>
      <Controller
        name="country"
        control={control}
        defaultValue={Employee?.country || ""}
        render={({ field }) => (
          <Select {...field} fullWidth displayEmpty>
            <MenuItem value="" disabled>
              Select a country
            </MenuItem>
            {COUNTRIES.map((country) => (
              <MenuItem key={country.value} value={country.value}>
                {country.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errors.country && <p className="error">{errors.country?.message}</p>}

      {/* Experience field */}
      <TextField
        label="Experience"
        {...register("experience")}
        error={!!errors.experience}
        helperText={errors.experience?.message}
        fullWidth
        margin="normal"
      />

      {/* Agree to terms */}
      <FormControlLabel
        control={<input type="checkbox" {...register("agreeTerms")} />}
        label="I agree to terms"
        sx={{ fontSize: 12 }}
      />
      {errors.agreeTerms && (
        <p className="error">{errors.agreeTerms.message}</p>
      )}
      <Grid sx={{ display: "flex", justifyContent: "center" }}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Grid>
    </Box>
  );
};

export default EmployeeForm;
