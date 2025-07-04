import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';
import Profile from '../../components/Profile';
import AboutMe from '../../components/AboutMe';
import Experience from '../../components/Experience';
import Education from '../../components/Education';
import Skills from '../../components/Skills';
import { useNavigate, useLocation } from 'react-router-dom';

const Details = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handlePreview = () => {
        if (templateId === '1') {
            navigate('/preview');
        }
         else if (templateId === '2') {
            navigate('/preview-2');
        }
         else if (templateId === '3') {
            navigate('/preview-3');
        }
        else if (templateId === '4') {
            navigate('/preview-4');
        }
        else if (templateId === '5') {
            navigate('/preview-5');
        }
        else if (templateId === '6') {
            navigate('/preview-6');
        }
        else if (templateId === '7') {
            navigate('/preview-7');
        }
        else if (templateId === '8') {
            navigate('/preview-8');
        }
        else if (templateId === '9') {
            navigate('/preview-9');
        }
        else {
            navigate('/preview');
        }
    };

    const queryParams = new URLSearchParams(location.search);
    const templateId = queryParams.get('template');
    return (
        <>
            <Container fluid className="p-0 top-image" />
            <Container className='bg-white'>
                <Profile />
                <AboutMe />
                <Experience />
                <Education />
                <Skills />
                <div className="d-grid col-2 mx-auto my-4 text-center">
                    <NavLink className="nav-link align-middle bg-success text-white p-2 rounded" onClick={handlePreview}>Preview</NavLink>
                </div>
            </Container>
        </>
    )
}

export default Details;