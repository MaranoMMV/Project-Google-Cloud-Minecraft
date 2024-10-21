package com.thebuilder.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.thebuilder.entity.Usuario;
import com.thebuilder.entity.dto.UsuarioDTO;
import com.thebuilder.repository.UsuarioRepository;

@Service
public class UsuarioService {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
    private PasswordEncoder passwordEncoder;
	
	public Usuario buscarUsuarioPorId(Long id) {
		return this.usuarioRepository.findById(id).orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario não encontrado com o id: " + id));
	}
	
	public List<Usuario> buscarTodosUsuarios(){
		this.usuarioRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
		return this.usuarioRepository.findAll().stream().map( usuario -> {
			usuario.setPassword(null);
			return usuario;
		}).collect(Collectors.toList());
	}
	
	public Usuario salvarUsuario( UsuarioDTO usuarioDTO ) {
		Usuario usuario = new Usuario();
		usuario.setEmail(usuarioDTO.email());
		usuario.setNome(usuarioDTO.nome());
		usuario.setPassword(passwordEncoder.encode(usuarioDTO.password()));
		usuario.setStatus(usuarioDTO.status());
		
		return this.usuarioRepository.save(usuario);
	}
	
	public void alterarUsuario( Long id, UsuarioDTO usuarioAtualizado ) {
		this.usuarioRepository.findById(id).map( usuario -> {
			
			usuario.setNome(usuarioAtualizado.nome());
			usuario.setEmail(usuarioAtualizado.email());
			usuario.setStatus(usuario.getStatus());
			usuario.setPassword(usuario.getPassword());
			return this.usuarioRepository.save(usuario);
		
		}).orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario Não foi encontrado com o id: " + id ));
	}
	
	public void apagarUsuario(Long id) {
		this.usuarioRepository.findById(id).map(usuario -> {
			this.usuarioRepository.delete(usuario);
			return Void.TYPE;
		}).orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario não encontrado para ser apagado"));
	}
	
	public Usuario buscarUsuarioPorNome(String nome) {
		return this.usuarioRepository.findUsuarioByNome(nome);
	}
	
}
