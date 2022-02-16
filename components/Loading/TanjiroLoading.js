import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { externalStyle } from "../../style/externalStyle";

export default function TanjiroLoading() {
  return (
    <View style={styles.loading_layout}>
      <Image
        style={styles.loading_image}
        source={require("../../assets/images/tanjiro.gif")}
      />
      <Text style={{ color: "#fff", padding: 10 }}>Loading ...</Text>
    </View>
  );
}
const styles = StyleSheet.create(externalStyle);
