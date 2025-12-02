import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TextInput, Modal, ScrollView } from "react-native";
import styles from "./styles";
import Swipeable from "./Swipeable";
import LazyImage from "./LazyImage";

const planetImage = { uri: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/wm/2024/09/swo-all-planets-locations-featured.jpg" };

function mapPlanets(results) {
  return results.map((planet, index) => ({
    key: index.toString(),
    value: planet.name,      
  }));
}

export default function Planets() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [changedText, setChangedText] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [imageSource, setImageSource] = useState(null);

  useEffect(() => {
    setImageSource(planetImage);
  }, []);

  useEffect(() => {
    fetch("https://swapi.dev/api/planets/")
      .then((resp) => resp.json())
      .then((json) => {
        setData(mapPlanets(json.results));
      })
      .catch((error) => {
        console.log("Error fetching planets:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  function showModalWithText(text) {
  setSubmittedText(text);
  setModalVisible(true);
}

  return (
    <View style={styles.container}>
      <LazyImage
        style={styles.headerImage}
        resizeMode="cover"
        source={imageSource}
      />
      <View style={styles.textInputContainer}>
        <Text style={styles.textInputLabel}>Planet search:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Type a search term"
          value={changedText}
          onChangeText={(text) => {
            setChangedText(text);
          }}
          onSubmitEditing={(e) => {
            const text = e.nativeEvent.text;
            setSubmittedText(text);
            setModalVisible(true);
          }}
          returnKeyType="search"
        />
      </View>

      <Modal
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalInner}>
            <Text style={styles.modalText}>You entered:</Text>
            <Text style={styles.modalText}>{submittedText}</Text>
            <Text
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              Close
            </Text>
          </View>
        </View>
      </Modal>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView style={styles.scroll}>
          {data.map((item) => (
            <Swipeable
              key={item.key}
              name={item.value}
              onSwipe={() => showModalWithText(item.value)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}