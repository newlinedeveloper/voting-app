import React, { Component } from "react";
import { Avatar, Button, Menu, Dropdown } from "antd";
import { UserOutlined,
         BellOutlined,
         SettingOutlined } from "@ant-design/icons";
import biPolarLogo from "./../../assets/react.png";
import "./navbar.css";

class NavBar extends Component {
  logout = () => {
    localStorage.clear();
    window.history.go("/");
  };

  render() {
    return (
      <div className="nav-bar">
        <nav bg="light" expand="lg" className="p-2">
          <a href="/dashboard/home">
            <img
              src={biPolarLogo}
              alt="biPolar"
              style={{ width: "4%" }}
              className="logo-white mb-2"
            />
          </a>
          <ul className="">
            <li>
              <Button type="link">
                <SettingOutlined
                  style={{ fontSize: "1.5rem", color: "#3b3b3b" }}
                />
              </Button>
            </li>
            <li>
              <Button type="link">
                <BellOutlined
                  style={{ fontSize: "1.5rem", color: "#3b3b3b" }}
                />
              </Button>
            </li>

            <li>
              <Dropdown
                overlay={
                  <Menu style={{ width: "150px", textAlign: "center" }}>
                    <Menu.Item key="0">
                      <a href="#0">Profile</a>
                    </Menu.Item>
                    <Menu.Item key="1">
                      <a href="#0">Preferences</a>
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item key="3" onClick={this.logout}>
                      <Button type="primary" danger style={{ width: "100%" }}>
                        Logout
                      </Button>
                    </Menu.Item>
                  </Menu>
                }
                trigger={["click"]}
                placement="bottomLeft"
              >
                <Button
                  type="link"
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <Avatar size="large" icon={<UserOutlined />} />{" "}
                </Button>
              </Dropdown>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavBar;
