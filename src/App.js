import React, { useState, useEffect } from 'react';
import { Flex, Grid, View, Provider, defaultTheme } from '@adobe/react-spectrum';
import ProfileTile from './components/ProfileTile';
import Hero from './components/hero';
import Footer from './components/footer';
import Header from './components/header';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from '@react-spectrum/toast';

const App = () => {
  const [imageUrls, setImageUrls] = useState([]);

  const fetchImageUrls = async () => {
    try {
      const response = await axios.post('https://786177-assetrefreshaio-stage.adobeio-static.net/api/v1/web/assetrefreshAIO/imageGallery');
      const reversedUrls = response.data.imageUrls.reverse(); // Reversing the array
      setImageUrls(reversedUrls);
    } catch (error) {
      console.error('Error fetching image URLs:', error);
    }
  };

  useEffect(() => {
    // Fetch initial set of images
    fetchImageUrls();

    // Set interval for auto-refresh every 30 seconds (30000 ms)
    const intervalId = setInterval(() => {
      fetchImageUrls();
    }, 30000);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array to run only on mount

  return (
    <Provider theme={defaultTheme} colorScheme="light">
      <BrowserRouter>
        <div className="applicationContentWrapper">
          <ToastContainer />
          <Grid
            areas={['header header', 'content content', 'footer footer']}
            columns={['1fr']}
            rows={['size-800', 'auto', 'size-1000']}
            height="100%"
            gap="size-200"
          >
            <View
              gridArea="header"
              borderBottomColor="gray-300"
              borderBottomWidth="thin"
            >
              <Header />
            </View>
            <View
              gridArea="content"
              height="100%"  // Ensuring content area takes up full height
              backgroundColor="gray-100"
            >
              <Flex direction="column" width="80%" gap="size-200" alignItems="center" marginX="auto">
                <View height="size-2600" marginTop="size-400" width="100%">
                  <Hero />
                </View>

                <View width="100%">
                  <Flex direction="column" gap={50}>
                    <Grid columns="1fr 1fr 1fr" gap="size-300" marginBottom="size-1000">
                      {imageUrls.slice(0, 16).map((url, index) => (
                        <ProfileTile key={index} imageUrl={url} />
                      ))}
                    </Grid>
                  </Flex>
                </View>
              </Flex>
            </View>
            <View gridArea="footer" width="100%" height="size-1000">
              <Footer />
            </View>
          </Grid>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
