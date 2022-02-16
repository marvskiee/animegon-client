import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { externalStyle } from "../../style/externalStyle";
import { connect } from "react-redux";
import { searchResult, activeHandler, setHistoryMany } from "../../redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NezukoLoading from "../Loading/NezukoLoading";

const NavigateToDetails = (props, data) => {
  props.navigation.navigate("anime", { newData: data });
};

function Search(props) {
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      props.activeHandler("history");
      getData();
      mounted.current = true;
    }
  });

  const getData = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem("history");
      if (storedHistory !== null) {
        let stored = JSON.parse(storedHistory);
        props.setHistoryMany(stored);
      }
    } catch (e) {
      console.log("Warning get in Search index.js: " + e.message);
    }
  };
  if (props.loading == true) {
    return (
      <SafeAreaView style={styles.container}>
        <NezukoLoading />
      </SafeAreaView>
    );
  }
  return props.active == "history" ? (
    <SafeAreaView style={styles.container} keyboardShouldPersistTaps="always">
      <View
        style={{
          width: "100%",
        }}
      >
        {props.history.length > 0 ? (
          props.history.map((data, index) => (
            <TouchableWithoutFeedback
              style={{
                flex: 1,
              }}
              key={index}
              onPress={() => props.searchResult(data, 1)}
            >
              <View
                style={{
                  flexDirection: "row",
                  padding: 15,
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    marginHorizontal: 10,
                  }}
                  source={require("../../assets/images/history_icon.png")}
                />
                <Text numberOfLines={1} style={{ color: "#fff" }}>
                  {data}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))
        ) : (
          <Text style={styles.no_collection}>No history</Text>
        )}
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView keyboardShouldPersistTaps="handled">
          {/* SEARCH LABEL  */}
          {props.result["result"].length < 1 ? (
            <Text
              style={{
                fontSize: 17,
                textAlign: "left",
                fontWeight: "bold",
                color: "#f3f3f3",
                marginLeft: 16,
                paddingVertical: 17,
              }}
              numberOfLines={1}
            >
              No Result found for:{" "}
              <Text style={{ fontWeight: "normal" }}>{props.keyword}</Text>
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 17,
                textAlign: "left",
                fontWeight: "bold",
                color: "#f3f3f3",
                marginLeft: 16,
                paddingVertical: 17,
              }}
            >
              Result found:{" "}
              <Text style={{ fontWeight: "normal" }}>{props.keyword}</Text>
            </Text>
          )}
          {/* CARD RESULT */}
          <View style={styles.card_layout}>
            {props.result["result"].map((data, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() =>
                  NavigateToDetails(props, {
                    link: data["link"],
                    name: data["name"],
                    image: data["image"],
                    origin: "anime",
                  })
                }
              >
                <View style={{ margin: 3 }}>
                  <View>
                    <Image
                      style={styles.card_cover}
                      source={{
                        uri: data["image"],
                      }}
                    />
                    <Text
                      style={[
                        styles.card_released,
                        {
                          paddingVertical: data["released"].length ? 8 : 0,
                          paddingHorizontal: data["released"].length ? 12 : 0,
                        },
                      ]}
                    >
                      {data["released"]}
                    </Text>
                  </View>
                  <Text style={styles.card_name} numberOfLines={2}>
                    {data["name"]}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          {/* PAGINATION  */}
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            {props.result["page"].length > 1 && (
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  color: "#f3f3f3",
                  marginLeft: 16,
                  paddingVertical: 17,
                }}
              >
                Page:
              </Text>
            )}

            <View style={styles.pagination_layout}>
              {props.result &&
                props.result["page"].map((data, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      props.searchResult(props.keyword, data["number"]);
                    }}
                  >
                    <Text
                      style={[
                        styles.pagination_button,
                        data["number"] == props.page &&
                          styles.pagination_button_active,
                      ]}
                    >
                      {data["number"]}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.search.loading,
    result: state.search.result,
    page: state.search.page,
    keyword: state.search.keyword,
    history: state.search.history,
    active: state.search.active,
  };
};

export default connect(mapStateToProps, {
  searchResult,
  activeHandler,
  setHistoryMany,
})(Search);

const styles = StyleSheet.create(externalStyle);
