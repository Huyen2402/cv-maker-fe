/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Checkbox, Form, Input, Layout, notification } from "antd";
import { useNavigate } from "react-router-dom";
import UserAPI from "../../apis/user.api";
import { setAccessToken, setRefreshToken } from "../../common/utils";
export default function Login() {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const result = await UserAPI.login(values.email, values.password);
        if(result.status === 200){
          setAccessToken(result.data.accessToken);
          setRefreshToken(result.data.refreshToken);
          navigate("/");
        } else {
          notification.error({
            message: result.data.message,
            placement: "topRight",
          });
        }
    } catch (error) {
      notification.error({
        message: 'Email or password is incorrect!',
        placement: "topRight",
      });
    }
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
            <Input placeholder="Password" type="password" />
           
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
