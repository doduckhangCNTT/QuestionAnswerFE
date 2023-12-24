import React from "react";
import bg from "../../assets/imgs/backgr.jpg";

import { Progress, Table } from "antd";

import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/appstate";

const SummaryTuLuan = () => {
  const { listQuestionsTuLuan } = useAppStore();
  const navigate = useNavigate();

  /**Đếm số câu trả lời đúng */
  let countCorrectAnswers = 0;

  const data = listQuestionsTuLuan.map((ques, index) => {
    if (ques?.answer.toLowerCase() === ques?.currentAnswer.toLowerCase()) {
      countCorrectAnswers += 1;
    }
    return {
      key: index + 1,
      question: ques?.question,
      result:
        ques?.answer.toLowerCase() === ques?.currentAnswer.toLowerCase()
          ? "Đúng"
          : "Sai",
      currentAnswer: ques?.currentAnswer,
      answer: ques?.answer,
    };
  });

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      width: 80,
    },
    {
      title: "Câu Hỏi",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Kết Quả",
      dataIndex: "result",
      key: "result",
      width: 100,
    },
    {
      title: "Câu Trả Lời",
      dataIndex: "currentAnswer",
      key: "currentAnswer",
    },
    {
      title: "Đáp Án Đúng",
      dataIndex: "answer",
      key: "answer",
    },
  ];

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
      }}
      className="bg-contain bg-bottom min-h-screen "
    >
      <div className="min-h-screen  ">
        <div className="flex flex-col w-full h-full ">
          <h1 className="text-center font-dancing font-extrabold text-6xl text-amber-800 mt-8 mb-5 tracking-wide">
            GIẢI MÃ KHO BÁU
          </h1>
          <h3 className="text-center font-dancing text-3xl mb-4">
            Số câu trả lời đúng: {countCorrectAnswers}/15
          </h3>
          <Progress
            className="mx-auto mb-2"
            type="circle"
            percent={Math.floor((countCorrectAnswers / 15) * 100)}
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
        </div>
      </div>
    </div>
  );
};

export default SummaryTuLuan;
