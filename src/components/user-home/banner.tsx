import {
  Dimensions,
  Pressable,
  View,
  Image,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {images} from '../../constant';

interface IProps {
  carouselData: any[];
  isLooped?: boolean;
  imageContainerStyle?: ViewStyle;
}

const {width: screenWidth} = Dimensions.get('window');

const BannerCarousel: React.FC<IProps> = ({
  carouselData,
  imageContainerStyle,
  isLooped = false,
}) => {
  const [imageAspectRatio, setImageAspectRatio] = useState(10 / 5);
  const [slideIndex, setSlideIndex] = useState(0);

  const carouselRef = React.useRef<Carousel<string>>(null);

  return (
    <View style={styles.container}>
      {carouselData?.length > 0 ? (
        <Carousel
          ref={carouselRef}
          data={['0', '0', '0', '0']}
          sliderWidth={screenWidth}
          itemWidth={screenWidth - 40}
          inactiveSlideScale={1}
          useScrollView={true}
          autoplay={true}
          loop={isLooped}
          vertical={false}
          autoplayInterval={5000}
          onSnapToItem={index => setSlideIndex(index)}
          renderItem={({item, index}) => (
            <Pressable
              key={index} // Passing key directly here
              style={[
                styles.bannerContainer,
                {aspectRatio: imageAspectRatio},
                imageContainerStyle,
              ]}>
              <Image
                style={styles.bannerImage}
                source={{
                  uri: images.banner,
                }}
                resizeMode={'cover'}
                defaultSource={{
                  uri: images.banner,
                }}
              />
            </Pressable>
          )}
        />
      ) : null}
      {carouselData?.length > 1 && (
        <Pagination
          dotsLength={carouselData.length}
          activeDotIndex={slideIndex}
          containerStyle={styles.paginationContainer}
          dotStyle={styles.activePaginationDot}
          inactiveDotStyle={styles.inActivePaginationDot}
          carouselRef={carouselRef}
          tappableDots={true}
        />
      )}
    </View>
  );
};

export default BannerCarousel;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 12,
  },
  bannerContainer: {
    width: '94%',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
    overflow: 'hidden',
  },
  paginationContainer: {
    paddingVertical: 0,
    marginTop: 8,
  },
  activePaginationDot: {
    width: 40,
    height: 5,
    borderRadius: 5,
    marginHorizontal: -5,
  },
  inActivePaginationDot: {
    width: 30,
    height: 10,
    borderRadius: 5,
    marginHorizontal: -12,
  },
});
