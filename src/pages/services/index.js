import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import GridContainer from "components/Grid/GridContainer.js";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 4,
  },
  media: {
    height: 140,
  },
  title: {
    textAlign: "center",
    margin: "8px 0px",
    backgroundColor: "purple",
    color: "white",
    padding: "8px ",
    fontFamily: "Roboto",
    fontWeight: 500,
  },
});

function ServiceListPage({ data }) {
  const classes = useStyles();
  const [status, setStatus] = useState();
  const [message, setMessage] = useState();

  const orderDate = (order_date) => {
    let date = new Date(order_date);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  return data.length > 0 ? (
    <>
      {/* <div className={classes.title}>Services List</div> */}
      <GridContainer>
        {data.map((item) => (
          <GridItem xs={12} sm={3} md={3} key={item.id}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={item.Images[0]}
                  title={item.ServiceName}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    {item.ServiceName}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {item.Description}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Category : {item.Category}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {CURRENCY.INR}
                    {item.ServiceFee}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {CURRENCY.INR}
                    {item.SaleFee}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={item.Status ? "primary" : "error"}
                    component="p"
                  >
                    Status : {item.Status ? "Active" : "Inactive"}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Link href={`/service/edit/${item.id}`}>
                  <a className="anchorBtn">Edit</a>
                </Link>
              </CardActions>
            </Card>
          </GridItem>
        ))}
      </GridContainer>
    </>
  ) : (
    <div className="text-center-area">
      <p>No Services</p>
      <Link href="/service">
        <a>Add New Service</a>
      </Link>
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
