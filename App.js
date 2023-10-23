import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getApps, initializeApp } from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddEditRestaurant from './components/AddEditRestaurant';
import RestaurantList from './components/RestaurantList';
import SimpleMap from './components/RestaurantMap';
import RestaurantDetails from './components/RestaurantDetails';
import LikeRestaurant from './components/LikeRestaurant';
import BookingHistory from './components/BookingHistory';
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomMap from './components/RestaurantMap';

export default function App() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBrRK1XSvsbKoO9PZ2JhWPPSDBRB4LIta4",
    authDomain: "tinderrestaurant-fa36f.firebaseapp.com",
    databaseURL: "https://tinderrestaurant-fa36f-default-rtdb.firebaseio.com/",
    projectId: "tinderrestaurant-fa36f",
    storageBucket: "tinderrestaurant-fa36f.appspot.com",
    messagingSenderId: "108192797601",
    appId: "1:108192797601:web:c69167d64f5f91b33871e0"
  };

  // Vi kontrollerer at der ikke allerede er en initialiseret instans af firebase
  if (getApps().length < 1) {
    initializeApp(firebaseConfig); // Initialisering af Firebase
    console.log("Firebase On!"); // Besked til konsollen om, at Firebase er aktiveret
  }
  
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  // Vi opretter en StackNavigator til vores RestaurantList, RestaurantDetails og AddEditRestaurant komponenter 
  const StackNavigation = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name={'Restaurant List'} component={RestaurantList} />
        <Stack.Screen name={'Restaurant Details'} component={RestaurantDetails} />
        <Stack.Screen name={'Edit Restaurant'} component={AddEditRestaurant} />
      </Stack.Navigator>
    )
  }
  // Vi opretter en TabNavigator til vores LikeRestaurant, StackNavigation, AddEditRestaurant og BookingHistory komponenter
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={'Velkommen '} component={LikeRestaurant} options={{ tabBarIcon: () => (<Ionicons name="home" size={20} />) }} />
        <Tab.Screen name={'Restauranter'} component={StackNavigation} options={{ tabBarIcon: () => (<Ionicons name="heart" size={20} />), headerShown: null }} />
        <Tab.Screen name={'Tilføj restaurant'} component={AddEditRestaurant} options={{ tabBarIcon: () => (<Ionicons name="add" size={20} />) }} />
        <Tab.Screen name={'Booking Historik'} component={BookingHistory} options={{ tabBarIcon: () => (<Ionicons name="book" size={20} />) }} /> 
        <Tab.Screen name={'Map'} component={CustomMap} options={{ tabBarIcon: () => (<Ionicons name="map" size={20} />) }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});