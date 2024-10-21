package com.thebuilder.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thebuilder.entity.Usuario;
import com.thebuilder.entity.dto.UsuarioDTO;
import com.thebuilder.service.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioservice;
	
	
	@GetMapping
	public ResponseEntity<List<Usuario>> getUsuarios(){
		return ResponseEntity.ok( this.usuarioservice.buscarTodosUsuarios());
	}
	
	@GetMapping("{id}")
	public ResponseEntity<Usuario> getUsuarioPorId(@PathVariable Long id){
		return ResponseEntity.ok(this.usuarioservice.buscarUsuarioPorId(id));
	}
	
	@PostMapping
	public ResponseEntity<Usuario> postUsuario(@RequestBody UsuarioDTO usuarioDTO){
		System.out.println(usuarioDTO.toString());
		Usuario usuarioCriado = this.usuarioservice.salvarUsuario(usuarioDTO);
		return ResponseEntity.created(URI.create("/usuarios/" + usuarioCriado.getId())).body(usuarioCriado);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<Void> putUsuario(@PathVariable Long id, @RequestBody UsuarioDTO usuarioDTO){
		this.usuarioservice.alterarUsuario(id, usuarioDTO);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<Void> deleteUsuario(@PathVariable Long id){
		this.usuarioservice.apagarUsuario(id);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("nome")
	public ResponseEntity<Usuario> getUsuarioPorNome(String nome){
		return ResponseEntity.ok(this.usuarioservice.buscarUsuarioPorNome(nome));
	}
	
}
