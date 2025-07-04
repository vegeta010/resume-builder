import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';
import "./Template8.css"
import { useSelector, useDispatch } from 'react-redux';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';
import { uploadResume } from '../../../utils/uploadResume';
import '../../../App.css';

function Template8() {
    const { profile, file, aboutMe, experience, education, skills } = useSelector(state => state);
    const dispatch = useDispatch();
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

    // Function to create a perfect circular image
    const createPerfectCircularImage = (imageSrc, size = 150) => {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.crossOrigin = 'anonymous'; // Important for CORS issues with images
            img.onload = () => {
                canvas.width = size;
                canvas.height = size;

                // Clear canvas
                ctx.clearRect(0, 0, size, size);

                // Create circular clipping path
                ctx.save();
                ctx.beginPath();
                ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();

                // Calculate dimensions to maintain aspect ratio and fill the circle
                const sourceAspectRatio = img.width / img.height;
                let drawWidth = size;
                let drawHeight = size;
                let offsetX = 0;
                let offsetY = 0;

                if (sourceAspectRatio > 1) {
                    // Wide image: crop left/right
                    drawHeight = size; // Maintain height to fill circle vertically
                    drawWidth = size * sourceAspectRatio;
                    offsetX = -(drawWidth - size) / 2;
                } else {
                    // Tall image or square: crop top/bottom
                    drawWidth = size; // Maintain width to fill circle horizontally
                    drawHeight = size / sourceAspectRatio;
                    offsetY = -(drawHeight - size) / 2;
                }

                // Draw image centered and cropped
                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                ctx.restore();

                resolve(canvas.toDataURL('image/png', 1.0)); // Use PNG for better quality with transparency if needed
            };

            img.onerror = (e) => {
                console.error("Failed to load image for circular processing:", e);
                reject(new Error('Failed to load image for circular processing'));
            };
            img.src = imageSrc;
        });
    };

    const printDocument = async () => {
        const input = document.getElementById('divToPrint');
        if (!input) {
            console.error('Element with ID "divToPrint" not found.');
            return;
        }

        const profileImageElement = input.querySelector('.profile-image');
        let originalSrc = null;
        let originalBorderRadius = null;
        let originalWidth = null;
        let originalHeight = null;

        try {
            if (profileImageElement && file) {
                originalSrc = profileImageElement.src;
                originalBorderRadius = profileImageElement.style.borderRadius;
                originalWidth = profileImageElement.style.width;
                originalHeight = profileImageElement.style.height;

                // Create a perfectly circular image data URL
                const circularImageData = await createPerfectCircularImage(file, 150); // Set size (e.g., 150px)

                // Apply the circular image and temporary styles for html2canvas
                profileImageElement.src = circularImageData;
                profileImageElement.style.borderRadius = '0'; // Image is already circular, remove CSS radius
                profileImageElement.style.width = '150px'; // Set explicit size for capture
                profileImageElement.style.height = '150px';
                profileImageElement.style.objectFit = 'contain'; // Ensure it's contained within the 150x150, though it should fill.
            }

            // Give a small delay for the image source to update in the DOM
            await new Promise(resolve => setTimeout(resolve, 100));

            const canvas = await html2canvas(input, {
                scale: 1.5, // Better readability
                useCORS: true,
                allowTaint: true, // Allow tainting the canvas from cross-origin images (if any)
                backgroundColor: '#ffffff', // Set a background color for the canvas, good for PDF
                logging: false, // Disable console logging from html2canvas
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.8); // Higher quality JPEG
            const pdf = new jsPDF('p', 'pt', 'a4');

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('Resume.pdf');

            const estimatedSizeKB = Math.round((imgData.length * (3 / 4)) / 1024);
            console.log(`Estimated image size: ${estimatedSizeKB} KB`);

        } catch (err) {
            console.error('PDF generation failed:', err);
        } finally {
            // Restore original image and styles after PDF generation
            if (profileImageElement && originalSrc) {
                profileImageElement.src = originalSrc;
                profileImageElement.style.borderRadius = originalBorderRadius;
                profileImageElement.style.width = originalWidth;
                profileImageElement.style.height = originalHeight;
                profileImageElement.style.objectFit = 'cover'; // Assuming original uses 'cover'
            }
        }
    };

    const handleClick = async () => {
        const result = await uploadResume({ profile, file, aboutMe, experience, education, skills });

        if (result.success) {
            console.log("Uploaded successfully!", result.data);
        } else {
            console.error("Upload failed", result.error);
        }

        // Always attempt to print the document, regardless of upload success/failure
        printDocument();
    };

    const handleSelectTemplate = (templateId) => {
        navigate(`/details?template=${templateId}`);
    };

    return (
        <>
            <div className='template8'>
                <Container>
                    <Row>
                        <Col lg={9}>
                            <div id="divToPrint">
                                <Row className='g-0 position-relative'>
                                    <Col md={4}>
                                        <div className="profile-section">
                                            <div className='header-bg'>
                                            </div>
                                            <div className='profile-bg'>
                                                <img
                                                    src={file || "https://via.placeholder.com/150"}
                                                    alt="Profile"
                                                    className="profile-image" // Ensure this class is on the image
                                                />
                                            </div>
                                            <div className="contact-info">
                                                <h2 className="section-title">Contact</h2>
                                                {profile.contact && (
                                                    <div className="contact-item">
                                                        <span className="icon"><Phone /></span>
                                                        <span>{profile.contact}</span>
                                                    </div>
                                                )}
                                                {profile.email && (
                                                    <div className="contact-item">
                                                        <span className="icon"><Mail /></span>
                                                        <span>{profile.email}</span>
                                                    </div>
                                                )}
                                                {profile.website && (
                                                    <div className="contact-item">
                                                        <span className="icon"><Globe /></span>
                                                        <span>{profile.website}</span>
                                                    </div>
                                                )}
                                                {profile.location && (
                                                    <div className="contact-item">
                                                        <span className="icon"><MapPin /></span>
                                                        <span>{profile.location}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="education-section">
                                                <h2 className="section-title">Education</h2>
                                                <div className="section-content">
                                                    {education.map((item, index) => (
                                                        <div className="experience-item" key={index}>
                                                            <h3 className="experience-title">{item.degree}</h3>
                                                            <p className="experience-company">{item.institute}</p>
                                                            <p className="experience-date">{item.startYear} - {item.endYear}</p>
                                                            <p>{item.location}</p>
                                                        </div>
                                                    ))}
                                                    <hr />
                                                </div>
                                                <h2 className="section-title">Skills</h2>
                                                <div className="section-content">
                                                    <div className="experience-item">
                                                        <ul className="skills-list">
                                                            {skills.map((skill, index) => (
                                                                <li key={index}>{skill}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={8} className="profile-section">
                                        <div className='header-bg'></div>
                                        <div className='right-content'>
                                            <h1 className="name-title">{profile.name}</h1>
                                            <h2 className="profession">{profile.tagline}</h2>
                                            <hr />
                                            <div className="about-section">
                                                <div className='section-title-bg'>
                                                    <h2 className="section-title">About Me</h2>
                                                </div>
                                                <div className="section-content">
                                                    <p>
                                                        {aboutMe}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="experience-section">
                                                <div className='section-title-bg'>
                                                    <h2 className="section-title">Experience</h2>
                                                </div>
                                                <div className="section-content">
                                                    {experience.map((item, index) => (
                                                        <div className="experience-item" key={index}>
                                                            <h3 className="experience-title">{item.title}</h3>
                                                            <p className="experience-company">{item.company}</p>
                                                            <p className="experience-date">{item.startMonth} {item.startYear} - {item.isWorking ? "Present" : item.endMonth + " " + item.endYear}</p>
                                                            <ul className="experience-list">
                                                                {item.description && item.description.split('\n').map((point, i) => (
                                                                    <li key={i}>{point}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <div className='footer-bg'></div>
                                </Row>
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
            </div>
            <div className="d-grid col-2 mx-auto mt-4">
                <Button variant='success mb-3' onClick={handleClick} >Download</Button>
            </div>
        </>
    );
}

export default Template8;
