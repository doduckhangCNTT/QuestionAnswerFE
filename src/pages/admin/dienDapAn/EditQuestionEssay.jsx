import React, { useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import { useAppStore } from "../../../store/appstate";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { patchApi } from "../../../services/fetchData";

const EditQuestionEssay = () => {
  const { quiz, getQuizTuLuanSet } = useAppStore();

  // const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getQuizTuLuanSet(id);
  }, [id]);

  const handleSubmitQuestion = async (values) => {
    const result = await patchApi(`update/question/${id}`, values.questions[0]);
    if (result && result.data && result.data.success) {
      // Thông báo
      Swal.fire({
        title: "Thành công",
        text: "Cập nhật thành công.",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };
  const [form] = Form.useForm();
  useEffect(() => {
    let formatValue;
    if (quiz) {
      formatValue = {
        questions: [
          {
            question: quiz.question,
            desc: quiz.desc,
            answer: quiz.answer,
          },
        ],
      };
    }
    form.setFieldsValue(formatValue);
  }, [form, quiz]);

  const formLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };

  // const initValueQuestion = { content: "", answer: "" };

  return (
    <div className="w-full">
      <Form
        {...formLayout}
        autoComplete="off"
        onFinish={handleSubmitQuestion}
        form={form}
      >
        <Form.List
          name="questions"
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 1) {
                  return Promise.reject(
                    new Error("Vui lòng điền ít nhất một ô")
                  );
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <div className="flex flex-col gap-4">
              {fields.map((field) => (
                <Card
                  size="small"
                  title={`Câu hỏi ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }
                >
                  <Form.Item label="Câu hỏi" name={[field.name, "question"]}>
                    <Input placeholder="Nhập câu hỏi" />
                  </Form.Item>
                  <Form.Item name={[field.name, "desc"]} label="Mô tả">
                    <Input.TextArea placeholder="Nhập mô tả" />
                  </Form.Item>
                  {/* Nest Form.List */}
                  <Form.Item label="Câu Trả Lời" name={[field.name, "answer"]}>
                    <Input placeholder="Nhập Câu Trả Lời" />
                  </Form.Item>
                </Card>
              ))}

              {/* <Button
                type="dashed"
                onClick={() => add(initValueQuestion)}
                block
              >
                + Thêm Câu Hỏi
              </Button> */}
              <Form.ErrorList errors={errors} className="text-red-600" />
            </div>
          )}
        </Form.List>
        {/* <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item> */}
        <Form.Item
          wrapperCol={{
            span: 24,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            className="bg-[#6158dd] w-full mt-4"
          >
            Gửi
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditQuestionEssay;
