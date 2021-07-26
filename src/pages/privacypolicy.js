import React from "react";
import { sitePrivacyPolicy } from "constant/privacy-policy";
import { Link, Element } from "react-scroll";
import Sticky from "react-stickynode";
import Seo from "components/Seo";
import Grid from "@material-ui/core/Grid";
const PrivacyPolicyPage = () => {
  const { title, date, content } = sitePrivacyPolicy;
  const menuItems = [];
  content.forEach((item) => {
    menuItems.push(item.title);
  });
  return (
    <React.Fragment>
      <Seo
        title="Privacy Policy | SDA LEGAL"
        canonical={`${process.env.PUBLIC_URL}/privacypolicy`}
      />
      <Grid container>
        <Grid
          item
          xs={4}
          sm={4}
          md={4}
          style={{
            backgroundColor: "white",
            padding: "8px 16px",
          }}
        >
          <div>
            <p>{title}</p>
            <p>{`Last update: ${date}`}</p>
          </div>

          <Sticky top={100} innerZ="1">
            {menuItems.map((item, index) => (
              <div
                key={index}
                style={{
                  padding: "8px 0px",
                  cursor: "pointer",
                }}
              >
                <Link
                  activeClass="active"
                  to={item}
                  spy={true}
                  smooth={true}
                  offset={-276}
                  duration={500}
                >
                  {item}
                </Link>
              </div>
            ))}
          </Sticky>
        </Grid>
        <Grid
          item
          xs={8}
          sm={8}
          md={8}
          style={{
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              p: {
                fontSize: "base",
                color: "text.medium",
                marginBottom: 20,
                padding: ["1rem", 0],
              },
              lineHeight: 1.8,
            }}
          >
            {content.map((item, idx) => {
              return (
                <Element
                  key={idx}
                  name={item.title}
                  style={{ paddingBottom: 40 }}
                  key={idx}
                >
                  <h2>{item.title}</h2>
                  <div
                    className="html-content"
                    dangerouslySetInnerHTML={{
                      __html: item.description,
                    }}
                  />
                </Element>
              );
            })}
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PrivacyPolicyPage;
