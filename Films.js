import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TextInput, Modal, ScrollView } from "react-native";
import styles from "./styles";
import Swipeable from "./Swipeable";
import LazyImage from "./LazyImage";

const filmImage = {
  uri: "https://robots.net/wp-content/uploads/2023/08/how-to-watch-star-wars-movies-1691038322.jpg",
};

function mapFilms(results) {
  return results.map((film, index) => ({
    key: index.toString(),
    value: `Episode ${film.episode_id}: ${film.title}`,
  }));
}

export default function Films() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [changedText, setChangedText] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [imageSource, setImageSource] = useState(null);

  useEffect(() => {
    setImageSource(filmImage);
  }, []);

  useEffect(() => {
    fetch("https://swapi.dev/api/films/")
      .then((resp) => resp.json())
      .then((json) => {
        setData(mapFilms(json.results));
      })
      .catch((error) => {
        console.log("Error fetching films:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <LazyImage
              style={styles.headerImage}
              resizeMode="cover"
              source={imageSource}
            />
      <View style={styles.textInputContainer}>
        <Text style={styles.textInputLabel}>Film search:</Text>
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
