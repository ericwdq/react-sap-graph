// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { Graph } from './';

export default {
  path: 'dkom',
  childRoutes: [
    { path: 'sap-graph', component: Graph },
  ],
};
