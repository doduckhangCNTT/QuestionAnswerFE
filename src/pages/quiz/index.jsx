import React, { useEffect, useState } from "react";

import bg from "../../assets/imgs/truytimcovat.jpg";
import { Radio, Space, Steps } from "antd";
import { useNavigate } from "react-router-dom";

import { useAppStore } from "../../store/appstate";

const Quiz = () => {
  const { listQuestions, updateQuestionTracNghiemAnswer } = useAppStore();

  const [current, setCurrent] = useState(0);
  const [question, setQuestion] = useState({});
  const [isLastStep, setIsLastStep] = useState(false);

  console.log("Question: ", question);
  console.log("listQuestions: ", listQuestions);
  const navigate = useNavigate();

  useEffect(() => {
    setQuestion(listQuestions[current]);
    setIsLastStep(current === listQuestions.length - 1);
  }, [current]);

  useEffect(() => {
    setQuestion(listQuestions[0]);
  }, []);

  const onChange = (value) => {
    // setQuestion(listQuestions[current]);
    setCurrent(value);
  };

  const stepItems = listQuestions.map((ques, index) => {
    return {
      key: index + 1,
      // title: `Q` + (index + 1),
      status: "wait",
    };
  });

  const handleSubmit = async () => {
    navigate("/truy-tim-bao-vat-summary");
  };

  /**
   * Khi chọn đáp án của câu hỏi
   * @param {*} e
   */
  const handleSelectAnswer = (e) => {
    const { value } = e.target;
    if (question) {
      updateQuestionTracNghiemAnswer(question._id, value);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "100%",
      }}
      className="bg-contain bg-bottom min-h-screen"
    >
      <div className="bg-white mt-4 p-2 rounded-2xl mx-auto w-[95%] ">
        <Steps
          current={current}
          onChange={onChange}
          items={stepItems}
          type="navigation"
        />
      </div>

      <div className="bg-amber-400 border border-amber-800 w-2/3 rounded-2xl p-6 ml-96 my-6">
        <h1 className="text-3xl font-dancing">
          Câu số {current + 1}: {question?.question}
        </h1>
        {question && question.imgs && question.imgs.length > 0 && (
          <img
            style={{ height: "200px", width: "300px" }}
            src={question?.imgs[0]}
            alt="Hình ảnh không tồn tại"
            className="mx-auto"
          />
        )}
      </div>

      <div className="ml-96 mb-10 w-2/3 h-auto pb-8 bg-amber-300 px-10 pt-6 rounded-2xl border border-amber-800">
        <Radio.Group
          onChange={handleSelectAnswer}
          value={listQuestions[current]?.selectedAnswerIndex}
          className="w-full"
          size="large"
        >
          <Space
            direction="vertical"
            size={"large"}
            className="w-fit block mx-auto"
          >
            {question?.options?.map((q, index) => {
              return (
                <Radio
                  key={q._id + index}
                  value={q.index}
                  className="text-2xl font-dancing my-2 "
                >
                  {q.content}
                </Radio>
              );
            })}
            {/* <Radio
              value={question?.option1?.index}
              className="text-2xl font-dancing my-2 "
            >
              {question?.option1?.content}
            </Radio>
            <Radio
              value={question?.option2?.index}
              className="text-2xl font-dancing my-2"
            >
              {question?.option2?.content}
            </Radio>
            <Radio
              value={question?.option3?.index}
              className="text-2xl font-dancing my-2"
            >
              {question?.option3?.content}
            </Radio>
            <Radio
              value={question?.option4?.index}
              className="text-2xl font-dancing my-2"
            >
              {question?.option4?.content}
            </Radio> */}
          </Space>
        </Radio.Group>
      </div>

      {isLastStep && (
        <h1
          onClick={handleSubmit}
          className="hover:shadow-2xl cursor-pointer w-20 text-centers mx-auto border-4 border-amber-800 bg-amber-700 text-white p-2 mb-4 rounded-full"
        >
          Nộp Bài
        </h1>
      )}
    </div>
  );
};

export default Quiz;
