package com.casabella.backend.repository;

import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.casabella.backend.dto.AvgRatingDTO;
import com.casabella.backend.model.BookReview;

@Repository
public interface BookReviewRepository extends JpaRepository<BookReview, Long>{

    @Query("SELECT r FROM BookReview r WHERE r.bookTitle = ?1")
    Optional<BookReview> findReviewByBook(String bookTitle);

    @Query(
        "SELECT new com.casabella.backend.dto.AvgRatingDTO(b.bookTitle, AVG(b.rating)) " +
        "FROM BookReview b " +
        "GROUP BY b.bookTitle"
    )List<AvgRatingDTO> findAverageRatings();

}
