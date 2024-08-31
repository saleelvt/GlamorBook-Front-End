import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import "../../CSS/salonFooter.css"

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <Container>
                <Row className="footer-top">
                    <Col lg={4} md={6} sm={12}>
                        <h5 className='text-2xl'>GlamorBook</h5>
                        <p>Your ultimate salon booking platform. Discover top salons and enjoy premium services with just a few clicks.</p>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                        <h5>Quick Links</h5>
                        <ul className="footer-links">
                            <li><a href="/services">Services</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/privacy">Privacy Policy</a></li>
                        </ul>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                        <h5>Stay Connected</h5>
                        <Form className="newsletter-form">
                            <Form.Group controlId="formEmail">
                                <Form.Control type="email" placeholder="Enter your email" />
                            </Form.Group>
                            <Button variant=" bg-gradient-to-tr  from-pink-800  to-yellow-600" type="submit">Subscribe</Button>
                        </Form>
                        <div className="social-links">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-twitter"></i>
                            </a>
                        </div>
                    </Col>
                </Row>
                <Row className="footer-bottom">
                    <Col sm={12} className="text-center">
                        <p>&copy; 2024 GlamorBook. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};
export default Footer;
