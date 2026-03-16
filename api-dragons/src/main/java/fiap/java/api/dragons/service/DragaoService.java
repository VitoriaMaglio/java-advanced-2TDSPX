package fiap.java.api.dragons.service;

import fiap.java.api.dragons.entity.Dragao;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class DragaoService {

    //quando não trabalhamos com um banco de dados, os dados ficam guardados na memória
    //Criar uma lista privada repository e um método que retorna  essa lista -> segurança e controle dos dados
    //Service tem métodos que representam a regra de negócio das requisições controller

    private List<Dragao> repository = new ArrayList<>();
    public List<Dragao> getDragao(){
        return repository;
    }

    //Método -> post de dragao
    /*
    Para criar um dragao e inserir na lista
    Criar automático o id
     */
    public Dragao createDragao(Dragao dragao){
        var id = Math.abs(new Random().nextLong());
        dragao.setId(id);
        repository.add(dragao);
        return dragao;
    }
    //Método -> get todos os dragões do sistema
    /*
    Para retornar dragoes da lista, precisa percorrer a lista.
     */
    public Dragao getDragao(Dragao dragao){
        for (Dragao d : repository){
            return d;
        }
        return dragao;
    }
    //Método -> get id específico
    /*
    A classe Optional represernta um valor que pode ou não exisitr
    Para retornar um Dragao por id, precisa buscar na lista o id
     */
    public Optional<Dragao> getDragaoById(Long id){
        return repository
                .stream()
                .filter(movie -> movie.getId().equals(id))
                .findFirst();
    }

    //Método -> delete com id específico
    /*
    O que eu preciso para deletar um dragão da lista?
    Buscar na lista e se existir, apagar
    Se não, retornar exception
     */
    public void deleteDragao(Long id){
        var optionalDragao = getDragaoById(id);
        if (optionalDragao.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Dragão não encontrado.");
        }
        repository.remove(optionalDragao.get());
    }
    //Método -> put id específico
    /*
    O que eu preciso para atualizar um dragão da lista?
    Buscar na lista e se existir, apagar e adicionar dnv
    Se não, retornar exception
     */
    public Dragao updateDragao(Long id, Dragao newDragao){
        var optionalDragao = getDragaoById(id);
        if (optionalDragao.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Dragão não encontrado.");
        }
        repository.remove(optionalDragao.get());
        newDragao.setId(id);
        return newDragao;
    }

}
