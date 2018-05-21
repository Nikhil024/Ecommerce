package com.ecommerce.personal;

import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Handles requests for the application home page.
 */
@RestController
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	

	@RequestMapping(value = "/device",method = RequestMethod.GET,headers="Accept=application/json",produces = "application/json")
	public List<Devices> getAllDevices(){
		List<Devices> devicesList = new ArrayList<Devices>();
		Devices d = new Devices(1, "samsung note 1","demo phone",10,"c:demo",new Date().toString(), new Date().toString());
		Devices d1 = new Devices(2, "samsung note 2","demo phone",10,"c:demo",new Date().toString(), new Date().toString());
		Devices d2 = new Devices(3, "samsung note 3","demo phone",10,"c:demo",new Date().toString(), new Date().toString());
		Devices d3 = new Devices(4, "samsung note 4","demo phone",10,"c:demo",new Date().toString(), new Date().toString());
		Devices d4 = new Devices(5, "samsung note 5","demo phone",10,"c:demo",new Date().toString(), new Date().toString());
		Devices d5 = new Devices(6, "samsung note 6","demo phone",10,"c:demo",new Date().toString(), new Date().toString());
		Devices d6 = new Devices(7, "samsung note 7","demo phone",10,"c:demo",new Date().toString(), new Date().toString());
		Devices d7 = new Devices(8, "samsung note 8","demo phone",10,"c:demo",new Date().toString(), new Date().toString());

		devicesList.add(d);
		devicesList.add(d1);
		devicesList.add(d2);
		devicesList.add(d3);
		devicesList.add(d4);
		devicesList.add(d5);
		devicesList.add(d6);
		devicesList.add(d7);
		logger.info("called!!!!!!!!!!");
		return devicesList;
	}

	
}
