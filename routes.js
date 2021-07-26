import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";

const Routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
  },
  {
    path: "/users",
    name: "Users",
    icon: Person,
  },

  {
    path: "/service",
    name: "New Service",
    icon: Unarchive,
  },

  {
    path: "/services",
    name: "Service List",
    icon: AcUnitIcon,
  },

  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
  },
];

export default Routes;
