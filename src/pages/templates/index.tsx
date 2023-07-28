import TemplateAPI from "../../apis/templates.api";
import MainLayout from "../../components/layout/MainLayout";
import GetTemplate from "../templates/getList";
import React, {Fragment, useState} from 'react';
import { Button, Modal, Form, Input, Upload } from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
function Template() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

    })()
    
    
  return (
    <MainLayout>
      <Button onClick={showModal}  type="primary" style={{ marginBottom: 16 }}>
        Add new template
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
   
    autoComplete="off"
  >
    <Form.Item
      label="Title"
      name="title"
      rules={[{ required: true}]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Image"
      name="image"
      rules={[{ required: true}]}
    >
      <Upload name="logo" action="/upload.do" listType="picture">
        <Button icon={<UploadOutlined />}>Click to upload</Button>
      </Upload>
    </Form.Item>
    <Form.Item
      name="upload"
      label="Upload"
      valuePropName="fileList"
      rules={[{ required: true}]}
    >
      <Upload name="logo" action="/upload.do" listType="picture">
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
