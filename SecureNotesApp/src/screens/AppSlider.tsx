import * as React from "react";
import { Dimensions, Text, View, Image, StyleSheet } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import { scale } from "react-native-size-matters";
import { COLORS } from "../utils/colors";
import { SLIDER_DATA } from "../utils/data";
import TextButton from "../components/TextButton";
import { FONT_SIZE, FONT_WEIGHT } from "../utils/others";
import { navigate } from "../utils/NavigationService";
import { SCREENS } from "../utils/navigation";

const { width, height } = Dimensions.get("window");

export default function AppSlider() {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const handleGetStarted = () => {
    navigate(SCREENS.Home);
  };

  const onSnapToItem = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <View style={styles.mainContainer}>
      <Carousel
        ref={ref}
        width={width}
        height={height * 0.75}
        data={SLIDER_DATA}
        onProgressChange={progress}
        onSnapToItem={onSnapToItem}
        pagingEnabled
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} resizeMode="contain" />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
          </View>
        )}
      />
      
      <View style={styles.bottomContainer}>
        <View style={styles.dotContainer}>
          <Pagination.Basic
            progress={progress}
            data={SLIDER_DATA}
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
            containerStyle={styles.container}
            onPress={onPressPagination}
          />
        </View>
        
        {currentIndex === SLIDER_DATA.length - 1 && (
          // <View style={styles.buttonContainer}>
          <TextButton onPress={handleGetStarted}>
            GET STARTED
          </TextButton>
            // </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.lightBlue
  },
  container: { 
    gap: 8,
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scale(20),
    paddingTop: scale(40),
    backgroundColor: COLORS.lightBlue
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    marginBottom: scale(40),
  },
  textContainer: {
    width: "100%",
    paddingHorizontal: scale(10),
  },
  title: {
    fontSize: scale(24),
    fontWeight: "700",
    color: COLORS.black,
    textAlign: "center",
    marginBottom: scale(15),
    lineHeight: scale(32),
  },
  subtitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    textAlign: "center",
    color: COLORS.red,
    paddingHorizontal: scale(10),
    lineHeight: scale(22),
  },
  dot: {
    width: scale(10),
    height: scale(10),
    backgroundColor: COLORS.gray,
    borderRadius: scale(50),
  },
  activeDot: {
    width: scale(12),
    height: scale(12),
    backgroundColor: COLORS.purple,
    borderRadius: scale(50),
  },
  bottomContainer: {
    position: "absolute",
    bottom: scale(40),
    width: "100%",
    alignItems: "center",
  },
  dotContainer: {
    marginBottom: scale(20),
  },
  buttonContainer:{
  marginHorizontal: scale(10),
  },
  button: {
    backgroundColor: COLORS.purple,
    paddingHorizontal: scale(50),
    paddingVertical: scale(15),
    borderRadius: scale(25),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: scale(16),
    fontWeight: "700",
    textAlign: "center",
  },
});