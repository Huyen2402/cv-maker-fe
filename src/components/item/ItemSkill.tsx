import { Button, Form, Input } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
const ItemSkills = (props: any) => {
  return (
    <div>
      <Form.Item
        name={`${props.item.id}-skill`}
        rules={[{ required: true }]}
        style={{
          display: "inline-block",
          width: "calc(80% - 8px)",
          margin: "0 8px",
        }}
      >
        <Input
          onChange={(x) => props.setValueSkill(props.item.id, x.target.value)}
          placeholder="Skill"
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
          onClick={() => props.removeSkills(props.item.id)}
          icon={<MinusCircleOutlined />}
          shape="circle"
        ></Button>
      </Form.Item>
    </div>
  );
};

export default ItemSkills;
