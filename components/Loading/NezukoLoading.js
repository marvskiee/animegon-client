import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import colors from "../../config/colors";
import { externalStyle } from "../../style/externalStyle";

export default function NezukoLoading() {
  return (
    <View style={[styles.loading_layout, { backgroundColor: colors.dark }]}>
      <Image
        style={styles.loading_image}
        source={require("../../assets/images/nezuko.gif")}
      />
      <Text style={{ color: "#fff" }}>Searching ...</Text>
    </View>
  );
}
const styles = StyleSheet.create(externalStyle);
