package spring.domain.dao;

import org.springframework.data.repository.CrudRepository;
import spring.domain.entity.User;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
