import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import config from "../../config/axios_config";
import colors from "../../config/colors";
import { externalStyle } from "../../style/externalStyle";
import TanjiroLoading from "../Loading/TanjiroLoading";

const NavigateToDetails = (props, data) => {
  props.navigation.navigate("watch", { newData: data });
};

const Anime = (props) => {
  const [anime, setAnime] = useState();
  const [summaryLines, setSummaryLines] = useState(14);
  const anime_link = props.route.params.newData;
  const mounted = useRef();

  useEffect(() => {
    let isCancelled = false;
    const load = async () => {
      if (!mounted.current) {
        await config.get(anime_link["link"]).then((res) => {
          if (!isCancelled) {
            setAnime(res.data);
          }
        });
        mounted.current = true;
      }
    };
    load();
    return () => {
      isCancelled = true;
    };
  });
  const summaryToggleHandler = () => {
    if (summaryLines == 0) {
      setSummaryLines(14);
    } else {
      setSummaryLines(0);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {anime ? (
        <View
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 100,
              padding: 15,
            }}
          >
            {/* TOP SECTION  */}
            <View>
              <Text style={[styles.anime_primary_info, { padding: 10 }]}>
                {anime["title"]}
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ height: 170, width: 120, borderRadius: 10 }}
                  source={{ uri: anime["image"] }}
                />
                <View style={styles.anime_card_info}>
                  <View>
                    <Text style={styles.text_label}>
                      Status: {anime["status"]}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ flex: 1, color: "#d3d3d3" }}>
                        Genre: {anime["genre"]}
                      </Text>
                    </View>
                    <Text style={styles.text_label}>
                      Released: {anime["released"]}
                    </Text>
                    <Text style={styles.text_label}>Type: {anime["type"]}</Text>
                  </View>
                </View>
              </View>
              <View style={{ marginVertical: 15, paddingHorizontal: 5 }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#d3d3d3",
                    fontSize: 17,
                    paddingVertical: 10,
                  }}
                >
                  Plot Summary
                </Text>
                <TouchableWithoutFeedback onPress={summaryToggleHandler}>
                  <Text
                    numberOfLines={summaryLines}
                    style={{
                      color: "#d3d3d3",
                      lineHeight: 20,
                    }}
                  >
                    {anime["plot_summary"]}
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </ScrollView>

          {/* BOTTOM SECTION */}
          <View
            style={{
              height: 70,
              width: "100%",
              position: "absolute",
              bottom: 0,
              left: 0,
              padding: 10,
            }}
          >
            <TouchableOpacity
              style={{
                padding: 15,
                height: 50,
                width: "100%",
                borderRadius: 10,
                // borderColor: colors.violet,
                // borderWidth: 2,
                backgroundColor: colors.violet,
              }}
              onPress={() =>
                NavigateToDetails(props, {
                  name: anime["title"],
                  link: anime["latest_episode"],
                  image: anime["image"],
                  origin: "watch",
                })
              }
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                Watch Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TanjiroLoading />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create(externalStyle);

export default Anime;
