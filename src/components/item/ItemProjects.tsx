import { Button, Form, Input } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import React from "react";
const { TextArea } = Input;
const ItemProjects = (props: any) => {
  const [value, setValue] = React.useState<object>({});
  let updatedValue = {};
  const nameProject = async (value: string) => {
    updatedValue = { name: value };
    setValue((value) => ({
      ...value,
      ...updatedValue,
    }));
  };

  const urlGitProject = async (value: string) => {
    updatedValue = { urlGit: value };
    setValue((value) => ({
      ...value,
      ...updatedValue,
    }));
  };

  const descriptionProject = async (value: string) => {
    updatedValue = { description: value };
    setValue((value) => ({
      ...value,
      ...updatedValue,
    }));
  };

  (function totalItem() {
    props.setValueSProject(
      props.item.id,
      (value as any).name,
      (value as any).urlGit,
      (value as any).description
    );
  })();
  return (
    <div>
      <Form.Item
        name={`${props.item.id}-name`}
        rules={[{ required: true }]}
        style={{
          display: "inline-block",
          width: "calc(50% - 8px)",
          margin: "0 8px",
        }}
      >
        <Input
          onChange={(x) => nameProject(x.target.value)}
          placeholder="Name"
        />
      </Form.Item>
      <Form.Item
        name={`${props.item.id}-git`}
        rules={[{ required: true }]}
        style={{
          display: "inline-block",
          width: "calc(80% - 8px)",
          margin: "4px 8px",
        }}
      >
        <Input
          onChange={(x) => urlGitProject(x.target.value)}
          placeholder="GitHub"
        />
      </Form.Item>
      <Form.Item
        name={`${props.item.id}-description`}
        rules={[{ required: true }]}
        style={{
          display: "inline-block",
          width: "calc(80% - 8px)",
          margin: "0 8px",
        }}
      >
        <TextArea
          onChange={(x) => descriptionProject(x.target.value)}
          placeholder="Description"
          rows={4}
          style={{ marginBottom: "12px" }}
        />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        style={{
          display: "inline-block",
          width: "calc(10% - 8px)",
          margin: "0 8px",
        }}
      >
        <Button
          onClick={() => props.removeProjects(props.item.id)}
          icon={<MinusCircleOutlined />}
          shape="circle"
        ></Button>
      </Form.Item>
    </div>
  );
};

export default ItemProjects;
