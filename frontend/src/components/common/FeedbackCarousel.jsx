import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllFeedback } from "../utils/ApiFunctions"; // Assuming you have a function to fetch feedback
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";

const FeedbackCarousel = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getAllFeedback() // Fetch feedback from the server
            .then((data) => {
                setFeedbacks(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setErrorMessage(error.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div className="mt-5">Loading feedback....</div>;
    }
    if (errorMessage) {
        return <div className="text-danger mb-5 mt-5">Error : {errorMessage}</div>;
    }
    
    return (
        <div>

                <Link to={"/browse-all-feedback"} className="btn btn-pet btn-sm mt-3 mb-2">
                    Browse all Feedback
                </Link>
                <Link to={"/add-feedback"} className="btn btn-pet btn-sm mt-3 mb-2 mx-2">
                    Add Feedback
                </Link>
        <section className="mb-5 shadow rounded p-4 card-background">
            {/* <Link to={"/browse-all-feedback"} className="pet-color px-3">
                View all feedback
            </Link> */}

            <Container>
                <Carousel indicators={false} >
                    {[...Array(Math.ceil(feedbacks.length / 4))].map((_, index) => (
                        <Carousel.Item key={index}>
                            <Row>
                                {feedbacks.slice(index * 4, index * 4 + 4).map((feedback, feedbackIndex) => (
                                    <Col key={feedbackIndex} xs={12} md={6} lg={3}>
                                        <Card className="carousel-card">
                                            <Card.Body>
                                                <Card.Title className="text-center pet-price">{feedback.name}</Card.Title>
                                                <Card.Text className="text-center">{feedback.comment}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
        </section>
        </div>
    );
};

export default FeedbackCarousel;
