import colors from "../config/colors";
import { Platform, StatusBar, Dimensions } from "react-native";
const device = Dimensions.get("screen").width;

export const externalStyle = {
  container: {
    backgroundColor: colors.dark,
    flex: 1,
    alignItems: "flex-start",
  },
  card_layout: {
    flex: 1,
    marginHorizontal: 4,
    flexWrap: "wrap",
    alignSelf: "center",
    flexDirection: "row",
  },
  card: { width: device / 3 - 2.7 },
  card_cover: {
    height: 175,
  },
  card_name: {
    textAlign: "center",
    padding: 15,
    fontWeight: "bold",
    color: "#fff",
    fontSize: 11,
  },
  card_filter: {
    position: "absolute",
    top: 0,
    fontSize: 11,
    left: 0,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    color: "#fff",
    borderBottomRightRadius: 15,
  },
  card_episode: {
    position: "absolute",
    bottom: 0,
    right: 0,
    fontSize: 11,
    backgroundColor: "#673ab7",
    color: "#fff",
    borderTopLeftRadius: 15,
  },
  card_released: {
    position: "absolute",
    bottom: 0,
    right: 0,
    fontSize: 11,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    color: "#fff",
    borderTopLeftRadius: 15,
  },
  logo_text1: {
    color: "#000",
    fontFamily: "mont",
  },
  logo_text2: {
    color: "#471",
  },
  header_style: { backgroundColor: colors.dark },
  pagination_layout: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  pagination_button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    // margin: 10,
    color: "#fff",
    backgroundColor: colors.lightdark,
  },
  pagination_button_active: {
    backgroundColor: colors.violet,
  },
  anime_primary_info: {
    color: "#fff",
    fontSize: 20,
  },
  anime_secondary_info: {
    paddingVertical: 3,
    lineHeight: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  text_label: {
    color: "#d3d3d3",
    lineHeight: 20,
  },
  anime_card_info: {
    flex: 1,
    padding: 20,
    // minHeight: 170,
    backgroundColor: colors.lightdark,
    borderRadius: 10,
    justifyContent: "center",
    marginLeft: 10,
  },

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
  loading_layout: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  loading_image: { borderRadius: 150, width: 150, height: 100 },
  no_collection: {
    // backgroundColor: "red",
    // flex: 1,
    width: "100%",
    textAlign: "center",
    fontSize: 14,
    padding: 20,
    color: "#fff",
  },
  header_title: {
    fontFamily: "mont",
    fontSize: 18,
  },
};
