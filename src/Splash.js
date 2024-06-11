import { StyleSheet,Text,View,Image,StatusBar,ImageBackground } from "react-native"
import React, { useEffect } from "react"

const Splash =(props)=>{

 

    useEffect(()=>{


        const getData = async () => {
            try {
              const value = null;
              
             // console.log(value);
              if (value !== null) {
                
                props.navigation.replace("MyDrawer");
              }
              else{
             
               props.navigation.replace("MyDrawer");
              }
            } catch (e) {
              // error reading value
            }
          };
    
    
    setTimeout(()=>{
    
        getData();
        //  props.navigation.navigate("AuthenticationScreen");
    
    },1000)
    
    },[])


    
return(
  <ImageBackground source={require('../assets/tumblr_mjqvt76pv71s8bii2o1_400.gif')} style={{backgroundColor:"#000000",flex:1,justifyContent:"center",alignItems:"center"}}>
    
       <StatusBar backgroundColor="#000" barStyle="dark-content"/>
       <Image source={require('../assets/giphy.gif')} style={{width:200,height:200}}/>
       <Image source={require('../assets/logo.png')} style={{width:300,height:300}}/>
       <Image source={require('../assets/giphy.gif')} style={{width:200,height:200}}/>
     
    </ImageBackground>
)
}

export default Splash;

const styles  = StyleSheet.create({});