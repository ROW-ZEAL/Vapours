import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const navigation = useNavigation();

  useEffect(() => {
    const whiteScreenTimeout = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        navigation.replace("AccountTypeSelection");
      }, 3000);
    }, 3000);

    return () => clearTimeout(whiteScreenTimeout);
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.logoContainer, opacity: fadeAnim }}>
        <Image
          source={require("../../../assets/logo-design.png")}
          style={styles.logo}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: "contain",
  },
});

export default SplashScreen;
