import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import backgroundImage from "../../assets/imgs/backgr.jpg";
import { postApi } from "../../services/fetchData";

const Login = () => {
  const navigate = useNavigate();

  /**
   * Xử lí đăng nhập người dùng
   * @param {*} values Dữ liệu đăng nhập
   */
  const handleLogin = async (values) => {
    try {
      // Gọi api lấy thông tin đăng nhập
      const res = await postApi("login", values);
      if (res && res.data) {
        if (res.data.success) {
          Swal.fire({
            title: "Thành công",
            text: res.data.msg,
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              // Đánh dấu là đã đăng nhập trước đó
              localStorage.setItem("logged", true);
              // Chuyển về trang chủ
              navigate("/");
            }
          });
        } else if (!res.data.success) {
          Swal.fire({
            title: "Lỗi",
            text: res.data.msg,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
      // Quay về trang chủ
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="flex justify-end bg-cover w-screen min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="self-center mr-8 ml-8 w-full md:w-1/2 lg:w-1/3 bg-white/50 rounded-3xl shadow-lg p-6 backdrop-blur-sm text-center">
        {/* name page */}
        <div>
          {/* <img src={logo} className="h-16 mx-auto" alt="" /> */}
          <h4 className="text-3xl font-dancing font-bold mt-4">
            Chủ Nhân Đất Việt
          </h4>

          <h4 className="text-sm font-bold mt-4">
            Đăng nhập tài khoản của bạn
          </h4>
        </div>
        {/* form */}
        <div className="flex mt-4">
          <Form
            className="login-form flex flex-col w-full relative"
            name="normal_login"
            initialValues={{
              remember: false,
            }}
            onFinish={handleLogin}
          >
            <Form.Item name="account">
              <Input
                className="rounded-full p-3 border-black text-black"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item name="password">
              <Input.Password
                className="rounded-full p-3 border-black text-black"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Mật khẩu"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="basis-full bg-black rounded-full text-white font-bold text-lg w-full pt-2 pb-2 h-fit"
                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
              >
                Đăng nhập
              </Button>
              <div className="text-end mt-2">
                <Link to="/register">Đăng ký</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
