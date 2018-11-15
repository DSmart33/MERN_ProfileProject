import React, { Component } from 'react';
import {
    /* https://reactstrap.github.io/components/collapse/ */
    Collapse,
    /* https://reactstrap.github.io/components/navbar/ */
    Navbar,
    NavbarToggler,
    NavbarBrand,
    /* https://reactstrap.github.io/components/navs/ */
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

/* ----------------- COMPONENT ------------------ */

class AppNavbar extends Component {
    // Set the default state to closed
    state = {
        isOpen: false
    }

    // Toggle. Use arrow function to avoid binding in constructor
    toggle = () => {
        this.setState({
            // Toggle
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                {/* Bootstrap properties */}
                {/* Set Navbar to dark and add dark attribute for light text */}
                {/* Set expand to sm to create hamburger menu on small screens */}
                {/* Margin-bottom-5 to move under the navbar */}
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">
                        <img src="https://blog.launchpartner.co/hs-fs/hubfs/lplogo.png?t=1541819574557&width=381&name=lplogo.png"
                        alt="LaunchPartnerLogo" width="200" height="40" align="right"></img>
                        </NavbarBrand>
                        {/* Event handler for navbar */}
                        <NavbarToggler onClick={this.toggle} />
                        {/* Match the state and define navbar */}
                        <Collapse isOpen={this.state.isOpen} navbar>
                            {/* Margin-left-auto to align the links to the right 
                            and define navbar */}
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="https://github.com/Dsmart33/MERN_ProfileProject">
                                        Github
                                </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default AppNavbar;