import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Frame, Spinner, AppProvider } from '@shopify/polaris'
import { Helmet } from "react-helmet";
import routesList, { apiKey } from "./routesList";
import { Provider, TitleBar } from '@shopify/app-bridge-react';
import './App.css';
import ApiService from "./Apiservice";
import enTranslations from '@shopify/polaris/locales/en.json';
import RoutePropagator from "./RoutePropagator";
import { useDispatch } from "react-redux";
import { shopDetailsAction } from "./redux/action/shopDetailsAction";
const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const apiService = new ApiService();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    installApp();
  }, []);

  const installApp = async () => {
    const payload = {
      shop: urlParams.get('shop')
    }
    const data = await apiService.getDetails(payload);
    if (data.status) {
      if (data && data.install_url) {
        window.open(data.install_url, '_top');
      } else {
        dispatch(shopDetailsAction(data.data));
        if (window.self !== window.top) {
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      }
    } else {
      setIsLoading(false);
    }
  }

  const navigation = useNavigate();
  let config;

  if (urlParams?.get('host')) {
    config = {
      apiKey: apiKey,
      host: urlParams?.get('host'),
      forceRedirect: true
    };
  } else {
    config = { apiKey: apiKey, shopOrigin: urlParams?.get('shop'), forceRedirect: false };
  }
  const tab = [
    {
      content: 'Dashboard',
      onAction: () => onRedirect(`/admin/dashboard?${urlParams.toString()}`),
      target: 'APP',
    }, 
  ];

  const primaryAction =
  {
    content: 'Support',
    onAction: () => onRedirect(`/admin/installation?${urlParams.toString()}`),
    target: 'APP'
  };


  const onRedirect = (url) => { 
    navigation(url);
  }
  return (
    <div style={{ height: '100px' }}>
      <AppProvider i18n={enTranslations} features={{ newDesignLanguage: true }}>
        {isLoading ? <div style={{ display: "flex", position: "absolute", left: "50%", top: "50%", zIndex: "1000" }}> <Spinner accessibilityLabel="Spinner example" size="large" /></div> :
          <Frame>
            <Provider config={config}>
              <TitleBar
                secondaryActions={tab}
                primaryAction={primaryAction}
              />
              <React.Fragment>
                <Routes>
                  {routesList.map((route, index) => {
                    return route.component ? (
                      <Route
                        key={index}
                        path={route.path}
                        element={
                          <React.Fragment>
                            <Helmet>
                              <title>Badge Promotions</title>
                            </Helmet>
                            <RoutePropagator />
                            <route.component apiService={apiService} />
                          </React.Fragment>
                        }
                      />
                    ) : null
                  })}
                  <Route path="/" element={<Navigate to="/dashboard" replace="/" />} />
                </Routes>
              </React.Fragment>
            </Provider>
          </Frame>
        }
      </AppProvider>
    </div>
  )
}

export default App;
