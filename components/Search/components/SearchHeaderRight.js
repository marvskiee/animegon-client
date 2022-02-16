import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import colors from "../../../config/colors";
import { connect } from "react-redux";
import { searchResult, setHistoryOne, activeHandler } from "../../../redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SearchHeaderRight(props) {
  const mounted = useRef();
  const [search, setSearch] = useState("");
  const device = Dimensions.get("screen").width;

  const checker = (stored) => {
    let items = stored;
    let i = 0;
    while (i < items.length) {
      if (items[i].toLowerCase() == search.toLowerCase()) {
        return true;
      }
      i = i + 1;
    }
    return false;
  };
  const storeData = async (data) => {
    let prevHistory = props.history;
    if (!checker(prevHistory)) {
      if (prevHistory.length >= 5) {
        prevHistory.pop();
      }
      prevHistory.unshift(data);

      let newHistory = prevHistory;
      try {
        await AsyncStorage.setItem("history", JSON.stringify(newHistory));
      } catch (e) {
        console.log("Warning set in SearchHeader.js: " + e);
      }
    }
  };

  return (
    <View
      style={{
        width: device - 80,
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
        position: "relative",
      }}
    >
      <TextInput
        style={styles.searchbar}
        placeholder="Search Anime"
        placeholderTextColor="#fff"
        onChangeText={(value) => setSearch(value)}
      />
      <TouchableOpacity
        style={{
          backgroundColor: colors.violet,
          borderBottomRightRadius: 50,
          borderTopRightRadius: 50,
          paddingVertical: 7,
          paddingRight: 10,
          paddingLeft: 5,
          height: 40,
        }}
        onPress={() => {
          if (search.length > 0) {
            props.searchResult(search, 1);
            storeData(search);
          }
        }}
      >
        <Image
          style={{
            width: 25,
            height: 25,
          }}
          source={require("../../../assets/images/search_icon.png")}
        />
      </TouchableOpacity>
    </View>
  );
}
const mapStateToProps = (state) => {
  return {
    loading: state.search.loading,
    result: state.search.result,
    history: state.search.history,
    active: state.search.active,
  };
};

export default connect(mapStateToProps, {
  searchResult,
  setHistoryOne,
  activeHandler,
})(SearchHeaderRight);

const styles = StyleSheet.create({
  searchbar: {
    width: "90%",
    backgroundColor: colors.lightdark,
    paddingVertical: 5,
    paddingHorizontal: 20,
    height: 40,
    color: "#fff",
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
  },
});
