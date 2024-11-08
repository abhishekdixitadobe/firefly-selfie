// src/components/ProfileTile.js
import React from 'react';
import { View, Image } from '@adobe/react-spectrum';

const ProfileTile = ({ imageUrl }) => (
  <View
    borderWidth="thin"
    borderColor="dark"
    borderRadius="medium"
    overflow="hidden"
    UNSAFE_style={{ width: '100%', aspectRatio: '1' }}
  >
    <Image src={imageUrl} alt="Profile" objectFit="cover" width="100%" height="100%" />
  </View>
);

export default ProfileTile;
