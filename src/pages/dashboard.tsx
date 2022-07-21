import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { NextApplicationPage } from "src/main-pages/AppPage/AppPage";
import DashboardPage from "src/main-pages/DashboardPage/DashboardPage";

const Dashboard = () => {
  const {data :session} = useSession()
  const [dashboardParts, setDashboardParts] = useState()
 useEffect(()=>{
getDashboardData()
 },[])
 async function getDashboardData() {
const response = await fetch(`http://localhost:3000/api/get-dashboard-parts?userID=${session.user.uid}`)
const responseJson = await response.json()
setDashboardParts(responseJson)
}
if (dashboardParts){
  return <DashboardPage dashboardParts={dashboardParts}/>
}
else{
  return <div>loading</div>
}
};
export default Dashboard;
