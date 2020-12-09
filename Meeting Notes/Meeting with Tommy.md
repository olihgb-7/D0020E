# Meeting with Tommy 

Date: 2020-12-09 13:00  
Participants: Oliver Högberg, Axel Kärnebro, Magnus Stenfeldt, Emma Carlsson, Tommy Andersson

Tog lång tid att sätta sig in och förstå vad projektet riktigt skulle omfatta
Man hade tolkat SysML dokumentationen på olika sätt

Enligt Tommy så sa Jesper: En part kan inte vara en del för sig, en part måste vara en del av ett block
Tommy försökte ordna om definitionerna som lagts in vilket ledde till att det grafiska som redan var implementerat inte lirade med det

Mycket av problemet verkar liga i tolkningen av SysML dokumentationen
Jan menar att nuvarande lösningen inte är skalbar

Tommy menar att man körde fast på det som Jesper byggde på då Jesper kanske inte riktigt viste vad som skulle göras
Tommy försökte planera vad som skulle göras medas som man jobbade vidare på Jespers lösning

Tommy menar att Jan tryckte på att pilarna är mer som UML standard (typ dependencies etc)

Eventuellt implementera med redan färdiga parsers istället för parsningnen som är skriven av Jesper
Vad tycker Tommy att vi kan återanvända: Tommy tycker att definitionerna är ganska bra gjorda

Referenser funkerade inte riktigt
Tommy tänkte först att fixa imports genom att ladda upp filerna direkt via javascript dock går detta inte eftersom det är sandboxat och vi inte kommer åt filsystemet, men en ev lösning är att ladda upp filer via en webbserver. Imports är nog förmodligen inte högt på priolistan

Tommy upfattade att sin uppgift var att få Eclipse och och Jespers lösning att funka. Det var detta som Tommy fokuserade på 

Tog lång tid att förstå den grafisk representationen
Problem när Tommy skulle börja definiera grafik utifrån sina egna nya definitioner av SysML syntaxen
