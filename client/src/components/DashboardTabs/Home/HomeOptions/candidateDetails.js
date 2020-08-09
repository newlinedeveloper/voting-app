import React, { Component } from 'react'
import { Layout,
         PageHeader,
         Descriptions,
         Button,
         notification,
         Modal } from 'antd'

import { getCandidateById,
        deleteCandidate } from './../../../../actions/candidateActions'

const { Content } = Layout

class UserDetails extends Component {

    state = {
        user : null,
        modal : false
    }

    componentDidMount = (e) => {
        // console.log(this.props.match.params);
        let data =  getCandidateById(this.props.match.params.id);
        data.then((res) => {
            // console.log(res);
            this.setState({ user : res.data.candidate })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    handleBack = (e) => {
        this.props.history.push('/dashboard/home/candidates')
    }

    
    handleEdit = (e) => {
        this.props.history.push(`/dashboard/home/candidates/edit/${this.props.match.params.id}`)
    }

    handleDelete = (e) => {
        let userId = this.state.user._id
        let customerId = JSON.parse(localStorage.getItem('user')).user.customer
        let data = deleteCandidate(customerId, userId)
        data.then((res) => {
            if(res.data) {
                notification.success({
                    message: "User deleted successfully",
                    placement: "bottomRight",
                });
                this.handleBack()
            }
            else {
                notification.error({
                    message: "User Could not to be deleted",
                    placement: "bottomRight",
                });
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    handleConfirm = (e) => {
        this.setState({ modal : true })
    }

    render() {

        return(
            <Layout>
                <Content className='content'>
                    <PageHeader
                     onBack={this.handleBack}
                     title={this.state.user ? this.state.user.name : ' '}/>
                    {this.state.user ?
                        (<Descriptions bordered size='small' className='mb-4 ml-4 template w-75'>
                            <Descriptions.Item
                             label='Name' 
                             span={3}>
                                {this.state.user.name}
                            </Descriptions.Item>
                            <Descriptions.Item
                             label='Email Id' 
                             span={3}>
                                {this.state.user.email}
                            </Descriptions.Item>
                            <Descriptions.Item
                             label='Phone No' 
                             span={3}>
                                {this.state.user.phone}
                            </Descriptions.Item>
                        </Descriptions>) :
                        (null)
                    }                    
                    <Button
                     type='primary'
                     className='ml-4'
                     onClick={this.handleEdit}>
                        Update
                    </Button>
                    <Button
                     type='primary'
                     danger
                     className='ml-2'
                     onClick={this.handleConfirm}>
                        Delete
                    </Button>
                    <Modal
                     centered
                     title='Confirm Delete'
                     visible={this.state.modal}
                     footer={[
                        <Button
                         onClick={(e) => { this.setState({ modal : false }) }}
                        >
                            Cancel
                        </Button>,
                        <Button
                         type='primary'
                         danger
                         onClick={this.handleDelete}
                        >
                           Delete
                       </Button>
                     ]}
                     onCancel={(e) => { this.setState({ modal : false }) }}
                    >
                        <p>
                            Do you want to delete <b>{this.state.user ? this.state.user.name : ' '}</b>?
                        </p>
                    </Modal>
                </Content>
            </Layout>
        )
    }
}

export default UserDetails