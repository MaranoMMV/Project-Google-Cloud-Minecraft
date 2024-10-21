package com.thebuilder.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thebuilder.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

	Usuario findUsuarioByNome(String nome);

	Optional<Usuario> findByEmail(String email);
}
