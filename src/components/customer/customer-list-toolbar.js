import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  Modal,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export const CustomerListToolbar = (props) => {
  const [errors, setErrors] = useState({});
  const [schedules, setSchedules] = useState([]);
  const handleAddScheduleForm = () => {};
  const formik2 = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      gender: "",
      sessionfee: "",
      qualification: "",
      specializedtreatments: "",
      schedule: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Name is required"),
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
      confirmPassword: Yup.string().max(255).required("Confirm Password is required"),
      phone: Yup.string().max(255).required("Phone is required"),
      sessionfee: Yup.number().min(0).required("Session Fee is required"),
      qualification: Yup.string().max(255).required("Qualification is required"),
      specializedtreatments: Yup.string().max(255).required("Specialized Treatments is required"),
    }),
    onSubmit: async (values, formikHelpers) => {
      try {
        console.log(values);
        const ret = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/users/maillogincode`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(values),
          }
        );
        console.log(ret);
        const data = await ret.json();
        console.log(data);
        setErrors({ error: false, message: "" });
        setCodeSent(true);
      } catch (err) {
        console.error("ERR");
        formikHelpers.setErrors({ submit: err.message });
        setErrors({ error: true, message: err.message });
      }
    },
  });
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Doctors
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              setOpen(true);
            }}
          >
            Add Doctor
          </Button>
          <Modal
            sx={{
              display: "flex",
              width: "sm",
              margin: "auto",
              maxHeight: "min-content",
              backgroundColor: "white",
            }}
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                margin: "auto",
                backgroundColor: "white",
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                borderRadius: "10px",
                p: 3,
                m: -1,
              }}
            >
              <Box sx={{ my: 3 }}>
                <Typography color="textPrimary" variant="h4">
                  Create a Doctor Account
                </Typography>
              </Box>
              {errors.error ? (
                <Alert severity="error" sx={{ width: "100%" }}>
                  {errors.message}
                </Alert>
              ) : null}
              <TextField
                error={Boolean(formik2.touched.name && formik2.errors.name)}
                fullWidth
                helperText={formik2.touched.name && formik2.errors.name}
                label="name"
                margin="normal"
                name="name"
                onBlur={formik2.handleBlur}
                onChange={formik2.handleChange}
                type="text"
                value={formik2.values.name}
                variant="outlined"
              />
              <TextField
                error={Boolean(formik2.touched.email && formik2.errors.email)}
                fullWidth
                helperText={formik2.touched.email && formik2.errors.email}
                label="email"
                margin="normal"
                name="email"
                onBlur={formik2.handleBlur}
                onChange={formik2.handleChange}
                type="email"
                value={formik2.values.email}
                variant="outlined"
              />
              <TextField
                error={Boolean(formik2.touched.password && formik2.errors.password)}
                fullWidth
                helperText={formik2.touched.password && formik2.errors.password}
                label="password"
                margin="normal"
                name="password"
                onBlur={formik2.handleBlur}
                onChange={formik2.handleChange}
                type="password"
                value={formik2.values.password}
                variant="outlined"
              />
              <TextField
                error={Boolean(formik2.touched.confirmPassword && formik2.errors.confirmPassword)}
                fullWidth
                helperText={formik2.touched.confirmPassword && formik2.errors.confirmPassword}
                label="confirm password"
                margin="normal"
                name="confirmPassword"
                onBlur={formik2.handleBlur}
                onChange={formik2.handleChange}
                type="password"
                value={formik2.values.confirmPassword}
                variant="outlined"
              />
              <TextField
                error={Boolean(formik2.touched.phone && formik2.errors.phone)}
                fullWidth
                helperText={formik2.touched.phone && formik2.errors.phone}
                label="phone"
                margin="normal"
                name="phone"
                onBlur={formik2.handleBlur}
                onChange={formik2.handleChange}
                type="text"
                value={formik2.values.phone}
                variant="outlined"
              />
              <Select
                label="Gender"
                id="gender"
                value={formik2.values.gender}

                onChange={formik2.handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>

              <Box sx={{ py: 2 }}>
                <Button
                  color="primary"
                  disabled={formik2.isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Submit Code
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <form onSubmit={props.handleSubmit}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon color="action" fontSize="small">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search doctors"
                  variant="outlined"
                />
              </form>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
