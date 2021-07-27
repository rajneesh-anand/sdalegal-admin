import React, { useState } from "react";
import Admin from "layouts/Admin.js";
import { getSession } from "next-auth/client";

function DashboardPage() {
  return <h1>DashBoard Page</h1>;
}

DashboardPage.layout = Admin;

export default DashboardPage;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
