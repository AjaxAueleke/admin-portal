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

export const CustomerListResults = ({ customers,loading,...rest }) => {
 
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(10)

  const handleLimitChange = (event) => {
    setPerPage(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          {loading ? (
            <>
              <Box
                sx={{
                  flexGrow: 1,
                  height: "100%",
                  margin: "auto",
                }}
              >
                <CircularProgress />
              </Box>
            </>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Doctor</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Session Free</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.slice(0, perPage).map((customer) => (
                  <TableRow hover key={customer.doctor_userId}>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Avatar src={customer.doctor_photo} sx={{ mr: 2 }}>
                          {getInitials(customer.doctor_name)}
                        </Avatar>
                        <Typography color="textPrimary" variant="body1">
                          {customer.doctor_name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{customer.user_email}</TableCell>
                    <TableCell>{customer.doctor_phone}</TableCell>
                    <TableCell>${customer.doctor_sessionfee}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={perPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
