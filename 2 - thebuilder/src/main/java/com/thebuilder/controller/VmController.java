package com.thebuilder.controller;

import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeoutException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thebuilder.service.VmService;

@RestController
@RequestMapping("/api/vms")
public class VmController {
	
	@Autowired
	private VmService vmService;
	
	@GetMapping("parar")
	public void pararAVM() throws IOException, ExecutionException, InterruptedException, TimeoutException {
		vmService.stopInstance();
	}
	
	@GetMapping("kill")
	public void killAVM() throws IOException, ExecutionException, InterruptedException, TimeoutException {
		vmService.killInstance();
	}
	
	@GetMapping("iniciar")
	public void iniciarAVM() throws IOException, ExecutionException, InterruptedException, TimeoutException {
		vmService.startInstance();
	}
	
	@GetMapping("status")
	public ResponseEntity<String> statusVM() throws IOException {
		return ResponseEntity.ok(this.vmService.getInstanceStatus()) ;
	}

}
