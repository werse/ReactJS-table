package spring;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import spring.database.dao.UserRepository;
import spring.database.entity.User;

import java.time.LocalDateTime;

@SpringBootApplication
public class Application {

    private static final Logger log = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) {
        SpringApplication.run(Application.class);
    }

    @Bean
    public CommandLineRunner demo(UserRepository userRepository) {
        return (args) -> {
            userRepository.save(user("John", "Junior", "Doe"));
            userRepository.save(user("John1", "Junior2", "Doe3"));
            userRepository.save(user("John2", "Junior2", "Doe3"));

            log.info("Users found with findAll()");
            userRepository.findAll().forEach(user -> log.info(user.toString()));
        };
    }

    public User user(String firstName, String middleName, String lastName) {
        return User.builder()
            .dateOfBirth(LocalDateTime.now().minusYears(100L))
            .registrationTime(LocalDateTime.now())
            .username((firstName + middleName).toLowerCase())
            .firstName(firstName)
            .middleName(middleName)
            .lastName(lastName)
            .build();
    }
}
