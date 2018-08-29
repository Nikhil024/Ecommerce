package com.ecommerce.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.session.web.http.HeaderHttpSessionStrategy;
import org.springframework.session.web.http.HttpSessionStrategy;
import org.springframework.web.cors.CorsConfiguration;
import com.ecommerce.handlers.UnauthorizedEntryPointHandler;
import com.ecommerce.services.impl.UserSecurityService;

@Configuration
@EnableWebSecurity
@ComponentScan("com.ecommerce")
@EnableJpaRepositories(basePackages = "com.ecommerce.repository")
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	private UserSecurityService userSecurityService;
	
	@Autowired
	private UnauthorizedEntryPointHandler unauthorizedHandler;

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userSecurityService).passwordEncoder(passwordEncoder());
	}

	private BCryptPasswordEncoder passwordEncoder() {
		return SecurityUtility.passwordEncoder();
	}

	private static final String[] PUBLIC_MATCHERS = { "/", "/register", "/getAllProducts", 
													  "/getAllCategories" , "/unknownUserAddCart", 
													  "/addExistingCart" ,"/getCart", 
													  "/getProductFromCategory", "/getProduct",
													  "/removeProduct", "/getAllEnabledCategories", "/getAllEnabledProducts"};

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http
			.csrf().disable()
			.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues()).and()
			.exceptionHandling()
				.authenticationEntryPoint(unauthorizedHandler)
			.and()
			.httpBasic()
				.and()
			.authorizeRequests()
				.antMatchers(PUBLIC_MATCHERS)
					.permitAll()
						.anyRequest()
							.authenticated();
		
	}

	@Bean
	public HttpSessionStrategy httpSessionStrategy() {
		return new HeaderHttpSessionStrategy();
	}
}
