import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaUser, FaGraduationCap, FaTools, FaPhone, FaEnvelope, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';
import "./Template4.css";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Button } from '@mui/material';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { uploadResume } from '../../../utils/uploadResume';

function Template4() {
  const { profile, file, aboutMe, experience, skills, education } = useSelector(state => state);
  const navigate = useNavigate();

const printDocument = () => {
    const input = document.getElementById('divToPrint');
    if (!input) {
        console.error('Element with ID "divToPrint" not found.');
        return;
    }

    html2canvas(input, {
        scale: 3, // Increased scale even further for maximum resolution and detail
        useCORS: true,
        logging: true,
        // windowWidth and windowHeight are generally for capturing the entire window,
        // but if your divToPrint is very tall, they can sometimes help ensure full capture.
        // For standard resume, it's usually not necessary if height is managed by content.
        // windowWidth: input.scrollWidth,
        // windowHeight: input.scrollHeight,
    }).then((canvas) => {
        // Log canvas dimensions immediately after creation
        console.log("Canvas dimensions (width x height):", canvas.width, "x", canvas.height);

        const imgData = canvas.toDataURL('image/jpeg', 1.0); // Maximum quality (1.0)

        // Initialize jsPDF with A4 size (points: 595.28 x 841.89 for portrait)
        const pdf = new jsPDF('p', 'pt', 'a4');

        const pdfPageWidth = pdf.internal.pageSize.getWidth();   // e.g., 595.28 points
        const pdfPageHeight = pdf.internal.pageSize.getHeight(); // e.g., 841.89 points

        // Calculate the aspect ratio from the captured canvas
        const canvasAspectRatio = canvas.width / canvas.height;

        let finalPdfImgWidth = pdfPageWidth;
        let finalPdfImgHeight = pdfPageWidth / canvasAspectRatio;

        // Check if fitting to width makes the height exceed the page
        if (finalPdfImgHeight > pdfPageHeight) {
            finalPdfImgHeight = pdfPageHeight; // Fit to page height
            finalPdfImgWidth = pdfPageHeight * canvasAspectRatio; // Recalculate width
        }

        // Calculate offsets to center the image on the PDF page
        const offsetX = (pdfPageWidth - finalPdfImgWidth) / 2;
        const offsetY = (pdfPageHeight - finalPdfImgHeight) / 2;

        console.log("PDF image dimensions (width x height):", finalPdfImgWidth, "x", finalPdfImgHeight);
        console.log("PDF image offset (x, y):", offsetX, ",", offsetY);

        pdf.addImage(imgData, 'JPEG', offsetX, offsetY, finalPdfImgWidth, finalPdfImgHeight);
        pdf.save('Resume.pdf');

        const estimatedSizeKB = Math.round((imgData.length * (3 / 4)) / 1024);
        console.log(`Estimated image size: ${estimatedSizeKB} KB`);

        // Optional: Remove temporary canvas if you added it for debugging
        // if (document.body.contains(canvas)) {
        //     document.body.removeChild(canvas);
        // }

    }).catch((err) => {
        console.error('PDF generation failed:', err);
        alert('Failed to generate PDF. Please try again.');
    });
};

  const handleClick = async () => {
    try {
      const result = await uploadResume({ profile, file, aboutMe, experience, education, skills });

      if (result.success) {
        console.log("Uploaded successfully!", result.data);
        // You might want to show a success message here
      } else {
        console.error("Upload failed", result.error);
        // Show an error message for upload failure
      }
    } catch (uploadError) {
      console.error("Error during upload:", uploadError);
      // Handle network errors or other exceptions during upload
    }

    // Always try to print/download the document regardless of upload success
    printDocument();
  };

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

  const handleSelectTemplate = (templateId) => {
    navigate(`/details?template=${templateId}`);
  };

  return (
    <>
      <div className='template4'>
        <Container>
          <Row className="justify-content-center">
            <Col xl={9}>
              {/* === ADDED id="divToPrint" HERE === */}
              <div id="divToPrint" className="bg-white rounded shadow-lg overflow-hidden">
                {/* Header */}
                <div className="resume-header">
                  <Row className="align-items-center mb-4">
                    <Col md={3}>
                      <div className="profile-image-container">
                        {file ? (
                          <img
                            src={file}
                            alt="Profile"
                            className="profile-img"
                          />
                        ) : (
                          <div className="profile-placeholder"></div>
                        )}
                      </div>
                    </Col>
                    <Col md={9}>
                      <h1 className="name">{profile.name || "Your Name"}</h1>
                      <p className="position">{profile.position || "Your Position"}</p>
                    </Col>
                  </Row>
                  <Row className="contact-info">
                    <Col md={6}>
                      {profile.contact && (
                        <div className="contact-item">
                          <FaPhone className="contact-icon" />
                          <span>PHONE</span>
                          <span className="contact-value">{profile.contact}</span>
                        </div>
                      )}
                      {profile.location && (
                        <div className="contact-item">
                          <FaMapMarkerAlt className="contact-icon" />
                          <span>ADDRESS</span>
                          <span className="contact-value">{profile.location}</span>
                        </div>
                      )}
                    </Col>
                    <Col md={6}>
                      {profile.email && (
                        <div className="contact-item">
                          <FaEnvelope className="contact-icon" />
                          <span>EMAIL</span>
                          <span className="contact-value">{profile.email}</span>
                        </div>
                      )}
                      {profile.website && (
                        <div className="contact-item">
                          <FaGlobe className="contact-icon" />
                          <span>WEBSITE</span>
                          <span className="contact-value">{profile.website}</span>
                        </div>
                      )}
                    </Col>
                  </Row>
                </div>

                <Row className="p-4">
                  {/* Left Column */}
                  <Col md={4}>
                    {/* Profile Section */}
                    {aboutMe && (
                      <div className="mb-4">
                        <div className="section-title">
                          <div className="icon-bg">
                            <FaUser size={20} />
                          </div>
                          <h2 className="fs-4 fw-bold mb-0">PROFILE</h2>
                        </div>
                        <p className="text-muted">{aboutMe}</p>
                      </div>
                    )}

                    {/* Education Section */}
                    {education && education.length > 0 && (
                      <div className="mb-4">
                        <div className="section-title">
                          <div className="icon-bg">
                            <FaGraduationCap size={20} />
                          </div>
                          <h2 className="fs-4 fw-bold mb-0">EDUCATION</h2>
                        </div>
                        {education.map((edu, index) => (
                          <div key={index}>
                            <h3 className="fs-5 fw-bold mb-2">{edu.degree}</h3>
                            <p className="text-muted mb-1">{edu.institute}, {edu.location}</p>
                            {edu.gpa && <p className="text-muted mb-1">GPA: {edu.gpa}</p>}
                            <p className="text-muted">{edu.startYear} - {edu.endYear}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Skills Section */}
                    {skills && skills.length > 0 && (
                      <div className="mb-4">
                        <div className="section-title">
                          <div className="icon-bg">
                            <FaTools size={20} />
                          </div>
                          <h2 className="fs-4 fw-bold mb-0">SKILLS</h2>
                        </div>
                        <ul className="skills-list">
                          {skills.map((skill, index) => (
                            <li key={index}>
                              <div className="bullet-point"></div>
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Col>

                  {/* Right Column */}
                  <Col md={8}>
                    <div className="section-title">
                      <div className="icon-bg">
                        <FaUser size={20} />
                      </div>
                      <h2 className="fs-4 fw-bold mb-0">PROFESSIONAL EXPERIENCE</h2>
                    </div>

                    {experience && experience.length > 0 ? (
                      experience.map((exp, index) => (
                        <div key={index} className="experience-item">
                          <h3 className="fs-5 fw-bold mb-1">{exp.title}</h3>
                          <p className="text-muted mb-1">{exp.company}, {exp.location}</p>
                          <p className="text-muted mb-3">{exp.startMonth} {exp.startYear} - {exp.isWorking ? 'Present' : `${exp.endMonth} ${exp.endYear}`}</p>
                          <ul className="list-unstyled">
                            {exp.description && exp.description.split('\n').map((desc, i) => (
                              <li key={i} className="d-flex mb-3">
                                <div className="bullet-point"></div>
                                <span className="text-muted">{desc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted">No professional experience added.</p>
                    )}
                  </Col>
                </Row>
              </div> {/* END of divToPrint */}
            </Col>
            <Col xl={3}>
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
      </div>
      <div className="d-grid col-2 mx-auto mt-4">
        <Button variant='contained' color='success' onClick={handleClick} >Download</Button>
      </div>
    </>
  );
}

export default Template4;