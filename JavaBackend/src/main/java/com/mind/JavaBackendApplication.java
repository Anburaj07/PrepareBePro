package com.mind;

import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.service.OpenAiService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@SpringBootApplication
@RestController
@RequestMapping("/home")
public class JavaBackendApplication {

	public static void main(String[] args) {
		System.out.println("Application started");
		SpringApplication.run(JavaBackendApplication.class, args);
	}
	@GetMapping()
	public String chatGptRequest() {
		return "Listenting on 8080";
	}

}

