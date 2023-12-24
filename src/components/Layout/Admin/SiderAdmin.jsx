import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  QuestionOutlined,
  PlusOutlined,
  HighlightOutlined,
  FileAddOutlined,
} from "@ant-design/icons";

const SiderAdmin = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    {
      key: "/admin",
      label: "Truy Tìm Cổ Vật",
      icon: <QuestionOutlined />,
    },
    {
      key: "/admin/create-question",
      label: "Tạo TTCV",
      icon: <PlusOutlined />,
    },
    {
      key: "/admin/gmkb",
      label: "Giải Mã Kho Báu",
      icon: <HighlightOutlined />,
    },
    {
      key: "/admin/create-question-gmkb",
      label: "Tạo GMKB",
      icon: <FileAddOutlined />,
    },
    {
      key: "/admin/create-crossWord",
      label: "Tạo game Điền chữ",
      icon: <FileAddOutlined />,
    },
    {
      key: "/admin/create-collage",
      label: "Tạo game ghép tranh",
      icon: <FileAddOutlined />,
    },
    {
      title: "",
      key: "collapse",
      label: (
        <Button
          className="!w-full border-none"
          onClick={() => setCollapsed(!collapsed)}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        ></Button>
      ),
    },
  ];
  return (
    <Sider
      className="w-52"
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Menu
        className="h-full"
        mode="inline"
        items={items}
        onClick={({ key }) => {
          if (key !== "collapse") {
            navigate(key);
          }
        }}
      />
    </Sider>
  );
};

export default SiderAdmin;
