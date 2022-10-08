import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./views/admin/views/Dashboard.js";
import UserProfile from "./views/admin/views/UserProfile.js";
import Records from "./views/admin/views/Records";
import Sponsors from "./views/admin/views/Locations";
import Volunteers from "./views/admin/views/Reservations";
import Partners from "./views/admin/views/Users";
import Needy from "./views/admin/views/Needy";


function RouteAdmin() {

const routes = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: "nc-icon nc-chart-pie-35",
      component: Dashboard,
      layout: "/admin",
    },
    {
      path: "/sponsors",
      name: "Sponsors",
      icon: "nc-icon nc-notes",
      component: Sponsors,
      layout: "/admin",
    },
    {
      path: "/partners",
      name: "Partners",
      icon: "nc-icon nc-notes",
      component: Partners,
      layout: "/admin",
    },
    {
      path: "/volunteers",
      name: "Volunteers",
      icon: "nc-icon nc-notes",
      component: Volunteers,
      layout: "/admin",
    },
    {
      path: "/needy",
      name: "Needy",
      icon: "nc-icon nc-notes",
      component: Needy,
      layout: "/admin",
    },
    {
      path: "/records",
      name: "Records",
      icon: "nc-icon nc-notes",
      component: Records,
      layout: "/admin",
    },
    {
      path: "/user",
      name: "NGO Profile",
      icon: "nc-icon nc-circle-09",
      component: UserProfile,
      layout: "/admin",
    }
  ];
    
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
    
  };

  return ( 
     <Switch>{getRoutes(routes)}</Switch>
  )
          
}

export default RouteAdmin;
