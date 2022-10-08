
import Dashboard from "./views/Dashboard.js";
import Tickets from "./views/Ticket";
import Users from "./views/Users";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/tickets",
    name: "Tickets",
    icon: "nc-icon nc-notes",
    component: Tickets,
    layout: "/admin",
  },
  {
    path: "/partners",
    name: "Users",
    icon: "nc-icon nc-notes",
    component: Users,
    layout: "/admin",
  }
];

export default dashboardRoutes;
