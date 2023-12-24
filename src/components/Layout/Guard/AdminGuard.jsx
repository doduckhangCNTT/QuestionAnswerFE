import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";
import HeaderAdmin from "../Admin/HeaderAdmin";
import SiderAdmin from "../Admin/SiderAdmin";

const AdminGuard = ({ children }) => {
  const authToken = sessionStorage.getItem("token");
  console.log(authToken);
  const navigate = useNavigate();

  // useEffect(() => {
  //   //if no token, it will go to sign in
  //   if (!authToken) {
  //     navigate("/login");
  //     // if has token, get user profile to get role
  //   } else {
  //   }
  // }, []);

  return (
    <>
      <HeaderAdmin />
      <Layout className="min-h-screen">
        <SiderAdmin />
        {children}
      </Layout>
    </>
  );
};

export default AdminGuard;
