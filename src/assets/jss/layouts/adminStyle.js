import { drawerWidth, transition, container } from "assets/jss/dashboardStyle";

const appStyle = (theme) => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh",
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    // ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch",
  },
  content: {
    marginTop: "48px",
    padding: "8px",
    minHeight: "calc(100vh - 123px)",
    backgroundColor: "#ffffff",
  },
  container,
  map: {
    marginTop: "40px",
  },
});

export default appStyle;
