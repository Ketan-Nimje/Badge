import Dashboard from "./Component/Dashboard/Dashboard";
import Pramotions from "./Component/Pramotions/Pramotions";

export const baseUrl = "/admin";

const routesList = [
  { path: `${baseUrl}/`, name: "Dashboard", component: Dashboard, exact: true },
  {
    path: `${baseUrl}/dashboard`,
    name: "Dashboard",
    component: Dashboard,
    exact: true,
  },
  {
    path: `${baseUrl}/pramotions`,
    name: "Pramotions",
    component: Pramotions,
    exact: true,
  },
];
export default routesList;
export const apiKey = "31c664dd7677d99206c1287579653430";
export const urlParams = new URLSearchParams(window.location.search);
