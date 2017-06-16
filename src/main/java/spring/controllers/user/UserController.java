package spring.controllers.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spring.domain.dao.UserRepository;
import spring.domain.entity.User;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.StreamSupport;

import static java.util.stream.Collectors.toList;
import static org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(method = GET, value = "/users")
    public List<User> getUsers() {
        return StreamSupport.stream(userRepository.findAll().spliterator(), false).collect(toList());
    }

    @RequestMapping(method = POST, value = "/user", consumes = APPLICATION_FORM_URLENCODED_VALUE)
    public User saveUser(User user) {
        checkUser(user);
        user.setRegistrationTime(ZonedDateTime.now());
        return userRepository.save(user);
    }

    @RequestMapping(method = POST, value = "/user/{userId}", consumes = APPLICATION_FORM_URLENCODED_VALUE)
    public User updateUser(@PathVariable("userId") String id, User user) {
        checkUser(user);
        if (userRepository.findOne(Long.parseLong(id)) != null) {
            return userRepository.save(user);
        } else throw new RuntimeException("User not found");
    }

    private void checkUser(User user) {
        if (user.getId() != null) {
            userRepository.findById(user.getId()).ifPresent(usr -> {
                if (!usr.getUsername().equals(user.getUsername())) {
                    checkUsername(user.getUsername());
                }
                if (!usr.getEmail().equals(user.getEmail())) {
                    checkEmail(user.getEmail());
                }
            });
        } else {
            checkUsername(user.getUsername());
            checkEmail(user.getEmail());
        }
    }

    private void checkUsername(String username) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("User with this username already exists");
        }
    }

    private void checkEmail(String email) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("User with this email already exists");
        }
    }
}
