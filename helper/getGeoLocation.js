import {Alert, PermissionsAndroid, Linking} from 'react-native';
import {Toast} from 'native-base';
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';

export default async function requestLocationPermission(setter, setLoading) {

  Geolocation.getCurrentPosition(
    (position) => {
      if(setter) setter(position.coords);
      //       if (setLoading) setLoading(false);
    },
    (error) => {
      // console.log(error.code, error.message);
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );

  // try {
  //   const granted = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
  //     {
  //       title: 'Location Permission',
  //       message:
  //         'This App needs access to your location ' +
  //         'so we can know where you are.',
  //     },
  //   );
  //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //     Geolocation.getCurrentPosition(
  //       (position) => {
  //         setter(position.coords);
  //         //       if (setLoading) setLoading(false);
  //       },
  //       (error) => {
  //         // console.log(error.code, error.message);
  //       },
  //       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //     );
  //   } else {
  //     // console.log('Location permission denied');
  //     Alert.alert(
  //       'Location Permission Denied',
  //       'Please trun on your location',
  //       [
  //         {
  //           text: 'Cancel',
  //           onPress: () => {},
  //           style: 'cancel',
  //         },
  //         {text: 'Open', onPress: () => Linking.openSettings()},
  //       ],
  //       {cancelable: true},
  //     );
  //   }
  // } catch (err) {
  //   console.warn(err);
  // }
}

// export default function getGeoLocation(setter, setLoading) {
//   Geolocation.getCurrentPosition(
//     (pos) => {
//       setter(pos.coords);
//       if (setLoading) setLoading(false);
//     },
//     (err) => {
//       console.log(JSON.stringify(err, null, 2));
//       if (setLoading) setLoading(false);
//       Toast.show({
//         text: err.message,
//         type: 'danger',

//         duration: 3000,
//       });
//       if (err.message === 'Location permission was not granted.') {
//         Alert.alert(
//           'Location Permission Required',
//           err.message,
//           [
//             {
//               text: 'Cancel',
//               onPress: () => {},
//               style: 'cancel',
//             },
//             {text: 'OK', onPress: () => Linking.openSettings()},
//           ],
//           {cancelable: true},
//         );
//       }
//     },
//   );
// }
