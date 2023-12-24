import React from "react";
import { useNavigate } from "react-router-dom";

import quizGame from "../../assets/imgs/truytim.png";
import paperScroll from "../../assets/imgs/paperscroll.png";
import bg from "../../assets/imgs/backgr.jpg";
import puzzle from "../../assets/imgs/puzzle.jpg";
import map from "../../assets/imgs/giaimakhobaubg.png";
import vuot from "../../assets/imgs/vuotchuong.jpg";
import trongdong from "../../assets/imgs/trongdong1.png";

const Homepage = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const logged = localStorage.getItem("logged");
  //   if (!logged) {
  //     navigate("/login");
  //   }
  // }, []);

  const handleNavigateTruyTimBaoVat = () => {
    navigate("/truy-tim-bao-vat-rule");
  };
  const handleNavigatePuzzle = () => {
    navigate("/puzzle");
  };
  const handleNavigateTreasure = () => {
    navigate("/giai-ma-kho-bau-rule");
  };
  const handleNavigateObstacle = () => {
    navigate("/obstacle-rule");
  };

  const handleNavigateResult = () => {
    navigate("/result-user");
  };
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${bg})`,
        }}
        className="bg-contain bg-bottom h-screen flex flex-1 flex-col md:flex-row"
      >
        <div className="text-center  h-screen basis-1/2 relative flex justify-center">
          <img src={paperScroll} alt="" className=" absolute w-full h-full" />
          <div
            className="absolute z-50 self-center bg-contain bg-no-repeat h-[70%] w-[70%]"
            style={{
              backgroundImage: `url(${trongdong})`,
            }}
          >
            <div className="mt-32">
              <h1 className="font-dancing font-bold text-8xl text-amber-800 mb-8 tracking-wide">
                CHỦ NHÂN
              </h1>
              <h1 className="font-dancing font-bold text-8xl text-amber-800 tracking-wide">
                ĐẤT VIỆT
              </h1>
            </div>
          </div>
        </div>

        <div className="flex flex-col basis-1/2 justify-center pt-5 gap-8 px-24">
          <div
            class="h-20 aspect-video rounded-2xl mr-3 bg-orange-500 text-white p-6 w-[400px] cursor-pointer"
            onClick={handleNavigateResult}
          >
            <h1 className="text-2xl self-center font-semibold flex items-center h-full justify-center">
              Xem kết quả sau các lần chơi
            </h1>
          </div>
          <div
            className="flex border cursor-pointer border-black text-center py-5 px-4 rounded-3xl bg-gray-100/90"
            onClick={handleNavigateTruyTimBaoVat}
          >
            <img
              src={quizGame}
              alt=""
              className="h-20 aspect-video rounded-2xl mr-3"
            />
            <h1 className="text-2xl self-center font-semibold">
              TRUY TÌM CỔ VẬT
            </h1>
          </div>
          <div
            onClick={handleNavigateTreasure}
            className="flex border cursor-pointer border-black text-center py-5 px-4 rounded-3xl bg-gray-100/90"
          >
            <img
              src={map}
              alt=""
              className="h-20 aspect-video rounded-2xl mr-3"
            />
            <h1 className="text-2xl self-center font-semibold">
              GIẢI MÃ KHO BÁU
            </h1>
          </div>
          <div
            className="flex border cursor-pointer border-black text-center py-5 px-4 rounded-3xl bg-gray-100/90"
            onClick={handleNavigatePuzzle}
          >
            <img
              src={puzzle}
              alt=""
              className="h-20 aspect-video rounded-2xl mr-3"
            />
            <h1 className="text-2xl self-center font-semibold">
              KHÁM PHÁ KÌ QUAN
            </h1>
          </div>
          <div
            className="flex border cursor-pointer border-black text-center py-5 px-4 rounded-3xl bg-gray-100/90"
            onClick={handleNavigateObstacle}
          >
            <img
              src={vuot}
              alt=""
              className="h-20 aspect-video rounded-2xl mr-3"
            />
            <h1 className="text-xl self-center font-semibold">
              VƯỢT CHƯỚNG NGẠI VẬT
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
