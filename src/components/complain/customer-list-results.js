import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Button,
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

export const CustomerListResults = ({ customers, loading, ...rest }) => {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
                  <TableCell>Complain Reason</TableCell>
                  <TableCell>Complain Description</TableCell>
                  <TableCell>Doctor Name</TableCell>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Remove Doctor</TableCell>
                  <TableCell>Discard Complain</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.slice(0, perPage).map((customer) => (
                  <TableRow hover key={customer.doctor_userId}>
                    <TableCell>{customer.complain_reason}</TableCell>
                    <TableCell>{customer.complain_description}</TableCell>
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

                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Avatar src={customer.patient_photo} sx={{ mr: 2 }}>
                          {getInitials(customer.patient_name)}
                        </Avatar>
                        <Typography color="textPrimary" variant="body1">
                          {customer.patient_name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Button
                        disabled={isSubmitting}
                        onClick={async () => {
                          console.log("remove doctor");
                          try {
                            setIsSubmitting(true);
                            const response = await fetch(
                              `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/admin/deleteuser/${customer.complain_appointmentId}`,
                              {
                                method: "DELETE",
                              }
                            );
                            const data = await response.json();
                            setIsSubmitting(false);
                          } catch (err) {
                            console.log(err);
                            setIsSubmitting(false);
                          }
                        }}
                      >
                        Remove Doctor
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        disabled={isSubmitting}
                        onClick={async () => {
                          console.log("discard complain");
                          try {
                            setIsSubmitting(true);
                            const response = await fetch(
                              `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/complains/deletedoctorcomplain/${customer.complain_appointmentId}`,
                              {
                                method: "DELETE",
                                headers: {
                                  "Content-Type": "application/json",
                                  "Authorization": `Bearer ${localStorage.getItem("token")}`,
                                }
                              }
                            );
                            const data = await response.json();
                            setIsSubmitting(false);
                          } catch (err) {
                            console.log(err);
                            setIsSubmitting(false);
                          }
                        }}
                      >Remove Complain</Button>
                    </TableCell>
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
