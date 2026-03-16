package fiap.java.api.dragons.controller;

import fiap.java.api.dragons.entity.Dragao;
import fiap.java.api.dragons.service.DragaoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("dragons")
public class DragaoController {

    private final Logger log = LoggerFactory.getLogger(getClass());
    //logger da classe atual para registrar mensagens de log na aplicação
    //Lombok-> @Slf4j
    @Autowired
    private DragaoService service;

    @GetMapping
    public List<Dragao> getDragoes(){
        log.info("Listando todos os dragões");
        return service.getDragao();
    }

    /*
    Primeiro é preciso chamar o service e depois retornar um ResponseEntity
     */
    @GetMapping("/{id}")
    public ResponseEntity<Dragao> getDragoesById(@PathVariable Long id){
        log.info("Buscando dragões por id");

        var optionalDragao = service.getDragaoById(id);
        if (optionalDragao.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(optionalDragao.get());
    }
    /*
    Para criar um dragão é preciso passar suas informações no corpo da requisição
     */
    @PostMapping
    public ResponseEntity<Dragao> createDragao(@RequestBody Dragao dragao){
        log.info("Criando um dragão...");
        var dragoes = service.createDragao(dragao);
        return ResponseEntity.status(HttpStatus.CREATED).body(dragoes);

    }

    /*
    Para deletar é preciso passar id, chamar o service e retornar um ResponseEntity
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Dragao> deleteDragao(@PathVariable Long id){
        log.info("Deletando dragão...");
        service.deleteDragao(id);
        return ResponseEntity.noContent().build();
    }

    /*
    Para atualizar precisa passar id, chamar o service, criar um nova entidade e retornar ResponseEntity
     */
    @PutMapping("/{id}")
    public ResponseEntity<Dragao> updateDragao(@PathVariable Long id, @RequestBody Dragao newDragao){
        Dragao dragao = service.updateDragao(id, newDragao);
        return ResponseEntity.ok(dragao);
    }




}
