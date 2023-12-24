import React, { useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input, Space, Typography } from "antd";
import { useAppStore } from "../../../store/appstate";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { AnswerEnum, TopicQuestionEnum } from "../../../config/Enum/Question";
import { patchApi } from "../../../services/fetchData";
import Swal from "sweetalert2/dist/sweetalert2.js";

const EditTracNghiem = () => {
  const { quiz } = useAppStore();
  console.log("Quiz: ", quiz);
  const { id } = useParams();

  const handleSubmitQuestion = async (values) => {
    // const data = {
    //   quizId: quiz?.quizId.toString(),
    //   questions: values?.questions,
    //   navigate,
    // };
    // createQuestionsTracNghiemSet(data);

    if (values && values.questions && values.questions.length > 0) {
      const question = values.questions[0];
      console.log("Questions: ", question);
      // Danh sách các câu trả lời
      const options = question.answer?.map((answer, indexAnswer) => {
        return {
          index: indexAnswer + 1,
          content: answer.content,
        };
      });
      // Câu trả lời đúng
      const correctAnswerIndex = question.answer.findIndex(
        (answer) => answer.isCorrect
      );

      const img = question.questionImg ? question.questionImg : "";
      const questionNew = {
        id: uuidv4(),
        index: 1,
        question: question.content,
        videoLink: {},
        options,
        correctAnswerIndex: correctAnswerIndex + 1,
        imgs: [img],
        topicSetQuestion: TopicQuestionEnum.SearchForAntiques,
        typeAnswer: AnswerEnum.ChooseAnswer,
      };
      const result = await patchApi(`update/question/${id}`, questionNew);
      if (result && result.data && result.data.success) {
        // Thông báo
        Swal.fire({
          title: "Thành công",
          text: "Cập nhật thành công.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    }
  };
  const [form] = Form.useForm();

  useEffect(() => {
    let formatValue;
    if (quiz) {
      // formatValue = {
      //   questions: quiz?.Questions.map((question) => ({
      //     content: question?.content,
      //     answer: question?.Answers.map((answer) => ({
      //       content: answer?.content,
      //       isCorrect: answer?.isCorrect,
      //     })),
      //   })),
      // };

      formatValue = {
        questions: [
          {
            content: quiz.question,
            questionImg: quiz.imgs && quiz.imgs.length > 0 ? quiz.imgs[0] : "",
            answer: quiz?.options?.map((q) => {
              return {
                content: q.content,
                isCorrect: q.index === quiz.correctAnswerIndex,
              };
            }),
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
  const initValueAnswer = { content: "", isCorrect: false };
  // const initValueQuestion = { content: "" };
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
                <Form.Item label="Câu hỏi" name={[field.name, "content"]}>
                  <Input placeholder="Nhập câu hỏi" />
                </Form.Item>
                <Form.Item label="Hình Ảnh" name={[field.name, "questionImg"]}>
                  <Input placeholder="Điền đường dẫn hình ảnh" />
                </Form.Item>
                {/* Nest Form.List */}
                <Form.Item label="Câu Trả Lời">
                  <Form.List
                    name={[field.name, "answer"]}
                    rules={[
                      {
                        validator: async (_, names) => {
                          if (!names || names.length < 1) {
                            return Promise.reject(
                              new Error("Vui Lòng Thêm ít nhất 1 câu trả lời")
                            );
                          }
                        },
                      },
                    ]}
                  >
                    {(subFields, subOpt, subMeta) => (
                      <div className="flex flex-col gap-4">
                        {subFields.map((subField) => (
                          <Space key={subField.key}>
                            <Form.Item
                              noStyle
                              name={[subField.name, "content"]}
                            >
                              <Input placeholder="Đáp Án" />
                            </Form.Item>
                            <Form.Item
                              noStyle
                              valuePropName="checked"
                              name={[subField.name, "isCorrect"]}
                            >
                              <Checkbox defaultChecked={false}>
                                Đáp án đúng
                              </Checkbox>
                            </Form.Item>
                            <CloseOutlined
                              className="align-[0.125rem]"
                              onClick={() => {
                                subOpt.remove(subField.name);
                              }}
                            />
                          </Space>
                        ))}
                        <Button
                          type="dashed"
                          onClick={() => subOpt.add(initValueAnswer)}
                          block
                        >
                          + Thêm Câu Trả Lời
                        </Button>
                        {subMeta.errors && subMeta.errors.length > 0 && (
                          <Form.ErrorList
                            errors={subMeta.errors}
                            className="text-red-600"
                          />
                        )}
                      </div>
                    )}
                  </Form.List>
                </Form.Item>
              </Card>
            ))}

            {/* <Button type="dashed" onClick={() => add(initValueQuestion)} block>
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
  );
};

export default EditTracNghiem;
