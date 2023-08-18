import React from "react";
import { MinusCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, DatePicker } from "antd";
const { RangePicker } = DatePicker;

const ExperienceItem = (props: any) => {
  const [value, setValue] = React.useState<object>({});
  let updatedValue = {};
  const nameExperience = async (value: string) => {
    updatedValue = { name: value };
    setValue((value) => ({
      ...value,
      ...updatedValue,
    }));
  };

  const companyExperience = async (value: string) => {
    updatedValue = { company: value };
    setValue((value) => ({
      ...value,
      ...updatedValue,
    }));
  };

  const startExperience = async (value: any, date: any) => {
    updatedValue = { startDate: date[0], endDate: date[1] };
    setValue((value) => ({
      ...value,
      ...updatedValue,
    }));
  };
  (function totalItem() {
    props.setValueExperience(
      props.item.id,
      (value as any).name,
      (value as any).company,
      (value as any).start,
      (value as any).end
    );
  })();

  return (
    <div>
      <Form.Item
        name={`${props.item.id}-position`}
        rules={[{ required: true }]}
        style={{ display: "inline-block", width: "calc(50% - 8px)" }}
      >
        <Input
          onChange={(x) => nameExperience(x.target.value)}
          placeholder="Position"
        />
      </Form.Item>
      <Form.Item
        name={`${props.item.id}-company`}
        rules={[{ required: true }]}
        style={{
          display: "inline-block",
          width: "calc(50% - 8px)",
          margin: "0 8px",
        }}
      >
        <Input
          onChange={(x) => companyExperience(x.target.value)}
          placeholder="Company"
        />
      </Form.Item>
      <Form.Item
        name={`${props.item.id}-time`}
        rules={[{ required: true }]}
        style={{
          display: "inline-block",
          width: "calc(80% - 8px)",
          margin: "0 8px",
        }}
      >
        <RangePicker
          onChange={(date, dateSTR) => startExperience(date, dateSTR)}
          picker="month"
        />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        style={{
          display: "inline-block",
          width: "calc(10% - 8px)",
          margin: "0 8px",
          marginBottom: "12px",
        }}
      >
        <Button
          onClick={() => props.removeExperience(props.item.id)}
          icon={<MinusCircleOutlined />}
          shape="circle"
        ></Button>
      </Form.Item>
    </div>
  );
};

export default ExperienceItem;
