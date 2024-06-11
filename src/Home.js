import React,{useState,useEffect} from "react";
import {View,Text,TouchableOpacity,ImageBackground,FlatList,StatusBar,Image,Vibration} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Sound from "react-native-sound";
import { base_url } from "../constant";
import axios from "axios";
import {formatAMPM,convertTime12to24,diffTime} from './ImpFunction';
import MarketList from "./MarketList";
import Payment from "./Payment";
const Home = (props)=>{

  const [marketData,setMarketData] = useState();
  const [availablePoint,setAvailablePoints]= useState(10);

    

const playSound = ()=>{

    var whoosh = new Sound('click.mp3', Sound.MAIN_BUNDLE, (error) => {
       if (error) {
         console.log('failed to load the sound', error);
         return;
       }
       // loaded successfully
       console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
     
       // Play the sound with an onEnd callback
       whoosh.play((success) => {
         if (success) {
           console.log('successfully finished playing');
         } else {
           console.log('playback failed due to audio decoding errors');
         }
       });
     }); 
 }

const [data,setData] = useState(['MADHUR MORNING','SHRIDEVI','TIME BAZAR','MADHUR DAY','MILAN DAY'])


useEffect(()=>{
axios.get(base_url+"/getMarket").then((response)=>{

  setMarketData(response.data);

}).catch((error)=>{});


},[])

//console.log(marketData);





return(
    <View style={{flex:1}}>
        <StatusBar backgroundColor="#000" barStyle="light-content"/>
               <ImageBackground source={require('../assets/bg.png')} style={{flex:1}}>

         <View style={{height:50}}>
         <ImageBackground source={require('../assets/strip2.png')} style={{flex:1,justifyContent:'center',flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:5}}>

                <View><LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}}  colors={['#e3dbbd', '#e3dbbd', '#e3dbbd']} style={{height:40,width:40,borderRadius:20,justifyContent:'center',alignItems:'center'}}><TouchableOpacity onPress={()=>props.navigation.openDrawer()}><Text style={{color:'#fff',padding:5}}><Icon  name='navicon' size={20} color='#122620'/></Text></TouchableOpacity></LinearGradient></View>
                <View><LinearGradient colors={['#B68D40', '#e3dbbd', '#B68D40','#B68D40']}  style={{height:50,width:150,borderRadius:0,justifyContent:'center',alignItems:'center',borderBottomLeftRadius:10,borderBottomRightRadius:10}}><Text style={{color:'#000',fontSize:18,fontWeight:600,fontFamily: 'Cochin'}}>Home</Text></LinearGradient></View>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#2F4F4F',borderRadius:10,padding:2}}>
                     <Image source={require('../assets/dollar2.png')} style={{width:20,height:20}}/>
                    <Text style={{color:'#FFF',padding:2}}>{availablePoint}</Text>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}}  colors={['#06FE5F','#06FE5F', '#3E9800', '#06FE5F', '#06FE5F']} style={{height:20,width:20,borderRadius:10,justifyContent:'center',alignItems:'center'}}><TouchableOpacity onPress={()=>{props.navigation.navigate("Payment")}}><Icon  name='plus' size={16} color='#FFF'/></TouchableOpacity></LinearGradient>
                    
                    </View>

         </ImageBackground>
         </View>

         <View style={{width:'100%',height:150}}>
         <ImageBackground source={require('../assets/home2.jpg')} style={{flex:1,padding:10}}>
         </ImageBackground>
         </View>
         <View style={{flex:1,marginTop:5}}>

         <FlatList data={marketData}  showsVerticalScrollIndicator={false}  renderItem={({item,index})=>{
     
      
  const current = formatAMPM(new Date);   
  const closetime_24 = convertTime12to24(item.close_time);
  const current_24 = convertTime12to24(current); 

     return(

        <View style={{height:120,borderBottomWidth:1,borderTopWidth:1, borderColor:'#B68D40',justifyContent:'space-between',flexDirection:'row'}}>
            <View></View>
            <View style={{justifyContent:'center',alignItems:'center'}}>

            <MarketList item={item}  nav={props.navigation}/>

            
                <View style={{flexDirection:'row'}}><Text style={{color:'#fff'}}><Icon  name='clock-o' size={16} color='#FFF'/> {item.open_time}-<Icon  name='clock-o' size={16} color='#FFF'/> {item.close_time}</Text></View>
                <View style={{flexDirection:'row'}}>{current_24>closetime_24? <LinearGradient colors={['#880808', '#880808', '#880808']} style={{width:80,height:30,borderRadius:10,marginTop:5,justifyContent:'center',alignItems:'center'}}><TouchableOpacity onPress={()=>{ Vibration.vibrate(200);}}><Text style={{color:'#fff',fontWeight:600}}>Closed </Text></TouchableOpacity></LinearGradient> : <LinearGradient colors={['#B68D40', '#DCE9D3', '#B68D40']} style={{width:80,height:30,borderRadius:10,marginTop:5,justifyContent:'center',alignItems:'center'}}><TouchableOpacity onPress={()=>{ playSound(); props.navigation.navigate("Games",{game:item})}}><Text style={{color:'#880808',fontWeight:600}}>Play <Icon  name='play' color='#880808'/></Text></TouchableOpacity></LinearGradient>}</View>
            </View>
            <View style={{justifyContent:'center',alignItems:'center'}}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}}  colors={['#122620', '#FFFFFF', '#122620']} style={{width:80,height:50,borderRadius:10,marginTop:5,justifyContent:'center',alignItems:'center'}}><TouchableOpacity><Text style={{color:'#000',fontWeight:600}}>  Panel</Text></TouchableOpacity></LinearGradient>
            </View>
        </View>
     );


    }}/>

         </View>


      
        </ImageBackground>
    </View>
)


}

export default Home