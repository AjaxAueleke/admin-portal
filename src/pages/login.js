import Head from "next/head";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [errors, setErrors] = useState({
    error: false,
    message: "",
  });
  const [codeSent, setCodeSent] = useState(false);
  const router = useRouter();
  const formik2 = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: Yup.object({}),
    onSubmit: async (values) => {
      console.log("values", values);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/users/loginadmin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await res.json();
        console.log("data", data);
        if (data.error) {
          setErrors({
            error: true,
            message: data.message,
          });
        } else {
          localStorage.setItem("token", data.token);
          setErrors({
            error: false,
            message: "",
          });
          router.push("/").catch((err) =>
            setErrors({
              error: true,
              message: err.message,
            })
          );
        }
      } catch (error) {
        console.log(error);
        setErrors({
          error: true,
          message: "Something went wrong",
        });
      }
    },
  });
  const formik = useFormik({
    initialValues: {
      email: "demo@devias.io",
      password: "Password123",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
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

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        {codeSent ? (
          <Container maxWidth="sm">
            <form onSubmit={formik2.handleSubmit}>
              <Box sx={{ my: 3 }}>
                <Typography color="textPrimary" variant="h4">
                  2FA Code
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Enter the verification code sent to your email
                </Typography>
              </Box>
              {errors.error ? (
                <Alert severity="error" sx={{ width: "100%" }}>
                  {errors.message}
                </Alert>
              ) : null}
              <TextField
                error={Boolean(formik2.touched.code && formik2.errors.code)}
                fullWidth
                helperText={formik2.touched.code && formik2.errors.code}
                label="code"
                margin="normal"
                name="code"
                onBlur={formik2.handleBlur}
                onChange={formik2.handleChange}
                type="text"
                value={formik2.values.code}
                variant="outlined"
              />

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
            </form>
          </Container>
        ) : (
          <Container maxWidth="sm">
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ my: 3 }}>
                <Typography color="textPrimary" variant="h4">
                  Sign in
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Sign in on the internal platform
                </Typography>
              </Box>
              {errors.error ? (
                <Alert severity="error" sx={{ width: "100%" }}>
                  {errors.message}
                </Alert>
              ) : null}
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email Address"
                margin="normal"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
                variant="outlined"
              />
              <TextField
                error={Boolean(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
                variant="outlined"
              />
              <Box sx={{ py: 2 }}>
                <Button
                  color="primary"
                  disabled={formik.isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign In Now
                </Button>
              </Box>
            </form>
          </Container>
        )}
      </Box>
    </>
  );
};

export default Login;
