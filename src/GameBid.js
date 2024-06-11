import React,{useState} from "react";
import {View,Text,TouchableOpacity,ImageBackground,Alert,StatusBar,Image,TextInput,StyleSheet,Vibration,Audio} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import EvilIcons from 'react-native-vector-icons/Feather';
import Sound from "react-native-sound";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import {formatAMPM,convertTime12to24,diffTime} from './ImpFunction';
import axios from "axios";
import { base_url } from "../constant";



const GameBid = (props)=>{


   const today = new Date();
   const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate();
let tdd = today.getDate()+1
if (dd < 10) dd = '0' + dd;
if (tdd < 10) tdd = '0' + tdd;

if (mm < 10) mm = '0' + mm;
    const todayDate = yyyy + '-' + mm + '-' +dd ;
    const {game,open_time,close_time,market_id} = props.route.params;


    console.log(game);




    const currentDate = new Date();
    const timestamp = currentDate.toLocaleTimeString();



 const current = formatAMPM(new Date);   
  const opentime_24 = convertTime12to24(open_time);
  const current_24 = convertTime12to24(current); 



   const [bidType,setBidType] = useState(2);
    const [patti,setPatti] = useState();
    const [closePatti,setClosePatti] = useState();
    const [digit,setDigit] = useState();
    const [point,setPoint]=useState();
    const [digitBorderColor,setdigitBorderColor] = useState(1);
    const [pannaBorderColor,setpannaBorderColor] = useState(1);
    const [closepannaBorderColor,setclosepannaBorderColor] = useState(1);
    const [pointBorderColor,setPointBorderColor] = useState(1)
    const [activeOpen,setActiveOpen] = useState(1);
    const [activeClose,setActiveClose] = useState(1);
    const [availablePoint,setAvailablePoints]= useState(10);
    const [activeBidTypeLabel,setActiveBidTypeLabel] = useState("OPEN");
    const [reverseActiveLabel,setReverseActiveLabel] = useState();

    const [validationCheck,setValidationCheck] = useState(0)

    const gameDigitData={1:[1,2,3,4,5,6,7,8,9,0],2:[11,22,33,44,55,66,77,88,89],3:
      
      
      [128,129,120,130,140,123,124,125,126,127,
        137,	138,	139,	149,	159,	150,	160,	134,	135,	136,
        146,	147,	148,	158,	168,	169,	179,	170,	180,	145,
        236,	156,	157,	167,	230,	178,	250,	189,	234,	190,
        245,	237,	238,	239,	249,	240,	269,	260,	270,	235,
        290,	246,	247,	248,	258,	259,	278,	279,	289,	280,
        380,	345,	256,	257,	267,	268,	340,	350,	360,	370,
        470,	390,	346,	347,	348,	349,	359,	369,	379,	389,
        489,	480,	490,	356,	357,	358,	368,	378,	450,	460,
        560,	570,	580,	590,	456,	367,	458,	459,	469,	479,
        579,	589,	670,	680,	690,	457,	467,	468,	478,	569,
        678,	679,	689,	789,	780,	790,	890,	567,	568,	578
       ],4:[119,	110,	166,	112,113,	114,	115,	116	,117,	118,
            155,	228,	229,	220,	122,	277,	133,	224,	144,	226,
            100,	255,	355,	266,	177,	330,	188,	233,	199,	244,
            227,	200,	300,	338,	366,	448,    223,	288,	225,	299,
            344,	336,	337,	446,	339,	466,	377,	440,	388,	334,
            399,	499,	445,	455,	447,	556,	449,	477,	559,	488,
            335,	688,	599,	400,	500,	600,	557,	558,	577,	550,
            588,	660,	779,	699,	799,	880,	566,	800,	667,	677,
            669,	778,	788,	770,	889,	899,	700,	990,	900	,668],
         5:[111,222,333,444,555,666,777,888,999],
         6:[1,2,3,4,5,6,7,8,9,0],
         7:[128,129,120,130,140,123,124,125,126,127,
            137,	138,	139,	149,	159,	150,	160,	134,	135,	136,
            146,	147,	148,	158,	168,	169,	179,	170,	180,	145,
            236,	156,	157,	167,	230,	178,	250,	189,	234,	190,
            245,	237,	238,	239,	249,	240,	269,	260,	270,	235,
            290,	246,	247,	248,	258,	259,	278,	279,	289,	280,
            380,	345,	256,	257,	267,	268,	340,	350,	360,	370,
            470,	390,	346,	347,	348,	349,	359,	369,	379,	389,
            489,	480,	490,	356,	357,	358,	368,	378,	450,	460,
            560,	570,	580,	590,	456,	367,	458,	459,	469,	479,
            579,	589,	670,	680,	690,	457,	467,	468,	478,	569,
            678,	679,	689,	789,	780,	790,	890,	567,	568,	578,
            119,	110,	166,	112,113,	114,	115,	116	,117,	118,
            155,	228,	229,	220,	122,	277,	133,	224,	144,	226,
            100,	255,	355,	266,	177,	330,	188,	233,	199,	244,
            227,	200,	300,	338,	366,	448,    223,	288,	225,	299,
            344,	336,	337,	446,	339,	466,	377,	440,	388,	334,
            399,	499,	445,	455,	447,	556,	449,	477,	559,	488,
            335,	688,	599,	400,	500,	600,	557,	558,	577,	550,
            588,	660,	779,	699,	799,	880,	566,	800,	667,	677,
            669,	778,	788,	770,	889,	899,	700,	990,	900	,668,
            111,222,333,444,555,666,777,888,999]
         
         };

 

const playSound = ()=>{


   var whoosh = new Sound('click.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
       // console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      //console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
    
      // Play the sound with an onEnd callback
      whoosh.play((success) => {
        if (success) {
        //  console.log('successfully finished playing');
        } else {
        //  console.log('playback failed due to audio decoding errors');
        }
      });
    });

}





         const validity_check =()=>{

            playSound()
       
            const res = gameDigitData[game.game_type].includes(parseInt(patti));
            const digitres = gameDigitData[game.game_type].includes(parseInt(digit));



      if(game.game_type==1){

         if(digitres==true){
            if(bidType!=2){
               setdigitBorderColor(1);
               setValidationCheck(1)

            }else{
               Alert.alert("Select Bid Type","Please Select Possible Bid Type");
            }
            }else
            {
               setdigitBorderColor(0);
            }
         }


         if(game.game_type==2){

            if(digitres==true){
   
                  setdigitBorderColor(1);
                  setValidationCheck(1)
               }else
               {
                  setdigitBorderColor(0);
               }
            }


      if(game.game_type==6){

         if(gameDigitData[1].includes(parseInt(digit))){

            setdigitBorderColor(1);

         }else{
            setdigitBorderColor(0);
         }


       if(gameDigitData[7].includes(parseInt(patti))){

      
         setpannaBorderColor(1)
      

       }else{
     
         setpannaBorderColor(0)
       }

      if(gameDigitData[1].includes(parseInt(digit))&&gameDigitData[7].includes(parseInt(patti))){
         if(bidType!=2){
            setValidationCheck(1);
      }else{
         Alert.alert("Select Bid Type","Please Select Possible Bid Type");
      }
     
      }else{
         setValidationCheck(0) 
      }


      }   


      if(game.game_type==3 || game.game_type==4 ||game.game_type==5 ){
         if(res==true){
          

            if(bidType!=2){

           
               setValidationCheck(1);
            setpannaBorderColor(1);
       
         }else{
            Alert.alert("Select Bid Type","Please Select Possible Bid Type");
         }
         }else{
            setpannaBorderColor(0); 
         }
      }

      if(game.game_type==7){
         if(gameDigitData[7].includes(parseInt(patti))){      
            setpannaBorderColor(1)
           }else{
        
            setpannaBorderColor(0)
          }

          if(gameDigitData[7].includes(parseInt(closePatti))){
              setclosepannaBorderColor(1)
          }else{
        
            setclosepannaBorderColor(0)
          }
          if(gameDigitData[7].includes(parseInt(patti))&&gameDigitData[7].includes(parseInt(closePatti))){
            setValidationCheck(1)
         }else{
            setValidationCheck(0) 
         }

         
      }



          
           if(validationCheck==1){
      

   


            if(point!=0&&availablePoint>=point){
               setPointBorderColor(1)

        
               
             



            }else{
               setPointBorderColor(0);
               Vibration.vibrate(200);
               if(parseInt(point)>0){
                 // console.log('condition statisfied');
               Dialog.show({
                  type: ALERT_TYPE.DANGER,
                  title: 'Insufficient Balance',
                  textBody: 'Add Balance to play game',
                  button: 'close',
                })
               }
            }



           }else{
           // Vibration.vibrate(200);
           }


         }


    


         const place_bid=()=>{

            const placeBidData = {
               user_id:1,
               market_id:market_id,
               game_id:game.id,
               bidType:bidType,
               patti:patti,
               digit:digit,
               closePatti:closePatti,
               bidValue:point,
               time:timestamp,
               date:todayDate,
               status:0
             }


      axios.post(base_url+'/placeBid',placeBidData).then((response)=>{

         
if(response.data==1){
 
props.navigation.navigate("BidHistory");

}

      }).catch((err)=>{

      });

            //  console.log('play here.........')
             // console.log(placeBidData);

         }




return(
   <AlertNotificationRoot>
    <View style={{flex:1}}>
    <StatusBar backgroundColor="#000" barStyle="light-content"/>
           <ImageBackground source={require('../assets/bg.png')} style={{flex:1}}>
     <View style={{height:50}}>
     <ImageBackground source={require('../assets/strip2.png')} style={{flex:1,justifyContent:'center',flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:5}}>
            <View><LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}}  colors={['#e3dbbd', '#e3dbbd', '#e3dbbd']} style={{height:30,width:30,borderRadius:15,justifyContent:'center',alignItems:'center'}}><TouchableOpacity onPress={()=>{playSound(); props.navigation.goBack(null)}}><Text style={{color:'#fff',padding:5}}><EvilIcons name="arrow-left" size={20} color="#000" /></Text></TouchableOpacity></LinearGradient></View>
            <View><LinearGradient colors={['#B68D40','#e3dbbd', '#B68D40','#B68D40']}  style={{height:50,width:150,borderRadius:0,justifyContent:'center',alignItems:'center',borderBottomLeftRadius:10,borderBottomRightRadius:10}}><Text style={{color:'#000',fontSize:18,fontWeight:600,flexDirection:'row',fontFamily: 'Cochin'}}>{game.title}</Text></LinearGradient></View>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#2F4F4F',borderRadius:10,padding:2}}>
                     <Image source={require('../assets/dollar2.png')} style={{width:20,height:20}}/>
                    <Text style={{color:'#FFF',padding:2}}>{availablePoint}</Text>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}}  colors={['#06FE5F','#06FE5F', '#3E9800', '#06FE5F', '#06FE5F']} style={{height:20,width:20,borderRadius:10,justifyContent:'center',alignItems:'center'}}><TouchableOpacity><Icon  name='plus' size={16} color='#FFF'/></TouchableOpacity></LinearGradient>           
          </View>
     </ImageBackground>
     </View>

     <View style={{height:400,marginTop:20,padding:0,borderColor:'#B68D40',borderWidth:1,borderLeftWidth:1}}>

  
  
     <View style={{flexDirection:'row',justifyContent:'center'}}>
         <TouchableOpacity style={{width:150,height:40,backgroundColor:'#2F4F4F',justifyContent:'center',alignItems:'center',borderBottomLeftRadius:20,borderBottomRightRadius:20}}><Text style={{color:'#FFF'}}>{todayDate}</Text></TouchableOpacity>
      </View>

      {game.game_type==2 || game.game_type==7? <View style={{marginTop:40}}></View>: <View style={{flexDirection:'row',marginTop:10,justifyContent:'center'}}>
      <TouchableOpacity onPress={()=>{setActiveOpen(1); setActiveClose(0); playSound();setBidType(0); setActiveBidTypeLabel("OPEN"); setReverseActiveLabel("CLOSE");}} disabled={current_24<opentime_24? false:true}><LinearGradient colors={activeOpen==1?['#B68D40','#e3dbbd', '#B68D40','#B68D40']:['#122620','#B68D40', '#122620','#122620']}  style={{height:50,width:150,borderRadius:0,justifyContent:'center',alignItems:'center',borderBottomLeftRadius:30,borderBottomRightRadius:10,marginRight:5}}><Text style={{color:'#000'}}>Open</Text></LinearGradient></TouchableOpacity><TouchableOpacity onPress={()=>{setActiveClose(1);setActiveOpen(0); playSound();setBidType(1);setActiveBidTypeLabel("CLOSE");setReverseActiveLabel("OPEN");}}><LinearGradient colors={activeClose==1?['#B68D40','#e3dbbd', '#B68D40','#B68D40']:['#122620','#B68D40', '#122620','#122620']} style={{height:50,width:150,borderRadius:0,justifyContent:'center',alignItems:'center',borderBottomLeftRadius:10,borderBottomRightRadius:30}}><Text style={{color:'#000'}}>Close</Text></LinearGradient></TouchableOpacity>
      </View>
      }




    {game.game_type==1 || game.game_type==2 || game.game_type==6?  <View style={styles.row}>
  
           <TextInput 
             style={[styles.Inputfield,{borderColor:digitBorderColor==1? '#B68D40' : 'red'}]}
             placeholder={game.game_type==2?"ENTER JODI DIGIT": bidType!=2? "ENTER "+activeBidTypeLabel+" DIGIT" : "ENTER DIGIT"}
             value={digit}
             keyboardType="numeric"
             maxLength={game.game_type==6? 1 : game.maxLength}
             placeholderTextColor="#fff" 
           onChangeText={(val)=>{setDigit(val)}}
           />
      </View>:'' }


      {game.game_type==3 || game.game_type==4 || game.game_type==5 || game.game_type==7 || game.game_type==6?<View style={styles.row}>
  
        <TextInput 
        style={[styles.Inputfield,{borderColor:pannaBorderColor==1? '#B68D40' : 'red'}]}
        placeholder={game.game_type!=6?"ENTER PANNA":bidType!=2? "ENTER "+reverseActiveLabel+" PANNA" : "ENTER PANNA"}
        value={patti}
        keyboardType="numeric"
        maxLength={3}
        placeholderTextColor="#fff" 
        onChangeText={(val)=>{setPatti(val)}}
        />
     </View>:''}  


     {game.game_type==7?<View style={styles.row}>
  
  <TextInput 
   style={[styles.Inputfield,{borderColor:closepannaBorderColor==1? '#B68D40' : 'red'}]}
  placeholder={"ENTER CLOSE PANNA"}
  value={closePatti}
  keyboardType="numeric"
  maxLength={3}
  placeholderTextColor="#fff" 
  onChangeText={(val)=>{setClosePatti(val)}}
  />
</View>:''}  

   <View style={styles.row}>
  
        <TextInput 
       style={[styles.Inputfield,{borderColor:pointBorderColor==1? '#B68D40' : 'red'}]}
        placeholder="ENTER POINT"
        value={point}
        keyboardType="numeric"
        placeholderTextColor="#fff" 
        onChangeText={(val)=>{setPoint(val)}}
        />
     </View>

     <View style={styles.row}>
   <TouchableOpacity onPress={validity_check}><LinearGradient colors={['#B68D40','#e3dbbd','#B68D40']}  start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={{height:50,width:150,borderRadius:0,justifyContent:'center',alignItems:'center',borderBottomLeftRadius:30,borderBottomRightRadius:30,marginRight:5}}><Text style={{color:'#000'}}>CONTINUE</Text></LinearGradient></TouchableOpacity>

   {validationCheck==1?<TouchableOpacity onPress={place_bid}><LinearGradient colors={['#B68D40','#e3dbbd','#B68D40']}  start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={{height:50,width:150,borderRadius:0,justifyContent:'center',alignItems:'center',borderBottomLeftRadius:30,borderBottomRightRadius:30,marginRight:5}}><Text style={{color:'#000'}}>PLACE BID</Text></LinearGradient></TouchableOpacity>:''}

     </View>   


      </View>


     </ImageBackground>
     </View>
     </AlertNotificationRoot>
)


}

export default GameBid;

const styles = StyleSheet.create({
   row:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        padding:10
    },

   
     Inputfield:{

        borderBottomWidth:2,
        borderTopWidth:2,
        borderLeftWidth:2,
        borderRightWidth:2,
         width :300,
        fontSize:16, 
       color:'#fff',
       marginBottom:5,
       paddingLeft:10
    
    }
})