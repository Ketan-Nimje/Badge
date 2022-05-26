import Dashboard from "./Component/Dashboard/Dashboard"; 
  
export const baseUrl = '/admin';

const routesList = [
  { path: `${baseUrl}/`, name: 'Dashboard', component: Dashboard, exact: true },
  { path: `${baseUrl}/dashboard`, name: 'Dashboard', component: Dashboard, exact: true },  
]
export default routesList;
export const apiKey = '31c664dd7677d99206c1287579653430';
export const urlParams = new URLSearchParams(window.location.search);




