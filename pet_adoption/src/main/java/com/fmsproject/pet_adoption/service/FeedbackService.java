package com.fmsproject.pet_adoption.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fmsproject.pet_adoption.model.Feedback;
import com.fmsproject.pet_adoption.repository.FeedbackRepository;

import java.io.IOException;
import java.util.List;

@Service
public class FeedbackService implements IFeedbackService {
    
    @Autowired
    private FeedbackRepository feedbackRepository;

    @Override
    public Feedback addFeedback(String name, String email, Long phoneNumber, String comment) throws IOException {

        Feedback feedback = new Feedback();

        feedback.setName(name);
        feedback.setEmail(email);
        feedback.setPhoneNumber(phoneNumber);
        feedback.setComment(comment);

        return feedbackRepository.save(feedback);
    }

    @Override
    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }
}
