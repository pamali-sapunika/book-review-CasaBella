package com.casabella.backend.controllers;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.casabella.backend.dto.AvgRatingDTO;
import com.casabella.backend.model.BookReview;
import com.casabella.backend.services.BookReviewService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/v1/reviews")
@Validated
public class BookReviewController {

    private final BookReviewService bookReviewService;

    
    @Autowired
    public BookReviewController(BookReviewService bookReviewService) {
        this.bookReviewService = bookReviewService;
    }

    @PostMapping("/")
    public ResponseEntity<?> postReview(@Valid @RequestBody BookReview review){  

        return new ResponseEntity<>(bookReviewService.postReview(review), HttpStatus.CREATED);
    }


    @GetMapping("/avg-rating")
    public List<AvgRatingDTO> getAverageRatings() {
        return bookReviewService.getAverageRatings();
    }

    //All reviews
    @GetMapping("/")
    public ResponseEntity<List<BookReview>> getAllReviews(){
        return ResponseEntity.ok(bookReviewService.getAllReviews());
    }

    //Review by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getReviewById(@PathVariable Long id){
        BookReview review1 = bookReviewService.getReviewById(id);
        if(review1 == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(review1);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateReview(@PathVariable Long id, @RequestBody BookReview review){
        BookReview updatesReview = bookReviewService.updateReview(id, review);

        if(updatesReview == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        else{
            return ResponseEntity.ok(updatesReview);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        try {
            bookReviewService.deleteReview(id); 
            return ResponseEntity.noContent().build(); 
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    public BookReviewService getbookReviewService() {
        return bookReviewService;
    }
}
