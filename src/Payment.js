import React,{useState,useEffect} from "react";
import {View,Text,TouchableOpacity,ImageBackground,FlatList,StatusBar,Image,Vibration,BackHandler, Alert} from 'react-native';
import RNUpiPayment from 'react-native-upi-payment'


const Payment = (props)=>{



const Pay = ()=>{

   RNUpiPayment.initializePayment(
      {
        vpa: 'arvindsaini.indore@oksbi', // or can be john@ybl or mobileNo@upi
        payeeName: 'SLN',
        amount: '1',
        transactionRef: 'aasf-332-aoei-fn',
      },
      successCallback,
      failureCallback
    );


}

function successCallback(data) {

   console.log(data)
   // do whatever with the data
 }
 
 function failureCallback(data) {
   console.log(data);
   // do whatever with the data
 }



    
return(
   <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

    <TouchableOpacity><Text style={{color:'#000'}} onPress={Pay}>Pay</Text></TouchableOpacity>
    

   </View>
)


}

export default Payment;