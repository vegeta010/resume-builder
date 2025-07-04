import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, Outlet } from 'react-router-dom';

const NavbarComponent = () => {
    return (
        <>
            <div className="bg-white app-nabvar">
                <Container>
                    <Navbar>
                        <Navbar.Brand>
                            <Link to="/" className="text-decoration-none text-black">
                                <img src="/images/Logo2.png" alt="Logo" className="logo-image" />
                            </Link>
                        </Navbar.Brand>
                        <Nav className="ms-auto">
                            <NavLink to="/" className="mx-2 text-decoration-none text-black">Home</NavLink>
                            <NavLink to="/resume-checker" className="mx-2 text-decoration-none text-black">Resume Checker</NavLink>
                            <NavLink to="/details" className="mx-2 text-decoration-none text-black">Details</NavLink>
                            <NavLink to="/about" className="mx-2 text-decoration-none text-black">About Us  </NavLink>
                        </Nav>
                    </Navbar>
                </Container>
            </div>
            <Outlet />
        </>
    )
}

export default NavbarComponent;