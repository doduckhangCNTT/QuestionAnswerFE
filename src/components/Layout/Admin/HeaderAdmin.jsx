import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import AvatarAdmin from "./AvatarAdmin";

const HeaderAdmin = () => {
  const navigate = useNavigate();
  const handleRedirectPageClient = () => {
    navigate("/");
  };

  return (
    <Layout>
      <Header className="flex bg-[#6158dd] h-16">
        <div className="flex w-auto items-center mx-auto">
          <Link className="text-[#F5F5F5] text-xl">
            <h1 className="text-white font-dancing w-auto">
              Chủ Nhân Đất Việt
            </h1>
          </Link>
        </div>
        <div>
          <h1
            onClick={() => handleRedirectPageClient()}
            className="cursor-pointer absolute right-60 border leading-none p-2 mt-3  rounded-2xl font-dancing font-bold text-xl"
          >
            Trang người dùng
          </h1>
          <AvatarAdmin />
        </div>
      </Header>
    </Layout>
  );
};

export default HeaderAdmin;
