import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Phone, Mail, Home, GraduationCap, Briefcase, Award, Star } from 'lucide-react';
import "./Template6.css"
import { useSelector, useDispatch } from 'react-redux';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';
import '../../../App.css';
import { uploadResume } from '../../../utils/uploadResume';

function Template6() {
    const { profile, file, aboutMe, experience, education, skills } = useSelector(state => state);
    // const dispatch = useDispatch();
    const navigate = useNavigate();
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

    const printDocument = () => {
        const input = document.getElementById('divToPrint');
        if (!input) return;

        html2canvas(input, {
            scale: 1.5, // Better readability
            useCORS: true,
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/jpeg', 0.7);
            const pdf = new jsPDF('p', 'pt', 'a4');

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('Resume.pdf');

            // Optional size estimate
            const estimatedSizeKB = Math.round((imgData.length * (3 / 4)) / 1024);
            console.log(`Estimated image size: ${estimatedSizeKB} KB`);
        }).catch((err) => {
            console.error('PDF generation failed:', err);
        });
    };

    const handleClick = async () => {
        const result = await uploadResume({ profile, file, aboutMe, experience, education, skills });

        if (result.success) {
            console.log("Uploaded successfully!", result.data);
        } else {
            console.error("Upload failed", result.error);
        }

        printDocument();
    };
    const handleSelectTemplate = (templateId) => {
        navigate(`/details?template=${templateId}`);
    };
    const getFormattedYearMonth = (year, month) => {
        if (!year) return '';
        const date = new Date(year, month - 1);
        return date.getFullYear();
    };

    return (
        <div className='template6'>
            <Container>
                <Row>
                    <Col lg={9}>
                        <div className="header pt-4" id="divToPrint">
                            <div className="profile-section">
                                <img
                                    src={file || "https://via.placeholder.com/150"}
                                    alt="Profile"
                                    className="profile-img"
                                />
                            </div>

                            <div className="info-section">
                                <h1>{profile.name}</h1>
                                <h2>{profile.tagline}</h2>

                                <div className="contact-info">
                                    {profile.contact && (
                                        <div className="contact-item">
                                            <Phone size={18} />
                                            {profile.contact}
                                        </div>
                                    )}
                                    {profile.email && (
                                        <div className="contact-item">
                                            <Mail size={18} />
                                            {profile.email}
                                        </div>
                                    )}
                                </div>
                                {profile.location && (
                                    <div className="contact-item mt-2">
                                        <Home size={18} />
                                        {profile.location}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="content-section">
                            <div className="section-title">
                                <div className="section-title-icon">
                                    <GraduationCap size={16} color="white" />
                                </div>
                                EDUCATION
                            </div>

                            {education.map((item, index) => (
                                <div className="education-item" key={index}>
                                    <div className="education-date">{item.startYear} - {item.endYear}</div>
                                    <div className="d-flex justify-content-between">
                                        <strong>{item.institute}</strong>
                                        <strong>{item.degree}</strong>
                                    </div>
                                    <div>{item.fieldOfStudy}</div>
                                    {item.grade && <div>Grade: {item.grade}</div>}
                                </div>
                            ))}

                            <div className="section-title">
                                <div className="section-title-icon">
                                    <Briefcase size={16} color="white" />
                                </div>
                                EXPERIENCE
                            </div>

                            {experience.map((item, index) => (
                                <div className="experience-item" key={index}>
                                    <div className="education-date">{getFormattedYearMonth(item.startYear, item.startMonth)} - {item.isWorking ? 'Present' : getFormattedYearMonth(item.endYear, item.endMonth)}</div>
                                    <div className="d-flex justify-content-between">
                                        <strong>{item.company}</strong>
                                        <strong>{item.title}</strong>
                                    </div>
                                    <ul>
                                        {item.description && item.description.split('\n').map((point, i) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                            <div className="section-title">
                                <div className="section-title-icon">
                                    <Award size={16} color="white" />
                                </div>
                                SKILLS
                            </div>
                            <div className='skills'>
                                <ul>
                                    {skills.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Col>
                    <Col lg={3}>
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
                                            <Button
                                                onClick={() => handleSelectTemplate(template.id)}
                                                variant="contained"
                                                color="primary"
                                                className="select-button1 btn-sm px-3 mt-3 btn-primary"
                                            >
                                                Select
                                            </Button>
                                        </div>
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </Col>
                </Row>
            </Container>
            <div className="d-grid col-2 mx-auto mt-4">
                <Button variant='success mb-3' onClick={handleClick} >Download</Button>
            </div>
        </div>
    );
}

export default Template6;
