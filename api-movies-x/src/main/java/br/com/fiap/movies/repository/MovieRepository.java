package br.com.fiap.movies.repository;

import br.com.fiap.movies.models.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    //Métodos abstratos -> não pode ter corpo, apenas contratos para serem implementados
    //assinatura -> JPA já possui persistência, só assinar métodos com buscas específicas, pois as consultas gerais já são compiladas
    //Raw type -> precisa de parâmetros para indicar o que ele guarda
    //Vc não pode criar um tipo de qualquer classe, tem que ser uma tabela (tipo gerenciado) mapeada pelo banco
    //Isso se faz com a anotação @Entity que mostra para o spring que essa classe é uma tabela
    //Depois indicar com @Id a chave primária
}
