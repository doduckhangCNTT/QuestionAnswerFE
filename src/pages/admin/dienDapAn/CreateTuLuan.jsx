import React from "react";

import { Content } from "antd/es/layout/layout";

import { Layout } from "antd";
import { useAppStore } from "../../../store/appstate";
import QuestionTuLuan from "../../../components/Container/FormContainer/QuestionTuLuan";

const CreateTuLuan = () => {
  // const [isCreatedQuizSuccess, setIsCreatedQuizSuccess] = useState(false);

  const { quiz } = useAppStore();
  console.log(quiz);
  // const handleSubmitQuiz = (values) => {
  //   console.log(values);
  //   createQuizTracNghiemSet({
  //     quizType: "Constructed response",
  //     ...values,
  //   });
  //   setIsCreatedQuizSuccess(true);
  // };

  // const formLayout = {
  //   labelCol: { span: 4 },
  //   wrapperCol: { span: 20 },
  // };
  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      <Content>
        <div
          className="p-6 min-h-screen h-auto"
          style={{
            // backgroundImage: `url(${repeatBg})`,
            backgroundSize: "100% auto",
          }}
        >
          <div className="flex flex-col bg-white p-6">
            <div className="flex justify-between">
              <h1 className="font-semibold text-2xl mb-5">
                {/* Tạo mới bộ đề điền đáp án */}
                Tạo câu câu hỏi cho chủ đề giải mã kho báu
              </h1>
            </div>
            {/* <Form
              name="create-quiz"
              onFinish={handleSubmitQuiz}
              labelWrap
              {...formLayout}
            >
              <Form.Item
                name="title"
                label="Bộ đề"
                rules={[
                  {
                    required: true,
                    message: "Vui Lòng Điền ô này trước khi gửi",
                  },
                ]}
              >
                <Input
                  className="border"
                  disabled={isCreatedQuizSuccess}
                  placeholder="Tên Bộ Đề"
                />
              </Form.Item>
              <Form.Item
                name="content"
                label="Nội dung"
                rules={[
                  {
                    required: true,
                    message: "Vui Lòng Điền ô này trước khi gửi",
                  },
                ]}
              >
                <Input
                  className="border"
                  disabled={isCreatedQuizSuccess}
                  placeholder="VD: Cuộc Kháng Chiến ... "
                />
              </Form.Item>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-[#6158dd] w-full"
                  disabled={isCreatedQuizSuccess}
                >
                  Gửi
                </Button>
              </Form.Item>
            </Form> */}

            {/* {isCreatedQuizSuccess && <QuestionTuLuan />} */}
            <QuestionTuLuan />
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default CreateTuLuan;
