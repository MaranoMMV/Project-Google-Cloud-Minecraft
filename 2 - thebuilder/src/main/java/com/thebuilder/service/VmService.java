package com.thebuilder.service;

import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.api.gax.longrunning.OperationFuture;
import com.google.cloud.compute.v1.Instance;
import com.google.cloud.compute.v1.InstancesClient;
import com.google.cloud.compute.v1.Operation;
import com.google.cloud.compute.v1.Operation.Status;
import com.google.cloud.compute.v1.StartInstanceRequest;
import com.google.cloud.compute.v1.StopInstanceRequest;

@Service
public class VmService {

	
    @Value("${thebuilder.googlecloud.project}")
	private String  project;
	
	@Value("${thebuilder.googlecloud.zone}")
	private String zone;
	
	@Value("${thebuilder.googlecloud.instanceName}")
	private String instanceName;
	
	//O metodo de parar uma instancia tem um tempo de 5 minutos para desligar para que o mapa do minecraft salve o jogo antes de encerrar o servidor
	//Caso em seu projeto de desligar a instancia não seja necessario esperar para desligar, basta apagar o codigo do Thread.sleep(300_000); para não esperar
	public void stopInstance() throws IOException, ExecutionException, InterruptedException, TimeoutException {

		System.out.println("Foi encaminhado para desligar o servidor, em 5 minutos vai ser desligado automaticamente");
		Thread.sleep(300_000);
		System.out.println("Desligando o servidor");
		
		try (InstancesClient instancesClient = InstancesClient.create()) {

			StopInstanceRequest stopInstanceRequest = StopInstanceRequest.newBuilder().setProject(project).setZone(zone)
					.setInstance(instanceName).build();

			OperationFuture<Operation, Operation> operation = instancesClient.stopAsync(stopInstanceRequest);
			Operation response = operation.get(3, TimeUnit.MINUTES);

			if (response.getStatus() == Status.DONE) {
				System.out.println("Instancia encerrada com sucesso! ");
			}
		}
	}
	
	//Este metodo utiliza para desligar imediatamente o servidor
	public void killInstance() throws IOException, ExecutionException, InterruptedException, TimeoutException {
		
		try (InstancesClient instancesClient = InstancesClient.create()) {

			StopInstanceRequest stopInstanceRequest = StopInstanceRequest.newBuilder().setProject(project).setZone(zone)
					.setInstance(instanceName).build();

			OperationFuture<Operation, Operation> operation = instancesClient.stopAsync(stopInstanceRequest);
			Operation response = operation.get(3, TimeUnit.MINUTES);

			if (response.getStatus() == Status.DONE) {
				System.out.println("Instancia encerrada com sucesso! ");
			}
		}
	}


	
	//Função para ligar o servidor
	public void startInstance() throws IOException, ExecutionException, InterruptedException, TimeoutException {
		try (InstancesClient instancesClient = InstancesClient.create()) {

			StartInstanceRequest startInstanceRequest = StartInstanceRequest.newBuilder().setProject(project)
					.setZone(zone).setInstance(instanceName).build();

			OperationFuture<Operation, Operation> operation = instancesClient.startAsync(startInstanceRequest);

			Operation response = operation.get(3, TimeUnit.MINUTES);

			if (response.getStatus() == Status.DONE) {
				System.out.println("Instancia inicializada com sucesso!!");
			}
		}
	}
	
	public String getInstanceStatus() throws IOException {
	    try (InstancesClient instancesClient = InstancesClient.create()) {

	        // Obtém as informações da instância
	        Instance instance = instancesClient.get(project, zone, instanceName);

	        // Retorna o status da instância
	        String status = instance.getStatus();
	        return status;
	    }
	}
	
}
