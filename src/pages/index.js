import Head from "next/head";
import { Box, CircularProgress, Container, Grid } from "@mui/material";
import { Budget } from "../components/dashboard/budget";
import { LatestOrders } from "../components/dashboard/latest-orders";
import { LatestProducts } from "../components/dashboard/latest-products";
import { Sales } from "../components/dashboard/sales";
import { TasksProgress } from "../components/dashboard/tasks-progress";
import { TotalCustomers } from "../components/dashboard/total-customers";
import { TotalProfit } from "../components/dashboard/total-profit";
import { TrafficByDevice } from "../components/dashboard/traffic-by-device";
import { DashboardLayout } from "../components/dashboard-layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthGuard } from "../components/auth-guard";
const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const fetchStats = async () => {
    setLoading(true);
    try {
      console.log("fetching stats");
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/admin/getadminstats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      console.log("data", data);
      if (data.error) {
        router.push("/login").catch((err) => console.log(err));
      } else {
        setStats(data.data);
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
      fetchStats();
    }

  },[]);
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      {loading ? (
        <Box
          sx={{
            flexGrow: 1,
            margin: "auto",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <Grid container spacing={3}>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <Budget appointments={stats.appointment_cnt[0]["COUNT"]} />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <TotalCustomers patients={stats.patient_cnt[0]["COUNT"]} />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <TasksProgress doctors={stats.doctor_cnt[0]["COUNT"]} />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <TotalProfit amount={stats.money_earned[0]["SUM"]} sx={{ height: "100%" }} />
              </Grid>
              {/* <Grid item lg={8} md={12} xl={9} xs={12}>
                <Sales />
              </Grid> */}
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <TrafficByDevice doctors={stats.doctor_cnt[0]["COUNT"]} patients={stats.patient_cnt[0]["COUNT"]} sx={{ height: "100%" }} />
              </Grid>
              {/* <Grid item lg={4} md={6} xl={3} xs={12}>
                <LatestProducts sx={{ height: "100%" }} />
              </Grid> */}
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <LatestOrders />
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
