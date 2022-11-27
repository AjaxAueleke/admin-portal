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
          Complains
        </Typography>
      </Box>
      
    </Box>
  );
};
