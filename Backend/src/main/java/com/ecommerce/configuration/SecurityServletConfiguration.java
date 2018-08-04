package com.ecommerce.configuration;

import org.springframework.security.web.context.AbstractSecurityWebApplicationInitializer;

public class SecurityServletConfiguration extends AbstractSecurityWebApplicationInitializer {
	
	 public SecurityServletConfiguration() {
	        super(SecurityConfiguration.class);
	    }
}
