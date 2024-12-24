package com.casabella.backend.dto;

public class AvgRatingDTO {

    private String bookTitle;
    private Double averageRating;

    public AvgRatingDTO(String bookTitle, Double averageRating) {
        this.bookTitle = bookTitle;
        this.averageRating = averageRating;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }
    
}
