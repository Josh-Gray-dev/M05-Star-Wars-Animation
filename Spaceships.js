import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TextInput, Modal, ScrollView } from "react-native";
import styles from "./styles";
import Swipeable from "./Swipeable";
import LazyImage from "./LazyImage";

const shipImage = { uri: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/08/10-best-star-wars-spaceships.jpg" };

function mapStarships(results) {
  return results.map((ship, index) => ({
    key: index.toString(),
    value: ship.name,
  }));
}

export default function Spaceships() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [changedText, setChangedText] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [imageSource, setImageSource] = useState(null);

  useEffect(() => {
    setImageSource(shipImage);
  }, []);

  useEffect(() => {
    fetch("https://swapi.dev/api/starships/")
      .then((resp) => resp.json())
      .then((json) => {
        setData(mapStarships(json.results));
      })
      .catch((error) => {
        console.log("Error fetching starships:", error);
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
        <Text style={styles.textInputLabel}>Spaceship search:</Text>
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