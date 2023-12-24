import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import backgroundImage from "../../assets/imgs/backgr.jpg";
import { postApi } from "../../services/fetchData";

const Register = () => {
  const navigate = useNavigate();

  /**
   * Xử lí dữ liệu sau đăn kí
   * @param {*} values Dữ liệu sau khi nhập thông tin đăng kí tài khoản
   */
  const handleRegister = async (values) => {
    if (
      values &&
      values.name &&
      values.password &&
      values.account &&
      values.confirmPassword
    ) {
      // 1. Kiểm tra mật khẩu và xác nhận mật khẩu giống nhau không
      if (values.password !== values.confirmPassword) {
        Swal.fire({
          title: "Error!",
          text: "Mật khẩu không khớp với thông tin đã nhập.",
          icon: "error",
          confirmButtonText: "Quay lại!",
        });
      } else {
        // 2. Thực hiện lưu thông tin đăng kí
        const res = await postApi("register", values);
        if (res && res.data) {
          if (res.data.success) {
            Swal.fire({
              title: "Thành công",
              text: res.data.msg,
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Login",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/login");
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
        // 3. Thông báo
        // 4. Di chuyển về trang đăng nhập
      }
    } else {
      // Thông báo nhập thông tin đăng kí
      Swal.fire({
        title: "Error!",
        text: "Cần nhập thông tin đăng kí",
        icon: "error",
        confirmButtonText: "Got it!",
      });
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

          <h4 className="text-sm font-bold mt-4">Đăng kí tài khoản của bạn</h4>
        </div>
        {/* form */}
        <div className="flex mt-4">
          <Form
            className="login-form flex flex-col w-full relative"
            name="normal_register"
            initialValues={{
              remember: false,
            }}
            onFinish={handleRegister}
          >
            <div className="text-left pl-3 text-lg font-bold">
              Tên người dùng:
            </div>
            <Form.Item name="name">
              <Input
                className="rounded-full p-3 border-black text-black"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>

            <div className="text-left pl-3 text-lg font-bold">Email:</div>
            <Form.Item name="account">
              <Input
                className="rounded-full p-3 border-black text-black"
                prefix={<UserOutlined className="site-form-item-icon" />}
                type="email"
                placeholder="Email"
              />
            </Form.Item>

            <div className="text-left pl-3 text-lg font-bold">Password:</div>
            <Form.Item name="password">
              <Input.Password
                className="rounded-full p-3 border-black text-black"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="password"
              />
            </Form.Item>

            <div className="text-left pl-3 text-lg font-bold">
              Xác nhận lại password:
            </div>
            <Form.Item name="confirmPassword">
              <Input.Password
                className="rounded-full p-3 border-black text-black"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="basis-full bg-black rounded-full text-white font-bold text-lg w-full pt-2 pb-2 h-fit"
                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
              >
                Đăng kí
              </Button>
              <div className="text-end mt-2">
                <Link to="/login">Đăng nhập</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
