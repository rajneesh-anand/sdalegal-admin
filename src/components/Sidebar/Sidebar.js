import React, { useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/client";
import Person from "@material-ui/icons/Person";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";
import styles from "assets/jss/components/sidebarStyle.js";

export default function Sidebar(props) {
  const router = useRouter();
  const [session, loading] = useSession();

  const useStyles = makeStyles(styles);
  const classes = useStyles();

  function activeRoute(routeName) {
    return router.pathname === routeName ? true : false;
  }
  const { color, logo, image, logoText, routes } = props;

  useEffect(() => {
    if (!loading) {
      if (!session) {
        router.push("/auth/signin");
      }
    }
  }, [session, loading]);

  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        var listItemClasses;

        listItemClasses = classNames({
          [" " + classes[color]]: activeRoute(prop.path),
        });

        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.path),
        });
        return (
          <Link href={prop.path} key={key}>
            <a className={classes.item}>
              <ListItem button className={classes.itemLink + listItemClasses}>
                {typeof prop.icon === "string" ? (
                  <Icon
                    className={classNames(classes.itemIcon, whiteFontClasses)}
                  >
                    {prop.icon}
                  </Icon>
                ) : (
                  <prop.icon
                    className={classNames(classes.itemIcon, whiteFontClasses)}
                  />
                )}
                <ListItemText
                  primary={prop.name}
                  className={classNames(classes.itemText, whiteFontClasses)}
                  disableTypography={true}
                />
              </ListItem>
            </a>
          </Link>
        );
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <a href="#" className={classNames(classes.logoLink)} target="_blank">
        {/* <div className={classes.logoImage}>
          <img src="/img/logo.png" alt="logo" className={classes.img} />
        </div> */}
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {session ? (
            <div className="sidebar-drawer-mobile">
              <img src={session.user.image} alt={session.user.name} />
              <p>{session.user.name}</p>
              <button onClick={() => signOut()}>Sign Out</button>
            </div>
          ) : (
            <div className="sidebar-drawer-mobile">
              <Person />
              <div className="signIn-mobile-drawer">
                <Link href="/auth/signin">
                  <a>Sign In</a>
                </Link>
              </div>
            </div>
          )}
          {links}
        </Drawer>
      </Hidden>

      <Hidden smDown implementation="css">
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
        >
          {/* {brand} */}

          <div className={classes.sidebarWrapper}>
            {session ? (
              <div className="sidebar-drawer-mobile">
                <img src={session.user.image} alt={session.user.name} />
                <p>{session.user.name}</p>
                <button onClick={() => signOut()}>Sign Out</button>
              </div>
            ) : (
              <div className="sidebar-drawer-mobile">
                <Person />
                <div className="signIn-mobile-drawer">
                  <Link href="/auth/signin">
                    <a>Sign In</a>
                  </Link>
                </div>
              </div>
            )}
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf([
    "white",
    "purple",
    "blue",
    "green",
    "orange",
    "red",
  ]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};
