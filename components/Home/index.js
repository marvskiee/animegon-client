import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import { externalStyle } from "../../style/externalStyle";
import PreviewCard from "./components/PreviewCard";
import config from "../../config/axios_config";
import TanjiroLoading from "../Loading/TanjiroLoading";
export default function Home(props) {
  const mounted = useRef();
  const [data, setData] = useState();
  useEffect(async () => {
    if (!mounted.current) {
      await config
        .get("")
        .then((res) => {
          setData(res.data.latest);
        })
        .catch((err) =>
          console.log("Warning error occur in Home index.js", err.message)
        );
      mounted.current = true;
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      {!data ? (
        <TanjiroLoading />
      ) : (
        <ScrollView>
          <View>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                color: "#f3f3f3",
                marginLeft: 16,
                paddingVertical: 17,
              }}
            >
              Latest Release
            </Text>
            <PreviewCard data={data} action={props} />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create(externalStyle);
