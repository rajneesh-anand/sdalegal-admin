import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { getSession } from "next-auth/client";
import Admin from "layouts/Admin.js";
import { CURRENCY } from "constant/currency";
import Link from "next/link";
import GridItem from "components/Grid/GridItem.js";
import Seo from "components/Seo";
import GridContainer from "components/Grid/GridContainer.js";

function ServiceListPage({ data }) {
  const orderDate = (order_date) => {
    let date = new Date(order_date);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const errorImageSource = (e) => {
    e.target.src = "https://source.unsplash.com/600x900/?tech,street";
  };

  return (
    <div className="service-list-area">
      <Seo title="Services List | SDA LEGAL" />
      <GridContainer>
        {data.length > 0 ? (
          data.map((item) => (
            <GridItem xs={12} sm={3} md={3} key={item.id}>
              <Card>
                <CardActionArea>
                  <img
                    src={
                      item.images[0]
                        ? item.images[0]
                        : "https://source.unsplash.com/600x900/?tech,street"
                    }
                    alt={item.serviceName}
                    onError={errorImageSource}
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                      {item.serviceName}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Description : {item.description}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Category : {item.category}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Service Fee : {CURRENCY.INR}
                      {item.serviceFee}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Discounted Fee : {CURRENCY.INR}
                      {item.saleFee}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={item.status ? "primary" : "error"}
                      component="p"
                    >
                      Status : {item.status ? "Active" : "Inactive"}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Link href={`/service/edit/${item.id}`}>
                    <a>Edit</a>
                  </Link>
                </CardActions>
              </Card>
            </GridItem>
          ))
        ) : (
          <GridItem xs={12} sm={12} md={12}>
            <p>No Services</p>
            <Link href="/service">
              <a>Add New Service</a>
            </Link>
          </GridItem>
        )}
      </GridContainer>
    </div>
  );
}
ServiceListPage.layout = Admin;

export const getServerSideProps = async (context) => {
  const page = context.query.page || 1;
  let orderData = null;

  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/services?page=${page}`
    );
    if (res.status !== 200) {
      throw new Error("Failed to fetch");
    }
    orderData = await res.json();
  } catch (err) {
    orderData = { error: err.message };
  }

  return { props: { data: orderData.data } };
};

export default ServiceListPage;
