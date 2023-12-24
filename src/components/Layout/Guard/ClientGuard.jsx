import React from "react";
import HeaderClient from "../Client/HeaderClient";
import { Layout } from "antd";
import Footer from "../Footer";
import { ErrorBoundary } from "../../Common/ErrorBoundary";

const ClientGuard = ({ children, hasBack = false }) => {
  return (
    <ErrorBoundary>
      <HeaderClient hasBack={hasBack}/>
        <Layout className="min-h-screen">{children}</Layout>
      <Footer />
    </ErrorBoundary>
  );
};

export default ClientGuard;
