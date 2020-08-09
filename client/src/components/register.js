import React, { Component } from "react";
import { Button, notification, Input } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Logo from "../assets/react.png";
import { registerUser } from "../actions/registerActions";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    loading: false,
  };
  _register = (e) => {
    e.preventDefault();

    if (
      this.state.name !== "" &&
      this.state.email !== "" &&
      this.state.password !== ""
    ) {
      this.setState({ loading: true });
      let data = registerUser(
        this.state.name,
        this.state.email,
        this.state.password
      );
      data.then((res, err) => {
        if (err) {
          console.log(err);
        } else {
          if (res.err) {
            console.log(res.err);
          } else {
            if (res.data === "User Registered") {
              notification.success({
                message: "Registration Successful",
                placement: "bottomRight",
              });
            } else {
              notification.error({
                message: "Register Unsuccessfull",
                placement: "bottomRight",
              });
            }
            this.setState({
              loading: false,
              name: "",
              email: "",
              password: "",
            });
          }
        }
      });
    }
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
              height: "450px",
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
              REGISTER
            </h2>
            <div className="mt-5 pl-4 pr-4">
              <form onSubmit={this._register}>
                <div className="p-3">
                  <Input
                    size="large"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={(e) => {
                      this.setState({ name: e.target.value });
                    }}
                    prefix={<UserOutlined />}
                  />
                </div>
                <div className="p-3">
                  <Input
                    size="large"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={(e) => {
                      this.setState({ email: e.target.value });
                    }}
                    prefix={<MailOutlined />}
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
                    Register
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

export default Register;
