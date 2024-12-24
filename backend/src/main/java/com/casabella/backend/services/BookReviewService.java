package com.casabella.backend.services;

import java.util.*;
import org.springframework.stereotype.Service;

import com.casabella.backend.dto.AvgRatingDTO;
import com.casabella.backend.model.BookReview;
import com.casabella.backend.repository.BookReviewRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor 
public class BookReviewService {

    private final BookReviewRepository bookReviewRepo;

    //Add Review
    public BookReview postReview(BookReview review){
        return bookReviewRepo.save(review);
    }

    public List<AvgRatingDTO> getAverageRatings() {
        return bookReviewRepo.findAverageRatings();
    }

    //Get All reviews
    public List<BookReview> getAllReviews(){
        return bookReviewRepo.findAll();
    }

    //Get review by ID
    public BookReview getReviewById(Long id){
        return bookReviewRepo.findById(id).orElse(null);
    }

    //Update review
    public BookReview updateReview(Long id, BookReview review){
        Optional<BookReview> optionalReview = bookReviewRepo.findById(id);
        if(optionalReview.isPresent()){
            BookReview existingReview = optionalReview.get();

            existingReview.setBookTitle(review.getBookTitle());
            existingReview.setAuthor(review.getAuthor());
            existingReview.setRating(review.getRating());
            existingReview.setReviewText(review.getReviewText());
            existingReview.setReviewDate(review.getReviewDate());

            return bookReviewRepo.save(existingReview);
        }

        return null;
    }

    //Delete review
    public void deleteReview(Long id) {
        if(!bookReviewRepo.existsById(id)) {
            throw new EntityNotFoundException("Review with ID " + id + " is not found");
        }
    
        bookReviewRepo.deleteById(id);
    }
    
    
}
