import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  TouchableOpacityBase,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import config from "../../config/axios_config.js";
import { WebView } from "react-native-webview";
import { externalStyle } from "../../style/externalStyle.js";
import colors from "../../config/colors";
import TanjiroLoading from "../Loading/TanjiroLoading";
export default function Watch(props) {
  const anime_link = props.route.params.newData;
  const [anime, setAnime] = useState(null);
  const mounted = useRef();
  const [loading, setLoading] = useState(true);
  const [innerLoading, setInnerLoading] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    const load = async () => {
      if (!mounted.current) {
        await config
          .get("/anime/" + anime_link["link"])
          .then((res) => {
            if (!isCancelled) {
              setAnime(res.data);
              setLoading(false);
            }
          })
          .catch((e) =>
            console.log("Warning error occur in Watch index.js", e.message)
          );
        mounted.current = true;
      }
    };
    load();
    return () => {
      isCancelled = true;
    };
  });

  const otherEpisodeHandler = async (link) => {
    let range = link.split("-");
    setInnerLoading(true);
    await config
      .get(
        `/other-episode/${anime["link"]}/${range[0]}/${range[1]}/${anime["id"]}/${anime["default_episode"]}`
      )
      .then((res) => {
        setInnerLoading(false);
        setAnime({ ...anime, related_episode: res.data["related_episode"] });
      })
      .catch((e) =>
        console.log("Warning error occur in Watch index.js", e.message)
      );
  };
  const episodeHandler = async (link) => {
    setInnerLoading(true);
    await config
      .get("/anime/" + link)
      .then((res) => {
        setAnime(res.data);
        setInnerLoading(false);
      })
      .catch((e) =>
        console.log("Warning error occur in Watch index.js", e.message)
      );
  };
  return !loading ? (
    <SafeAreaView style={styles.container}>
      {innerLoading && <TanjiroLoading />}
      <View style={{ width: "100%" }}>
        <ScrollView>
          {/* Iframe  */}
          <View
            style={{
              width: "100%",
              backgroundColor: colors.dark,
            }}
          >
            <WebView
              scrollEnabled={false}
              automaticallyAdjustContentInsets={false}
              style={{ height: 260, width: "100%" }}
              source={{
                uri: anime["iframe"],
                headers: {
                  "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/517.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/517.36",
                },
              }}
              allowsFullscreenVideo={true}
            />
          </View>
          <View style={{ padding: 10 }}>
            <Text style={[styles.anime_primary_info, { paddingVertical: 2 }]}>
              {anime["title"]}
            </Text>
            <Text style={styles.anime_secondary_info}>
              Anime:{" "}
              <Text style={{ fontWeight: "normal", color: colors.violet }}>
                {anime["name"]}
              </Text>
            </Text>
            <Text style={styles.anime_secondary_info}>
              Category:{" "}
              <Text style={{ fontWeight: "normal", color: colors.violet }}>
                {anime["category"]}
              </Text>
            </Text>
            {/* Other Episode  */}
            <Text style={{ color: "#fff", paddingVertical: 10 }}>
              Other Episodes:
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {anime["other_episode"].map((data, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    otherEpisodeHandler(data);
                  }}
                >
                  <Text
                    style={{
                      backgroundColor: colors.lightdark,
                      color: "#fff",
                      fontSize: 11,
                      textAlign: "center",
                      margin: 5,
                      padding: 10,
                    }}
                  >
                    {data}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* Episodes  */}
            <Text style={{ color: "#fff", paddingBottom: 10 }}>Episodes:</Text>
            <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
              {anime["related_episode"].map((data, index) => (
                <TouchableOpacity
                  key={index}
                  style={{ width: "33.33%" }}
                  onPress={() => episodeHandler(data["link"])}
                >
                  <Text
                    style={{
                      backgroundColor:
                        anime["default_episode"] != data["number"]
                          ? colors.lightdark
                          : colors.violet,
                      color: "#fff",
                      fontSize: 11,
                      textAlign: "center",
                      margin: 2,
                      padding: 10,
                    }}
                  >
                    Episode | {data["number"]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.container}>
      <TanjiroLoading />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create(externalStyle);
