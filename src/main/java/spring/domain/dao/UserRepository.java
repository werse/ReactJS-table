package spring.domain.dao;

import org.springframework.data.repository.CrudRepository;
import spring.domain.entity.User;

public interface UserRepository extends CrudRepository<User, Long> {}
