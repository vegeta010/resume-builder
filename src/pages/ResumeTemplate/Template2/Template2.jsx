import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { HiOutlineMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import { BsLinkedin, BsGithub, BsGlobe } from "react-icons/bs";
import "./Template2.css";
import { uploadResume } from "../../../utils/uploadResume";
import { useNavigate } from "react-router-dom";
import { Typography, Grid } from "@mui/material";
import "../../../App.css";

function Template2() {
  const { profile, file, aboutMe, experience, skills, education } = useSelector(
    (state) => state
  );

  const createPerfectCircularImage = (imageSrc, size = 150) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.crossOrigin = "anonymous";
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
          // Image is wider than it is tall, fit height to circle
          drawHeight = size;
          drawWidth = size * sourceAspectRatio;
          offsetX = -(drawWidth - size) / 2;
        } else {
          // Image is taller than it is wide, fit width to circle
          drawWidth = size;
          drawHeight = size / sourceAspectRatio;
          offsetY = -(drawHeight - size) / 2;
        }

        // Draw image centered and cropped
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        ctx.restore();

        resolve(canvas.toDataURL("image/png", 1.0));
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = imageSrc;
    });
  };

  const printDocument = async () => {
    // FIX 1: Change the ID here to match the JSX
    const input = document.getElementById("template2-to-print");
    if (!input) {
      console.error("Element with ID 'template2-to-print' not found.");
      return;
    }

    const profileImage = input.querySelector(".pdf-profile-image");
    let originalSrc = null;
    let originalBorderRadius = null; // Store original border-radius
    let originalWidth = null; // Store original width
    let originalHeight = null; // Store original height

    try {
      if (profileImage && file) {
        originalSrc = profileImage.src;
        originalBorderRadius = profileImage.style.borderRadius;
        originalWidth = profileImage.style.width;
        originalHeight = profileImage.style.height;

        // Replace with perfectly circular image for PDF
        // Consider passing the desired output size for the PDF image here, e.g., 150
        const circularImageData = await createPerfectCircularImage(file, 150);
        profileImage.src = circularImageData;

        // Remove border-radius and set explicit size since image is already circular
        profileImage.style.borderRadius = "0";
        profileImage.style.width = "150px"; // Set desired size for PDF capture
        profileImage.style.height = "150px"; // Set desired size for PDF capture
      }

      // Small delay to ensure the image source change is rendered by the browser
      await new Promise((resolve) => setTimeout(resolve, 200));

      const canvas = await html2canvas(input, {
        scale: 2, // Higher scale for better resolution in PDF
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff", // Ensure white background
        logging: false, // Turn off logging for production
      });

      const imgData = canvas.toDataURL("image/png", 0.95);
      const pdf = new jsPDF("p", "pt", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Resume.pdf");
    } catch (error) {
      console.error("PDF generation failed:", error);
      // Optionally, provide user feedback here (e.g., a toast notification)
    } finally {
      // Restore original image styles after PDF generation
      if (profileImage && originalSrc) {
        profileImage.src = originalSrc;
        profileImage.style.borderRadius = originalBorderRadius;
        profileImage.style.width = originalWidth;
        profileImage.style.height = originalHeight;
      }
    }
  };

  const handleClick = async () => {
    // Await the upload resume call
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

    // Always attempt to print the document regardless of upload success
    printDocument();
  };

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

  const handleSelectTemplate = (templateId) => {
    navigate(`/details?template=${templateId}`);
  };

  return (
    <>
      <div className="template2">
        <Container>
          <Row className="justify-content-center">
            <Col xl={8} lg={8}>
              {/* FIX 1: Ensure this ID matches the one used in printDocument */}
              <Row className="g-0" id="template2-to-print">
                {/* Sidebar */}
                <Col xl={4} className="d-flex">
                  <div className="template2-sidenav w-100 p-3">
                    <div className="profile-img text-center">
                      {file && (
                        <img
                          src={file}
                          alt="profile"
                          // FIX 2: Add the class for the profile image
                          className="pdf-profile-image"
                          // Consider removing hardcoded width/height here
                          // and relying on CSS or letting createPerfectCircularImage handle the size
                          // For now, setting it to what createPerfectCircularImage targets
                          width={150}
                          height={150}
                        />
                      )}
                    </div>

                    <h5>Contact</h5>
                    <hr />
                    <ul className="list-unstyled">
                      {profile.email && (
                        <li>
                          <HiOutlineMail /> {profile.email}
                        </li>
                      )}
                      {profile.contact && (
                        <li>
                          <HiPhone /> {profile.contact}
                        </li>
                      )}
                      {profile.location && (
                        <li>
                          <HiLocationMarker /> {profile.location}
                        </li>
                      )}
                      {profile.linkedin && (
                        <li>
                          <BsLinkedin /> {profile.linkedin}
                        </li>
                      )}
                      {profile.github && (
                        <li>
                          <BsGithub /> {profile.github}
                        </li>
                      )}
                      {profile.website && (
                        <li>
                          <BsGlobe /> {profile.website}
                        </li>
                      )}
                    </ul>

                    <h5>Skills</h5>
                    <hr />
                    <ul className="list-unstyled">
                      {skills.map((skill, index) => (
                        <li key={index}>• {skill}</li>
                      ))}
                    </ul>
                    <h5>Education</h5>
                    <hr />
                    <ul className="list-unstyled">
                      {education && education.length > 0 ? (
                        education.map((edu, index) => (
                          <li key={index}>
                            <strong>{edu.degree}</strong>
                            <br />
                            {edu.institute}
                            <br />
                            <small>
                              {edu.startYear} - {edu.endYear}
                            </small>
                          </li>
                        ))
                      ) : (
                        <li>No education details added.</li>
                      )}
                    </ul>
                  </div>
                </Col>

                {/* Main Content */}
                <Col xl={8} lg={8} className="d-flex">
                  <div className="summary w-100 p-4">
                    <div className="header mb-3">
                      <h2>{profile.name}</h2>
                      <hr />
                      <p>{profile.position}</p>
                    </div>

                    <div className="experience">
                      {aboutMe && (
                        <>
                          <h5>Summary</h5>
                          <hr />
                          <p>{aboutMe}</p>
                        </>
                      )}

                      {experience.length > 0 && (
                        <>
                          <h5>Experience</h5>
                          <hr />
                          {experience.map((item, idx) => (
                            <div key={idx} className="mb-3">
                              <h6>{item.title}</h6>
                              <h6>{item.company}</h6>
                              <small>
                                {item.startMonth} {item.startYear} -{" "}
                                {item.isWorking
                                  ? "Present"
                                  : `${item.endMonth} ${item.endYear}`}
                              </small>
                              <p className="mt-2">{item.description}</p>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xl={4}>
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

export default Template2;