import React from "react";
import bg from "../../assets/imgs/giaimakhobaubg.png";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/appstate";
import { questionGame2 } from "../../data/dummy";

const ChooseBoDe = () => {
  const { randomQuestionTuLuanSet } = useAppStore();
  const navigate = useNavigate();
  const listQuiz = [
    { quizId: 1, title: "Bộ Đề 1" },
    { quizId: 2, title: "Bộ Đề 2" },
    { quizId: 3, title: "Bộ Đề 3" },
    { quizId: 4, title: "Bộ Đề 4" },
    { quizId: 5, title: "Bộ Đề 5" },
  ];

  // useEffect(() => {
  //   getListTracNghiemSet();
  // }, []);

  const handleChooseQuiz = (quizId) => {
    randomQuestionTuLuanSet(questionGame2);
    navigate(`/giai-ma-kho-bau`);
  };
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "100%",
      }}
      className="bg-contain bg-bottom min-h-screen"
    >
      <div className="min-h-screen flex flex-col justify-center">
        {listQuiz.length > 0 &&
          listQuiz.map((quiz, index) => {
            return (
              <div
                className=" bg-white rounded-3xl w-1/3 mx-auto text-center cursor-pointer my-6 p-6"
                key={index}
                onClick={() => handleChooseQuiz(quiz?.quizId)}
              >
                <h1 className="font-dancing text-3xl font-bold">
                  {quiz?.title}
                </h1>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ChooseBoDe;
