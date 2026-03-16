package br.com.fiap.movies.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import lombok.Data;

import java.time.LocalDate;

@Data

@Entity
public class Movie {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)//auto-incremento
    //gerar id automaticamente
    private Long id;

    private String title;
    private String synopsis;
    private Integer rating;
    private LocalDate releaseDate;
}
