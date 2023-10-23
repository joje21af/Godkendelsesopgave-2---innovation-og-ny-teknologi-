import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import StarRating from 'react-native-star-rating';

function BookingHistory({ navigation }) {
  const [restaurantData, setRestaurantData] = useState([
    {
      id: '1',
      restaurantName: 'Noma',
      placering: 'Nygade',
      rating: 3.4,
      prisLeje: '$$$$',
      userRating: 0,
    },
    {
      id: '2',
      restaurantName: 'Burger King',
      placering: 'Valby',
      rating: 2.5,
      prisLeje: '$',
      userRating: 0,
    },
  ]);

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isRatingModalVisible, setIsRatingModalVisible] = useState(false);

  const handleRatingPress = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsRatingModalVisible(true);
  };

  const handleRatingChange = (rating) => {
    const updatedData = restaurantData.map((restaurant) => {
      if (restaurant.id === selectedRestaurant.id) {
        return {
          ...restaurant,
          userRating: rating,
        };
      }
      return restaurant;
    });

    setRestaurantData(updatedData);
    setIsRatingModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>
      <FlatList
        data={restaurantData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={styles.restaurantContainer}
              onPress={() => handleRatingPress(item)}
            >
              <Text style={styles.restaurantName}>{item.restaurantName}</Text>
              <Text style={styles.restaurantLocation}>Placering: {item.placering}</Text>
              <Text style={styles.restaurantRating}>Rating: {item.rating}</Text>
              <Text style={styles.restaurantPrisLeje}>Prisleje: {item.prisLeje}</Text>
              <StarRating
                maxStars={5}
                rating={item.userRating}
                starSize={30}
                fullStarColor="gold"
                emptyStarColor="gray" // Opdateret til grå farve
                starStyle={styles.starStyle}
              />
            </TouchableOpacity>
          </View>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isRatingModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Give Rating</Text>
            <StarRating
              maxStars={5}
              rating={selectedRestaurant ? selectedRestaurant.userRating : 0}
              starSize={50}
              fullStarColor="gold"
              emptyStarColor="gray" // Opdateret til grå farve
              starStyle={styles.starStyle}
              selectedStar={(rating) => handleRatingChange(rating)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  restaurantContainer: {
    backgroundColor: 'lightgray',
    margin: 5,
    padding: 10,
    borderRadius: 10,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  starStyle: {
    borderColor: 'black', // Sort kant om stjernen
  },
});

export default BookingHistory;





