import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Divider, Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useAuthStore } from "../../../store/authStore";
import { getApi } from "../../../services/fetchData";
import { checkTokenExp } from "../../../utils/CheckTokenExp";

const HeaderClient = ({ hasBack }) => {
  const navigate = useNavigate();
  const auth = useAuthStore((store) => store.auth);
  const [authUser, setAuthUser] = useState({});

  useEffect(() => {
    const logged = localStorage.getItem("logged");
    if (logged) {
      setAuthUser(auth);
    }
  }, [auth]);

  const handleLogout = async () => {
    if (authUser) {
      const result = await checkTokenExp(authUser.access_token);
      const access_token = result ? result : authUser.access_token;
      // Xóa trạng thái đăng nhập
      localStorage.removeItem("logged");
      const res = await getApi("logout", access_token);
      // Chuyển hướng trang về login
      if (res && res.data.success) {
        navigate("/login");
      }
    }
  };

  const handleRedirectPageAdmin = async () => {
    navigate("/admin");
  };

  return (
    <Layout>
      <Header className="flex bg-[#e0a949] h-16">
        {hasBack && (
          <div
            className="flex flex-row cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowLeftOutlined size={16} />
            <p className="ml-2"> Trở về</p>
          </div>
        )}
        <div className="flex items-center justify-between mx-auto">
          <Link to="/" className="text-[#F5F5F5] text-xl">
            <h1 className="text-amber-800 font-dancing font-bold text-3xl">
              Chủ Nhân Đất Việt
            </h1>
          </Link>

          <>
            {authUser && authUser.user ? (
              <div className="flex pb-6">
                {authUser.user.role === "admin" ? (
                  <h1
                    onClick={() => handleRedirectPageAdmin()}
                    className="cursor-pointer absolute right-60 border leading-none p-2  rounded-2xl font-dancing font-bold text-xl"
                  >
                    Quản lí
                  </h1>
                ) : (
                  ""
                )}
                <h1 className="cursor-pointer absolute right-20 border leading-none p-2  rounded-2xl font-dancing font-bold text-xl">
                  {authUser.user.name}
                </h1>
                <h1
                  onClick={() => handleLogout()}
                  className="cursor-pointer absolute right-3 border leading-none p-2 rounded-2xl font-dancing font-bold text-xl"
                >
                  Logout
                </h1>
              </div>
            ) : (
              <h1
                onClick={() => {
                  navigate("/login");
                }}
                className="cursor-pointer absolute right-3 border border-amber-700 leading-none p-2 rounded-2xl font-dancing font-bold text-xl"
              >
                Login
              </h1>
            )}
          </>
        </div>
      </Header>
      <Divider className="bg-black my-0" />
    </Layout>
  );
};

export default HeaderClient;
