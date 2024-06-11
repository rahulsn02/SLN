import React,{useState,useEffect} from "react";
import {View,Text} from 'react-native';


const Counter = (props)=>{
    const [timeLeft, setTimeLeft] = useState(props.total_sec);
    const [timeUnits, setTimeUnits] = useState({ 
        hours: 0, 
        minutes: 0, 
        seconds: 0, 
    }); 

  

    

    useEffect(() => {



        const calculateTimeUnits = (seconds) => { 
            
            setTimeUnits({ 
            
                hours: Math.floor( 
                    (seconds % (24 * 60 * 60)) / (60 * 60) 
                ), 
                minutes: Math.floor( 
                    (seconds % (60 * 60)) / 60 
                ), 
                seconds: seconds % 60, 
            }); 
        };


      // exit early when we reach 0
      if (!timeLeft) return;
  
      // save intervalId to clear the interval when the
      // component re-renders
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);

        
        if (timeLeft <= 0) { 
            // Countdown finished 
            calculateTimeUnits(0); 
        } else { 
            calculateTimeUnits(timeLeft); 
        } 
    

      }, 1000);
  
      // clear interval on re-render to avoid memory leaks
      return () => clearInterval(intervalId);
      // add timeLeft as a dependency to re-rerun the effect
      // when we update it
    }, [timeLeft]);

    







  return (
    <View style={{flexDirection:'row',marginLeft:3,marginRight:3}}>
      <Text style={{color:'#008000'}}>{timeUnits.hours}:</Text><Text style={{color:'#008000'}}>{timeUnits.minutes}:</Text><Text style={{color:'#008000'}}>{timeUnits.seconds}</Text>
    </View>
  );




}

export default Counter;