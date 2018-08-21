package com.ecommerce.configuration;

import java.util.Collections;
import java.util.Properties;

import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebMvc
@Configuration
@ComponentScan("com.ecommerce.rest.controller")
@EnableJpaRepositories(basePackages = "com.ecommerce.repository")
@EnableRedisHttpSession
@PropertySource("classpath:properties/application-${spring.profiles.active}.properties")
public class ContextConfiguration implements WebMvcConfigurer {
	
	
	@Value("${database.platform.dialect}")
	private String databaseDailect;
	
	@Value("${database.classname}")
	private String databaseClassname;
	
	@Value("${database.url}")
	private String databaseURL;
	
	@Value("${database.name}")
	private String databaseName;
	
	@Value("${database.password}")
	private String databasePassword;

	@Value("${hibernate.property.ddl}")
	private String hibernateDDL;
	
	@Value("${hibernate.generate.ddl}")
	private Boolean hibernateGenerateDDL;
	
	@Value("${hibernate.property.showSQL}")
	private Boolean hibernateShowSQL;
	
	@Value("${hibernate.property.formatSQL}")
	private Boolean hibernateFormatSQL;
	
	@Value("${redis.hostname}")
	private String redisHostName;
	
	@Value("${redis.portnumber}")
	private Integer redisPortNumber;
	
	
	
	@Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("*");
    }

	@Bean
	public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
		HibernateJpaVendorAdapter hibernateJpa = new HibernateJpaVendorAdapter();
		hibernateJpa.setDatabasePlatform(databaseDailect);
		hibernateJpa.setShowSql(hibernateShowSQL);
		hibernateJpa.setGenerateDdl(hibernateGenerateDDL);
		hibernateJpa.setDatabase(Database.ORACLE);
		LocalContainerEntityManagerFactoryBean emf = new LocalContainerEntityManagerFactoryBean();
		emf.setDataSource(dataSource());
		emf.setPackagesToScan("com.ecommerce.model");
		emf.setJpaVendorAdapter(hibernateJpa);
		emf.setJpaPropertyMap(Collections.singletonMap("javax.persistence.validation.mode", "AUTO"));
		emf.setJpaProperties(jpaProperties());
		return emf;
	}

	@Bean
	public JpaTransactionManager transactionManager() {
		JpaTransactionManager txnMgr = new JpaTransactionManager();
		txnMgr.setEntityManagerFactory(entityManagerFactory().getObject());
		return txnMgr;
	}

	private BasicDataSource dataSource() {
		BasicDataSource dataSource = new BasicDataSource();
		dataSource.setDriverClassName(databaseClassname);
		dataSource.setUrl(databaseURL);
		dataSource.setUsername(databaseName);
		dataSource.setPassword(databasePassword);
		return dataSource;
	}

	private final Properties jpaProperties() {
		Properties hibernateProperties = new Properties();
		hibernateProperties.setProperty("hibernate.hbm2ddl.auto", hibernateDDL);
		hibernateProperties.setProperty("hibernate.dialect", databaseDailect);
		hibernateProperties.put("hibernate.show_sql", hibernateShowSQL);
		hibernateProperties.put("hibernate.format_sql", hibernateFormatSQL);
		return hibernateProperties;
	}

	@Bean
	public LettuceConnectionFactory connectionFactory() {
		LettuceConnectionFactory lettuceConnectionFactory = new LettuceConnectionFactory();
		lettuceConnectionFactory.setHostName(redisHostName);
		lettuceConnectionFactory.setPort(redisPortNumber);
		return lettuceConnectionFactory;
	}
	
	@Bean
	public CommonsMultipartResolver multipartResolver() {
		CommonsMultipartResolver commonsMultipartResolver = new CommonsMultipartResolver();
		commonsMultipartResolver.setMaxUploadSize(15000000);
		return commonsMultipartResolver;
	}
}
