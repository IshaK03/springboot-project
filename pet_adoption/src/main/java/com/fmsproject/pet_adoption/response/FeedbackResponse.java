package com.fmsproject.pet_adoption.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FeedbackResponse {

    private Long id;
    private String name;
    private String email;
    private Long phoneNumber;
    private String comment;

    public FeedbackResponse(Long id, String name, String email, Long phoneNumber, String comment) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.comment = comment;
    }
}
