package Test1 {
	
	part def HumanDrivenVehicle {
		
		part driver : Person;
	}
	
	part def PoweredVehicle {
		
		part eng: Engine;
	}
	
	part def Engine;
	part def Person;
}

package Test2 {

    part def Vehicle1 {
		
		part driver1 : Driver;
	}
	
	part def Vehicle2 {
		
		part mot : Motor;
	}
	
	part def Motor;
	part def Driver;
}