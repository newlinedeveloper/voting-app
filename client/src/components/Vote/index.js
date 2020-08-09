import React, { Component } from "react";
import {
    getCandidates,
    updateCandidate,
    deleteCandidate,
    registerCandidate
  } from "../../actions/candidateActions";
//   import Navbar from "../Navbar";

import { Modal } from "react-bootstrap";


import {
    notification,
    Button,
    Switch,
    Pagination,
    List,
    Tooltip,
    Avatar,
    Divider,
    Select,
    Result,
    Skeleton,
    Empty,
    Form,
    Input,
  } from "antd";
  import Icon, {  DeleteOutlined,EditOutlined } from '@ant-design/icons';
  import moment from "moment";

  class Vote extends Component {

    state = {
        userId: "",
        editUserModal: false,
        deleteUserModal: false,
        userArray: [],
        name: "",
        email: "",
        phone: "",
        username: "",
        visible: true,
        isCustomerAdmin: false,
        currentPage: 1,
        totalUsers: 0,
        pageLoading: false,
        createUserModal: false,
        password: "",
        password2: "",
        loading: false,
        userModal: false,
        errName: false,
        errPhone: false,
        errEmail: false,
        errUsername: false,
        errPassword: false,
        errPassword2: false,
        errPasswordMatch: false,
        errEmailFormat: false,
      };

      componentDidMount() {

        this._getUserInfo();
      }

      _getUserInfo = () => {
        let users = getCandidates(
          this.state.currentPage
        );
        users.then((res, err) => {
          if (err) console.log(err);
          else {
            console.log(res);
            this.setState(
              { userArray: res.candidates, totalUsers: res.totalCandidates },
              () => {
                this.setState({ pageLoading: false });
              }
            );
          }
        });
      };

      

     




    render(){
        

          let content = (
            
              
            <div style={{ margin: "80px"}}>
              
              <List
                itemLayout="horizontal"
                dataSource={this.state.userArray}
                renderItem={(user) => (
                  <List.Item
                    className="list-item"
                    style={{
                      padding: "1.5%",
                      paddingTop: "2.5%",
                    }}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          size={50}
                          style={{
                            verticalAlign: "middle",
                          }}
                        >
                          <span style={{ fontSize: "20px" }}>
                            {user.name
                              ? user.name.split(" ")[0][0].toUpperCase()
                              : null}
                            {user.name
                              ? user.name.split(" ")[1]
                                ? user.name.split(" ")[1][0]
                                : null
                              : null}
                          </span>
                        </Avatar>
                      }
                      title={
                        <span style={{ fontSize: "18px", fontWeight: "500" }}>
                          {user.name}
                        </span>
                      }
                      description={
                        <div>
                          <p>
                            {/* <span style={{ color: "#16bdc8" }}>{user.email}</span>
                            <Divider type="vertical" />
      
                            <span style={{ fontSize: "12px" }}>{user.phone}</span>
      
                            <Divider type="vertical" /> */}
      
                            <span style={{ fontSize: "12px",color: "#16bdc8" }}>
                              {user.isCustomerAdmin ? "Developer" : "Hacker"}
                            </span>
                            <Divider type="vertical" />
                            <span style={{ fontSize: "12px" }}>C, C++, Python </span>
                          </p>
                        </div>
                      }
                      onClick={() => {
                        this.setState({ selectedUser: user }, () => {
                          console.log(this.state.selectedUser.isCustomerAdmin)
                          this.setState({ userModal: true });
                        });
                      }}
                      style={{ cursor: "pointer" }}
                    />
      
                    <div className="edit-delete">
                    
                    <Tooltip placement="bottom" title="Vote">
                      <Button
                      visible = {this.state.visible}
                       icon={<EditOutlined />}
                       style= {{
                        margin : 5
                      }}
                      onMouseEnter={() => {
                        
                        this.setState({ editHover: true });
                      }}

                      onMouseLeave={() => {
                        
                        this.setState({ editHover: false });
                      }}

                      onClick={() => {
                        
                        this.setState(
                          {
                            userId: user._id,
                            name: user.name,
                            email: user.email,
                            phone: user.phone,
                            visible: this.state.visible ? false : true 
                          },
                          ()=>{
                            this.setState({deleteUserModal: true })
                          }
                        );
                      }}
                       >
                         <span style={{ color: "#16bdc8" }}>Vote</span>
                      </Button>
                      
                        
                      </Tooltip>
                
                      
                    </div>
                  </List.Item>
                )}
              />
            </div>
          );


          

          let deletemodal = (
            <Modal
              aria-labelledby="contained-modal-title-vcenter"
              show={this.state.deleteUserModal}
              onHide={() => {
                this.setState({ deleteUserModal: false });
              }}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Result
                status="success"
                title="Successfully Registered!"
                subTitle="Thank you for giving your contributions for this Selection"
              />
              </Modal.Body>
            </Modal>
          );



        return(

          <div>
        {/* <Navbar /> */}
        {deletemodal}
        <div style={{ padding: "2%" }}>
        <h3 style={{ margin: "20px",textAlign: "center" }}>Hackers Voting System</h3>
          {this.state.pageLoading ? (
            <Skeleton active />
          ) : this.state.userArray.length > 0 ? (
            content
          ) : (
            <Empty
              imageStyle={{
                height: 300,
              }}
              description={<h2 style={{ fontWeight: "200" }}>No Candidates yet!</h2>}
            >
              
            </Empty>
          )}
        </div>
        <div style={{ textAlign: "center" }}>
          <Pagination
            current={this.state.currentPage}
            onChange={(page) => {
              this.setState({ currentPage: page }, () => {
                this._getUserInfo();
              });
            }}
            itemRender={(current, type, originalElement) => {
              if (type === "prev") {
                return (
                  <a>
                    <Icon type="left" />
                  </a>
                );
              }
              if (type === "next") {
                return (
                  <a>
                    <Icon type="right" />
                  </a>
                );
              }
              return originalElement;
            }}
            total={this.state.totalUsers}
          />
        </div>
      </div>

        );
    }

  }


export default Vote;