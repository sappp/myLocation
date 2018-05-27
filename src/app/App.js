import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Header from './layout/header/Header';

import BottomNavbar from './layout/bottom-navbar/BottomNavbar';
import asyncPageLoader from './layout/async-page-loader/AsyncPageLoader';
const AsyncStackPage = asyncPageLoader(() => import("./pages/stack-page/StackPage"));
const AsyncLocationsPage = asyncPageLoader(() => import("./pages/locations-page/LocationsPage"));
const AsyncCategoriesPage = asyncPageLoader(() => import("./pages/categories-page/CategoriesPage"));
// import StackPage from './pages/stack-page/StackPage';
// import LocationsPage from './pages/locations-page/LocationsPage';
// import CategoriesPage from './pages/categories-page/CategoriesPage';



const App = (props) => (
  <div className="App">
    <Header />
    {/* <TopToolbar /> */}
    <Switch>
        <Route path="/" exact={true} component={AsyncLocationsPage}/>
        <Route path="/categories" exact={true} component={AsyncCategoriesPage}/>
        <Route path="/stack" exact={true} component={AsyncStackPage}/>
      </Switch>
    <BottomNavbar />
  </div>
)

export default App
