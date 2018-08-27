package com.ecommerce.configuration;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration.Dynamic;

import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

public class DispatcherServletConfiguration extends AbstractAnnotationConfigDispatcherServletInitializer {

	@Override
	protected Class<?>[] getRootConfigClasses() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected Class<?>[] getServletConfigClasses() {
		return new Class[] { ContextConfiguration.class, SecurityConfiguration.class };
	}

	@Override
	protected String[] getServletMappings() {
		return new String[] { "/" };
	}
	
	@Override
	public void onStartup(ServletContext context) throws ServletException {
      context.setInitParameter("spring.profiles.active", "dev");
      
      AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
      ctx.register(ContextConfiguration.class);
      ctx.register(SecurityConfiguration.class);
      ctx.setServletContext(context);  
      Dynamic servlet = context.addServlet("dispatcher", new DispatcherServlet(ctx));
      servlet.addMapping("/");
      servlet.setLoadOnStartup(1);
    }
	
}
