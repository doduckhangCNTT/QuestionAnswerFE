import React, { useCallback, useEffect, useMemo, useState } from "react";
import bg from "../../assets/imgs/backgr.jpg";

import { Modal, Progress, Table } from "antd";
import { useAppStore } from "../../store/appstate";
import { VideoCameraOutlined, BookOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { postApi } from "../../services/fetchData";
import { useAuthStore } from "../../store/authStore";
import Swal from "sweetalert2/dist/sweetalert2.js";

const Summary = () => {
  const { listQuestions } = useAppStore();
  const auth = useAuthStore((store) => store.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [document, setDocument] = useState();
  const showModal = (text) => {
    setDocument(text);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const countQuestions = useMemo(() => {
    return listQuestions.length > 15 ? 15 : listQuestions.length;
  }, [listQuestions.length]);

  let countCorrectAnswers = 0;
  const data = listQuestions.map((ques, index) => {
    if (ques?.selectedAnswerIndex == ques?.correctAnswerIndex) {
      countCorrectAnswers += 1;
    }
    return {
      key: index,
      result: ques?.selectedAnswerIndex == ques?.correctAnswerIndex,
      question: ques?.question,
      selectedAnswerIndex: ques.selectedAnswerIndex
        ? ques.selectedAnswerIndex
        : "",
      correctAnswerIndex: ques.correctAnswerIndex
        ? ques.correctAnswerIndex
        : "",
      videoLink: ques?.videoLink,
    };
  });

  const handleSaveResultUser = useCallback(async () => {
    if (auth && auth.user) {
      const resultUser = {
        user: auth.user._id,
        pointNumber:
          Math.round((countCorrectAnswers / countQuestions) * 100) + "%",
        topicSetQuestion: 0,
        topicSetNumber: 1,
        numberPlay: 1,
      };
      await postApi("create/result-user", resultUser);
    } else {
      Swal.fire({
        title: "Đã lưu lại kết quả",
        text: "Kết quả đã được lưu, vui lòng quay về trang chủ để xem kết quả.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    }
  }, []);

  useEffect(() => {
    handleSaveResultUser();
  }, [handleSaveResultUser]);

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      width: 100,
    },
    {
      title: "Kết quả",
      dataIndex: "result",
      key: "result",
      width: 100,
      render: (val) => (val ? "Đúng" : "Sai"),
    },
    {
      title: "Câu Hỏi",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Lựa Chọn",
      dataIndex: "selectedAnswerIndex",
      key: "selectedAnswerIndex",
    },
    {
      title: "Đáp Án Đúng",
      dataIndex: "correctAnswerIndex",
      key: "correctAnswerIndex",
    },
    {
      title: "Tư Liệu",
      dataIndex: "videoLink",
      key: "videoLink",
      width: 100,
      render: (text) =>
        text?.type === "video" ? (
          <VideoCameraOutlined
            className="text-3xl cursor-pointer"
            onClick={() => handleNavigate(text?.link)}
          />
        ) : (
          <BookOutlined
            className="text-3xl cursor-pointer"
            onClick={() => showModal(text?.link)}
          />
        ),
    },
  ];
  const navigate = useNavigate();
  const handleNavigate = (text) => {
    window.open(text, "_blank");
  };
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
      }}
      className="bg-contain bg-bottom min-h-screen"
    >
      <div className="min-h-screen ">
        <div className="flex flex-col w-full h-full ">
          <h1 className="text-center font-dancing font-bold text-6xl text-amber-800 mt-10 mb-5 tracking-wide">
            TRUY TÌM CỔ VẬT
          </h1>
          <h3 className="text-center font-dancing text-3xl mb-4">
            {`Số câu trả lời đúng: ${countCorrectAnswers}/${countQuestions}`}
          </h3>
          <Progress
            className="mx-auto mb-2"
            type="circle"
            percent={Math.floor((countCorrectAnswers / countQuestions) * 100)}
          />
          <div className="w-2/3 mx-auto">
            <Table
              columns={columns}
              dataSource={data}
              scroll={{
                y: 540,
              }}
            />
          </div>
          <h1
            onClick={() => {
              navigate("/");
            }}
            className="text-white cursor-pointer bg-amber-800 w-fit p-2 rounded-2xl border mb-5 mx-auto"
          >
            Về Trang Chủ
          </h1>
          {isModalOpen && (
            <Modal
              title="Tài Liệu"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
            >
              <div className="mx-auto">
                <img src={document} alt="" />
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summary;
