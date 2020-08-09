import React, { Component } from "react";
import Highlighter from 'react-highlight-words';
import {
  getCandidates,
  updateCandidate,
  deleteCandidate,
  
  } from "../../../../actions/candidateActions";

  import { Redirect } from "react-router-dom";
  


import Loader from './../../../Loader/loader';


import {
    notification,
    Button,
    Tooltip,
    Input,
    Layout,
    Pagination,
    Table,
    Checkbox,
    Menu,
    Dropdown,
    Modal
  } from "antd";

  
  
  import {  DeleteOutlined,EditOutlined,SearchOutlined,PlusOutlined,DownOutlined,LeftOutlined,RightOutlined } from '@ant-design/icons';
  

  const { Content } = Layout;
  const { Search } = Input;
  

  
  class Candidates extends Component {

    state = {
        userId: "",
        editUserModal: false,
        deleteUserModal: false,
        userArray: [],
        userArrayTemp: [],
        selectedRowKeys: [],
        datasource: [],
        selectAll: false,
        selectedUsers: [],
        selectedUserId : "",
        selectedName : null,
        user : null,
        name: "",
        email: "",
        phone: "",
        username: "",
        searchField: "",
        currentPage: 1,
        totalUsers: 0,
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
        redirect : false,
      };

      

      componentDidMount() {
        if (JSON.parse(localStorage.getItem("user"))) {
          notification.success({
              message: "Dashboard opened successfully",
              placement: "bottomRight",
            });
        }
        

        this._getUserInfo();
      }

      _getUserInfo = () => {
        this.setState({ loading : true });
        let candidates = getCandidates(
          this.state.currentPage
        );
        candidates.then((res, err) => {
          if (err) console.log(err);
          else {
            console.log(res);
            this.setState(
              { 
                userArray: res.candidates,
                userArrayTemp: res.candidates,
                totalUsers: res.totalCandidates,
                selectAll : true,
                loading : false
              },
              () => {
                this.state.userArray.map((user) => {
                  if(!this.state.selectedUsers.includes(user._id)) {
                    return this.setState({ selectAll : false })
                  }
                })
              }  
            );
          }
        });
      };

      updateUser = (e) => {
        e.preventDefault();
    
        if (
          this.state.name !== "" &&
          this.state.phone !== "" &&
          this.state.username !== ""
        ) {
          this.setState({ loading: false });
          console.log(JSON.parse(localStorage.getItem("user")).user.name+ ":" +JSON.parse(localStorage.getItem("user")).user.isCustomerAdmin);
          let data = updateCandidate(
            JSON.parse(localStorage.getItem("user")).user.customer,
            this.state.userId,
            this.state.name,
            this.state.phone,
            this.state.username,
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
                  userId: "",
                  name: "",
                  email: "",
                  phone: "",
                  username: "",
                  loading: false,
                  editUserModal: false,
                });
                this._getUserInfo();
              } else {
                notification.error({
                  message: "User could not be updated",
                  placement: "bottomRight",
                });
              }
            }
          });
        }
      };

      deleteUser = (e) => {
        e.preventDefault();
        this.setState({ loading: false });
        let data = deleteCandidate(
            JSON.parse(localStorage.getItem("user")).user.customer,
            this.state.userId
          );
        data.then((res, err) => {
          if (err) {
            console.log(err);
            notification.error({
              message: "User could not be deleted",
              placement: "bottomRight",
            });
          } else {
            if (res) {
              notification.success({
                message: "User Deleted Successfully",
                placement: "bottomRight",
              });
              this.setState({
                userId: "",
                name: "",
                email: "",
                phone: "",
                username: "",
                loading: false,
                deleteUserModal: false,
              });
              this._getUserInfo();
            } else {
              notification.error({
                message: "User could not be deleted",
                placement: "bottomRight",
              });
              this.setState({
                userId: "",
                name: "",
                email: "",
                phone: "",
                username: "",
                loading: false,
                deleteUserModal: false,
              });
            }
          }
        });
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

     
      
    
      handleSearch = (value) => {
        this.setState({ 
          userArray : this.state.userArrayTemp,
          searchField : value
         }, () => {
            this.setState((prevState) => (
              {
                userArray : prevState.userArray.filter((user) => {
                if(user.name.toLowerCase().includes(value.toLowerCase()) || user.email.toLowerCase().includes(value.toLowerCase())) {
                  return user
                }
              })
            }))
          });
      }
    
      handleClear = (e) => {
        if(e.target.value === '' ) {
          this.setState(
            {
              searchField: "",
              //  userArray : this.state.userArrayTemp
              userArray:[]
            });
            this._getUserInfo();
        }
      };

      start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
          this.setState({
            selectedRowKeys: [],
            loading: false,
          });
        }, 1000);
      };


      onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
      };

      handleClick = (e) => {
        console.log(e.currentTarget.id);
        // alert(e.currentTarget.id);
        this.setState({ selectedUserId: e.currentTarget.id, redirect: true })
      }

      
      render(){

        const menu = (
            <Menu>
              <Menu.Item
              onClick={(e) => {

                this.setState({ deleteUserModal: true });
            }}
              >
                Delete
              </Menu.Item>
            </Menu>
          );
          

          let headerOptions = (
            <div
              className= "header-design" 
            >
                  <Button
                  type="primary"
                  icon={<PlusOutlined/>}
                  onClick={() => {
                    this.setState({
                      createUserModal: false,
                      name: "",
                      username: "",
                      email: "",
                      phone: "",
                      errName: false,
                      errPhone: false,
                      errEmail: false,
                      errUsername: false,
                      errPassword: false,
                      errPassword2: false,
                      errPasswordMatch: false,
                      errEmailFormat: false,
                      loading: false,
                    });
                    this.props.history.push("/dashboard/home/candidates/new");
                  }}
                  style={{ marginBottom: "20px" }}
                >
                  New Candiate
                </Button>

                <Dropdown
                disabled = {
                  this.state.selectedUsers.length ? false : true
                }
                trigger={['click']}
                 overlay={menu}
                 placement="bottomCenter"
                 arrow
                >
                <Button
                type="secondary"
                // onClick={this.start}
                style = {{marginLeft : 7 }}  
                >
                  Actions <DownOutlined style={{ transform: "translate(0, -1px)" }}/>
                </Button>
                </Dropdown>
                <span style={{ marginLeft: 8 }}>
                {
                        this.state.selectedUsers.length ? 
                          (this.state.selectedUsers.length == 1 ?
                        `Selected ${this.state.selectedUsers.length} User` : `Selected ${this.state.selectedUsers.length} Users`)
                        : null
                    }
                </span>
              
               
                <div className="float-right d-flex inline">
                <Search
                  placeholder='Search'
                  enterButton={<SearchOutlined/>}
                  size="medium"
                  allowClear
                  onChange={this.handleClear}
                  onSearch={this.handleSearch}
                  style={{ width: 250}}
                />
                   
                </div>
              
            </div>
            
          );

          const tableBody = this.state.userArray.map((item) => (
            <tr>
                <th scope='row' className='pl-3'>
                    <Checkbox
                        checked={
                            this.state.selectAll
                                ? true
                                : this.state.selectedUsers.includes(item._id)
                                ? true
                                : false
                        }
                        onChange={(e) => {
                            if (e.target.checked) {
                                let usersArray = this.state.selectedUsers;
                                usersArray.push(item._id);
                                this.setState({ selectedUsers: usersArray });
                            } else {
                                let filteredArray = this.state.selectedUsers.filter(
                                    (i) => i !== item._id
                                );
                                this.setState(
                                    { selectedUsers: filteredArray, 
                                      selectAll: false 
                                    }
                                );
                            }
                            if(this.state.selectedUsers.length === 1) {
                              let temp = this.state.userArray.filter((user) => {
                                if(user._id === this.state.selectedUsers[0])
                                  return user
                              })
                              this.setState({ selectedName : temp }, () => { console.log(this.state.selectedName)})
                            }
                        }}
                    ></Checkbox>
                </th>
                <td>
                    <Button
                        type='link'
                        className='p-0'
                        id={item._id}
                        onClick={
                          this.handleClick
                          // this.props.history.push("/dashboard/users/manage/edit")
                        }
                    >
                        <Highlighter
                            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                            searchWords={[this.state.searchField]}
                            autoEscape
                            textToHighlight={item.name.toString()}
                        />
                    </Button>
                </td>
                <td>
                  {/* {item.email} */}
                  <Highlighter
                      highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                      searchWords={[this.state.searchField]}
                      autoEscape
                      textToHighlight={item.email.toString()}
                  />
                </td>
                <td>{item.phone}</td>
                
            </tr>
        ));
          
        return(
          <Layout>
            <Content className="content">
            {this.state.selectedUserId ? (
                <Redirect
                  to={`/dashboard/home/candidates/${this.state.selectedUserId}`}
                />
              ) : null}
            <div>
            
            {headerOptions}

            <table className='table table-hover mt-1'>
                <colgroup>
                  <col width='20'/>
                  <col width='100'/>
                  <col width='100'/>
                  <col width='100'/>
                </colgroup>
                <thead style={{ backgroundColor: "#ececec" }}>
                    <tr>
                        <th scope='col' className='p-3 pl-0'>
                            <Checkbox
                              checked={this.state.selectAll}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  this.setState({ selectAll: true }, () => {
                                    let usersArray = this.state.selectedUsers;
                                    this.state.userArray.map((item) => {
                                      if (!usersArray.includes(item._id))
                                        usersArray.push(item._id);
                                    });
                                    this.setState(
                                      {
                                        selectedUsers: usersArray,
                                      }
                                    );
                                  });
                                } else {
                                  console.log("ok");
                                  this.setState({ selectAll: false }, () => {
                                    let usersArray = this.state.selectedUsers;
                                    let temp = [];
                                    let exclude = [];

                                    this.state.userArray.map((item) => {
                                      if (usersArray.includes(item._id)) {
                                        exclude.push(item._id);
                                      }

                                      temp = usersArray.filter((user) => {
                                        if (!exclude.includes(user))
                                          return user;
                                      });
                                    });

                                    this.setState(
                                      {
                                        selectedUsers: temp,
                                      }
                                    );
                                  });
                                }
                              }}
                            ></Checkbox>
                        </th>
                        <th scope='col' className='p-3'>
                            Name
                        </th>
                        <th scope='col' className='p-3'>
                            Email Id
                        </th>
                        <th scope='col' className='p-3'>
                            Phone No
                        </th>
                    </tr>
                </thead>
                <tbody>{tableBody}</tbody>
            </table>
            {this.state.loading ? 
                (<div className='no-results'>
                  <Loader/>
                </div>) : 
                null 
              }

              {this.state.userArray.length || this.state.loading ? null : (
                <p className='text-muted no-results'>No results found.</p>
              )}

            <div style={{ textAlign: "right" }}>
              <Pagination
                current={this.state.currentPage}
                onChange={(page) => {
                  this.setState({
                    userArray: [], 
                    currentPage: page,
                    selectAll: false,
                  }, () => {
                    this.state.searchField
                    ? this.handleSearch()
                    : this._getUserInfo();
                  });
                }}
                total={this.state.totalUsers}
              />
            </div>
              
              <br/><br/>
              <Modal
                centered
                title='Confirm Delete'
                visible={this.state.deleteUserModal}
                footer={[
                  <Button
                    onClick={(e) => {
                      this.setState({ deleteUserModal: false });
                    }}
                  >
                    Cancel
                  </Button>,
                  <Button type='primary' danger onClick={this.deleteMultipleUser}>
                    Delete
                  </Button>,
                ]}
                onCancel={(e) => {
                  this.setState({ deleteUserModal: false });
                }}
              >
                <p>
                {this.state.selectedUsers.length === 1 ?
                  (<p>Do you want to delete {this.state.selectedName[0].name}?</p>) :
                  (<p>Do you want to delete the selected {this.state.selectedUsers.length} Users?</p>)
                }
                </p>
              </Modal>
            
            
          </div>
          </Content>
        </Layout>

        );
    }

  }


export default Candidates;