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
    public User saveUser(User user) throws Exception {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new Exception("User with given username already exist in database");
        }
        user.setRegistrationTime(ZonedDateTime.now());
        return userRepository.save(user);
    }

    @RequestMapping(method = POST, value="/user/{$username}", consumes = APPLICATION_FORM_URLENCODED_VALUE)
    public User updateUser(@PathVariable("$username") String username, User user) throws Exception {
        if (userRepository.findByUsername(username).isPresent()) {
            return userRepository.save(user);
        } else throw new Exception("User not found");
    }
}
