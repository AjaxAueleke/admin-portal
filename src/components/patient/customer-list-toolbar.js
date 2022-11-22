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
  Select,
  MenuItem,
  Divider,
  Alert,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { useState } from "react";
import { Field, useFormik } from "formik";
import * as Yup from "yup";
import { Add } from "@mui/icons-material";

export const CustomerListToolbar = (props) => {
  const [errors, setErrors] = useState({});
  const [schedules, setSchedules] = useState([
    {
      day: "",
      till: "",
      from: "",
      latitude: "22.5726",
      longitude: "22.5726",
      location: "",
      maxappointments: 0,
    },
  ]);
  const handleAddScheduleForm = () => {
    setSchedules([
      ...schedules,
      {
        day: "",
        till: "",
        from: "",
        latitude: "22.5726",
        longitude: "22.5726",
        location: "",
        maxappointments: 0,
      },
    ]);
  };
  const formik2 = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      phone: "",
      gender: "male",
      sessionfee: "",
      qualification: "",
      specializedtreatments: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Name is required"),
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
      confirmpassword: Yup.string().max(255).required("Confirm Password is required"),
      phone: Yup.string().max(255).required("Phone is required"),
      sessionfee: Yup.number().min(0).required("Session Fee is required"),
      qualification: Yup.string().max(255).required("Qualification is required"),
      specializedtreatments: Yup.string().max(255).required("Specialized Treatments is required"),
    }),
    onSubmit: async (values, formikHelpers) => {
      try {
        console.log(values);
        const ret = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/admin/createdoctor`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ ...values, schedules }),
        });
        console.log(ret);
        const data = await ret.json();
        console.log(data);
        if (data.status == "error") {
          setErrors({ error: true, message: data.error });
          return;
        }
        setErrors({ error: false, message: "" });
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
          Patients
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  props.handleSubmit(e);
                }}
              >
                <TextField
                  fullWidth
                  onChange={props.handleChange}
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
