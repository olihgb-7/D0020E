package EntertainmentSystemModel {
	
	package BehavioralDefenitions {
		
		package UseCases {
			
			/*
			 * !!!!!NOT IMPLEMENTED!!!!!
			 */
		}
		
		package Activities{ 
			
			part def 'Remote Control';
			action def 'HomeEntertainmentSystemActions';	
			
			action display; 		
			
			action 'Home Entertainment System Actions' : 'HomeEntertainmentSystemActions' {
				
				action 'sendTVPowerState(false)' accept rc : 'Remote Control';
				then action 'Smart TV Power Off' {
					in item 'powerStateCmd';					
				}
				
				
				action 'sendTVPowerState(true)' accept rc : 'Remote Control';
				
				then action 'Smart TV Power On' {
					in item 'remoteControlSignal' = 'sendTVPowerState(true)'::rc;
					out item 'powerStateCmd';
				}
				
				then merge mergeDisplayVideo;
				
				then action 'Display Video' {
					in item 'powerStateCmd' stream from 'Smart TV Power On'::'powerStateCmd';
					in item 'showVideoCmd' stream from 'Change Video Source'::'showVideoCmd';
					out video; 
				}
				
				
				action 'sendChangeVideoSource()' accept rc : 'Remote Control';
				
				then merge mergeChangeVideoSource;
				
				then action 'Change Video Source' {
					in item 'remoteControlSignal' = 'sendChangeVideoSource()'::rc;
					out item 'showVideoCmd';
				}
				
				then mergeDisplayVideo;
				
				
				action 'sendConfirm()' accept rc : 'Remote Control';
				then mergeChangeVideoSource;
				
				
				then send 'Display Video'::video to display;
			}
		}
		
		package Sequences{ 
			
			
		}
		
		package States {

			package 'SmartTV State' {
				
				attribute def 'Turn on Smart TV';
				attribute def 'Play video';
				attribute def 'Pause video';
				attribute def 'Resume video';
				attribute def 'Select Audio Source';
				attribute def 'Select Video Source';
				attribute def 'Stop video';
				attribute def 'Display audio source';
				attribute def 'Display video source';
				attribute def 'Turn off Smart TV';
				
				state def TVState;
					
				state tvState : TVState  {
						
					entry; then off;
					
					state off;
					accept 'Turn on Smart TV' 
						then 'idle';
						
					state 'idle';
					accept 'Play video'
						then 'play';
					accept 'Select Audio Source'
						then 'audio source selection';
					accept 'Select Video Source'
						then 'video source selection';
					accept 'Turn off Smart TV'
						then off;
							
					state 'play';
					accept 'Pause video'
						then 'pause';
					accept 'Stop video'
						then 'idle';
					
					state 'pause';
					accept 'Resume video'
						then 'play';
					
					state 'audio source selection' {
						entry action 'Display different Audio Sources' {}
						do action 'Confirm Audio Source' {}
						exit action 'Return with correct Audio Source' {}
					}
					accept 'Display audio source'
						then 'idle';
					
					state 'video source selection' {
						entry action 'Display different Video Sources' {}
						do action 'Confirm Video Source' {}
						exit action 'Return with correct Video Source' {}
					}
					accept 'Display video source'
						then 'idle'; 					// CLICK HERE TO SEE STATE DIAGRAM

				}
			}		
			
			package 'Audio System State' {

				attribute def 'Turn on Audio System';
				attribute def 'Decrease volume';
				attribute def 'Increase volume';
				attribute def 'Audio changed';
				attribute def 'Turn off Audio System';
				
				state def AudioState;
					
				state audioState : AudioState {
						
					entry; then off;
					
					state off;
					accept 'Turn on Audio System' 
						then 'generate audio';
						
					state 'generate audio';
					accept 'Decrease volume'
						then 'decrease audio';
					accept 'Increase volume'
						then 'increase audio';
					accept 'Turn off Audio System'
						then off;
							
							
					state 'decrease audio';
					accept 'Audio changed'
						then 'generate audio';
					
					state 'increase audio';
					accept 'Audio changed'
						then 'generate audio'; 			// CLICK HERE TO SEE STATE DIAGRAM
				}
			}
		}
	}

	package ComponentDefenitions {
		
		package BlockDefinition {
			
			attribute def Constraints;
			
			// HomeEntertainmentSystem
			attribute tvConnected : Constraints;
			attribute audioConnected : Constraints;
			attribute remoteResponding : Constraints;
			
			// AudioSystem
			attribute speakerConnected : Constraints;
			attribute subwooferConnected : Constraints;
			
			// RemoteControl
			attribute hasBatteries : Constraints;
			
			// powerConnected
			attribute powerConnected : Constraints;
			
			
			
			part def SmartTV;
			part def AudioSystem;
			part def RemoteControl;
			part def Subwoofer;
			part def FullRangeSpeaker;
			
			part def HomeEntertainmentSystem {
				
				attribute redefines tvConnected = true;
				attribute redefines audioConnected = true;
				attribute redefines remoteResponding = true;
				
				part tv : SmartTV {attribute redefines powerConnected = true;}
				part audio : AudioSystem {

					attribute redefines powerConnected = true;
					attribute redefines speakerConnected = true;
					attribute redefines subwooferConnected = true;
					
					part subwoofer : Subwoofer{attribute redefines powerConnected = true;}
					part speaker : FullRangeSpeaker{attribute redefines powerConnected = true;}
				}
				
				part remote : RemoteControl{attribute redefines hasBatteries = true;}
			}
		}
		
		package InternalBlockDefinition;
	}

	package Requirements {
		
		requirement def 'Home Entertainment System' {
			
			requirement def 'Remote Control Response' {
				
				doc /* The remote control shall respond correctly with the connected systems */
				
				requirement def 'Remote Control Power' {
				
					doc /* The remote control shall be powered with batteries */
				}	
			}
			
			requirement def 'Setup Of Video Source' {
				
				doc /* The Smart TV shall be setup for the correct Video Source depending on video connection */
			}
			
			requirement def 'Setup Of Audio Source' {
				
				doc /* The Smart TV shall be setup for the correct Audio Source depending on audio connection */
			}
			
			requirement def 'Systems Powered' {
				
				doc /* Hardware shall be powered on */
				
				requirement def 'Power Supply Connection' {
				
				
				}
			}
			
			requirement def 'Smart TV Connection' {
				
				requirement def 'Audio System Connection' {
					
					doc /* The Audio System shall connect via either analog or digital audio port to the Smart TV */
				
					requirement def 'Speaker Connection' {
				
						doc /* The speaker(s) shall connect  via the AUDIO ports on the Audio System */
					}
					
					requirement def 'Subwoofer Connection' {
				
						doc /* The subwoofer shall connect via the SW port on the Audio System */
					}
				
				}
				
				requirement def 'Video Streaming Connection' {
				
					doc /* The Smart TV shall connect via some video streaming source */
				}
			}
		}
	}
	
	package Parametrics {
		
		
	}
	
}