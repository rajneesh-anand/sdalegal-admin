/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Link from "next/link";
// core components
import styles from "assets/jss/components/footerStyle.js";

export default function Footer(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <Link href="/dashboard">
                <a className={classes.block}>Home</a>
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link href="/contact">
                <a className={classes.block}>Contact</a>
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link href="/termsofservices">
                <a className={classes.block}>Terms of Services</a>
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link href="/privacypolicy">
                <a className={classes.block}>Privacy Policy</a>
              </Link>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            <a
              href="https://www.creative-tim.com?ref=njsmd-footer"
              target="_blank"
              className={classes.a}
            >
              All rights reserved to SDA LEGAL
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}
