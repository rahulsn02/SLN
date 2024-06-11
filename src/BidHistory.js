import React,{useState,useEffect} from "react";
import {View,Text,TouchableOpacity,ImageBackground,FlatList,StatusBar,Image,Vibration} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Sound from "react-native-sound";
import axios from "axios";
import { base_url } from "../constant";
import EvilIcons from 'react-native-vector-icons/Feather';


const BidHistory = (props)=>{

const [history,setHistory] = useState();

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

useEffect(()=>{

  props.navigation.addListener('focus', () => {
    axios.get(base_url+'/userBidHistory',{params:{user_id:1}}).then((response)=>{

      setHistory(response.data);
  
  }).catch((err)=>{});
  });

axios.get(base_url+'/userBidHistory',{params:{user_id:1}}).then((response)=>{

    setHistory(response.data);

}).catch((err)=>{});

},[]);


//console.log(history);




return(
    <View style={{flex:1}}>
    <StatusBar backgroundColor="#000" barStyle="light-content"/>
           <ImageBackground source={require('../assets/bg.png')} style={{flex:1}}>

     <View style={{height:50}}>
     <ImageBackground source={require('../assets/strip2.png')} style={{flex:1,justifyContent:'center',flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:5}}>

             <View><LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}}  colors={['#e3dbbd', '#e3dbbd', '#e3dbbd']} style={{height:30,width:30,borderRadius:15,justifyContent:'center',alignItems:'center'}}><TouchableOpacity onPress={()=>{playSound(); props.navigation.goBack(null)}}><Text style={{color:'#fff',padding:5}}><EvilIcons name="arrow-left" size={20} color="#000" /></Text></TouchableOpacity></LinearGradient></View>
            <View><LinearGradient colors={['#B68D40', '#e3dbbd', '#B68D40','#B68D40']}  style={{height:50,width:150,borderRadius:0,justifyContent:'center',alignItems:'center',borderBottomLeftRadius:10,borderBottomRightRadius:10}}><Text style={{color:'#000',fontSize:18,fontWeight:600,fontFamily: 'Cochin'}}>Bid History</Text></LinearGradient></View>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#2F4F4F',borderRadius:10,padding:2}}>
             
                </View>

     </ImageBackground>
     </View>

     <View style={{flex:1,marginTop:5}}>

<FlatList data={history}  showsVerticalScrollIndicator={false}  renderItem={({item,index})=>{


return(

<View style={{height:80,borderBottomWidth:1,borderTopWidth:1,justifyContent:'center', borderColor:'#B68D40',backgroundColor:'#000'}}>
<View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
    <View style={{width:'40%'}}>
        <Text style={{color:'#fff'}}>{item.market_title}</Text>
         <Text style={{color:'#fff'}}>{item.title}</Text>
            {item.game_id==1?<View>{item.bid_type==0?<Text style={{color:'orange'}}>(Open-{item.digit})</Text>:<Text style={{color:'orange'}}>(Close-{item.digit})</Text>}</View>:''}
            {item.game_id==2?<View><Text style={{color:'orange'}}>({item.digit})</Text></View>:''}
            {item.game_id==3 ||item.game_id==4 || item.game_id==5 ?<View>{item.bid_type==0?<Text style={{color:'orange'}}>(Open-{item.patti})</Text>:<Text style={{color:'orange'}}>(Close-{item.patti})</Text>}</View>:''}
            {item.game_id==6?<View style={{flexDirection:'row'}}>{item.bid_type==0?<Text style={{color:'orange'}}>(Open-{item.digit} || Close-{item.patti})</Text>:<Text style={{color:'orange'}}>(Close-{item.digit} || Open- {item.patti})</Text>}</View>:''}
            {item.game_id==7?<View style={{flexDirection:'row'}}><Text style={{color:'orange'}}>(Open-{item.patti} || </Text><Text style={{color:'orange'}}>Close-{item.close_patti})</Text></View>:''}

    </View>
    <View>
        <Text style={{color:'#fff'}}>{item.date}</Text>
        <Text style={{color:'#fff'}}>{item.time}</Text>
    </View>
    
    <View style={{justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'green'}}><Icon name="rupee" size={16}/> {item.bid_value}</Text>
        {item.status==0? <Text style={{color:'#fff'}}>Pendding</Text>:<Text></Text>}
    </View>
</View>


</View>
);


}}/>

</View>



     </ImageBackground>
     </View>
)


}

export default BidHistory;