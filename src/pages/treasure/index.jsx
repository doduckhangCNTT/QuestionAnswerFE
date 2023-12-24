import React, { useEffect, useState } from "react";

import paper from "../../assets/imgs/paper2.png";
import bg from "../../assets/imgs/giaimakhobaubg.png";

import { Steps } from "antd";
import { useNavigate } from "react-router-dom";

import { Input } from "antd";
import { useAppStore } from "../../store/appstate";

const Treasure = () => {
  const { listQuestionsTuLuan, updateTuLuanAnswer } = useAppStore();
  const [current, setCurrent] = useState(0);
  const [question, setQuestion] = useState({});
  const [isLastStep, setIsLastStep] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    setQuestion(listQuestionsTuLuan[current]);
    setIsLastStep(current === listQuestionsTuLuan.length - 1);
  }, [current]);

  useEffect(() => {
    setQuestion(listQuestionsTuLuan[0]);
  }, []);

  const onChange = (value) => {
    setQuestion(listQuestionsTuLuan[current]);
    setCurrent(value);
  };
  const stepItems = listQuestionsTuLuan.map((ques, index) => {
    return {
      key: index + 1,
      // title: `Q` + (index + 1),
      status: "wait",
    };
  });

  const handleSubmit = () => {
    navigate("/giai-ma-kho-bau-summary");
  };

  const handleGetValue = (e) => {
    updateTuLuanAnswer(question?.id, e.target.value);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
      }}
      className="bg-contain bg-bottom min-h-screen"
    >
      <div className="bg-white p-2 rounded-2xl w-[95%] mx-auto mt-4">
        <Steps
          current={current}
          onChange={onChange}
          items={stepItems}
          type="navigation"
        />
      </div>
      <div
        style={{
          backgroundImage: `url(${paper})`,
          backgroundSize: "100%",
        }}
        className="bg-contain bg-no-repeat w-2/3 h-auto rounded-2xl p-6 mx-auto min-h-[20rem]"
      >
        <h1 className="text-2xl font-dancing pt-12 pl-4 pb-3 mt-10 mx-4">
          Câu số {current + 1}: {question?.question}
        </h1>
        <pre className="mx-auto text-center w-1/2 text-2xl font-dancing">
          {question?.desc}
        </pre>
      </div>
      <div className="w-96 h-auto pb-8 pl-10 pt-10 rounded-2xl mx-auto">
        <Input
          placeholder="Điền Đáp Án"
          className="p-6"
          size="large"
          onChange={handleGetValue}
          value={listQuestionsTuLuan[current]?.currentAnswer}
        />
      </div>
      {isLastStep && (
        <h1
          onClick={handleSubmit}
          className="hover:shadow-2xl cursor-pointer w-20 mx-auto border-4 border-amber-800 bg-amber-700 text-white p-2 rounded-full"
        >
          Nộp Bài
        </h1>
      )}
    </div>
  );
};

export default Treasure;
