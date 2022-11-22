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
              backgroundColor: "white",
              maxWidth: "sm",
              maxHeight: "sm",
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
                overflow: "scroll",
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
                fullWidth
                label="name"
                margin="normal"
                name="name"
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
                error={Boolean(formik2.touched.confirmpassword && formik2.errors.confirmpassword)}
                fullWidth
                helperText={formik2.touched.confirmpassword && formik2.errors.confirmpassword}
                label="confirm password"
                margin="normal"
                name="confirmpassword"
                onBlur={formik2.handleBlur}
                onChange={formik2.handleChange}
                type="password"
                value={formik2.values.confirmpassword}
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
              <Box>
                <Select
                  label="Gender"
                  id="gender"
                  name="gender"
                  error={Boolean(formik2.touched.gender && formik2.errors.gender)}
                  value={formik2.values.gender}
                  onChange={formik2.handleChange}
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                </Select>
              </Box>
              <TextField
                error={Boolean(formik2.touched.sessionfee && formik2.errors.sessionfee)}
                fullWidth
                helperText={formik2.touched.sessionfee && formik2.errors.sessionfee}
                label="session fee"
                margin="normal"
                name="sessionfee"
                onBlur={formik2.handleBlur}
                onChange={formik2.handleChange}
                type="text"
                value={formik2.values.sessionfee}
                variant="outlined"
              />
              <TextField
                error={Boolean(formik2.touched.qualification && formik2.errors.qualification)}
                fullWidth
                helperText={formik2.touched.qualification && formik2.errors.qualification}
                label="qualification"
                margin="normal"
                name="qualification"
                onBlur={formik2.handleBlur}
                onChange={formik2.handleChange}
                type="text"
                value={formik2.values.qualification}
                variant="outlined"
              />
              <TextField
                error={Boolean(
                  formik2.touched.specializedtreatments && formik2.errors.specializedtreatments
                )}
                fullWidth
                helperText={
                  formik2.touched.specializedtreatments && formik2.errors.specializedtreatments
                }
                label="specialized treatment"
                margin="normal"
                name="specializedtreatments"
                onBlur={formik2.handleBlur}
                onChange={formik2.handleChange}
                type="text"
                value={formik2.values.specializedtreatments}
                variant="outlined"
              />
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <Typography color="textPrimary" variant="h6">
                  Select your working days
                </Typography>
                {schedules.map((day, index) => (
                  <Box
                    margin="auto"
                    border="1px solid #e4e4e4"
                    key={index}
                    sx={{
                      display: "flex",
                      padding: "5px",
                      marginY: "5px",
                      width: "100%",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Divider />
                    <Select
                      fullWidth
                      margin="normal"
                      label="day"
                      id="day"
                      value={schedules[index].day || "sunday"}
                      onChange={(e) => {
                        const newSchedules = [...schedules];
                        newSchedules[index].day = e.target.value;
                        setSchedules(newSchedules);
                      }}
                    >
                      <MenuItem value={"sunday"}>Sunday</MenuItem>
                      <MenuItem value={"monday"}>Monday</MenuItem>
                      <MenuItem value={"tuesday"}>Tuesday</MenuItem>
                      <MenuItem value={"wednesday"}>Wednesday</MenuItem>
                      <MenuItem value={"thursday"}>Thursday</MenuItem>
                      <MenuItem value={"friday"}>Friday</MenuItem>
                      <MenuItem value={"saturday"}>Saturday</MenuItem>
                    </Select>
                    <TextField
                      label="start time"
                      fullWidth
                      margin="normal"
                      name="from"
                      onChange={(e) => {
                        const newSchedules = [...schedules];
                        newSchedules[index].from = e.target.value;
                        setSchedules(newSchedules);
                      }}
                      type="text"
                      value={schedules[index].from}
                      variant="outlined"
                    />
                    <TextField
                      label="end time"
                      fullWidth
                      margin="normal"
                      name="till"
                      onChange={(e) => {
                        const newSchedules = [...schedules];
                        newSchedules[index].till = e.target.value;
                        setSchedules(newSchedules);
                      }}
                      type="text"
                      value={schedules[index].till}
                      variant="outlined"
                    />
                    <TextField
                      label="location"
                      fullWidth
                      margin="normal"
                      name="location"
                      onChange={(e) => {
                        const newSchedules = [...schedules];
                        newSchedules[index].location = e.target.value;
                        setSchedules(newSchedules);
                      }}
                      type="text"
                      value={schedules[index].location}
                      variant="outlined"
                    />
                    <TextField
                      label="max number of patients"
                      fullWidth
                      margin="normal"
                      name="maxappointments"
                      onChange={(e) => {
                        const newSchedules = [...schedules];
                        newSchedules[index].maxappointments = e.target.value;
                        setSchedules(newSchedules);
                      }}
                      type="number"
                      value={schedules[index].maxappointments}
                      variant="outlined"
                    />

                    <Divider />
                  </Box>
                ))}
                <Button variant="outlined" startIcon={<Add />} onClick={handleAddScheduleForm}>
                  Add Another Day
                </Button>
              </Box>
              <Box sx={{ width: "100%", py: 2, display: "flex", gap: "10px" }}>
                <Button
                  color="primary"
                  disabled={formik2.isSubmitting}
                  onClick={formik2.handleSubmit}
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Create a doctor
                </Button>
                <Button
                  color="primary"
                  disabled={formik2.isSubmitting}
                  onClick={handleClose}
                  size="large"
                  type="submit"
                  variant="outlined"
                >
                  Close
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
