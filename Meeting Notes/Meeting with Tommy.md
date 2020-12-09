# Meeting with Tommy 

Date: 2020-12-09 13:00  
Participants: Oliver Högberg, Axel Kärnebro, Magnus Stenfeldt, Emma Carlsson, Tommy Andersson

## Axels anteckningar: 

Gick frammåt, Jesper fick dålig vägledning, Tommy kom till den nivå där han började implementera, Jesper och Tommy tolkade dokumentationen olika, Jesper sa en Part kan inte vara en del för sig utan måste vara del av ett block, Tommy tyckte att Part kan vara en egen sak också. När Tommy kom till det grafiska och det funkade inte längre lika bra. Tommy är inte nöjd med sin kod.

Körde fast specifikt med det grafiska då han inte kunde bolla idéer med någon annan. Största varför man körde fast är, Tommy läste Jespers anteckningar och tyckte att Jesper inte riktigt visste vad han skulle göra eller hur han skulle strukturera det och Tommy var tvungen att bygga vidare på Jespers arbete. Jan vill att pilar ska följa UML. Kan kanske behålla referenser och definitioner. Importer är ett problem som är svårlöst. Tommys uppdrag var att få Jespers arbete att funka med Eclipse. Problemet med grafiska representationen var att den var väldigt svår att förstå till en början, att Parts var definierade som en subgrupp istället för en egen grupp. Tommy gav dem en del av en del som gav dem en position, och blocken började bete sig problematiskt efter en viss nivå av rekursion.

## Olivers anteckningar: 

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

## Emmas anteckningar: 
Jesper hade ingen riktig plan, visste inte vad han skulle göra, hann inte planera och började koda för tidigt. 
Ett stort problem var att Jesper hade tolkat SysML annorlunda än hur Tommy trodde det skulle va. 
Jan vill ha mer som UML så man kan se tex dependency. Hitta nya parser. Går nog att använda hans definitioner. 
Hade problem med import pga javascript, användare måste godkänna importer, Tex SI-enheter. 
Svårt att förstå grafiska representationen. Ville ha ett träd men då hamnade inte allt på rätt nivå. 
Hitta bättre bibliotek än -?-. Så enkelt så möjligt, kanske för jobbigt då med att dra o släppa block. 
Mappstrukturen är helt okej, fler klasser hade behövts, stycka upp metoder o gör mer generella. 

Det viktigaste för oss och vårt arbete är att få till en bra plan. 

