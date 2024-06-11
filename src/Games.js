import React,{useState,useEffect} from "react";
import {View,Text,TouchableOpacity,ImageBackground,FlatList,StatusBar,StyleSheet,Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import EvilIcons from 'react-native-vector-icons/Feather';
import Sound from "react-native-sound";
import Counter from "./Counter";
import {formatAMPM,convertTime12to24,diffTime} from './ImpFunction';
import axios from "axios";
import { base_url } from "../constant";


const Games = (props)=>{

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
    const {game} = props.route.params;
    
    const close_time = game.close_time;
    const open_time = game.open_time;
    const market_id = game.id;
    //-------function to get current time stamp in local time string-----
  
    //------function to conver 12 hour time into 24 hour time
    

//--------------function to get difference between timings----
    
  const current = formatAMPM(new Date);   
  const closetime_24 = convertTime12to24(close_time)
  const current_24 = convertTime12to24(current); 





  const diff_time = diffTime(current_24,closetime_24)
  const total_sec = (diff_time[0]*60*60+diff_time[1]*60)

  console.log(total_sec);

    const [data,setData] = useState()
    
    
    useEffect(()=>{
      axios.get(base_url+"/getGames").then((response)=>{
      
        setData(response.data);
      
      }).catch((error)=>{});
      
      
      },[])

    



return(
    <View style={{flex:1}}>
    <StatusBar backgroundColor="#000" barStyle="light-content"/>
           <ImageBackground source={require('../assets/bg.png')} style={{flex:1}}>
     <View style={{height:50}}>
     <ImageBackground source={require('../assets/strip2.png')} style={{flex:1,justifyContent:'center',flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:5}}>
            <View><LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}}  colors={['#e3dbbd', '#e3dbbd', '#e3dbbd']} style={{height:30,width:30,borderRadius:15,justifyContent:'center',alignItems:'center'}}><TouchableOpacity onPress={()=>{playSound(); props.navigation.goBack(null)}}><Text style={{color:'#fff',padding:5}}><EvilIcons name="arrow-left" size={20} color="#000" /></Text></TouchableOpacity></LinearGradient></View>
            <View><LinearGradient colors={['#B68D40','#e3dbbd', '#B68D40','#B68D40']}  style={{height:50,width:150,borderRadius:0,justifyContent:'center',alignItems:'center',borderBottomLeftRadius:10,borderBottomRightRadius:10}}><Text style={{color:'#000',fontSize:18,fontWeight:600,flexDirection:'row',fontFamily: 'Cochin'}}>{game.title}</Text></LinearGradient></View>
            <View></View>
     </ImageBackground>
     </View>

     <View style={{flex:1,marginTop:20,padding:10}}>

<FlatList data={data}  showsVerticalScrollIndicator={false}  renderItem={({item,index})=>{


return(
item.id==6||item.id==7?<TouchableOpacity  onPress={()=>{playSound(); current>open_time? '' : props.navigation.navigate("GameBid",{game:item,open_time:open_time,close_time:close_time,market_id:market_id})}}><View style={{height:90,borderBottomWidth:1,borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1, borderColor:'#B68D40',marginBottom:20,borderBottomLeftRadius:20,borderBottomRightRadius:20, opacity:current>open_time?0.3:1}}>
<LinearGradient   colors={['#B68D40','#e3dbbd', '#B68D40','#B68D40']} style={{height:25,justifyContent:'center',alignItems:'center'}}><Text style={{color:'#000',fontSize:18,fontWeight:600}}>{item.bid_rate} Ka {item.win_rate}</Text></LinearGradient>
     <View style={{justifyContent:'space-between',flexDirection:'row',height:50,marginBottom:2,backgroundColor:'#000'}}>
     <View style={{justifyContent:'center',alignItems:'center',width:'30%'}}><Image source={require('../assets/card.jpg')} style={{width:20,height:30}}/></View>
     <View style={{justifyContent:'center',alignItems:'center'}}><Text style={{color:'#fff',fontSize:20,fontFamily:'serif',fontWeight:700}}>{item.title}</Text>
     <View style={{flexDirection:'row'}}>
      <Text style={{color:'#fff'}}>Closes in</Text>
       <Counter total_sec={total_sec}/>
      <Text style={{color:'#fff'}}>hours</Text>
      </View>
     </View>
     <View style={{justifyContent:'center',alignItems:'center',width:'20%'}}><Image source={require('../assets/arrow.png')} style={{width:40,height:40}}/></View>
    </View>
</View></TouchableOpacity>:
<TouchableOpacity onPress={()=>{playSound(); props.navigation.navigate("GameBid",{game:item,open_time:open_time,close_time:close_time,market_id:market_id})}}><View style={{height:90,borderBottomWidth:1,borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1, borderColor:'#B68D40',marginBottom:20,borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
<LinearGradient   colors={['#B68D40','#e3dbbd', '#B68D40','#B68D40']} style={{height:25,justifyContent:'center',alignItems:'center'}}><Text style={{color:'#000',fontSize:18,fontWeight:600}}>{item.bid_rate} Ka {item.win_rate}</Text></LinearGradient>
     <View style={{justifyContent:'space-between',flexDirection:'row',height:50,marginBottom:2,backgroundColor:'#000'}}>
     <View style={{justifyContent:'center',alignItems:'center',width:'30%'}}><Image source={require('../assets/card.jpg')} style={{width:20,height:30}}/></View>
     <View style={{justifyContent:'center',alignItems:'center'}}><Text style={{color:'#fff',fontSize:20,fontFamily:'serif',fontWeight:700}}>{item.title}</Text>
     <View style={{flexDirection:'row'}}>
      <Text style={{color:'#fff'}}>Closes in</Text>
       <Counter total_sec={total_sec}/>
      <Text style={{color:'#fff'}}>hours</Text>
      </View>
     </View>
     <View style={{justifyContent:'center',alignItems:'center',width:'20%'}}><Image source={require('../assets/arrow.png')} style={{width:40,height:40}}/></View>
    </View>
</View></TouchableOpacity>
);


}}/>

</View>


     </ImageBackground>
     </View>
)


}

export default Games;

const styles = StyleSheet.create({
    container:{shadowColor: '#B68D40',
    width: '100%',
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    elevation: 7,
    //ios specific
    shadowOffset: {width:2,height:1},
    shadowRadius: 3,
    shadowOpacity: 0.5}
});