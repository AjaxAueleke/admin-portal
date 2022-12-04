import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SeverityPill } from "../severity-pill";
import { useEffect, useState } from "react";

// const orders = [
//   {
//     id: uuid(),
//     ref: "CDD1049",
//     amount: 30.5,
//     customer: {
//       name: "Ekaterina Tankova",
//     },
//     createdAt: 1555016400000,
//     status: "pending",
//   },
//   {
//     id: uuid(),
//     ref: "CDD1048",
//     amount: 25.1,
//     customer: {
//       name: "Cao Yu",
//     },
//     createdAt: 1555016400000,
//     status: "delivered",
//   },
//   {
//     id: uuid(),
//     ref: "CDD1047",
//     amount: 10.99,
//     customer: {
//       name: "Alexa Richardson",
//     },
//     createdAt: 1554930000000,
//     status: "refunded",
//   },
//   {
//     id: uuid(),
//     ref: "CDD1046",
//     amount: 96.43,
//     customer: {
//       name: "Anje Keizer",
//     },
//     createdAt: 1554757200000,
//     status: "pending",
//   },
//   {
//     id: uuid(),
//     ref: "CDD1045",
//     amount: 32.54,
//     customer: {
//       name: "Clarke Gillebert",
//     },
//     createdAt: 1554670800000,
//     status: "delivered",
//   },
//   {
//     id: uuid(),
//     ref: "CDD1044",
//     amount: 16.76,
//     customer: {
//       name: "Adam Denisov",
//     },
//     createdAt: 1554670800000,
//     status: "delivered",
//   },
// ];

export const LatestOrders = (props) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchOrders = async () => {
    setLoading(true);
    try {
      console.log("fetching orders");
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/admin/getallappts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      console.log("data", data);
      setOrders(data.data);
      if (data.error) {
        router.push("/login").catch((err) => console.log(err));
      } else {
        setOrders(data.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      router.push("/login");
    } else {
      fetchOrders();
    }
  },[]);

  return (
    <Card {...props}>
      <CardHeader title="Latest Appointments" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Appointment Id</TableCell>
                <TableCell>Patient Name</TableCell>
                <TableCell>Doctor Name</TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow hover key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.patient.name}</TableCell>
                  <TableCell>{order.doctorschedule.doctor.name}</TableCell>
                  <TableCell>{order.aptdate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};
