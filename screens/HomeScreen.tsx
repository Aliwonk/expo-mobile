import { Pressable, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import Header from '../components/Header';
import Layout from '../components/Layout';
import { Text, View } from '../components/Themed';

export default function HomeScreen({navigation}) {
  return (
    <>
      <Layout>
        <View style={styles.container}>
          <Text style={styles.title}>Tab Two</Text>
          {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
        </View>
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
