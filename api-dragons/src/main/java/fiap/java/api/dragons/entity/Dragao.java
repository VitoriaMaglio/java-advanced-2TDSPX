package fiap.java.api.dragons.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor

public class Dragao {

    private Long id;
    private String nome;
    private String cor;
    private int poderDeFogo;
    private double peso;
    private double altura;
    private boolean possuiMontador;


}
