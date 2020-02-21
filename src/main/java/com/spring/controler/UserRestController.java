package com.spring.controler;

import com.spring.dto.UserDto;
import com.spring.model.User;
import com.spring.service.RoleService;
import com.spring.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class UserRestController {

    private UserService userService;
    private RoleService roleService;

    @Autowired
    public UserRestController(UserService service, RoleService roleService) {
        this.userService = service;
        this.roleService = roleService;
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> list = userService.findAll();
      //  return list;
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping(value = "/add")
    public void postAdd(@RequestBody UserDto userDto) {
        User user = new User();
        user.setName(userDto.getName());
        user.setPassword(userDto.getPassword());
        user.setMessage(userDto.getMessage());
        user.setRoles(roleService.findAllByRole(userDto.getRole()));
        userService.saveUser(user);
    }

    @PutMapping(value = "/update")
    public void putUpdateUser(@RequestBody UserDto userDto) {
        User upUser = userService.getUserById(userDto.getId());
        upUser.setName(userDto.getName());
        upUser.setPassword(userDto.getPassword());
        upUser.setRoles(roleService.findAllByRole(userDto.getRole()));
        upUser.setMessage(userDto.getMessage());
        userService.updateUser(upUser);
    }

    @DeleteMapping(value = "/delete")
    public void deleteUser(@RequestBody Long id) {
        userService.deleteUser(id);
    }
}
