import React from "react";
import CreateQuestionInsideForm from "./CreateQuestionInsideForm";
// import { useAppStore } from "../../../store/appstate";

const CreateQuestionForm = () => {
  // const [setIsCreatedQuizSuccess] = useState(false);
  // const { createQuizTracNghiemSet } = useAppStore();

  // const handleSubmitQuiz = (values) => {
  //   createQuizTracNghiemSet({
  //     quizType: "Multiple-choice questions",
  //     ...values,
  //   });
  //   setIsCreatedQuizSuccess(true);
  // };

  // const formLayout = {
  //   labelCol: { span: 4 },
  //   wrapperCol: { span: 20 },
  // };
  return (
    <>
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
            { required: true, message: "Vui Lòng Điền ô này trước khi gửi" },
          ]}
        >
          <Input
            className="border"
            disabled={isCreatedQuizSuccess}
            placeholder="Tên Bộ Đề"
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Nội dung"
          rules={[
            { required: true, message: "Vui Lòng Điền ô này trước khi gửi" },
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

      {/* {isCreatedQuizSuccess && <CreateQuestionInsideForm />} */}
      {<CreateQuestionInsideForm />}
    </>
  );
};

export default CreateQuestionForm;
