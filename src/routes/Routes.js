import React, { Suspense } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import routesTemplates from "./index";
import PublicLayout from "../templates/layouts/public/Layout";
import PageNotFound from "../views/errors/PageNotFound";

import Auth from "./Auth";
import Spinner from "../components/Spinner";

const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Switch>
          {routesTemplates.map((routesTemplate) => {
            const {
              routes: appRoutes,
              template: Template,
              type,
            } = routesTemplate;
            return appRoutes.map((appRoute) => (
              <Route
                exact={appRoute.exact}
                path={appRoute.path}
                key={appRoute.path}
                render={(route) => (
                  <Auth
                    appRoute={appRoute}
                    Template={Template}
                    route={route}
                    type={type}
                  />
                )}
              />
            ));
          })}
          <Route
            render={(route) => (
              <PublicLayout Component={PageNotFound} route={route} />
            )}
          />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
