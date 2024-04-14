import React, { useEffect, useState } from "react";
import { getAllFeedback } from "../utils/ApiFunctions"; // Assuming you have a function to fetch feedback data
import FeedbackCard from "./FeedbackCard"; // Assuming you have a component to render individual feedback cards
import { Container, Row, Col } from "react-bootstrap";

const Feedback = () => {
    const [feedback, setFeedback] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getAllFeedback()
            .then((data) => {
                setFeedback(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    const renderFeedback = () => {
        return feedback.map((feedbackItem) => (
            <FeedbackCard key={feedbackItem.id} feedback={feedbackItem} />
        ));
    };

    if (isLoading) {
        return <div>Loading feedback...</div>;
    }

    if (error) {
        return <div className="text-danger">Error: {error}</div>;
    }

    return (
        <Container>
            <Row>
                <Col>{renderFeedback()}</Col>
            </Row>
        </Container>
    );
};

export default Feedback;
