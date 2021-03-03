package 'Home Sys' {

    part def Controller;

    part def 'Kiosk mode Chromium';

    part def 'LCD Touch Screen' {
        part view : 'Kiosk mode Chromium'[1];
    }

    part def 'Flask Server' {
        part webPage : 'Web Page'[1];
        part controller : Controller[1];
    }

    part def 'Raspberry Pi' {
        part server : 'Flask Server'[1];
        part display : 'LCD Touch Screen'[1];     
    }

    part def 'ESP8266 D1' {
        part light : 'LED Lamp'[1];
    }

    part def 'Kasa WiFi Socket' {
        part tableLamp : 'Table Lamp'[1];
    }

    part def User {
        part browser : 'Web Browser'[1];
    }

    part def System {
        part user : User[1];
        part raspberryPi : 'Raspberry Pi'[1];
        part esp8266 : 'ESP8266 D1'[1];
        part kasaWifiSocket : 'Kasa WiFi Socket'[3];
    }
}