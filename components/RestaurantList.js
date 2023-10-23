import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { getDatabase, ref, onValue, off } from "firebase/database";

function RestaurantList({ navigation }) {
  // State-variabler til at gemme restauranter, søgetekst og filtrerede restauranter
  const [restaurants, setRestaurants] = useState();
  const [searchText, setSearchText] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  // Bruger useEffect til at hente data fra Firebase-databasen og filtrere restauranter baseret på søgeteksten
  useEffect(() => {
    const db = getDatabase();
    const restaurantsRef = ref(db, "Restaurants");

    onValue(restaurantsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setRestaurants(data);
        // Opdater også den filtrerede liste initialt
        filterRestaurants(data, searchText);
      }
    });

    return () => {
      off(restaurantsRef);
    };
  }, [searchText]);

  // Funktion til at filtrere restauranter baseret på søgeteksten
  const filterRestaurants = (data, searchText) => {
    const filtered = Object.values(data).filter((restaurant) =>
      restaurant.restaurantName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  if (!restaurants) {
    return <Text>Ingen restauranter fundet</Text>;
  }

  // Funktion til at håndtere valg af en restaurant og navigere til detaljeskærmen
  const handleSelectRestaurant = (id) => {
    const restaurant = Object.entries(restaurants).find((restaurant) => restaurant[0] === id);
    navigation.navigate('Restaurant Details', { restaurant });
  };

  // Definerer lister af restauranter og nøgler
  const restaurantArray = filteredRestaurants.length > 0 ? filteredRestaurants : Object.values(restaurants);
  const restaurantKeys = Object.keys(restaurants);

  return (
    <View>
      <View style={styles.filterContainer}>
        {/* Knapper til filtrering og placering (mangler funktionalitet) */}
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Filtrer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Vælg placering</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Søg efter restaurant"
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            filterRestaurants(restaurants, text);
          }}
        />
      </View>
      <FlatList
        data={restaurantArray}
        keyExtractor={(item, index) => restaurantKeys[index]}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.container}
              onPress={() => handleSelectRestaurant(restaurantKeys[index])}
            >
              <View style={styles.innerContainer}>
                <Text style={styles.restaurantName}>{item.restaurantName}</Text>
                <Text style={styles.restaurantLocation}>Placering: {item.placering}</Text>
                <Text style={styles.restaurantRating}>Rating: {item.rating}</Text>
                <Text style={styles.restaurantPrisLeje}>Prisleje: {item.prisLeje}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}


export default RestaurantList;

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  button: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingLeft: 10,
    marginRight: 10,
  },
  container: {
    backgroundColor: 'lightgray',
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  restaurantLocation: {
    fontSize: 16,
    color: 'black',
  },
  restaurantRating: {
    fontSize: 16,
    color: 'green',
  },
  restaurantPrisLeje: {
    fontSize: 16,
    color: 'blue',
  },
});





