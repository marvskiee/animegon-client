import React, { useRef, useState, useEffect } from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../../config/colors";
import { connect } from "react-redux";
import { fetchStorage } from "../../../redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { externalStyle } from "../../../style/externalStyle";

const NavigateToDetails = ({ navigation }, name) => {
  navigation.navigate(name);
};

const HomeHeaderRight = (props) => {
  return (
    <View>
      <View style={styles.header_items}>
        <TouchableOpacity
          onPress={() => NavigateToDetails(props, "collection")}
        >
          <Image
            style={styles.header_icon}
            source={require("../../../assets/images/collection_icon.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => NavigateToDetails(props, "search")}>
          <Image
            style={styles.header_icon}
            source={require("../../../assets/images/search_icon.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create(externalStyle);

export default connect(null, {})(HomeHeaderRight);
