import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CustomerListResults } from "../components/patient/customer-list-results";
import { CustomerListToolbar } from "../components/patient/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { useEffect, useState } from "react";

const Page = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const handleSearch = async (e) => {
    console.log("SUBMITTING DATA")
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/admin/searchpatient?name=${search}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      console.log("data", data);
      if (data.status == "error") {
        setCustomers([]);
      } else {
        setCustomers(data.data);
      }
      setLoading(false);
    } catch (err) {}
  };
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
        <title>Doctors</title>
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
            handleSubmit={handleSearch}
            handleChange={(e) => {
              console.log("e", e.target.value);
              setSearch(e.target.value);
            }}
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
