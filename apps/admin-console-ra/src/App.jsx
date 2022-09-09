import React, { useEffect, useState } from "react";
import { Admin, Resource, ListGuesser, CustomRoutes } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import './App.css';
import { Route, useParams } from "react-router-dom";
import { AppLayout } from "./common/layout/app.layout";
import authProvider from "./common/auth.provider";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const ConfigEditor = React.lazy(() => import("configui/ConfigEditor"));

const ConfigPageWrapper = () =>{
  const { moduleId } = useParams();
  console.log(moduleId);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        <ChakraProvider>
        <ConfigEditor moduleId={moduleId}></ConfigEditor>
        </ChakraProvider>
      
    </QueryClientProvider>
  )
}
function App() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider} layout={AppLayout} requireAuth>
    <Resource name="posts" list={ListGuesser} />
    <Resource name="comments" list={ListGuesser} />
    <CustomRoutes>
        <Route path="/config/:moduleId" element={<ConfigPageWrapper />} />
    </CustomRoutes>
  </Admin>
  );
}

export default App;
