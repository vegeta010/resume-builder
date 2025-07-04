import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { MdEdit, MdClose } from 'react-icons/md';
import { BsGithub, BsLinkedin, BsGlobe } from 'react-icons/bs';
import { HiLocationMarker, HiOfficeBuilding, HiOutlineMail, HiPhone } from 'react-icons/hi';
import { setProfile } from '../store/slices/ProfileSlice';
import { setFile } from '../store/slices/FileSlice';

function Profile() {
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState(false);
    const [profileName, setProfileName] = useState('');
    const [profileURL, setProfileURL] = useState('');
    const [formValues, setFormValues] = useState({
        name: '',
        location: '',
        position: '',
        tagline: '',
        email: '',
        contact: '',
        github: '',
        linkedin: '',
        website: '',
    });

    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile);
    const file = useSelector(state => state.file);

    function handleFile(e) {
        const url = URL.createObjectURL(e.target.files[0]);
        dispatch(setFile(url));
        console.log(url); //changed
    }

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleClose = () => setShow(false);

    const handleShow = () => {
        setFormValues({
            name: '',
            location: '',
            position: '',
            tagline: '',
            email: '',
            contact: '',
            github: '',
            linkedin: '',
            website: '',
        });
        setShow(true);
    };

    const handleAlertHide = () => {
        setProfileName('');
        setProfileURL('');
        setAlert(false);
    };

    const handleAlertShow = (Profile, Link) => {
        setProfileName(Profile);
        setProfileURL(Link);
        setAlert(true);
    };

    const handleSave = () => {
        Object.entries(formValues).forEach(([name, value]) => {
            dispatch(setProfile({ name, value }));
        });
        handleClose();
    };

    const handleProfileClick = () => {
    }

    return (
        <>
            <div className='details'>
                <Row className="justify-content-center">
                    <Col md={8} sm={12} className="d-flex justify-content-between img-column">
                    <a href = {file} target="_blank">
                        <img src={file} className="profile-image" alt="Profile" onClick={handleProfileClick} />
                    </a>
                        <MdEdit size={30} className="rounded edit cursor-pointer" onClick={handleShow} />
                    </Col>
                </Row>

                <Row className="justify-content-center mt-2">
                    <Col md={4} sm={6}>
                        <Col><h4>{profile.name}</h4></Col>
                        <Col className="d-flex justify-content-start">
                            <HiLocationMarker size={30} className="p-1" /><p className="p-1 m-0">{profile.location}</p>
                            <HiOfficeBuilding size={30} className="p-1" /><p className="p-1 m-0">{profile.position}</p>
                        </Col>
                        <Col><p className="px-2">{profile.tagline}</p></Col>
                    </Col>

                    <Col md={4} sm={6} className="d-flex flex-wrap">
                        <p className="p-1 m-0" onClick={() => handleAlertShow("LinkedIn Profile", profile.linkedin)}><BsLinkedin size={30} className="p-1" />LinkedIn</p>
                        <p className="p-1 m-0" onClick={() => handleAlertShow("GitHub Profile", profile.github)}><BsGithub size={30} className="p-1" />GitHub</p>
                        <p className="p-1 m-0" onClick={() => handleAlertShow("Portfolio", profile.website)}><BsGlobe size={30} className="p-1" />Portfolio</p>
                        <p className="p-1 m-0" onClick={() => handleAlertShow("Email Address", profile.email)}><HiOutlineMail size={30} className="p-1" />Email</p>
                        <p className="p-1 m-0" onClick={() => handleAlertShow("Contact Number", profile.contact)}><HiPhone size={30} className="p-1" />Contact Number</p>
                    </Col>
                </Row>
                {/* Profile Edit Modal */}
                <Modal show={show} onHide={handleClose} centered backdrop="static">
                    <Modal.Header>
                        <Modal.Title>Profile Details</Modal.Title>
                        <MdClose size={30} className="rounded edit" onClick={handleClose} />
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {["name", "location", "position", "tagline", "email", "contact", "github", "linkedin", "website"].map(field => (
                                <Form.Group className="mb-3" key={field}>
                                    <Form.Control
                                        type={field === "email" ? "email" : field === "contact" ? "number" : "text"}
                                        name={field}
                                        size="sm"
                                        placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                                        value={formValues[field]}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                            ))}
                            <Form.Group controlId="formFileSm" className="mb-3">
                                <Form.Label>Profile Picture</Form.Label>
                                <Form.Control type="file" size="sm" onChange={handleFile} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="rounded edit px-2" onClick={handleSave}>
                            Save Changes
                        </button>
                    </Modal.Footer>
                </Modal>
                {/* Alert Modal */}
                <Modal show={alert} onHide={handleAlertHide}>
                    <Modal.Header>
                        <Modal.Title>{profileName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{profileURL}</Modal.Body>
                </Modal>
            </div>
        </>
    );
}

export default Profile;
