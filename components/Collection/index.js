import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { externalStyle } from "../../style/externalStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setCollectionMany } from "../../redux";
import { connect } from "react-redux";

const NavigateToDetails = (props, data) => {
  let path = "";
  data["origin"] == "watch" ? (path = "watch") : (path = "anime");
  props.navigation.navigate(path, { newData: data });
};
function Collection(props) {
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      getData();
      mounted.current = true;
    }
  });

  const getData = async () => {
    try {
      const storedCollection = await AsyncStorage.getItem("collection");
      if (storedCollection !== null) {
        let stored = JSON.parse(storedCollection);
        props.setCollectionMany(stored);
      }
    } catch (e) {
      console.log("Warning get in Collection.js: " + e.message);
    }
  };
  return !props.loading ? (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={[styles.card_layout, { marginTop: 10 }]}>
          {props.collections.length > 0 ? (
            props.collections.map((data, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() =>
                  NavigateToDetails(props, {
                    link: data["link"],
                    name: data["name"],
                    image: data["image"],
                    origin: data["origin"],
                  })
                }
              >
                <View style={{ margin: 3 }}>
                  <View>
                    <Image
                      style={styles.card_cover}
                      source={{ uri: data["image"] }}
                    />
                    <Text
                      style={[
                        styles.card_released,
                        {
                          paddingVertical: 8,
                          paddingHorizontal: 12,
                        },
                      ]}
                    >
                      {data["origin"].toUpperCase()}
                    </Text>
                  </View>
                  <Text numberOfLines={2} style={styles.card_name}>
                    {data["name"]}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.no_collection}>No Collection Found</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  ) : (
    <SafeAreaView></SafeAreaView>
  );
}
const mapStateToProps = (state) => {
  return {
    loading: state.collection.loading,
    collections: state.collection.collections,
  };
};

export default connect(mapStateToProps, {
  setCollectionMany,
})(Collection);

const styles = StyleSheet.create(externalStyle);
