import { useState } from 'react';
import React from 'react';
import ReactDOM from "react-dom/client";
import "assets/css/App.css";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import RTLLayout from "layouts/rtl";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { AuthProvider } from "./auth-context/auth.context";
import { ProtectedRoute } from "./layouts/protected.route.js";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

let user = localStorage.getItem("user");
user = JSON.parse(user);

const queryClient = new QueryClient()
// eslint-disable-next-line react/no-deprecated
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <AuthProvider userData={user}>
        {/* <React.StrictMode> */}
        <HashRouter>
          <Switch>
            <Route path={`/auth`} component={AuthLayout} />
            {/* <Route path={``} component={AdminLayout} /> */}
            <ProtectedRoute path={`/admin`} component={AdminLayout} />
            <ProtectedRoute path={`/rtl`} component={RTLLayout} />
            <Redirect from='/' to='/admin/dashboards' />
          </Switch>
        </HashRouter>
        {/* </React.StrictMode> */}
      </AuthProvider>
    </ChakraProvider>
  </QueryClientProvider>)

