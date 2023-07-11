import { Button, Checkbox, Form, Input, Layout } from "antd";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import AuthAPI from "../../apis/auth.api";
import { useState } from "react";
import { text } from "stream/consumers";
export default function Login() {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    // todo
    authService.setToken('test');
    navigate("/");
  };
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const submitForm = async (event: any) => {
    // event.preventDefault();
    const value = {
      email: email,
      pass: pass
    }
    try {
      const result = await AuthAPI.CallAPILogin(value);
      console.log('result', result);
      if(result.status === 200){
        authService.setToken(result.data.accessToken);
        navigate("/");
      }
    } catch (error) {
      setErr('Sai thông tin đăng nhập');
      console.log(error);
    }

  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <div className="login-container">
        <div className="title-login">CV Maker</div>
        <Form className="login-form" onFinish={(event: any) => submitForm(event)}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
            style={{ paddingLeft: "22px" }}
          >
            <Input  onChange={event => setEmail(event.target.value)} placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input placeholder="Password" onChange={event => setPass(event.target.value)} type="password" />
           
          </Form.Item>
          <p style={{ color: 'red' }} >{err}</p>
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
