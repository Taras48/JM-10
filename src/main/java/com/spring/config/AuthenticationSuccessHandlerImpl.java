package com.spring.config;

import com.spring.model.Role;
import com.spring.model.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;


@Component
public class AuthenticationSuccessHandlerImpl implements AuthenticationSuccessHandler {

    private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {

        String targetUrl = "";



        User user = (User) authentication.getPrincipal();
        for (Role role : user.getRoles()){
            if (role.getRole().equals("admin")){
                targetUrl = "/admin";
                break;
            }
            if (role.getRole().equals("user")){
                targetUrl = "/user";
                break;
            }
        }

        redirectStrategy.sendRedirect(httpServletRequest, httpServletResponse, targetUrl);
    }
}
