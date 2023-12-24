import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input, Space, Typography } from "antd";
import { useAppStore } from "../../../store/appstate";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { postApi } from "../../../services/fetchData";
import { AnswerEnum, TopicQuestionEnum } from "../../../config/Enum/Question";

const QuestionTuLuan = () => {
  const { quiz, createQuestionsTuLuanSet } = useAppStore();
  const navigate = useNavigate();

  const handleSubmitQuestion = async (values) => {
    console.log(values);
    if (values && values.questions && values.questions.length > 0) {
      const questions = values.questions.map((value, index) => {
        return {
          id: uuidv4(),
          index: index + 1,
          question: value.question,
          desc: value.desc,
          answer: value.answer,
          topicSetQuestion: TopicQuestionEnum.DecodeTheTreasure,
          typeAnswer: AnswerEnum.EnterAnswer,
        };
      });
      const result = await postApi("create/question", questions);
      if (result && result.data && result.data.success) {
        // Thông báo
        Swal.fire({
          title: "Thành công",
          text: "Thêm thành công.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    }
  };
  const [form] = Form.useForm();

  const formLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };

  const initValueQuestion = { content: "", answer: "" };

  return (
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
                return Promise.reject(new Error("Vui lòng điền ít nhất một ô"));
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

            <Button type="dashed" onClick={() => add(initValueQuestion)} block>
              + Thêm Câu Hỏi
            </Button>
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
  );
};

export default QuestionTuLuan;
