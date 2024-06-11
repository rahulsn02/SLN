import React from "react";
import {View,Text,ImageBackground,StatusBar} from 'react-native';
import {DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from "react-native-gesture-handler";


const CustomDrawer = (props)=>{
return(
    <View style={{flex:1,backgroundColor:'#000',padding:10}}>
          <StatusBar backgroundColor="#000" barStyle="light-content"/>

          <ImageBackground source={require('../assets/bg.png')} style={{flex:1}}>
    <DrawerContentScrollView {...props} >
        <View style={{height:130,padding:10,borderBottomWidth:1,borderColor:"#B68D40"}}>
         <View style={{height:50,width:50,backgroundColor:'#fff',borderRadius:25,justifyContent:'center',alignItems:'center'}}><Icon  name='user' size={30} color='#000'/></View> 
         <Text style={{color:'#fff',fontSize:18,marginTop:3}}>Rahul</Text>
         <Text style={{color:'#fff',fontSize:18,marginTop:3}}>8982331087</Text>
        </View>
        <View style={{height:20}}></View>
        <DrawerItemList {...props} />
    </DrawerContentScrollView>

     <View>
        <TouchableOpacity style={{width:'100%',height:40,backgroundColor:'#B68D40',justifyContent:'center',alignItems:'center',borderRadius:15}}><Text>Logout</Text></TouchableOpacity>
     </View>
     </ImageBackground>
    </View>
)


}

export default CustomDrawer;