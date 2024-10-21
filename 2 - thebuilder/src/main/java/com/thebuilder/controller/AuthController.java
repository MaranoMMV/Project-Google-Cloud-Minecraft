package com.thebuilder.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thebuilder.entity.Usuario;
import com.thebuilder.entity.dto.LoginRequestDTO;
import com.thebuilder.entity.dto.ResponseDTO;
import com.thebuilder.infra.security.TokenService;
import com.thebuilder.repository.UsuarioRepository;

@RestController
@RequestMapping("/auth/login")
public class AuthController {
	
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public AuthController(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, TokenService tokenService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    @CrossOrigin("http://localhost:4200")
    @PostMapping
    public ResponseEntity<ResponseDTO> login(@RequestBody LoginRequestDTO body){
        Usuario usuario = this.usuarioRepository.findByEmail(body.email()).orElseThrow(() -> new RuntimeException("User not found"));
        if (!usuario.getStatus()) {
            return ResponseEntity.badRequest().build();
        }
        if(passwordEncoder.matches(body.password(), usuario.getPassword())) {
            String token = this.tokenService.generateToken(usuario);
            return ResponseEntity.ok(new ResponseDTO(usuario.getNome(), token));
        }
        return ResponseEntity.badRequest().build();
    }
}
