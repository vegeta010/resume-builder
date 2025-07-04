import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { HiOutlineMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import { BsLinkedin, BsGithub, BsGlobe } from "react-icons/bs";
import "./Template3.css"; // Ensure this CSS is correctly linked
import { FaUserMd } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Typography, Grid } from "@mui/material";
import "../../../App.css";
import { uploadResume } from "../../../utils/uploadResume";

function Template3() {
  const { profile, file, aboutMe, experience, skills, education } = useSelector(
    (state) => state
  );

  // This function is excellent for pre-processing the image into a circular shape
  const createPerfectCircularImage = (imageSrc, size = 150) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.crossOrigin = "anonymous"; // Important for loading external images
      img.onload = () => {
        canvas.width = size;
        canvas.height = size;

        ctx.clearRect(0, 0, size, size);

        ctx.save();
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        const sourceAspectRatio = img.width / img.height;
        let drawWidth = size;
        let drawHeight = size;
        let offsetX = 0;
        let offsetY = 0;

        if (sourceAspectRatio > 1) {
          drawHeight = size;
          drawWidth = size * sourceAspectRatio;
          offsetX = -(drawWidth - size) / 2;
        } else {
          drawWidth = size;
          drawHeight = size / sourceAspectRatio;
          offsetY = -(drawHeight - size) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        ctx.restore();

        resolve(canvas.toDataURL("image/png", 1.0));
      };

      img.onerror = (e) => reject(new Error(`Failed to load image: ${e.message}`));
      img.src = imageSrc;
    });
  };

  const printDocument = async () => {
    const input = document.getElementById("divToPrint");
    if (!input) {
      console.error('Element with ID "divToPrint" not found');
      alert("Failed to find resume content. Please ensure the element is present.");
      return;
    }

    const profileImageElement = input.querySelector("header .profile-image-placeholder");
    let originalImageSrc = ''; // To store original src for restoration
    let circularImageData = null;

    try {
      if (file && profileImageElement) {
        // Store original src
        originalImageSrc = profileImageElement.src;

        // Generate circular image data
        circularImageData = await createPerfectCircularImage(file, 150);
        // Temporarily set the image src to the circular data URL for html2canvas
        profileImageElement.src = circularImageData;
      }

      // Small delay to ensure the DOM changes are rendered before capture
      await new Promise((resolve) => setTimeout(resolve, 100)); // Reduced delay, 100ms is usually enough

      const canvas = await html2canvas(input, {
        scale: 2, // Higher scale for better resolution
        useCORS: true, // Essential if your image is hosted on a different domain
        allowTaint: true, // Allow tainting the canvas for cross-origin images (if useCORS fails)
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: 0,
        windowWidth: input.scrollWidth,
        windowHeight: input.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.9); // Use JPEG for smaller file size
      const pdf = new jsPDF("p", "pt", "a4");

      const imgWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("Resume.pdf");

      const estimatedSizeKB = Math.round((imgData.length * (3 / 4)) / 1024);
      console.log(`Estimated image size: ${estimatedSizeKB} KB`);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again. Check console for details.");
    } finally {
      // Restore original image src after PDF generation
      if (profileImageElement && originalImageSrc) {
        profileImageElement.src = originalImageSrc;
      }
    }
  };

  const handleClick = async () => {
    try {
      // It's generally better to await the upload before starting the PDF download,
      // or handle them independently based on your desired user flow.
      // If the PDF is for local download and upload is for a server, they can be parallel.
      // For now, keeping your existing order.
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
        // Optionally, alert the user about upload failure but proceed with download
      }
    } catch (error) {
      console.error("Upload error:", error);
      // Optionally, alert the user about upload error but proceed with download
    }

    // Always attempt to print the document, even if upload fails
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
      <div className="template3">
        <Container>
          <Row>
            <Col xl={9}>
              <div className="dr-resume" id="divToPrint">
                <header>
                  <Row className="align-items-center">
                    <Col xl={9}>
                      <h2>{profile.name || "Your Name"}</h2>
                      <h4>{profile.position || "Your Position"}</h4>
                      <hr />
                      <ul>
                        {profile.linkedin && (
                          <li>
                            <BsLinkedin /> {profile.linkedin}
                          </li>
                        )}
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
                        {profile.website && (
                          <li>
                            <BsGlobe /> {profile.website}
                          </li>
                        )}
                        {profile.location && (
                          <li>
                            <HiLocationMarker /> {profile.location}
                          </li>
                        )}
                        {profile.github && (
                          <li>
                            <BsGithub /> {profile.github}
                          </li>
                        )}
                      </ul>
                    </Col>
                    <Col xl={3}>
                      {file ? (
                        <img
                          // Add a specific class to target this image for PDF generation
                          className="profile-image-placeholder"
                          src={file} // Display original file for preview
                          alt="profile"
                          // Apply styles directly here, html2canvas often prefers inline or simple CSS
                          style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover" }}
                        />
                      ) : (
                        // Optional: Placeholder if no image is uploaded
                        <div
                          className="profile-image-placeholder"
                          style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                            backgroundColor: "#eee",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.8em",
                            textAlign: "center",
                            color: "#555",
                            border: "1px solid #ccc"
                          }}
                        >
                          No Image
                        </div>
                      )}
                    </Col>
                  </Row>
                </header>
                <Row>
                  <Col xl={8} className="d-flex">
                    <div className="key-points">
                      {experience.length > 0 && (
                        <>
                          <h5 className="title">Work Experience</h5>
                          {experience.map((item, idx) => (
                            <div key={idx} className="work-experience">
                              <div className="icon-bg">
                                <FaUserMd />
                              </div>
                              <div>
                                <h5>
                                  {item.title} | {item.company}
                                </h5>
                                <p>
                                  {item.startMonth} {item.startYear} to{" "}
                                  {item.isWorking
                                    ? "Present"
                                    : `${item.endMonth} ${item.endYear}`}
                                </p>
                                <ul>
                                  {item.description &&
                                    item.description
                                      .split("\n")
                                      .map((desc, index) => (
                                        <li key={index}>{desc}</li>
                                      ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </>
                      )}

                      {education && education.length > 0 && (
                        <>
                          <h5 className="title">Education History</h5>
                          {education.map((edu, index) => (
                            <div key={index} className="work-experience">
                              <div className="icon-bg">
                                <FaUserMd />
                              </div>
                              <div>
                                <h5>
                                  {edu.degree} | {edu.institute}
                                </h5>
                                <p>Class of {edu.endYear}</p>
                                {edu.description && (
                                  <ul>
                                    {edu.description
                                      .split("\n")
                                      .map((desc, i) => (
                                        <li key={i}>{desc}</li>
                                      ))}
                                  </ul>
                                )}
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </Col>
                  <Col xl={4} className="d-flex">
                    <div className="left-content">
                      {skills.length > 0 && (
                        <div className="skills">
                          <h5>Relevant Skills</h5>
                          <ul>
                            {skills.map((skill, index) => (
                              <li key={index}>{skill}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {aboutMe && (
                        <div className="work-experince">
                          <h5>Summary</h5>
                          <div className="mt-3">
                            <p>{aboutMe}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col xl={3}>
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

export default Template3;