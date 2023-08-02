import TemplateAPI from "../../apis/templates.api";
import MainLayout from "../../components/layout/MainLayout";
import GetTemplate from "../templates/getList";
import React, { Fragment, useState } from "react";
import { Button, Modal, Form, Input, Upload } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
function Template() {
  const inputRef = React.useRef<any>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  (async function getData() {
    const result = await TemplateAPI.getAll();
    console.log(result.data.result);
  })();
  async function submit(body: any) {
    try {
      if(body){
      const resutl =  await TemplateAPI.addTemplate(body);
        console.log(resutl);
        if(resutl?.status === 201 && resutl.data === true)
        console.log("success");
        
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <MainLayout>
      <Button onClick={showModal} type="primary" style={{ marginBottom: 16 }}>
        Add new template
      </Button>
      <Modal
        title="Add New Template"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={(event) => submit(event)}
          autoComplete="off"
        >
          <Form.Item label="Title" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Image" rules={[{ required: true }]}>
            <Upload name="logo" listType="picture" accept=".png,.jpeg,.jpg">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="name" label="Upload" rules={[{ required: true }]}>
            <Upload name="logo" listType="picture" accept=".docx">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <GetTemplate />
    </MainLayout>
  );
}

export default Template;
