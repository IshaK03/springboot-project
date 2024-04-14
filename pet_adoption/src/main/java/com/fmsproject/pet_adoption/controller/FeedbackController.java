package com.fmsproject.pet_adoption.controller;

import com.fmsproject.pet_adoption.model.Feedback;
import com.fmsproject.pet_adoption.service.IFeedbackService;
import com.fmsproject.pet_adoption.response.FeedbackResponse;
import com.fmsproject.pet_adoption.response.FeedbackRequest;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/feedbacks")
@CrossOrigin(origins = "http://localhost:5173")
public class FeedbackController {

    @Autowired
    private IFeedbackService feedbackService;

    @PostMapping("/add")
    public ResponseEntity<FeedbackResponse> addFeedback(@ModelAttribute FeedbackRequest request) {
        try {
            Feedback savedFeedback = feedbackService.addFeedback(request.getName(), request.getEmail(),
                    request.getPhoneNumber(),
                    request.getComment());
            FeedbackResponse feedbackResponse = convertToResponse(savedFeedback);
            return ResponseEntity.ok(feedbackResponse);
        } catch (IOException e) {
            // Handle file upload error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/all-feedback")
    public ResponseEntity<List<FeedbackResponse>> getAllFeedback() {
        try {
            List<Feedback> feedbackList = feedbackService.getAllFeedback(); // Assuming you have a method to fetch all feedback
            List<FeedbackResponse> feedbackResponses = new ArrayList<>();
    
            for (Feedback feedback : feedbackList) {
                FeedbackResponse feedbackResponse = new FeedbackResponse();
                // feedbackResponse.setId(feedback.getId());
                feedbackResponse.setName(feedback.getName());
                feedbackResponse.setComment(feedback.getComment());
                // Add any other fields you want to include
    
                feedbackResponses.add(feedbackResponse);
            }
    
            return ResponseEntity.ok(feedbackResponses);
        } catch (Exception e) {
            // Handle any exceptions, such as database errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private FeedbackResponse convertToResponse(Feedback feedback) {
        FeedbackResponse response = new FeedbackResponse();
        response.setName(feedback.getName());
        response.setEmail(feedback.getEmail());
        response.setPhoneNumber(feedback.getPhoneNumber());
        response.setComment(feedback.getComment());
        return response;
    }
}
