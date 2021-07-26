import React, { useState } from "react";
import { signIn, getCsrfToken, getSession } from "next-auth/client";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Seo from "components/Seo";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    textAlign: "center",
  },
}));

export default function SignInPage({ csrfToken }) {
  const classes = useStyles();
  const [email, setEmail] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn("email", { email: email });
  };

  return (
    <div className="signin-area">
      <Seo title="SIgn In | Admin" />
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <div className="logo">
            {/* <img src="/img/logo.png" alt="logo" /> */}
            <p>SDA LEGAL</p>
          </div>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Typography variant="h6" component="h6" color="primary" gutterBottom>
            Sign In
          </Typography>
          <div>
            <button
              className="google"
              onClick={() =>
                signIn("google", {
                  callbackUrl: "https://sdalegal-admin.vercel.app",
                })
              }
            >
              <i className="fab fa-google"></i>
              <span>Login with Google</span>
            </button>
          </div>
          <div>
            <button
              className="facebook"
              onClick={() =>
                signIn("facebook", {
                  callbackUrl: "https://sdalegal-admin.vercel.app",
                })
              }
            >
              <i className="fab fa-facebook"></i>
              <span>Login with Facebook</span>
            </button>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <input
                type="email"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" enter your email ..."
              />
              <div>
                <button className="email" type="submit">
                  <i className="fas fa-envelope"></i>
                  <span>Login With Email</span>
                </button>
              </div>
            </form>
          </div>
          <div className="privacy">
            <p>
              By Login, you agree to SDA LEGAL
              <a
                href={process.env.PUBLIC_URL + "/termsofservices"}
                target="_blank"
              >
                {" "}
                Terms of Services{" "}
              </a>
              and
              <a
                href={process.env.PUBLIC_URL + "/privacypolicy"}
                target="_blank"
              >
                {" "}
                Privacy Policy
              </a>
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  const session = await getSession(context);
  // if (session) {
  //   return {
  //     redirect: {
  //       destination: "/dashboard",
  //       permanent: false,
  //     },
  //   };
  // }
  return {
    props: { csrfToken },
  };
}
