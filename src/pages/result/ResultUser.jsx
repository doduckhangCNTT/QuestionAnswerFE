import React, { useCallback, useEffect, useState } from "react";
import bg from "../../assets/imgs/backgr.jpg";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/appstate";
import { getApi } from "../../services/fetchData";
import {
  TopicQuestionEnum,
  TopicQuestionNameEnum,
} from "../../config/Enum/Question";
import { useAuthStore } from "../../store/authStore";
import Swal from "sweetalert2/dist/sweetalert2.js";

const ResultUser = () => {
  const navigate = useNavigate();
  const auth = useAuthStore((store) => store.auth);
  const { listQuestions } = useAppStore();

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      width: 100,
    },
    {
      title: "Tên người dùng",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Chủ đề",
      dataIndex: "topicSetQuestion",
      key: "topicSetQuestion",
    },
    {
      title: "Bộ đề",
      dataIndex: "topicSetNumber",
      key: "topicSetNumber",
    },
    {
      title: "Điểm số",
      dataIndex: "pointNumber",
      key: "pointNumber",
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
    },
  ];

  const [dataTable, setDataTable] = useState([]);
  /**
   * Lấy tên thuộc tính của đối tượng theo điều kiện
   * @param object Đối tượng
   * @param value Giá trị cần so sánh
   */
  const handleGetNamePropertyObjectByCondition = (
    object,
    objectName,
    value
  ) => {
    if (object) {
      for (let item in object) {
        if (object.hasOwnProperty(item) && object[item] === value) {
          for (let i in TopicQuestionNameEnum) {
            if (i === item) {
              return objectName[i];
            }
          }
        }
      }
    }
  };

  const formatDate = (value) => {
    var date = new Date(value);

    var year = date.getFullYear();
    var month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    // Định dạng lại ngày tháng năm và giờ phút giây
    var formattedDate =
      (day < 10 ? "0" + day : day) +
      "-" +
      (month < 10 ? "0" + month : month) +
      "-" +
      year +
      " " +
      (hours < 10 ? "0" + hours : hours) +
      ":" +
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds);

    return formattedDate;
  };

  /**
   * Lấy thông tin kết quả của người dùng
   */
  const handleGetResultUser = useCallback(async () => {
    try {
      if (auth && auth.user) {
        const result = await getApi(`results/${auth.user._id}`);
        if (result && result.data) {
          const data = result.data
            .sort((a, b) => a.createdAt - b.createdAt)
            .map((result, index) => {
              return {
                key: index + 1,
                userName: result.user.account,
                pointNumber: result.pointNumber,
                topicSetQuestion: handleGetNamePropertyObjectByCondition(
                  TopicQuestionEnum,
                  TopicQuestionNameEnum,
                  result.topicSetQuestion
                ),
                topicSetNumber: result.topicSetNumber,
                time: formatDate(result.createdAt),
              };
            });
          setDataTable(data);
        } else {
          Swal.fire({
            title: "Lỗi",
            text: "Cần đăng nhập để xem thông tin kết quả.",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Login",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login");
            }
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [auth, navigate]);

  useEffect(() => {
    handleGetResultUser();
  }, [handleGetResultUser]);

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
            BẢNG KẾT QUẢ
          </h1>
          <div className="w-2/3 mx-auto">
            <Table
              columns={columns}
              dataSource={dataTable}
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

export default ResultUser;
