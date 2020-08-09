import React, { Component } from "react";
import { Button, notification, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Logo from "./../../assets/react.png";
import { loginUser } from "../../actions/loginActions";

class Login extends Component {
  state = {
    email: "",
    password: "",
    loading: false,
  };
  _login = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    let data = loginUser(this.state.email, this.state.password);
    data.then((res, err) => {
      if (err) {
        console.log(err);
      } else {
        if (res.err) {
          console.log(err);
        } else {
          if (res.data) {
            notification.success({
              message: "Login Successful",
              placement: "bottomRight",
            });
            localStorage.setItem("user", JSON.stringify(res.data));

            this.props.history.push("/dashboard");
          } else {
            notification.error({
              message: "Invalid User Credentials",
              placement: "bottomRight",
            });
          }
          this.setState({ loading: false });
        }
      }
    });
  };
  render() {
    return (
      <div>
        <div
          className="p-4"
          style={{ height: "100vh", backgroundColor: "#f4f4f4" }}
        >
          <img src={Logo} alt="Logo" style={{ width: "7%" }} />
          <div
            style={{
              margin: "auto",
              width: "500px",
              height: "400px",
              backgroundColor: "#ffffff",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              boxShadow: "0 0 20px #c7c7c7",
              padding: "2%",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                letterSpacing: "2px",
                marginTop: "5%",
              }}
            >
              LOGIN
            </h2>
            <div className="mt-5 pl-4 pr-4">
              <form onSubmit={this._login}>
                <div className="p-3">
                  <Input
                    size="large"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={(e) => {
                      this.setState({ email: e.target.value });
                    }}
                    prefix={<UserOutlined />}
                  />
                </div>
                <div className="p-3">
                  <Input.Password
                    size="large"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={(e) => {
                      this.setState({ password: e.target.value });
                    }}
                    prefix={<LockOutlined />}
                  />
                </div>
                <div className="p-3">
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ letterSpacing: "1px" }}
                    loading={this.state.loading}
                  >
                    Login
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
