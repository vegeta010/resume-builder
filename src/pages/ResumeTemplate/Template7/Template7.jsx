import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Mail, Phone, MapPin } from "lucide-react";
import "./Template7.css";
import { useSelector, useDispatch } from "react-redux";
import jsPDF from "jspdf";
import { Typography, Grid } from "@mui/material";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import "../../../App.css";
import { uploadResume } from "../../../utils/uploadResume";

function Template7() {
  const { profile, file, aboutMe, experience, education, skills } = useSelector(
    (state) => state
  );
  const navigate = useNavigate();
  const resumeTemplates = [
    {
      id: 1,
      name: "Template 1",
      description: "Classic Resume Template",
      image: "/images/1.jpg",
    },
    {
      id: 2,
      name: "Template 2",
      description: "Modern Resume Template",
      image: "/images/2.jpg",
    },
    {
      id: 3,
      name: "Template 3",
      description: "Creative Resume Template",
      image: "/images/3.jpg",
    },
    {
      id: 4,
      name: "Template 4",
      description: "Professional Resume Template",
      image: "/images/4.jpg",
    },
    {
      id: 5,
      name: "Template 5",
      description: "Minimalist Resume Template",
      image: "/images/5.jpg",
    },
    {
      id: 6,
      name: "Template 6",
      description: "Elegant Resume Template",
      image: "/images/6.jpg",
    },
    {
      id: 7,
      name: "Template 7",
      description: "Traditional Resume Template",
      image: "/images/7.jpg",
    },
    {
      id: 8,
      name: "Template 8",
      description: "Unique Resume Template",
      image: "/images/8.jpg",
    },
    {
      id: 9,
      name: "Template 9",
      description: "Customizable Resume Template",
      image: "/images/9.jpg",
    },
  ];

  const createPerfectCircularImage = (imageSrc, size = 150) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.crossOrigin = "anonymous";
      img.onload = () => {
        canvas.width = size;
        canvas.height = size;

        // Clear canvas with white background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, size, size);

        // Create circular clipping path
        ctx.save();
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        // Calculate the scale to fill the circle completely
        const imgAspectRatio = img.width / img.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        // Calculate dimensions to fill the circle (crop instead of fit)
        if (imgAspectRatio > 1) {
          // Wide image - scale by height
          drawHeight = size;
          drawWidth = size * imgAspectRatio;
          offsetX = -(drawWidth - size) / 2;
          offsetY = 0;
        } else {
          // Tall image - scale by width
          drawWidth = size;
          drawHeight = size / imgAspectRatio;
          offsetX = 0;
          offsetY = -(drawHeight - size) / 2;
        }

        // Draw image to fill the circle
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        ctx.restore();

        resolve(canvas.toDataURL("image/png", 1.0));
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = imageSrc;
    });
  };

  // Modified printDocument function with better image handling
  const printDocument = async () => {
    const input = document.getElementById("divToPrint");
    if (!input) return;

    const profileImage = input.querySelector(".profile-img");
    let originalSrc = null;

    try {
      if (profileImage && file) {
        originalSrc = profileImage.src;

        // Create high-quality circular image
        const circularImageData = await createPerfectCircularImage(file, 150);
        profileImage.src = circularImageData;
        
        // Add class for PDF identification
        profileImage.classList.add("pdf-profile-image");
      }

      // Wait for image to load and DOM to update
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Generate PDF with original settings that worked
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png", 0.95);
      const pdf = new jsPDF("p", "pt", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Resume.pdf");
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      // Restore original image
      if (profileImage && originalSrc) {
        profileImage.src = originalSrc;
        profileImage.classList.remove("pdf-profile-image");
      }
    }
  };

  const handleClick = async () => {
    const result = await uploadResume({
      profile,
      file,
      aboutMe,
      experience,
      education,
      skills,
    });

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
    if (!year) return "";
    const date = new Date(year, month - 1);
    return date.getFullYear();
  };

  return (
    <>
      <div className="tempalte7">
        <Container>
          <Row>
            <Col lg={9}>
              <Row className="g-0" id="divToPrint">
                <Col md={4} className="d-flex">
                  <div className="sidebar w-100">
                    <img
                      src={file || "https://via.placeholder.com/150"}
                      alt="Profile"
                      className="profile-img"
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        display: "block",
                        margin: "0 auto",
                      }}
                    />

                    <h1 className="mb-4">{profile.name}</h1>
                    <h2 className="h5 mb-4">{profile.tagline}</h2>
                    <hr />
                    <div className="mb-5">
                      <h3 className="h5 mb-4">ABOUT ME</h3>
                      <p>{aboutMe}</p>
                    </div>

                    <div className="mb-5">
                      <h3 className="h5 mb-3">SKILLS</h3>
                      <ul className="skills-list">
                        {skills.map((skill, index) => (
                          <li key={index}>- {skill}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="contact">
                      <h3 className="h5 mb-3">CONTACT</h3>
                      {profile.contact && (
                        <div className="contact-item">
                          <Phone size={16} className="me-2" />
                          {profile.contact}
                        </div>
                      )}
                      {profile.email && (
                        <div className="contact-item">
                          <Mail size={16} className="me-2" />
                          {profile.email}
                        </div>
                      )}
                      {profile.location && (
                        <div className="contact-item">
                          <MapPin size={16} className="me-2" />
                          {profile.location}
                        </div>
                      )}
                    </div>
                  </div>
                </Col>
                <Col md={8} className="d-flex">
                  <div className="right-content w-100">
                    <h3 className="section-title">WORK EXPERIENCE</h3>

                    {experience.map((item, index) => (
                      <div className="experience-item" key={index}>
                        <h4 className="experience-title">
                          {item.title} |{" "}
                          {getFormattedYearMonth(
                            item.startYear,
                            item.startMonth
                          )}{" "}
                          –{" "}
                          {item.isWorking
                            ? "Present"
                            : getFormattedYearMonth(
                                item.endYear,
                                item.endMonth
                              )}
                        </h4>
                        <div className="experience-company">
                          {item.company}, {item.location}
                        </div>
                        <div>Tasks:</div>
                        <ul className="experience-tasks">
                          {item.description &&
                            item.description
                              .split("\n")
                              .map((point, i) => <li key={i}>{point}</li>)}
                        </ul>
                      </div>
                    ))}

                    <div>
                      <h3 className="section-title">EDUCATION</h3>
                      {education.map((item, index) => (
                        <div className="education-item" key={index}>
                          <h4 className="mb-1">
                            {item.startYear} - {item.endYear} | {item.location}
                          </h4>
                          <div className="h5">{item.degree}</div>
                          <div>{item.institute}</div>
                        </div>
                      ))}
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
                        <img
                          src={template.image}
                          alt={template.name}
                          className="template-image1"
                        />
                      </div>
                      <div className="template-content1">
                        <Typography variant="h6" className="template-name1">
                          {template.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          className="template-description1"
                        >
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
        <Button variant="success mb-3" onClick={handleClick}>
          Download
        </Button>
      </div>
    </>
  );
}

export default Template7;