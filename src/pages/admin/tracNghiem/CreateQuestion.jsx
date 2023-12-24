import React from "react";

import { Content } from "antd/es/layout/layout";
import CreateQuestionForm from "../../../components/Container/FormContainer/CreateQuestionForm";
import { Layout } from "antd";

const CreateQuestion = () => {
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
          <div className="flex flex-col  bg-white p-6">
            <div className="flex justify-between">
              <h1 className="font-semibold text-2xl mb-5">
                Thêm mới các câu hỏi
              </h1>
            </div>
            <CreateQuestionForm />
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default CreateQuestion;
