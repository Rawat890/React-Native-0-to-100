import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import DocumentIcon from '../assets/icons/document.svg';
import PersonIcon from '../assets/icons/person.svg';
import ShieldIcon from '../assets/icons/shield.svg';
import CloudIcon from '../assets/icons/cloud.svg';
import LockIcon from '../assets/icons/lock.svg';

import { FONT_SIZE, FONT_WEIGHT } from '../utils/others';
import { COLORS } from '../utils/colors';
import { scale } from 'react-native-size-matters';
import TextButton from '../components/TextButton';
import { navigate } from '../utils/NavigationService';
import { SCREENS } from '../utils/navigation';

export default function Home() {
  const navigateToSlider = () =>{
    navigate(SCREENS.AddNotes)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.primaryText}>
        Welcome to <Text style={styles.secondaryText}>Secure Notes</Text>
      </Text>

      <Text style={styles.normalText}>
        Great new tools for notes with secure encryption
      </Text>

      <View style={styles.infoContainer}>

        {/* Document Section */}
        <View style={styles.innerContainer}>
          <DocumentIcon width={60} height={60} />
          <View>
            <Text style={styles.titleText}>Add almost anything</Text>
            <Text style={styles.description}>Sketch your thoughts, write your notes</Text>
          </View>
        </View>

        {/* Person Section */}
        <View style={styles.innerContainer}>
          <PersonIcon width={60} height={60} />
          <View>
            <Text style={styles.titleText}>Made for everyone</Text>
            <Text style={styles.description}>
              Easy-to-use even for beginners
            </Text>
          </View>
        </View>

        {/* Shield Section */}
        <View style={styles.innerContainer}>
          <ShieldIcon width={60} height={60} />
          <View>
            <Text style={styles.titleText}>Strong Security</Text>
            <Text style={styles.description}>
              Your notes are encrypted and safe
            </Text>
          </View>
        </View>

        {/* Cloud Section */}
        <View style={styles.innerContainer}>
          <CloudIcon width={60} height={60} />
          <View>
            <Text style={styles.titleText}>Sync Across Devices</Text>
            <Text style={styles.description}>
              Access your notes from anywhere
            </Text>
          </View>
        </View>

        {/* Lock Section */}
        <View style={styles.innerContainer}>
          <LockIcon width={60} height={60} />
          <View>
            <Text style={styles.titleText}>Private by Design</Text>
            <Text style={styles.description}>
              Only you can unlock your notes
            </Text>
          </View>
        </View>

      </View>
      
      <View style={styles.buttonContainer}>
      <TextButton size={'large'} onPress={navigateToSlider}>Continue</TextButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(15),
    paddingTop: scale(30),
    backgroundColor: COLORS.white,
  },
  primaryText: {
    fontSize: FONT_SIZE['2xl'],
    textAlign: 'center',
  },
  secondaryText: {
    fontSize: FONT_SIZE['2xl'],
    color: COLORS.purple,
    fontWeight: FONT_WEIGHT.bold,
  },
  normalText: {
    fontSize: FONT_SIZE.lg,
    marginTop: scale(10),
    textAlign: 'center',
    color: COLORS.gray,
  },
  infoContainer: {
    marginTop: scale(30),
  },
  innerContainer: {
    flexDirection: 'row',
    gap: scale(20),
    paddingVertical: scale(15),
    alignItems: 'center',
  },
  titleText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.black,
  },
  description: {
    fontSize: FONT_SIZE.md,
    color: COLORS.black,
    marginTop: scale(5),
  },
  buttonContainer:{
    marginTop: scale(110)
  }
});
