package com.ecommerce.configuration;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class RequestFilter implements Filter{

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		
		httpResponse.setHeader("Access-Control-Allow-Origin", "*");
		httpResponse.setHeader("Allow-Control-Allow-Methods", "POST,PUT,OPTIONS,OPTIONS,DELETE,GET");
		httpResponse.setHeader("Access-Control-Allow-Headers","x-request-with, x-auth-token");
		httpResponse.setHeader("Access-Control-Max-Age", "3600");
		httpResponse.setHeader("Allow-Control-Allow-Credentials","true");
		
		if(!(httpRequest.getMethod().equalsIgnoreCase("OPTIONS"))) {
			try {
				chain.doFilter(request, response);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}else {
			System.out.println("Pre-flight");
			httpResponse.setHeader("Allow-Control-Allow-Methods", "POST,DELETE,GET");
			httpResponse.setHeader("Access-Control-Max-Age", "3600");
			httpResponse.setHeader("Access-Control-Allow-Headers","authorization, content-type, x-auth-token,"
					+ "access-control-request-headers, access-control-request-method, accept, origin, authorization, x-request-with");
			httpResponse.setStatus(HttpServletResponse.SC_OK);
		}
	}
	
	@Override
	public void init(FilterConfig filterConfig) {}
	@Override
	public void destroy() {}
}
