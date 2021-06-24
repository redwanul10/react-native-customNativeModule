import React from 'react';
import {} from 'react-native';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import RNLocation from 'react-native-location';


const getBackgroundLocation = (setLocation) => {
  RNLocation.configure({
    // distanceFilter: 1, // Meters
    desiredAccuracy: {
      ios: 'best',
      android: 'balancedPowerAccuracy',
    },
    // Android only
    androidProvider: 'auto',
    interval: 100, // Milliseconds
    fastestInterval: 10000, // Milliseconds
    maxWaitTime: 100, // Milliseconds
    // iOS Only
    activityType: 'other',
    allowsBackgroundLocationUpdates: false,
    headingFilter: 1, // Degrees
    headingOrientation: 'portrait',
    pausesLocationUpdatesAutomatically: false,
    showsBackgroundLocationIndicator: false,
  });
  let locationSubscription = null;
  let locationTimeout = null;

  ReactNativeForegroundService.add_task(
    () => {
      RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'fine',
        },
      }).then(granted => {
        // console.log('Location Permissions: ', granted);
        // if has permissions try to obtain location with RN location
        if (granted) {
            console.log('Location Permissions: ', granted);
            // RNLocation.subscribeToLocationUpdates(locations => {
            //     console.log(locations)
            // })
          locationSubscription && locationSubscription();
          locationSubscription = RNLocation.subscribeToLocationUpdates(
            ([locations]) => {
                if(alert) alert("location updated")
              locationSubscription();
              locationTimeout && clearTimeout(locationTimeout);
              if(setLocation) setLocation(locations)
            //   console.log(locations);
            },
          );
        } else {
          locationSubscription && locationSubscription();
          locationTimeout && clearTimeout(locationTimeout);
          console.log('no permissions to obtain location');
        }
      });
    },
    {
      delay: 5000,
      onLoop: true,
      taskId: 'taskid',
      onError: e => console.log('Error logging:', e),
    },
  );

  ReactNativeForegroundService.start({
    id: 144,
    title: "Foreground Service",
    message: "you are online!",
  });
};

export default getBackgroundLocation;
