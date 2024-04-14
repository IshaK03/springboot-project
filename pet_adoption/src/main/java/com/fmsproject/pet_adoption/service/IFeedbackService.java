package com.fmsproject.pet_adoption.service;

import java.io.IOException;
import java.util.List;

import com.fmsproject.pet_adoption.model.Feedback;

public interface IFeedbackService {

    Feedback addFeedback(String name, String email, Long phoneNumber, String comment) throws IOException;
    
    List<Feedback> getAllFeedback();

}
