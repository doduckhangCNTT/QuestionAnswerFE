import React from "react";
import { Layout } from "antd";
import HeaderAdmin from "../Admin/HeaderAdmin";
import SiderAdmin from "../Admin/SiderAdmin";

const AdminGuard = ({ children }) => {
  const authToken = sessionStorage.getItem("token");
  console.log(authToken);

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
