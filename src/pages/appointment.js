import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CustomerListResults } from "../components/appointment/customer-list-results";
import { CustomerListToolbar } from "../components/appointment/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { useEffect, useState } from "react";

const Page = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/admin/getallpatients?`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();

      if (data.error) {
        router.push("/login").catch((err) => console.log(err));
      } else {
        setCustomers(data.data);
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
      fetchCustomers();
    }
  }, []);

  return (
    <>
      <Head>
        <title>Appointments</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar
           
          />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults customers={customers} loading={loading} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
