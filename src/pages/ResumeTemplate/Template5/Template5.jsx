import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { MapPin, Phone, Mail, Briefcase, GraduationCap, Code, Globe } from 'lucide-react';
import "./Template5.css"
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';
import '../../../App.css';
import { uploadResume } from '../../../utils/uploadResume';

function Template5() {
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

    const handleSelectTemplate = (templateId) => {
        navigate(`/details?template=${templateId}`);
    };

    // Fixed function to create circular image with border
    const createCircularImageWithBorder = async (file, size = 150) => {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            // Set canvas size
            canvas.width = size;
            canvas.height = size;
            
            img.onload = () => {
                try {
                    // Clear canvas with transparent background
                    ctx.clearRect(0, 0, size, size);
                    
                    // Calculate dimensions for centering and cropping
                    const scale = Math.max(size / img.width, size / img.height);
                    const scaledWidth = img.width * scale;
                    const scaledHeight = img.height * scale;
                    const x = (size - scaledWidth) / 2;
                    const y = (size - scaledHeight) / 2;
                    
                    // Create circular clipping path for the image
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(size / 2, size / 2, (size - 8) / 2, 0, Math.PI * 2);
                    ctx.clip();
                    
                    // Draw the image
                    ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
                    ctx.restore();
                    
                    // Draw blue circular border
                    ctx.beginPath();
                    ctx.arc(size / 2, size / 2, (size - 4) / 2, 0, Math.PI * 2);
                    ctx.strokeStyle = '#2563eb';
                    ctx.lineWidth = 4;
                    ctx.stroke();
                    
                    resolve(canvas.toDataURL('image/png'));
                } catch (error) {
                    reject(error);
                }
            };
            
            img.onerror = () => reject(new Error('Failed to load image'));
            
            // Handle file input
            if (file instanceof File) {
                img.src = URL.createObjectURL(file);
            } else if (typeof file === 'string') {
                img.src = file;
            } else {
                reject(new Error('Invalid file type'));
            }
        });
    };

    // Fixed PDF generation function
    const printDocument = async () => {
        console.log('Starting PDF generation...');
        
        const input = document.getElementById('divToPrint');
        if (!input) {
            console.error('Element with ID "divToPrint" not found');
            alert('Resume content not found. Please try again.');
            return;
        }

        const profileImage = input.querySelector('.profile-image');
        let originalSrc = null;
        let originalStyles = {};
        
        try {
            // Process profile image if it exists
            if (profileImage && file) {
                console.log('Processing profile image...');
                originalSrc = profileImage.src;
                
                // Store original styles
                originalStyles = {
                    width: profileImage.style.width,
                    height: profileImage.style.height,
                    borderRadius: profileImage.style.borderRadius,
                    objectFit: profileImage.style.objectFit,
                    aspectRatio: profileImage.style.aspectRatio,
                    border: profileImage.style.border,
                    boxShadow: profileImage.style.boxShadow,
                    backgroundColor: profileImage.style.backgroundColor
                };
                
                // Create circular image with blue border
                const circularImageWithBorder = await createCircularImageWithBorder(file, 150);
                profileImage.src = circularImageWithBorder;
                
                // Apply fixed styles
                profileImage.style.width = '150px';
                profileImage.style.height = '150px';
                profileImage.style.minWidth = '150px';
                profileImage.style.minHeight = '150px';
                profileImage.style.maxWidth = '150px';
                profileImage.style.maxHeight = '150px';
                profileImage.style.borderRadius = '0';
                profileImage.style.objectFit = 'cover';
                profileImage.style.aspectRatio = '1/1';
                profileImage.style.flexShrink = '0';
                profileImage.style.display = 'block';
                profileImage.style.border = 'none';
                profileImage.style.boxShadow = 'none';
                profileImage.style.backgroundColor = 'transparent';
            }
            
            // Wait for image to load and styles to apply
            await new Promise(resolve => setTimeout(resolve, 500));
            
            console.log('Generating canvas...');
            const canvas = await html2canvas(input, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                logging: false,
                foreignObjectRendering: false,
                imageTimeout: 15000,
                onclone: (clonedDoc) => {
                    const clonedImage = clonedDoc.querySelector('.profile-image');
                    if (clonedImage) {
                        clonedImage.style.width = '150px';
                        clonedImage.style.height = '150px';
                        clonedImage.style.minWidth = '150px';
                        clonedImage.style.minHeight = '150px';
                        clonedImage.style.maxWidth = '150px';
                        clonedImage.style.maxHeight = '150px';
                        clonedImage.style.objectFit = 'cover';
                        clonedImage.style.aspectRatio = '1/1';
                        clonedImage.style.borderRadius = '0';
                        clonedImage.style.display = 'block';
                        clonedImage.style.flexShrink = '0';
                        clonedImage.style.border = 'none';
                        clonedImage.style.boxShadow = 'none';
                        clonedImage.style.backgroundColor = 'transparent';
                    }
                }
            });
            
            console.log('Creating PDF...');
            const imgData = canvas.toDataURL('image/png', 0.95);
            const pdf = new jsPDF('p', 'pt', 'a4');
            
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            
            // Handle multiple pages if content is too long
            const pageHeight = pdf.internal.pageSize.getHeight();
            let heightLeft = pdfHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - pdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
                heightLeft -= pageHeight;
            }
            
            console.log('Saving PDF...');
            pdf.save('Resume.pdf');
            
            const estimatedSizeKB = Math.round((imgData.length * (3 / 4)) / 1024);
            console.log(`PDF generated successfully! Estimated size: ${estimatedSizeKB} KB`);
            
        } catch (error) {
            console.error('PDF generation failed:', error);
            alert(`PDF generation failed: ${error.message}. Please try again.`);
        } finally {
            // Restore original image and styles
            console.log('Restoring original image...');
            if (profileImage) {
                if (originalSrc) {
                    profileImage.src = originalSrc;
                }
                // Restore original styles
                Object.assign(profileImage.style, originalStyles);
                // Re-apply the circular border radius from CSS
                profileImage.style.borderRadius = '50%';
            }
        }
    };
    
    const handleClick = async () => {
        try {
            console.log('Starting upload and download process...');
            
            // Upload resume data
            const result = await uploadResume({ profile, file, aboutMe, experience, education, skills });

            if (result.success) {
                console.log("Uploaded successfully!", result.data);
            } else {
                console.error("Upload failed", result.error);
                // Continue with PDF generation even if upload fails
            }

            // Generate and download PDF
            await printDocument();
            
        } catch (error) {
            console.error('Error in handleClick:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const getFormattedYearMonth = (year, month) => {
        if (!year) return '';
        const date = new Date(year, month - 1);
        return date.getFullYear();
    };

    return (
        <>
            <div className='template5'>
                <Container>
                    <Row>
                        <Col lg={9}>
                            <Row className='g-0' id="divToPrint">
                                <Col md={8} className="d-flex">
                                    <div className='left-section'>
                                        <div className="name">
                                            <h1>{profile.name ? profile.name.split(' ')[0] : ''} <span>{profile.name ? profile.name.split(' ').slice(1).join(' ') : ''}</span></h1>
                                            <h3>{profile.tagline}</h3>
                                        </div>

                                        <div className="profile">
                                            <h2 className="section-title">PROFILE</h2>
                                            <p>{aboutMe}</p>
                                        </div>

                                        <div className="work-experience">
                                            <h2 className="section-title">WORK EXPERIENCE</h2>
                                            {experience.map((item, index) => (
                                                <div className="work-item" key={index}>
                                                    <div className='d-flex gap-3'>
                                                        <div className="work-period">
                                                            {getFormattedYearMonth(item.startYear, item.startMonth)} -
                                                            {item.isWorking ? ' Present' : ' ' + getFormattedYearMonth(item.endYear, item.endMonth)}
                                                        </div>
                                                        <div>
                                                            <div className="work-title">{item.title}</div>
                                                            <div className="work-company">{item.company}, {item.location}</div>
                                                            {item.description && (
                                                                <ul>
                                                                    {item.description.split('\n').map((point, i) => (
                                                                        <li key={i}>{point}</li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="education">
                                            <h2 className="section-title">EDUCATION</h2>
                                            {education.map((item, index) => (
                                                <div className="education-item" key={index}>
                                                    <div className='d-flex gap-3'>
                                                        <div className="work-period">{item.startYear} - {item.endYear}</div>
                                                        <div>
                                                            <div className="work-title">{item.degree}</div>
                                                            <div className="work-company">{item.institute}, {item.location}</div>
                                                            <div className="work-details">{item.fieldOfStudy} {item.grade && `(Grade: ${item.grade})`}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className='right-section'>
                                        <div className="text-center">
                                            <img
                                                src={file || "https://via.placeholder.com/150"}
                                                alt="Profile"
                                                className="profile-image"
                                            />
                                        </div>
                                        <div className="contact mb-5">
                                            <h2 className="section-title">CONTACT</h2>
                                            {profile.location && (
                                                <div className="contact-item">
                                                    <MapPin size={20} />
                                                    <span>{profile.location}</span>
                                                </div>
                                            )}
                                            {profile.contact && (
                                                <div className="contact-item">
                                                    <Phone size={20} />
                                                    <span>{profile.contact}</span>
                                                </div>
                                            )}
                                            {profile.email && (
                                                <div className="contact-item">
                                                    <Mail size={20} />
                                                    <span>{profile.email}</span>
                                                </div>
                                            )}
                                            {profile.linkedin && (
                                                <div className="contact-item">
                                                    <Briefcase size={20} />
                                                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">{profile.linkedin.split('/').pop()}</a>
                                                </div>
                                            )}
                                            {profile.github && (
                                                <div className="contact-item">
                                                    <Code size={20} />
                                                    <a href={profile.github} target="_blank" rel="noopener noreferrer">{profile.github.split('/').pop()}</a>
                                                </div>
                                            )}
                                            {profile.website && (
                                                <div className="contact-item">
                                                    <Globe size={20} />
                                                    <a href={profile.website} target="_blank" rel="noopener noreferrer">{profile.website.split('//').pop()}</a>
                                                </div>
                                            )}
                                        </div>
                                        <div className="skills">
                                            <h2 className="section-title">SKILLS</h2>
                                            <ul>
                                                {skills.map((skill, index) => (
                                                    <li key={index}>{skill}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
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
                <Button variant='success mb-3' onClick={handleClick}>Download</Button>
            </div>
        </>
    );
}

export default Template5;