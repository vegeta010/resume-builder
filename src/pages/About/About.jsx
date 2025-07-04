import { Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import './about.css';
import { Container, Row, Col } from 'react-bootstrap'

const About = () => {
    return (
        <>
            <div className="about-us">
                <Container>
                    <Row className="row-cols-lg-2">
                        <Col>
                            <h5 className="card-title">About Us</h5>
                            <p>
                                Welcome to our Ablyworks Resume Builder Application. We are dedicated to providing you with a powerful and user-friendly tool for creating professional resumes.
                            </p>
                            <p>
                                Our vision is to empower job seekers with the ability to craft compelling resumes that help them stand out in the competitive job market.
                            </p>
                            <p>
                                At Ablyworks, we prioritize your data security and privacy. Rest assured that your information is safeguarded with advanced encryption.
                            </p>
                            <p>
                                Our team consists of experienced professionals passionate about making your job search journey smoother.
                            </p>
                            <p>
                                We are committed to continuous improvement. Your feedback is invaluable to us.
                            </p>
                            <p>
                                Thank you for choosing Ablyworks Resume Builder. We look forward to helping you succeed in your career!
                            </p>
                            {/* <div>
                                <h5>  Share with your friends and colleagues:</h5>
                                <div className='d-flex g-3'>
                                    <Grid item>
                                        <IconButton color="primary">
                                            <WhatsAppIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton color="primary">
                                            <LinkedInIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton color="primary">
                                            <TwitterIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton color="primary">
                                            <FacebookIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton color="primary">
                                            <EmailIcon />
                                        </IconButton>
                                    </Grid>
                                </div>

                            </div> */}
                        </Col>
                        <Col>
                              <img src="images/about-us.png" alt="about-us" className='img-fluid' />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>

    )
}

export default About;