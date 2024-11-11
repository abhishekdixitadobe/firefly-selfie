import React, { useState, useEffect } from 'react';
import { Flex, Grid, View, Provider, defaultTheme, Button, ActionButton, ToggleButton } from '@adobe/react-spectrum';
import ProfileTile from './components/ProfileTile';
import ChevronLeft from '@spectrum-icons/workflow/ChevronLeft';
import ChevronRight from '@spectrum-icons/workflow/ChevronRight';
import Play from '@spectrum-icons/workflow/Play';
import Pause from '@spectrum-icons/workflow/Pause';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Hero from './components/hero';

const Carousel = ({ imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const imagesPerPage = 18; // 6 columns x 3 rows
  const autoPlayInterval = 10000;

  const nextImageSet = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + imagesPerPage >= imageUrls.length ? 0 : prevIndex + imagesPerPage
    );
  };

  const prevImageSet = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - imagesPerPage < 0 ? imageUrls.length - imagesPerPage : prevIndex - imagesPerPage
    );
  };

  // Auto-play effect
  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(nextImageSet, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, imageUrls]);

  return (
    <Flex direction="column" alignItems="center" gap="size-200">
      {/* Grid layout for displaying 6 images (2 rows, 3 columns) */}
      <Grid columns="repeat(6, 1fr)" rows="repeat(3, 1fr)" gap="size-200" alignItems="center">
        {imageUrls.slice(currentIndex, currentIndex + imagesPerPage).map((url, index) => (
          <View key={index} width="size-2000" height="size-2000">
            <ProfileTile imageUrl={url} />
          </View>
        ))}
      </Grid>
      
      {/* Navigation and Auto-play controls */}
      <Flex gap="size-200" marginTop="size-400" alignItems="center">
        <ActionButton onPress={prevImageSet}>
          <ChevronLeft />
        </ActionButton>

        <ToggleButton isSelected={isAutoPlay} onPress={() => setIsAutoPlay(!isAutoPlay)}>
          {isAutoPlay ? <Pause /> : <Play />}
        </ToggleButton>

        <ActionButton onPress={nextImageSet}>
          <ChevronRight />
        </ActionButton>
      </Flex>
    </Flex>
  );
};

const App = () => {
  const [imageUrls, setImageUrls] = useState([]);

  const fetchImageUrls = async () => {
    try {
      const response = await axios.post('https://786177-assetrefreshaio-stage.adobeio-static.net/api/v1/web/assetrefreshAIO/imageGallery');
      setImageUrls(response.data.imageUrls.reverse());
    } catch (error) {
      console.error('Error fetching image URLs:', error);
    }
  };

  useEffect(() => {
    fetchImageUrls();
    const intervalId = setInterval(fetchImageUrls, 30000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Provider theme={defaultTheme} colorScheme="light">
		<BrowserRouter>
			  <div className="applicationContentWrapper">
				<Flex direction="column" height="100vh" justifyContent="space-between">
					<View borderBottomColor="gray-300" borderBottomWidth="thin">
					  <Header />
					</View>
					<View height="size-1200"  width="100%">
						  <Hero />
						</View>
						<Grid
						  areas={['content']}
						  columns={['1fr']}
						  rows={['auto']}
						  height="100%"
						  gap="size-200"
						>
						  <View
							gridArea="content"
							height="100%"
							backgroundColor="gray-100"
							padding="size-300"
						  >
							<Carousel imageUrls={imageUrls} />
						  </View>
						</Grid>
				</Flex>
			  </div>
		</BrowserRouter>
    </Provider>
  );
};

export default App;
