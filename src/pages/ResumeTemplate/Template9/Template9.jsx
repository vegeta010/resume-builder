import React from 'react';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap } from 'lucide-react';
import "./Template9.css";
import { Container, Row, Col, Button } from "react-bootstrap"
import { useSelector, useDispatch } from 'react-redux';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';
import '../../../App.css';
import { uploadResume } from '../../../utils/uploadResume';

function Template9() {
  const { profile, file, aboutMe, experience, education, skills } = useSelector(state => state);
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
    <div className="template9">
      <Container>
        <Row>
          <Col lg={9}>
            <div className='content bg-white' id="divToPrint">
              <header>
                <Row>
                  <Col lg={9}>
                    <h1>{profile.name}</h1>
                    <h6>{profile.tagline}</h6>
                  </Col>
                  <Col lg={3}>
                    <img
                      src={file || "https://via.placeholder.com/150"}
                      alt="Profile"
                      className="profile-image"
                    />
                  </Col>
                </Row>
              </header>
              <div className="resume-container">
                <div className="container">
                  <div className="row">
                    <div className="col-md-4 section-container">
                      <div className="vertical-line vertical-line-right d-none d-md-block"></div>
                      <section className="mb-5">
                        <ul className="contact-info">
                          {profile.contact && (<li><Phone size={18} className="me-2" />{profile.contact}</li>)}
                          {profile.email && (<li><Mail size={18} className="me-2" />{profile.email}</li>)}
                          {profile.location && (<li><MapPin size={18} className="me-2" />{profile.location}</li>)}
                          {profile.website && (<li><Globe size={18} className="me-2" />{profile.website}</li>)}
                        </ul>
                      </section>
                      <section className="mb-5">
                        <h2 className="section-title">Skills</h2>
                        <ul className="skills-list">
                          {skills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                          ))}
                        </ul>
                      </section>

                      <section>
                        <h2 className="section-title">Education</h2>
                        {education.map((item, index) => (
                          <div className="education-item" key={index}>
                            <h3 className="h5">{item.degree}</h3>
                            <p className="mb-1">{item.institute}</p>
                            <p className="text-muted">{item.startYear} - {item.endYear}</p>
                          </div>
                        ))}
                      </section>
                    </div>

                    <div className="col-md-8 section-container">
                      <div className="vertical-line vertical-line-left d-none d-md-block"></div>
                      <section className="profile-section">
                        <h2 className="section-title">Profile</h2>
                        <p>
                          {aboutMe}
                        </p>
                      </section>

                      <section>
                        <h2 className="section-title">Experience</h2>
                        {experience.map((item, index) => (
                          <div className="experience-item" key={index}>
                            <h3 className="experience-title">{item.title}</h3>
                            <p className="experience-company">{item.company}</p>
                            <p className="text-muted">
                              {getFormattedYearMonth(item.startYear, item.startMonth)} -
                              {item.isWorking ? ' Present' : ' ' + getFormattedYearMonth(item.endYear, item.endMonth)}
                            </p>
                            <ul>
                              {item.description && item.description.split('\n').map((point, i) => (
                                <li key={i}>{point}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </section>
                    </div>
                  </div>
                </div>
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

export default Template9;
