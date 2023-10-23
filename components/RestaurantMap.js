import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


// indsætter tre tilfældige restauranter i en liste
const restaurants = [
  {
    id: 1,
    name: 'Restaurant A',
    latitude: 55.6761,
    longitude: 12.5683,
  },
  {
    id: 2,
    name: 'Restaurant B',
    latitude: 55.6861,
    longitude: 12.5783,
  },
  {
    id: 3,
    name: 'Restaurant C',
    latitude: 55.6961,
    longitude: 12.5883,
  },
];


// MapView-komponenten viser et kort med tre markører, der repræsenterer de tre restauranter i listen.
export default function CustomMap() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{
        latitude: 55.6761,
        longitude: 12.5683,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}>
        {restaurants.map(restaurant => (
          <Marker
            key={restaurant.id}
            coordinate={{
              latitude: restaurant.latitude,
              longitude: restaurant.longitude,
            }}
            title={restaurant.name}
          />
        ))}
      </MapView>
    </View>
  );
}

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
