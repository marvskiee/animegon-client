// REDUX
import { Provider } from "react-redux";
import store from "./redux/store";

import { StyleSheet } from "react-native";
// REACT STYLE
import { externalStyle } from "./style/externalStyle";
// REACT COMPONENTS
import Watch from "./components/Watch";
import Home from "./components/Home";
// REACT FONTS
import { useFonts } from "expo-font";
// REACT NAVIGATION
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeHeaderLeft from "./components/Home/components/HomeHeaderLeft.js";
import HomeHeaderRight from "./components/Home/components/HomeHeaderRight.js";

import CollectionHeaderRight from "./components/Collection/components/CollectionHeaderRight";
import Collection from "./components/Collection";
import SearchScreen from "./components/Search";
import SearchHeaderRight from "./components/Search/components/SearchHeaderRight";
import Anime from "./components/Anime/";
import CollectionHeaderInfo from "./components/Collection/components/CollectionHeaderInfo";
import WatchHeaderRight from "./components/Watch/components/WatchHeaderRight";

export default function App() {
  const [loaded] = useFonts({
    mont: require("./assets/fonts/mont-heavy.otf"),
  });
  const Stack = createNativeStackNavigator();

  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="home">
          <Stack.Screen
            title="AnimeKrazy"
            name="home"
            component={Home}
            options={(props) => ({
              title: "",
              headerStyle: styles.header_style,
              headerLeft: () => <HomeHeaderLeft {...props} />,
              headerRight: () => <HomeHeaderRight {...props} />,
            })}
          />
          <Stack.Screen
            name="watch"
            component={Watch}
            options={(props) => ({
              title: "Watch",
              headerTintColor: "#fff",
              headerTitleStyle: styles.header_title,
              headerStyle: styles.header_style,
              headerRight: () => <WatchHeaderRight {...props} />,
            })}
          />
          <Stack.Screen
            title="Anime"
            name="anime"
            component={Anime}
            options={(props) => ({
              title: "Anime",
              headerTintColor: "#fff",
              headerTitleStyle: styles.header_title,
              headerStyle: styles.header_style,
              headerRight: () => <CollectionHeaderRight {...props} />,
            })}
          />
          <Stack.Screen
            name="search"
            component={SearchScreen}
            options={(props) => ({
              title: "",
              headerTintColor: "#fff",
              headerStyle: styles.header_style,
              headerRight: () => <SearchHeaderRight {...props} />,
            })}
          />
          <Stack.Screen
            name="collection"
            component={Collection}
            options={{
              title: "Collection",
              headerTintColor: "#fff",
              headerTitleStyle: styles.header_title,
              headerStyle: styles.header_style,
              headerRight: () => <CollectionHeaderInfo />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create(externalStyle);
