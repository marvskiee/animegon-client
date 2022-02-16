import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { externalStyle } from "../../../style/externalStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setCollectionMany } from "../../../redux";
import { connect } from "react-redux";

function CollectionHeaderRight(props) {
  const mounted = useRef();
  const anime = props.route.params.newData;
  const [added, setAdded] = useState(false);
  const [collection, setCollection] = useState([]);
  useEffect(() => {
    if (!mounted.current) {
      getData();
      mounted.current = true;
    }
  });
  const checker = (stored) => {
    let items = stored;
    let i = 0;
    while (i < items.length) {
      if (items[i]["name"] == anime["name"]) {
        setAdded(true);

        return true;
      }
      i = i + 1;
    }
    setAdded(false);
    return false;
  };
  const storeData = async (data) => {
    let prevCollection = props.collections;
    // if not exits in the list
    if (!checker(prevCollection)) {
      prevCollection.unshift(data);
      let newCollection = prevCollection;
      try {
        await AsyncStorage.setItem("collection", JSON.stringify(newCollection));
      } catch (e) {
        console.log("Warning set in CollectionHeaderRight.js: " + e);
      } finally {
        setCollection(newCollection);
        setAdded(true);
        collectionHandler(true);
        props.setCollectionMany(newCollection);
      }
    } else {
      let temp = [];
      let i = 0;
      for (i in prevCollection) {
        if (prevCollection[i]["name"] != data["name"]) {
          temp.unshift(prevCollection[i]);
        }
      }
      let newCollection = temp;
      try {
        await AsyncStorage.setItem("collection", JSON.stringify(newCollection));
      } catch (e) {
        console.log("Warning set in CollectionHeaderRight.js: " + e);
      } finally {
        setCollection(newCollection);
        setAdded(false);
        collectionHandler(false);
        props.setCollectionMany(newCollection);
      }
    }
  };
  const getData = async () => {
    try {
      const storedCollection = await AsyncStorage.getItem("collection");
      if (storedCollection !== null) {
        let stored = JSON.parse(storedCollection);
        setCollection(stored);
        checker(stored);
      }
    } catch (e) {
      console.log("Warning get in CollectionHeaderRight.js: " + e.message);
    }
  };

  const collectionHandler = (status) => {
    ToastAndroid.show(status ? "Collection Saved" : "Collection Unsaved", 2000);
  };
  return (
    <View>
      <TouchableOpacity onPress={() => storeData(anime)}>
        {added ? (
          <Image
            style={styles.header_icon}
            source={require("../../../assets/images/collection_icon_active.png")}
          />
        ) : (
          <Image
            style={styles.header_icon}
            source={require("../../../assets/images/collection_icon.png")}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
const mapStateToProps = (state) => {
  return {
    collections: state.collection.collections,
  };
};

export default connect(mapStateToProps, {
  setCollectionMany,
})(CollectionHeaderRight);

const styles = StyleSheet.create(externalStyle);
