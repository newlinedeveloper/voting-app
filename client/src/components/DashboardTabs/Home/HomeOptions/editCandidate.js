import React, { Component } from 'react'
import { Layout,notification,Input,Button,Card,PageHeader,Form } from 'antd';
import { Modal } from "react-bootstrap";

import {
    getCandidateById,
    updateCandidate,
    getCandidates,
    } from "../../../../actions/candidateActions";

const { Content } = Layout;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

class EditUser extends Component {
    state = {
        userId: "",
        editUserModal: false,
        deleteUserModal: false,
        name: "",
        email: "",
        phone: "",
        username: "",
        searchField: "",
        allUsers:[],
        currentPage: 1,
        totalUsers: 0,
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
        duplicateErr: false,
        emailChange : false
      };

      componentDidMount = () => {

        let data =  getCandidates();
        data.then((res) => {
            this.setState({ allUsers : res })
        })
        .catch((err) => {
            console.log(err)
        })

        data = getCandidateById(this.props.match.params.id);
        data
          .then((res) => {
            console.log(res.data);
            this.setState(
              {
                user: data.candiate,
                userId: data.candidate._id,
                name: data.candiate.name,
                email: data.candidate.email,
                phone: data.candidate.phone,
              }
            );
            console.log(this.state.username);
          })
          .catch((error) => {
            console.log(error);
          });
    }

      updateUser = (e) => {

        e.preventDefault();

        

        
      
        if (this.state.name === "") this.setState({ errName: true });
        if (this.state.email === "") this.setState({ errEmail: true });
        if (this.state.phone === "") this.setState({ errPhone: true });
        

        if (
          !this.state.errName &&
          !this.state.errEmail &&
          !this.state.errPhone &&
          !this.state.errEmailFormat
          
        ) {
        if (
          this.state.name !== "" &&
          this.state.phone !== "" &&
          this.state.username !== ""
        ) {
          this.setState({ loading: true });
          console.log(JSON.parse(localStorage.getItem("user")).user.name+ ":" +JSON.parse(localStorage.getItem("user")).user.isCustomerAdmin);
          let data = updateCandidate(
            
            this.state.userId,
            this.state.name,
            this.state.email,
            this.state.phone,
          );
          data.then((res, err) => {
            if (err) {
              console.log(err);
              notification.error({
                message: "User could not be updated",
                placement: "bottomRight",
              });
            } else {
              if (res) {
                notification.success({
                  message: "User Updated Successfully",
                  placement: "bottomRight",
                });
                this.setState({
                  loading: false
                });
                this.props.history.push('/dashboard/home/candidates');
              } else {
                notification.error({
                  message: "User could not be updated",
                  placement: "bottomRight",
                });
              }
            }
          });
        }
      }
    };

      


      handleBack = (e) => {
        this.props.history.push(`/dashboard/home/candidates/${this.props.match.params.id}`);
    }

    clearInputs = (e) => {
      e.preventDefault();
      this.setState({
        name: "",
        email: "",
        phone: "",
        username: "",
        password: "",
        password2: "",
        errName: false,
        errEmail: false,
        errUsername: false,
        errPhone: false,
        errPassword: false,
        errPassword2: false,
        errPasswordMatch: false,
        errEmailFormat: false,
        duplicateErr: false,
      });
    };

    


    render() {
        
        return (
            <Layout>
                <Content className='content'>
                <PageHeader
                     onBack={this.handleBack}
                     title= {this.state.user ? "Update User : "+this.state.user.name : ' '}
                />
                
                <div className='template-form'>
                    <br/><br/>
                  <Form
                    {...layout}
                     name="basic"
                     onSubmit={this.updateUser}
                     labelAlign="left"
                    >
                      <Form.Item
                         label="Name"
                         name="Name"
                         span={3}
                         required>
                          <Input
                            required
                            type="text"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={(e) =>
                            this.setState({
                                name: e.target.value,
                                errName: e.target.value !== "" ? false : true,
                            })
                            }
                            style={{
                            border: `${this.state.errName ? "1px solid #ff6565" : ""}`,
                            }}
                        />
                        {this.state.errName ? (
                            <div style={{ color: "#ff6565" }}>Name can't be empty</div>
                        ) : null}
                      </Form.Item>

                      <Form.Item
                         label="Email Id"
                         name="email"
                         span={3}
                         required>
                          <Input
                            required
                            type="email"
                            placeholder="Email Id"
                            // disabled="true"
                            value={this.state.email}
                            onChange={(e) => {
                            let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            this.setState({
                                emailChange : true,
                                email: e.target.value,
                                errEmail: e.target.value !== "" ? false : true,
                                errEmailFormat: re.test(e.target.value) ? false : true,
                                duplicateErr: false
                            });
                            }}
                            style={{
                            border: `${
                                this.state.errEmail || this.state.errEmailFormat || this.state.duplicateErr
                                ? "1px solid #ff6565"
                                : ""
                            }`,
                            }}
                          />
                          {this.state.errEmail ? (
                              <div style={{ color: "#ff6565" }}>Email can't be empty</div>
                          ) : null}
                          {this.state.errEmailFormat ? (
                              <div style={{ color: "#ff6565" }}>Incorrect Email Format</div>
                          ) : null}
                          {this.state.duplicateErr ? (
                              <p className='text-danger'>Email Id already exists.</p>) 
                          : null}
                      </Form.Item>

                      <Form.Item
                         label="Phone"
                         name="Phone"
                         span={3}
                         required>
                         <Input
                            type="text"
                            placeholder="Phone"
                            value={this.state.phone}
                            onChange={(e) =>
                            this.setState({
                                phone: e.target.value,
                                errPhone: e.target.value !== "" ? false : true,
                            })
                            }
                            style={{
                            border: `${this.state.errPhone ? "1px solid #ff6565" : ""}`,
                            }}
                        />
                        {this.state.errPhone ? (
                            <div style={{ color: "#ff6565" }}>Phone can't be empty</div>
                        ) : null}
                      </Form.Item>
                      
                      <Form.Item>
                        <Button
                          type="primary" 
                          htmlType="submit"
                          style={{ marginRight: "10px" }}  
                          loading={this.state.loading}
                          onClick={this.updateUser}>
                            Update
                        </Button>
                        <Button
                          type="secondary"
                          onClick={this.clearInputs}
                          
                        >
                          Clear
                        </Button>
                    </Form.Item>

                      
                    </Form>
                    </div>

                </Content>
            </Layout>
        )
    }
}

export default EditUser;