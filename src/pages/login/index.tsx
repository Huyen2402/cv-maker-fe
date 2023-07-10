import { Button, Checkbox, Form, Input, Layout } from "antd";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    // todo
    authService.setToken('test');
    navigate("/");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <div className="login-container">
        <div className="title-login">CV Maker</div>
        <Form className="login-form" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
            style={{ paddingLeft: "22px" }}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <Checkbox>Remember me</Checkbox>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
}
