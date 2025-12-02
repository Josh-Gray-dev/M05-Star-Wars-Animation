import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  textInputContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },

  textInputLabel: {
    fontSize: 16,
    marginBottom: 4,
  },

  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },

  modalInner: {
    backgroundColor: "azure",
    padding: 20,
    borderWidth: 1,
    borderColor: "lightsteelblue",
    borderRadius: 2,
    alignItems: "center",
  },

  modalText: {
    fontSize: 16,
    margin: 5,
    color: "slategrey",
  },

  modalButton: {
    fontWeight: "bold",
    margin: 5,
    color: "slategrey",
  },

  scroll: {
    height: 1,
    alignSelf: "stretch",
  },

  swipeContainer: {
    flex: 1,
    flexDirection: "row",
    width: 200,
    height: 50,
    marginTop: 10,
    alignSelf: "center",
  },

  swipeItem: {
    width: 200,
    height: 50,
    backgroundColor: "azure",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "slategrey",
  },

  swipeItemText: {
    textAlign: "center",
    color: "slategrey",
  },

  swipeBlank: {
    width: 200,
    height: 30,
  },

  headerImage: {
  width: "100%",
  height: 160,
  marginBottom: 10,
},
});