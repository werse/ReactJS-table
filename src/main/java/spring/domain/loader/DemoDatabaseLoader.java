package spring.domain.loader;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import spring.domain.dao.UserRepository;
import spring.domain.entity.User;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.Random;

@Component
public class DemoDatabaseLoader implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DemoDatabaseLoader.class);

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {

        userRepository.save(user("Dezmont", "Cale", "Hume", "79991112233"));
        userRepository.save(user("Ollie", "Terrence", "Alec", "79991112355"));
        userRepository.save(user("Marlowe", "Barney", "Bill", "79991112666"));
        userRepository.save(user("Al", "Rod", "Ansel", "79993334455"));
        userRepository.save(user("Oliver", "Marlowe", "Beau", "79996667788"));
    }

    private User user(String firstName, String middleName, String lastName, String phone) {
        return User.builder()
            .dateOfBirth(LocalDate.now().minusYears(20 + (long)(new Random().nextDouble()*(70))))
            .registrationTime(ZonedDateTime.now())
            .username((firstName + lastName).toLowerCase())
            .firstName(firstName)
            .middleName(middleName)
            .lastName(lastName)
            .phone(phone)
            .email(firstName.toLowerCase() + "_" + lastName.toLowerCase() + "@mail.com")
            .build();
    }
}
