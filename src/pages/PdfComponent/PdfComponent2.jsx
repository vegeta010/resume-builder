import { Stack } from 'react-bootstrap'
import { BsLinkedin, BsGithub, BsGlobe } from 'react-icons/bs'
import { GiGraduateCap } from 'react-icons/gi'
import { HiLocationMarker, HiOfficeBuilding, HiOutlineMail, HiPhone } from 'react-icons/hi'
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Grid } from '@mui/material';
import './home.css'; // Import the CSS file
import { Row, Container, Col } from 'react-bootstrap'

import { useSelector } from 'react-redux';

function PdfComponent() {

    const navigate = useNavigate();
    //list of templates in array
    const resumeTemplates = [
        { id: 1, name: 'Template 1', description: 'Classic Resume Template', image: '/images/1.jpg' },
        { id: 2, name: 'Template 2', description: 'Modern Resume Template', image: '/images/2.jpg' },
        { id: 3, name: 'Template 3', description: 'Creative Resume Template', image: '/images/3.jpg' },
        { id: 4, name: 'Template 4', description: 'Professional Resume Template', image: '/images/4.jpg' },
        { id: 5, name: 'Template 5', description: 'Minimalist Resume Template', image: '/images/5.jpg' },
        { id: 6, name: 'Template 6', description: 'Elegant Resume Template', image: '/images/6.jpg' },
        { id: 7, name: 'Template 7', description: 'Traditional Resume Template', image: '/images/7.jpg' },
        { id: 8, name: 'Template 8', description: 'Unique Resume Template', image: '/images/8.jpg' },
        { id: 9, name: 'Template 9', description: 'Customizable Resume Template', image: '/images/9.jpg' },
    ];

    const handleSelectTemplate = () => {
        navigate('/details')
    };

    const { profile, file, aboutMe, experience, education, skills } = useSelector(state => state) //object destructuring


    const printDocument = () => {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'pt', 'a4', false);
                pdf.addImage(imgData, 'PNG', 0, 0, 600, 0, undefined, false);
                pdf.save("Resume.pdf");
            })
            ;
    };

    const GetIcon = (icon) => {
        switch (icon.icon) {
            case "HiOutlineMail":
                return <HiOutlineMail size={30} />
            case "HiPhone":
                return <HiPhone size={30} />
            case "BsLinkedin":
                return <BsLinkedin size={30} />
            case "BsGithub":
                return <BsGithub size={30} />
            case "BsGlobe":
                return <BsGlobe size={30} />
            default:
                return "●"
        }
    }
    const GetLinks = () => {
        const list = [];
        if (profile.email) {
            list.push({
                icon: "HiOutlineMail",
                link: profile.email,
            });
        }
        if (profile.contact) {
            list.push({
                icon: "HiPhone",
                link: profile.contact,
            });
        }
        if (profile.linkedin) {
            list.push({
                icon: "BsLinkedin",
                link: profile.linkedin,
            });
        }
        if (profile.github) {
            list.push({
                icon: "BsGithub",
                link: profile.github,
            });
        }
        if (profile.website) {
            list.push({
                icon: "BsGlobe",
                link: profile.website,
            });
        }

        return (
            list.map((item, id) => {
                return (
                    <div className={id % 2 === 0 ? "d-flex aligh-items-start align-items-center bg-2 text-white p-3" : "d-flex aligh-items-start align-items-center bg-3 text-white p-3"} key={id}>
                        <p className="m-0"><GetIcon icon={item.icon} /></p><span className="mx-2"></span><p className="m-0">{item.link}</p>
                    </div>
                )
            })
        )

    }

    return (
        <>

            <div>
                <Container>
                    <Row>
                        <Col lg={8}>
                            <div className="d-flex justify-content-center p-4">
                                <div className="row pdf bg-light" id="divToPrint" size="A4">
                                    <div className="d-flex align-items-center justify-content-center col-md-5 bg-1 p-0 py-2">
                                        <div>
                                            <div className="d-flex justify-content-center">
                                                <img src={file} className="pdf-profile-image" alt="..."></img>
                                            </div>

                                            <Stack className="text-center">
                                                <span className="font-bold m-2 fs-3 ">{profile.name}</span>
                                                <p>{profile.tagline}</p>
                                                <p className="m-0"><HiOfficeBuilding size={20} /> {profile.position}</p>
                                                <p><HiLocationMarker size={20} /> {profile.location}</p>

                                            </Stack>
                                            <br></br>
                                            <GetLinks />

                                            <br></br>
                                            <Stack className="p-3">
                                                <h4 className="title">Skills</h4>
                                                <div className="d-flex flex-wrap">
                                                    {
                                                        skills.map((items, id) => {
                                                            return (
                                                                <p className="technology rounded" key={id}>{items}</p>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </Stack>
                                        </div>

                                    </div>
                                    <div className="d-flex align-items-center col-md-7 p-0 py-4">
                                        <div>
                                            <div className="px-4 py-1">
                                                <h4 className="title">About Me</h4>
                                                <p className="text-break">
                                                    {aboutMe}
                                                </p>
                                                <hr></hr>
                                            </div>

                                            <div className="px-4">
                                                <h4 className="title">Experience</h4>
                                                {
                                                    experience.map((item, id) => {
                                                        return (
                                                            <div className="d-flex justify-content-start py-1" key={id}>
                                                                <HiOfficeBuilding size={30} />
                                                                <div className="px-3">
                                                                    <h4>{item.title}</h4>
                                                                    <p className="m-0">{item.company} • {item.startMonth} {item.startYear} {`${item.isWorking ? " - Present" : " - " + item.endMonth + " " + item.endYear}`}</p>
                                                                    <p className="m-0">{item.location}</p>
                                                                    <p>{item.description}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }

                                                <hr></hr>
                                            </div>

                                            <div className="px-4">
                                                <h4 className="title">Education</h4>
                                                {
                                                    education.map((item, id) => {
                                                        return (
                                                            <div className="d-flex justify-content-start py-1" key={id}>
                                                                <GiGraduateCap size={40} />
                                                                <div className="px-3">
                                                                    <h4>{item.institute}</h4>
                                                                    <p className="m-0">{item.degree} • {item.fieldOfStudy}</p>
                                                                    <p>{item.startYear} - {item.endYear} • Grade: {item.grade}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }


                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </Col>
                        <Col lg={4}>
                            <h5 className='mt-3'> Change Resume Formate</h5>
                            <Grid container spacing={3}>
                                {resumeTemplates.map((template) => (
                                    <Grid item xs={12} sm={6} md={6} key={template.id}>
                                        <div className="template1">
                                            <div className="template-image-container1">
                                                <img src={template.image} alt={template.name} className="template-image1" />
                                            </div>
                                            <div className="template-content1">
                                                <Typography variant="h6" className="template-name1">
                                                    {template.name}
                                                </Typography>
                                                <Typography variant="body2" className="template-description1">
                                                    {template.description}
                                                </Typography>
                                                <Button onClick={handleSelectTemplate} variant="contained" color="primary" className="select-button1">
                                                    Select Template
                                                </Button>
                                            </div>
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="d-grid col-2 mx-auto mt-4">
                <button className="nav-link align-middle bg-dark text-white p-2 rounded" onClick={printDocument}>Download</button>
            </div>

        </>
    )
}

export default PdfComponent;