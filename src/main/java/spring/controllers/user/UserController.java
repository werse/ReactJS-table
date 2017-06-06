package spring.controllers.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spring.domain.dao.UserRepository;
import spring.domain.entity.User;

import java.util.List;
import java.util.stream.StreamSupport;

import static java.util.stream.Collectors.toList;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/users")
    public List<User> getUsers() {
        return StreamSupport.stream(userRepository.findAll().spliterator(), false).collect(toList());
    }
}
