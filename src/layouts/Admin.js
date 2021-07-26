import React, { useState, createRef } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import styles from "assets/jss/layouts/adminStyle";
import bgImage from "assets/img/sidebar-5.jpg";
import logo from "assets/img/reactlogo.png";

import routes from "../../routes";

export default function LayoutPage({ children, ...rest }) {
  const mainPanel = createRef();
  const router = useRouter();
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const [image, setImage] = useState(bgImage);
  const [color, setColor] = useState("red");

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return router.pathname !== "/admin/maps";
  };

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"SDA LEGAL"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />

        {getRoute() && (
          <div className={classes.content}>
            <div className={classes.container}>{children}</div>
          </div>
        )}
        {getRoute() ? <Footer /> : null}
      </div>
    </div>
  );
}
