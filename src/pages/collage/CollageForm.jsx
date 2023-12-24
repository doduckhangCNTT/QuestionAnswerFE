import React, { useMemo } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input, Space } from "antd";

const CollageForm = () => {
  /**
   * Thực hiện thêm mới các câu hỏi
   * @param {*} values
   */
  const handleSubmitQuestion = async (values) => {
    console.log("Values: ", values);
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
  const initValueAnswer = {};
  const initValueQuestion = {};

  return (
    <div style={{ width: "100%" }}>
      <Form
        {...formLayout}
        autoComplete="off"
        onFinish={handleSubmitQuestion}
        form={form}
      >
        <Form.List
          name="crossWords"
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
                  <Form.Item label="Tên ảnh" name={[field.name, "link"]}>
                    <Input placeholder="Nhập câu hỏi" />
                  </Form.Item>
                  {/* <Form.Item label="Hình Ảnh" name={[field.name, "questionImg"]}>
                    <Input placeholder="Điền đường dẫn hình ảnh" />
                  </Form.Item> */}
                  {/* Nest Form.List */}
                  <Form.Item label="Câu Trả Lời">
                    <Form.List
                      name={[field.name, "crossRow"]}
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
                                name={[subField.name, "content1"]}
                              >
                                <Input placeholder="Đáp Án" />
                              </Form.Item>
                              <Form.Item
                                noStyle
                                name={[subField.name, "content2"]}
                              >
                                <Input placeholder="Đáp Án" />
                              </Form.Item>
                              <CloseOutlined
                                className="align-[0.125rem]"
                                onClick={() => {
                                  subOpt.remove(subField.name);
                                }}
                              />
                            </Space>
                          ))}
                          {subFields.length < 1 ? (
                            <Button
                              type="dashed"
                              onClick={() => subOpt.add(initValueAnswer)}
                              block
                            >
                              + Thêm Câu Trả Lời
                            </Button>
                          ) : (
                            ""
                          )}
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

              <Button
                type="dashed"
                onClick={() => add(initValueQuestion)}
                block
              >
                + Thêm Câu Hỏi
              </Button>
              <Form.ErrorList errors={errors} className="text-red-600" />
            </div>
          )}
        </Form.List>

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

export default CollageForm;
