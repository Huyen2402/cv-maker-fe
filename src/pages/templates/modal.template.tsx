import TemplateAPI from "../../apis/templates.api";
import React, { Fragment, useState, useEffect } from "react";
import { Button, Modal, Form, Input, Upload, notification } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";

interface ModalProps {
  isModalOpen: boolean;
  handleOk: Function;
  handleCancel: Function;
  isEdit: boolean;
  item?: any;
}

function ModalTemplate(props: ModalProps) {
  async function submit(body: any) {
    try {
      if (body) {
        const response = await TemplateAPI.addTemplate(body);
        if (response && response.status === 201 && response.data === true)
          notification.success({
            message: "Add new template successfully!",
            placement: "topRight",
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log(props.item);

  // name: ten cua file , tra ve = response hoac random hoac lay tren url cua image neu co
  //  status: "thay status la thay mau` cua file"
  // response sao cx dc
  // url ....

  const defaultFileList: any = React.useMemo(() => {
    return [
      {
        uid: props.item?.key,
        name: props.item?.title + ".png",
        status: "done",
        response: "200", // custom error message to show
        url: props.item?.image,
      },
      // {
      //   uid: props.item?.key,
      //   name: props.item?.title + ".png",
      //   status: "error",
      //   response: "500", // custom error message to show
      //   url: props.item?.image,
      // },
    ];
  }, [props.item]);


  return (
    <Modal
      destroyOnClose={true}
      title={props.isEdit ? "Edit Template" : "Add New Template"}
      open={props.isModalOpen}
      onOk={() => props.handleOk()}
      onCancel={() => props.handleCancel()}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input defaultValue={props.isEdit ? props.item?.title : ""} />
        </Form.Item>
        <Form.Item name="image" label="Image" rules={[{ required: true }]}>
          <Upload
          
            name="logo"
            listType="picture"
            multiple={false}
            maxCount={1}
            accept=".png,.jpeg,.jpg"
            defaultFileList={defaultFileList || []}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="name" label="Upload" rules={[{ required: true }]}>
          <Upload
            name="logo"
            listType="picture"
            accept=".docx"
            multiple={false}
            maxCount={1}
          >
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
  );
}

export default ModalTemplate;
