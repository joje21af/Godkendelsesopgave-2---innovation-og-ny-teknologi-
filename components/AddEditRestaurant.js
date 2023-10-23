import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import { useEffect, useState } from "react";
import { getDatabase, ref, push, update } from "firebase/database";

function Add_edit_Restaurant({ navigation, route }) {

  const db = getDatabase();

  const initialState = {
    restaurantName: '',
    placering: '',
    prisLeje: '',
    rating: ''
  }

  const [newRestaurant, setNewRestaurant] = useState(initialState);

  const priceCategories = {
    0: '$',
    101: '$$',
    201: '$$$',
    401: '$$$$',
    801: '$$$$$',
  };

  const isEditRestaurant = route.name === "Edit Restaurant";

  useEffect(() => {
    if (isEditRestaurant) {
      const restaurant = route.params.restaurant[1];
      setNewRestaurant(restaurant);
    }
    return () => {
      setNewRestaurant(initialState);
    };
  }, []);

  const changeTextInput = (name, event) => {
    setNewRestaurant({ ...newRestaurant, [name]: event });
  }
// handleSave-funktionen kaldes, når brugeren forsøger at gemme restaurantoplysningerne. 
// Den kontrollerer, om påkrævede oplysninger er udfyldt, og den kategoriserer prislejen baseret på den angivne pris og gemmer derefter oplysningerne i Firebase-databasen som en ny restaurant eller opdaterer en eksisterende restaurant.
  const handleSave = async () => {
    const { restaurantName, placering, prisLeje, rating } = newRestaurant;

    if (restaurantName.length === 0 || placering.length === 0 || prisLeje.length === 0 || rating.length === 0) {
      return Alert.alert('Et af felterne er tomt!');
    }

    const priceCategory = findPriceCategory(parseInt(prisLeje));

    if (priceCategory === null) {
      return Alert.alert('Ugyldigt prisleje');
    }

    if (isEditRestaurant) {
      const id = route.params.restaurant[0];
      const restaurantRef = ref(db, `Restaurants/${id}`);
      const updatedFields = {
        restaurantName,
        placering,
        prisLeje: priceCategory,
        rating,
      };
      await update(restaurantRef, updatedFields)
        .then(() => {
          Alert.alert("Gemt");
          const restaurant = newRestaurant;
          navigation.navigate("Restaurant Details", { restaurant });
        })
        .catch((error) => {
          console.error(`Fejl: ${error.message}`);
        });
    } else {
      const restaurantsRef = ref(db, "/Restaurants/");
      const newRestaurantData = {
        restaurantName,
        placering,
        prisLeje: priceCategory,
        rating,
      };
      await push(restaurantsRef, newRestaurantData)
        .then(() => {
          Alert.alert("Gemt");
          setNewRestaurant(initialState);
        })
        .catch((error) => {
          console.error(`Fejl: ${error.message}`);
        });
    }
  };

  // Funktionen nedenunder tager en pris som parameter og returnerer en pris kategori.

  const findPriceCategory = (price) => {
    if (price >= 0 && price <= 100) {
      return '$';
    } else if (price >= 101 && price <= 200) {
      return '$$';
    } else if (price >= 201 && price <= 400) {
      return '$$$';
    } else if (price >= 401 && price <= 800) {
      return '$$$$';
    } else if (price > 800) {
      return '$$$$$';
    } else {
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {
          Object.keys(initialState).map((key, index) => {
            return (
              <View style={styles.row} key={index}>
                <Text style={styles.label}>{key}</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    value={newRestaurant[key]}
                    onChangeText={(event) => changeTextInput(key, event)}
                    style={styles.input}
                  />
                </View>
              </View>
            )
          })
        }
        <TouchableOpacity style={styles.addButton} onPress={() => handleSave()}>
          <Text style={styles.addButtonText}>{isEditRestaurant ? "Gem Ændringer" : "Tilføj Restaurant"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Add_edit_Restaurant;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    height: 60,
    marginBottom: 15,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    width: 120,
    fontSize: 14,
    marginLeft: 10,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    textAlign: 'left',
    borderWidth: 1.2,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
  },
  addButton: {
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 17,
    marginTop: 10,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    width: 250,
    alignSelf: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});





