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
        if(body.id){
          const response = await TemplateAPI.editTemplate(body);
          if (response && response === true)
          notification.success({
            message: "Update template successfully!",
            placement: "topRight",
          });
          
        }
        else{
          const response = await TemplateAPI.addTemplate(body);
          if (response && response.status === 201 && response.data === true)
            notification.success({
              message: "Add new template successfully!",
              placement: "topRight",
            });
        }
        
      }
    } catch (error) {
      console.log(error);
    }
  }

  const defaultImage: any = React.useMemo(() => {
    return [
      {
        uid: props.item?.key,
        name: props.item?.title + ".png",
        status: "done",
        response: "200", // custom error message to show
        url: props.item?.image,
      },
    ];
  }, [props.item]);

  const defaultFile: any = React.useMemo(() => {
    return [
      {
        uid: props.item?.key,
        name: props.item?.title + ".docx",
        status: "done",
        response: "200", // custom error message to show
        url: props.item?.file,
      },
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
        onFinish={(body) => submit(body)}
      >
        <Form.Item style={{display: 'none'}} initialValue={props.isEdit ? props.item?.key : ""} label="ID" name="id" >
          <Input defaultValue={props.isEdit ? props.item?.key : ""} />
       
        </Form.Item>
      <Form.Item initialValue={props.isEdit ? props.item?.title : ""} label="Title" name="title" >
          <Input defaultValue={props.isEdit ? props.item?.title : ""} />
       
        </Form.Item>
        <Form.Item  name="image" label="Image" >
          <Upload
          
            name="logo"
            listType="picture"
            multiple={false}
            maxCount={1}
            accept=".png,.jpeg,.jpg"
            defaultFileList={ props.isEdit ? defaultImage : ''}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item  name="name" label="Upload" >
          <Upload
            name="logo"
            listType="picture"
            accept=".docx"
            multiple={false}
            maxCount={1}
            defaultFileList={ props.isEdit ? defaultFile : ''}
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
