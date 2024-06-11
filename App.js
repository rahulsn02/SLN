import React from 'react';
import {SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './src/Splash';
import Home from './src/Home';
import Profile from './src/Profile';
import CustomDrawer from './src/CustomDrawer';
import Wallet from './src/Wallet';
import BidHistory from './src/BidHistory';
import WinHistory from './src/WinHistory';
import GameRate from './src/GameRate';
import ContactUs from './src/ContactUs';
import Games from './src/Games';
import GameBid from './src/GameBid';
import Payment from './src/Payment';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

function AppDrawer() {
  return (
    <Drawer.Navigator drawerContent={props=><CustomDrawer {...props}/>} screenOptions={{drawerActiveTintColor:'#B68D40',drawerInactiveTintColor:'#FFF',drawerLabelStyle:{marginLeft:-20}}}>
      <Drawer.Screen name="Home" component={Home} options={{headerShown:false,drawerIcon:()=>(<Icon  name='home-outline' size={22} color='#fff'/>)}} />
      <Drawer.Screen name="Profile" component={Profile} options={{headerShown:false,drawerIcon:()=>(<Icon  name='person-outline' size={22} color='#fff'/>)}}/>
      <Drawer.Screen name="Wallet" component={Wallet} options={{headerShown:false,drawerIcon:()=>(<Icon  name='wallet-outline' size={22} color='#fff'/>)}}/>
      <Drawer.Screen name="BidHistory" component={BidHistory} options={{headerShown:false,drawerIcon:()=>(<Icon  name='document-text-outline' size={22} color='#fff'/>)}}/>
      <Drawer.Screen name="WinHistory" component={WinHistory} options={{headerShown:false,drawerIcon:()=>(<Icon  name='document-text-outline' size={22} color='#fff'/>)}}/>
      <Drawer.Screen name="ContactUs" component={ContactUs} options={{headerShown:false,drawerIcon:()=>(<Icon  name='chatbubble-ellipses-outline' size={22} color='#fff'/>)}}/>
    </Drawer.Navigator>
  );
}




const App=()=> {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>

    <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown:false}} options={{animation: 'slide_from_right'}}>
    <Stack.Screen name="Splash" component={Splash} options={{animation: 'slide_from_right'}} />
    <Stack.Screen name="MyDrawer" component={AppDrawer}  options={{animation: 'slide_from_right'}}/>
    <Stack.Screen name="Games" component={Games}  options={{animation: 'slide_from_right'}}/>
    <Stack.Screen name="GameBid" component={GameBid}  options={{animation: 'slide_from_right'}}/>
    <Stack.Screen name="Payment" component={Payment}  options={{animation: 'slide_from_right'}}/>


    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
 
});

export default App;
