import React from "react";
import { Link } from "react-router-dom";

import { Divider } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="bg-[#a66c1c]">
      <Divider className="bg-black mb-1 mt-0" />

      <div className="w-full py-6 lg:py-8">
        <div className="md:flex md:justify-between flex-col md:flex-row">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <Link
              to="/"
              className="flex flex-col items-center justify-center md:justify-start md:ml-48"
            >
              {/* <img src={logo} className="h-24" alt="Logo" /> */}
              <h1 className="text-6xl font-bold font-dancing my-2">Chủ Nhân</h1>
              <h1 className="text-6xl font-bold font-dancing my-2">Đất Việt</h1>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-4 text-center md:text-left md:mr-48">
            <div className="mb-6 md:mb-0">
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">
                Tác Giả
              </h2>
              <ul className="text-gray-700 font-medium">
                <li>
                  <Link className="hover:underline">Lại Thị Hồng Phúc </Link>
                </li>
              </ul>
            </div>
            <div className="mb-6 md:mb-0">
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">
                Email
              </h2>
              <ul className="text-gray-700  font-medium">
                <li>
                  <Link className="hover:underline">
                    hongphucthkm@gmail.com
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mb-6 md:mb-0">
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">
                Vị trí
              </h2>
              <ul className="text-gray-700  font-medium">
                <li>
                  <Link className="hover:underline">
                    Trưởng Tiểu học Khương Mai
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline">Thanh Xuân – Hà Nội</Link>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Mạng Xã Hội
              </h2>
              <div className="grid grid-cols-3 gap-6 sm:grid-cols-3">
                <Link className="text-gray-700 hover:text-gray-900">
                  <FacebookOutlined className="text-lg" />
                </Link>
                <Link className="text-gray-700 hover:text-gray-900">
                  <InstagramOutlined className="text-lg" />
                </Link>
                <Link className="text-gray-700 hover:text-gray-900">
                  <GithubOutlined className="text-lg" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
