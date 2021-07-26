import React from "react";
import { getSession } from "next-auth/client";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function HomePage() {
  return <CircularProgress />;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
}
