package spring.domain.loader;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import spring.domain.dao.UserRepository;
import spring.domain.entity.User;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Component
public class DemoDatabaseLoader implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DemoDatabaseLoader.class);

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {

        userRepository.save(user("Deforrest ", "Marshall", "Cale"));
        userRepository.save(user("Ollie", "Terrence", "Alec"));
        userRepository.save(user("Marlowe", "Barney", "Bill"));
        userRepository.save(user("Al", "Rod", "Ansel"));
        userRepository.save(user("Oliver", "Marlowe", "Beau"));
    }

    private User user(String firstName, String middleName, String lastName) {
        return User.builder()
            .dateOfBirth(LocalDate.now().minusYears(50L))
            .registrationTime(LocalDateTime.now(ZoneId.of("UTC")))
            .username((firstName + middleName).toLowerCase())
            .firstName(firstName)
            .middleName(middleName)
            .lastName(lastName)
            .build();
    }
}
