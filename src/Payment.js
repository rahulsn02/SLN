// import React,{useState,useEffect} from "react";
// import {View,Text,TouchableOpacity,ImageBackground,FlatList,StatusBar,Image,Vibration,BackHandler, Alert} from 'react-native';
// import RNUpiPayment from 'react-native-upi-payment'


// const Payment = (props)=>{



// const Pay = ()=>{

//    RNUpiPayment.initializePayment(
//       {
//         vpa: 'arvindsaini.indore@oksbi', // or can be john@ybl or mobileNo@upi
//         payeeName: 'SLN',
//         amount: '1',
//         transactionRef: 'aasf-332-aoei-fn',
//       },
//       successCallback,
//       failureCallback
//     );


// }

// function successCallback(data) {

//    console.log(data)
//    // do whatever with the data
//  }
 
//  function failureCallback(data) {
//    console.log(data);
//    // do whatever with the data
//  }



    
// return(
//    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

//     <TouchableOpacity><Text style={{color:'#000'}} onPress={Pay}>Pay</Text></TouchableOpacity>
    

//    </View>
// )


// }

// export default Payment;

import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import { NativeModules } from 'react-native';

const { UPI } = NativeModules;

const Payment = () => {
  const [paymentAmount, setPaymentAmount] = useState('1.00');
  const [upiId, setUpiId] = useState('babulaljat2332-1@okicici');

  const handleUPIPayment = () => {
    const transactionId = `TXN${Date.now()}`;
    const url = `upi://pay?pa=${upiId}&pn=PayeeName&am=${paymentAmount}&cu=INR&tn=TestTransaction&tr=${transactionId}`;
    console.log('UPI Payment URL:', url); // Debugging line to check the URL

    UPI.openLink(url)
      .then(response => {
        console.log('UPI Payment Response:', response);
        const transactionDetails = parseUPIResponse(response);
        if (transactionDetails) {
          Alert.alert('Payment Success', `Transaction ID: ${transactionDetails.txnId}`);
        } else {
          Alert.alert('Payment Failed', 'Unable to fetch transaction details.');
        }
      })
      .catch(error => {
        console.error('UPI Payment Error:', error);
        Alert.alert('Payment Error', error.message);
      });
  };

  const parseUPIResponse = (response) => {
    const responseArray = response.split('&');
    const details = {};
    responseArray.forEach(param => {
      const [key, value] = param.split('=');
      details[key] = decodeURIComponent(value);
    });
    return details;
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Enter Payment Amount:</Text>
      <TextInput
        value={paymentAmount}
        onChangeText={setPaymentAmount}
        placeholder="Amount"
        keyboardType="numeric"
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Text>Enter UPI ID:</Text>
      <TextInput
        value={upiId}
        onChangeText={setUpiId}
        placeholder="UPI ID"
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Pay with UPI" onPress={handleUPIPayment} />
    </View>
  );
};

export default Payment;
