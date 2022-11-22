import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import { LatestOrders } from "../dashboard/latest-orders";

export const CustomerListResults = ({ customers, loading, ...rest }) => {
  return <LatestOrders />;
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
