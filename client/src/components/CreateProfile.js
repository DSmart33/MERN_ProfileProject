import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProfile } from '../actions/profileActions';
import PropTypes from 'prop-types';
import {
    // https://reactstrap.github.io/components/modals/
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody,
    // https://reactstrap.github.io/components/form/
    Form, 
    FormGroup, 
    Label, 
    Input
} from 'reactstrap';

/* ----------------- COMPONENT ------------------ */

class CreateProfile extends Component {
    // Defaults
    state = {
        modal: false,
        name: '',
        desc: ''
    }

    // Toggle the state of the modal
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    };

    // Update on input
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    // A new profile has been submitted
    onSubmit = (e) => {
        e.preventDefault();

        const newProfile = {
            name: this.state.name,
            desc: this.state.desc
        }

        // addProfile action
        this.props.addProfile(newProfile);

        // Close Modal
        this.toggle();
    }

    // Create profile button and modal
    render() {
        return(
            <div align="right">
                <Button
                    className="createProfile-btn"
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}
                >Create Profile</Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Create a Profile</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                className="mb-3"
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter Name"
                                    onChange={this.onChange}
                                >
                                </Input>
                                <Label for="desc">Descripton</Label>
                                <Input
                                    type="text"
                                    name="desc"
                                    id="desc"
                                    placeholder="Enter Description"
                                    onChange={this.onChange}
                                >
                                </Input>
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >
                                Create Profile</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

/* ----------------- PROP TYPES ------------------ */

CreateProfile.propTypes = {
    addProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

/* ------------------- REDUX --------------------- */

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { addProfile })(CreateProfile);