import React, { useEffect, useState } from "react";
import { Button, Layout, Modal, Popconfirm, Space, Table, Tag } from "antd";
import { Content } from "antd/es/layout/layout";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from "../../../store/appstate";
import { xoaBoDeTracNghiem } from "../../../services/tracNghiem.service";
import { deleteApi } from "../../../services/fetchData";

const QuanLiBoDe = () => {
  const { listQuiz, getListTracNghiemSet } = useAppStore();

  // Lấy dữ liệu câu hỏi trong lần đâu truy cập trang Admin danh sách Questions
  useEffect(() => {
    getListTracNghiemSet();
  }, []);

  /**
   * Thực hiện xóa câu hỏi
   * @param {*} record Thông tin của dòng trong bảng câu hỏi
   */
  const handleDelete = async (record) => {
    try {
      if (record) {
        // Thực hiện xóa câu hỏi
        const result = await deleteApi(`delete/question/${record.questionId}`);
        if (result && result.data && result.data.success) {
          await getListTracNghiemSet();
        }
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: " Câu hỏi",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Mã câu hỏi",
      dataIndex: "questionId",
      key: "questionId",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link>
            <EyeOutlined />
          </Link>
          <Link to={`/admin/edit-trac-nghiem/${record?.questionId}`}>
            <EditOutlined />
          </Link>
          <>
            <Popconfirm
              title="Xóa bộ đề này?"
              description="Bạn có chắc muốn xóa bộ đề này?"
              okText="Xóa"
              cancelText="Trở Lại"
              okButtonProps={{
                style: { backgroundColor: "black", color: "white" },
              }}
              onConfirm={() => {
                handleDelete(record);
              }}
            >
              <Link>
                <DeleteOutlined />
              </Link>
            </Popconfirm>
          </>
        </Space>
      ),
    },
  ];

  const data = listQuiz.map((quiz, index) => {
    return {
      key: index + 1,
      title: quiz?.question,
      description: quiz.description ? quiz.description : "",
      questionId: quiz?._id,
    };
  });

  return (
    <>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          className="min-h-screen"
          style={{
            padding: 24,
          }}
        >
          <Table columns={columns} dataSource={data} />
        </Content>
      </Layout>
    </>
  );
};

export default QuanLiBoDe;
