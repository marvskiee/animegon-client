import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { externalStyle } from "../../../style/externalStyle";
export default function PreviewCard(props) {
  const NavigateToDetails = (action, data) => {
    action.navigation.navigate("watch", { newData: data });
  };
  return (
    <View style={styles.card_layout}>
      {props.data &&
        props.data.map((data, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() =>
              NavigateToDetails(props.action, {
                link: data["link"],
                name: data["name"],
                image: data["image"],
                origin: "watch",
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
                    styles.card_filter,
                    {
                      paddingVertical: data["filter"].length ? 8 : 0,
                      paddingHorizontal: data["filter"].length ? 12 : 0,
                    },
                  ]}
                >
                  {data["filter"]}
                </Text>
                <Text
                  style={[
                    styles.card_episode,
                    {
                      paddingVertical: data["episode"].length ? 8 : 0,
                      paddingHorizontal: data["episode"].length ? 12 : 0,
                    },
                  ]}
                >
                  {data["episode"]}
                </Text>
              </View>
              <Text style={styles.card_name} numberOfLines={2}>
                {data["name"]}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );
}

const styles = StyleSheet.create(externalStyle);
