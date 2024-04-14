import React from "react";
import { Card, Col } from "react-bootstrap";

const FeedbackCard = ({ feedback }) => {
    return (
        <Col key={feedback.id} className="mb-4" xs={12}>
            <Card>
                <Card.Body className="d-flex flex-wrap align-items-center">
                    <div className="flex-grow-1 ml-3 px-5">
                        <Card.Title>{feedback.name}</Card.Title>
                        <Card.Text>{feedback.comment}</Card.Text>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default FeedbackCard;
