import React, { useEffect } from "react";
import { Layout, Popconfirm, Space, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAppStore } from "../../../store/appstate";
import { deleteApi } from "../../../services/fetchData";

const QuanLiTuLuan = () => {
  const { listQuizTuLuan, getListTuLuanSet } = useAppStore();

  console.log("listQuizTuLuan: ", listQuizTuLuan);

  useEffect(() => {
    getListTuLuanSet();
  });

  /**
   * Thực hiện xóa câu hỏi dạng tự luân
   * @param {*} record
   */
  const handleDelete = async (record) => {
    try {
      // await xoaBoDeTracNghiem(record?.quizId);
      // await getListTuLuanSet();
      if (record) {
        // Thực hiện xóa câu hỏi
        const result = await deleteApi(`delete/question/${record.questionId}`);
        if (result && result.data && result.data.success) {
          await getListTuLuanSet();
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
      title: "Tên Bộ Đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link>
            <EyeOutlined />
          </Link>
          <Link to={`/admin/edit-tu-luan/${record?.questionId}`}>
            <EditOutlined />
          </Link>
          <>
            <Popconfirm
              title="Xóa bộ đề này?"
              description="Bạn có chắc muốn xóa bộ đề này?"
              onConfirm={() => {
                handleDelete(record);
              }}
              okText="Xóa"
              cancelText="Trở Lại"
              okButtonProps={{
                style: { backgroundColor: "black", color: "white" },
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

  const data = listQuizTuLuan.map((quiz, index) => {
    return {
      key: index + 1,
      title: "Giải mã kho báu",
      questionId: quiz._id,
      content:
        quiz.question.lenght > 100
          ? quiz.question.slice(0, 45) + "..."
          : quiz.question,
      // quizId: quiz?.quizId,
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

export default QuanLiTuLuan;
