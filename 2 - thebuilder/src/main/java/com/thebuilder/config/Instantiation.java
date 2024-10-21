package com.thebuilder.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import com.thebuilder.entity.Usuario;
import com.thebuilder.repository.UsuarioRepository;

@Configuration
public class Instantiation implements CommandLineRunner {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Override
	public void run(String... args) throws Exception {
		Usuario usuario = new Usuario();
		usuario.setEmail("seu email");
		usuario.setNome("seu nome");
		usuario.setPassword("uma senha encriptada pelo bcrypt , coloque-o aqui");
		usuario.setStatus(true);
		
		usuarioRepository.save(usuario);
	}
	
	
}
