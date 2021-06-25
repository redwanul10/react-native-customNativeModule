/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

let demoTest = {}

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
// import MapView from 'react-native-maps';

import { NativeModules } from 'react-native';
import requestLocationPermission from './helper/getGeoLocation';
import getBackgroundLocation from './helper/getBackgroundLocation';
import { getGlobalData, storeGlobalData } from './helper/localStorage';

const Encryptor = NativeModules.Encryptor;

const Section = ({ children, title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [location, setLocation] = useState({});
  const [userInfo, setUserInfo] = useState({ name: "redwan", accId: 1 });

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // useEffect(()=>{
  //   requestLocationPermission(setLocation)
  // },[])

  useEffect(() => {
    // console.log("Location got in useEffect",location)
    // console.log("Location got Demo Variable",location)
    // getGlobalData((savedData)=>{
    //   // console.log("localstorage geo info",savedData)
    //   alert(JSON.stringify(location));
    // })
    // setTimeout(()=> setUserInfo({...userInfo,accId:2}),10000)


  }, [])

  return (
    <SafeAreaView>
      <Text style={{ fontSize: 20 }}>Test Foregound Service</Text>
      <Button
        title="Stop Service"
        onPress={() => {
          // ReactNativeForegroundService.stop()
          // ReactNativeForegroundService.remove_all_tasks()
          // ReactNativeForegroundService.remove_task("taskid")
          // ReactNativeForegroundService.update({
          //   id: 'taskid',
          //   title:"update demo",
          //   message:"sdfsdfwer sdfewrwer",
          // });

          ReactNativeForegroundService.stop();
        }}></Button>

      <Button
        title="Status"
        style={{ marginTop: 10 }}
        onPress={() => {
          console.log(ReactNativeForegroundService.is_running());
        }}></Button>

      <Button
        title="start"
        onPress={() => {
          ReactNativeForegroundService.add_task(
            () => {


              // console.log('get my location');
              requestLocationPermission(async location => {
                // if(setLocation) setLocation(location);
                // demoTest = location
                // await storeGlobalData(location)
                // alert(JSON.stringify(location));
                fetch('https://jsonplaceholder.typicode.com/todos/' + userInfo?.accId)
                  .then(response => response.json())
                  .then(json => console.log(json))

              });
              // getBackgroundLocation(setLocation);
              // Encryptor.getLastLocation()
              // .then((lat,long )=> {
              //   console.log("got === ",lat,long )
              // })
              // .catch(res => {
              //   console.log("success fully failed")
              // })
            },
            {
              delay: 5000,
              onLoop: true,
              taskId: 'taskid',
              onError: e => console.log(`Error logging:`, e),
            },
          );

          ReactNativeForegroundService.start({
            id: 144,
            title: 'RTM',
            message: 'Tracking Your Location',
          });
        }}></Button>

      <Button
        title="Encrypt"
        onPress={e => {
          Encryptor.encrypt('ami zahid noakhailla')
            .then(res => {
              console.log('this is response', res);
            })
            .catch(err => {
              console.log(err);
            });
        }}></Button>

      <Button
        title="calcel"
        onPress={e => {
          Encryptor.cancel('demoText');
        }}></Button>

      <Button
        title="Start Native Background Service"
        onPress={e => {
          Encryptor.dialNumber('123');
        }}></Button>

      <Button
        title="Stop Native Background Service"
        onPress={e => {
          Encryptor.disableDialNumber('123');
        }}></Button>

      <Button
        title="Get Background Location"
        onPress={e => {
          // getBackgroundLocation();
          Encryptor.getLastLocation()
            .then((lat, long) => {
              console.log("got === ", lat, long)
            })
            .catch(res => {
              console.log("success fully failed")
            })
        }}></Button>

      {/* <Button
        title="notify"
        onPress={e => {
          Encryptor.notifyAndroid()
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          });
        }}></Button> */}

      <Text>
        {' '}
        Location is lat:{location?.latitude} long:{location?.longitude}
      </Text>
      <Text>
        {' '}
        Id{userInfo.accId}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
