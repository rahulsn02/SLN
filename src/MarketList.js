import React,{useState,useEffect} from "react";
import {View,Text,TouchableOpacity,ImageBackground,FlatList,StatusBar,StyleSheet,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import axios from "axios";
import { base_url } from "../constant";






const MarketList = (props)=>{

   const item =  props.item;
   const nav = props.nav;
   const [openResultData,setOpenResultData] = useState();
   const [closeResultData,setCloseResultData] = useState();




   const today = new Date();
   const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate();
let tdd = today.getDate()+1
if (dd < 10) dd = '0' + dd;
if (tdd < 10) tdd = '0' + tdd;

if (mm < 10) mm = '0' + mm;
const todayDate = yyyy + '-' + mm + '-' +dd ;


useEffect(()=>{



axios.get(base_url+"/checkOpenResult",{params:{market_id:item.id,date:todayDate}}).then((response)=>{

    setOpenResultData(response.data[0]);

}).catch((err)=>{});


axios.get(base_url+"/checkCloseResult",{params:{market_id:item.id,date:todayDate}}).then((response)=>{

    setCloseResultData(response.data[0]);
    
    }).catch((err)=>{});
    



},[])


const convert = (string)=>{

    let str  = string.toString();
   
    let sum = 0

    for (let i = 0; i < str.length; i++) {
        if (!isNaN(parseInt(str[i]))) {
            sum += parseInt(str[i])
        }
    }
    lastDigit = sum % 10;
    return lastDigit
}



return(
    <View style={{justifyContent:'center',alignItems:'center'}}>
        <View style={{flexDirection:'row'}}><Text  style={{color:'#fff',fontSize:16,fontWeight:600}}>{item.title}</Text></View>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
           {openResultData?  <View><Text  style={{color:'#fff',fontSize:16,fontWeight:600}}>{openResultData.result}</Text></View> :<View><Text  style={{color:'#fff',fontSize:16,fontWeight:600}}>***</Text></View>}
             <View style={{flexDirection:'row'}}>{openResultData? <Text  style={{color:'#fff',fontSize:16,fontWeight:600}}>--{convert(openResultData.result)}</Text>:<Text  style={{color:'#fff',fontSize:16,fontWeight:600}}>--*</Text>}{closeResultData? <Text  style={{color:'#fff',fontSize:16,fontWeight:600}}>{convert(closeResultData.result)}--</Text>:<Text  style={{color:'#fff',fontSize:16,fontWeight:600}}>*--</Text>}</View>
            {closeResultData?  <View><Text  style={{color:'#fff',fontSize:16,fontWeight:600}}>{closeResultData.result}</Text></View> :<View><Text  style={{color:'#fff',fontSize:16,fontWeight:600}}>***</Text></View>}
        </View>
    </View>
   
);

}

export default MarketList;