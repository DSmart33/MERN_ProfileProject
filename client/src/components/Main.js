import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getProfiles, editProfile, deleteProfile } from '../actions/profileActions';
import PropTypes from 'prop-types';
import { 
    Container,
    ListGroup,
    ListGroupItem,
    Button,
    // https://reactstrap.github.io/components/modals/
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

class Main extends Component {
    componentDidMount() {
        this.props.getProfiles();
    }

    // Defaults
    state = {
        modal: false,
        id:'',
        name: '',
        desc: ''
    }

    toggle = (id,name,desc) => {
        this.setState({
            modal: !this.state.modal,
            id: id,
            name: name,
            desc: desc
        })
    };

    // Update on input
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    // A profile edit has been submitted
    onSubmit = (e) => {
        e.preventDefault();

        const newValue = {
            name: this.state.name,
            desc: this.state.desc
        }

        // editProfile action
        this.props.editProfile(this.state.id, newValue);

        // Close Modal
        this.toggle();
    }

    // A delete profile request has been made
    onDeleteClick = (id) => {
        // deleteProfile action
        this.props.deleteProfile(id);
    }

    // Edit/delete profile buttons and editProfile modal
    render() {
        // Use destructoring to pull profiles from redux (this.props.profile)
        const { profiles } = this.props.profile;
        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className="Profiles">
                        {/* Map through each profile and display them */}
                        {profiles.map(({ _id, name, desc}) => (
                            <CSSTransition key ={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <div align="right">
                                    <Button
                                        className="editProfile-btn"
                                        color="warning"
                                        size="sm"
                                        onClick={this.toggle.bind(this, _id, name, desc)}
                                    >edit</Button>
                                    <Button
                                        className="removeProfile-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                    >
                                        &times;
                                    </Button>
                                    </div>
                                    <Modal
                                        isOpen={this.state.modal}
                                        toggle={this.toggle}
                                    >
                                        <ModalHeader toggle={this.toggle}>Edit Profile</ModalHeader>
                                        <ModalBody>
                                            <Form onSubmit={this.onSubmit}>
                                                <FormGroup>
                                                    <Label for="name">Name</Label>
                                                    <Input
                                                        className="mb-3"
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        placeholder={this.state.name}
                                                        onChange={this.onChange}
                                                    >
                                                    </Input>
                                                    <Label for="desc">Descripton</Label>
                                                    <Input
                                                        type="text"
                                                        name="desc"
                                                        id="desc"
                                                        placeholder={this.state.desc}
                                                        onChange={this.onChange}
                                                    >
                                                    </Input>
                                                    <Button
                                                        color="dark"
                                                        style={{ marginTop: '2rem' }}
                                                        block
                                                    >
                                                    Edit Profile</Button>
                                                </FormGroup>
                                            </Form>
                                        </ModalBody>
                                    </Modal>
                                    <div>
                                        <img 
                                            src="https://www.launchpartner.co/images/altHome/launch-your-product.png" 
                                            alt="ProfilePicPlaceholder_LaunchPartnerRockets" width="50" height="50" align="left">
                                        </img>
                                    </div>
                                    <div align="center">
                                        
                                        {name}
                                    </div>
                                    <div align="center">
                                        {desc}
                                    </div>                                    
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

/* ----------------- PROP TYPES ------------------ */

Main.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    editProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

/* ------------------- REDUX --------------------- */

// Takes profile state and maps it into a component property
const mapStateToProps = (state) => ({
    profile: state.profile
});

export default connect( mapStateToProps, { getProfiles, editProfile, deleteProfile })(Main);