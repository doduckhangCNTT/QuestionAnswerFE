import React from "react";

import paperScroll from "../../assets/imgs/paperscroll.png";
import bg from "../../assets/imgs/giaimakhobaubg.png";
import { useNavigate } from "react-router-dom";

const TreasureRule = () => {
  const navigate = useNavigate();
  const handleStartGiaiMa = () => {
    navigate("/giai-ma-kho-bau-choose");
  };
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${bg})`,
        }}
        className="bg-contain bg-bottom h-screen"
      >
        <div className="h-screen relative">
          <img src={paperScroll} alt="" className=" absolute w-full h-full" />
          <div className="absolute z-50 w-full text-center ">
            <h1 className=" font-dancing font-bold text-8xl text-amber-800 mt-20 mb-20 tracking-wide">
              GIẢI MÃ KHO BÁU
            </h1>

            <div className="my-5">
              <p className="text-4xl my-10 font-dancing">
                1. Người chơi đọc câu hỏi và viết câu trả lời vào ô trống.
              </p>
              <p className="text-4xl my-10 font-dancing">
                2. Khi đã hoàn thành câu hỏi, người chơi chọn ô “Nộp bài”.
              </p>
              <p className="text-4xl my-10 font-dancing">
                3. Người chơi theo dõi trang thống kê đáp án.
              </p>
            </div>
          </div>
          <h1
            onClick={handleStartGiaiMa}
            className="hover:shadow-2xl cursor-pointer absolute z-50 bottom-20 right-28 border-4 border-amber-800 bg-amber-700 text-white p-5 rounded-full text-lg"
          >
            Bắt đầu
          </h1>
        </div>
      </div>
    </div>
  );
};

export default TreasureRule;
