import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../../config/colors";
import { connect } from "react-redux";

const HomeHeaderLeft = (props) => {
  return (
    <View>
      <Text style={styles.header_logo_1}>
        Anime<Text style={styles.header_logo_2}>Gon</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header_icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  header_logo_1: {
    color: "#fff",
    fontFamily: "mont",
    fontSize: 23,
  },
  header_logo_2: {
    color: colors.violet,
  },
  header_items: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default connect(null, {})(HomeHeaderLeft);
