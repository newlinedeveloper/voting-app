import React, { Component } from 'react'
import { Layout,notification,Button,Tooltip,Input,PageHeader,Card,Form } from 'antd';

import { Modal } from "react-bootstrap";
import { registerCandidate,getCandidates } from "../../../../actions/candidateActions";

const { Content } = Layout;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 8 },
};

class NewCandidate extends Component {
    state = {
        userId: "",
        name: "",
        email: "",
        phone: "",
        username: "",
        allUsers: [],
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
        duplicateErr: false,
        
      };

      componentDidMount = () => {
        let customerId = JSON.parse(localStorage.getItem('user')).user.customer
        let data =  getCandidates();
        data.then((res) => {
            // console.log(res);
            this.setState({ allUsers : res });
            console.log(this.state.allUsers);
        })
        .catch((err) => {
            console.log(err)
        })
    }

      register = (e) => {
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
            this.state.email !== "" &&
            this.state.phone !== "" 
          ) {
            this.setState({ loading: true });
            console.log("User Object is clicked");
            
            let data = registerCandidate(
              this.state.name,
              this.state.email,
              this.state.phone
            );
            data.then((res, err) => {
              if (err) {
                console.log(err);
                notification.error({
                  message: "Candidate could not be created",
                  placement: "bottomRight",
                });
              } else {
                if (res) {
                  notification.success({
                    message: "Candidate Registered Successfully",
                    placement: "bottomRight",
                  });
                  this.setState({
                    loading: false,
                  });
                  this.props.history.push('/dashboard/home/candidates');


                } else {
                  notification.error({
                    message: "Candidate could not be created.",
                    placement: "bottomRight",
                  });
                  this.setState({
                    loading: false,
                  });
                }
              }
            });
          }
        }
      };

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
        });
      };

      handleBack = (e) => {
        this.props.history.push('/dashboard/home/candidates')
    }

    render() {
        
        return (
            <Layout>
                <Content className='content'>
                    <PageHeader
                      onBack={this.handleBack}
                      title="New Candidate"
                    />
                    <div className='template-form'>
                    <br/><br/>
                  <Form
                  {...layout}
                     name="basic"
                     labelAlign="left"
                     onSubmit={this.register}
                    >
                      <Form.Item
                         label="Name"
                         name="Name"
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
                         required>
                          <Input
                            required
                            type="email"
                            placeholder="Email Id"
                            value={this.state.email}
                            onChange={(e) => {
                            let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            this.setState({
                                email: e.target.value,
                                errEmail: e.target.value !== "" ? false : true,
                                errEmailFormat: re.test(e.target.value) ? false : true,
                                duplicateErr: false
                            });
                            }}
                            style={{
                            border: `${
                                this.state.errEmail || this.state.errEmailFormat
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
                          onClick={this.register}>
                            Add candiate
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

export default NewCandidate;