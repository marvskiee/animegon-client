import React from "react";
import { Image, TouchableOpacity, StyleSheet, Alert } from "react-native";

const CollectionHeaderInfo = (props) => {
  const infoHandler = () => {
    Alert.alert(
      "",
      "If you bookmark in anime section it means you will redirect to that section, and it is same for watch section. ",
      [{ text: "Ok", onPress: () => console.log("OK Pressed") }]
    );
  };
  return (
    <>
      <TouchableOpacity onPress={infoHandler}>
        <Image
          style={styles.header_icon}
          source={require("../../../assets/images/info_icon.png")}
        />
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  header_icon: {
    width: 35,
    marginLeft: 5,
    height: 35,
  },
});
export default CollectionHeaderInfo;
