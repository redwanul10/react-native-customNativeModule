package com.map;

// import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.Promise;
// import com.facebook.react.bridge.ReactContextBaseJavaModule;
// import com.facebook.react.bridge.ReactMethod;
import android.content.Intent;
import com.facebook.react.bridge.Callback;
import android.net.Uri;

import androidx.annotation.NonNull;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;
// import com.dev2qa.example.R;
import android.util.Log;

import com.google.android.gms.location.LocationServices;
import android.location.Location;
import android.location.LocationManager;


import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationListener;


import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationResult;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;


import com.google.android.gms.location.LocationAvailability;
import com.google.android.gms.location.LocationSettingsRequest;
import com.google.android.gms.location.LocationSettingsResponse;
import com.google.android.gms.location.LocationSettingsStatusCodes;
import com.google.android.gms.location.SettingsClient;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
// import java.util.Map;
// import java.util.HashMap;


// import com.facebook.react.bridge.NativeModule;
// import com.facebook.react.bridge.ReactContext;
import java.util.Map;
import java.util.HashMap;
import com.map.MainActivity;

import com.application.isradeleon.notify.Notify;

public class EncryptionModule extends ReactContextBaseJavaModule {

    // Locations Variable
    private LocationRequest mLocationRequest;
    private long UPDATE_INTERVAL = 10 * 1000;  /* 10 secs */
    private long FASTEST_INTERVAL = 2000; /* 2 sec */

    private FusedLocationProviderClient fusedLocationClient;

    private LocationRequest locationRequest;
    private LocationCallback locationCallback;

  private ReactContext mReactContext;

  public EncryptionModule(ReactApplicationContext reactContext) {
    super(reactContext);
    mReactContext = reactContext;
    fusedLocationClient = LocationServices.getFusedLocationProviderClient(reactContext);
    // fusedLocationClient = LocationServices;


  }
  
    private void buildLocationRequest() {
        locationRequest = new LocationRequest(); locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY); locationRequest.setInterval(100);
        locationRequest.setFastestInterval(100); locationRequest.setSmallestDisplacement(1);
    }
    //Build the location callback object and obtain the location results //as demonstrated below:
    private void buildLocationCallBack() {
    locationCallback = new LocationCallback() {
        @Override
        public void onLocationResult(LocationResult locationResult) {
        for (Location location: locationResult.getLocations()){
            String latitude = String.valueOf(location.getLatitude());
            String longitude = String.valueOf(location.getLongitude());
            Toast.makeText(mReactContext, "location got " + latitude, Toast.LENGTH_LONG).show();
        }
        }
    };
    }

    @Override
    public String getName() {
        return "Encryptor";  // Name of the Native Modules.
    }

    /**
    * @param plainText Text to be encrypted(from JS layer)
    */

    // public RNPushNotification(ReactApplicationContext reactContext) {
    //     super(reactContext);

    //     reactContext.addActivityEventListener(this);

    //     Application applicationContext = (Application) reactContext.getApplicationContext();

    //     // The @ReactNative methods use this
    //     mRNPushNotificationHelper = new RNPushNotificationHelper(applicationContext);
    //     // This is used to delivery callbacks to JS
    //     mJsDelivery = new RNPushNotificationJsDelivery(reactContext);
    // }
    
    @ReactMethod
    public void encrypt(String plainText, Promise promise) {
        // try {
        // // Add your encryption logic here 
        // // (can use any JAVA encryption library or use default)
        // String encryptedText = plainText + "This is encrypted text";
        // promise.resolve(encryptedText); // return encryptedText
        // } catch (Exception e) {
        // promise.reject("ENCRYPTION_FAILED", "Encryption Failed");
        // }

        Intent myIntent = new Intent(mReactContext,MainActivity.class);

        Notify.build(mReactContext)

        /*
         * Set notification title and content
         * */
        .setTitle(plainText)
        .setContent("Hi! So I meet you today?")

        /*
         * Set small icon from drawable resource
         * */
        // .setSmallIcon(R.drawable.ic_notifications_none_white_24dp)
        // .setColor(R.color.colorPrimary)

        /*
         * Set notification large icon from drawable resource or URL
         * (make sure you added INTERNET permission to AndroidManifest.xml)
         * */
        .setLargeIcon("https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=440")

        /*
         * Circular large icon
         * */
        .largeCircularIcon()

        /*
         * Add a picture from drawable resource or URL
         * (INTERNET permission needs to be added to AndroidManifest.xml)
         * */
        .setPicture("https://images.pexels.com/photos/1058683/pexels-photo-1058683.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
        .setAction(myIntent)
        .show(); // Show notification
    }

    /**
    * @param encryptedText Text to be decrypted(from JS layer)
    */
    @ReactMethod
    public void decrypt(String encryptedText, Promise promise) {
        try {
        // Add your decryption logic here 
        // (can use any JAVA decryption library or use default)
        String decryptedText = encryptedText + "This is decrypted text";
        promise.resolve(decryptedText); // return decryptedText
        } catch (Exception e) {
        promise.reject("DECRYPTION_FAILED", "Decryption Failed");
        }
    }

    /**
    * @param encryptedText Text to be decrypted(from JS layer)
    */
    @ReactMethod
    public void cancel(String encryptedText, Promise promise) {
        Notify.build(mReactContext).cancelAll(mReactContext);
    }

    


    @ReactMethod
    void dialNumber(String number) {
        // Intent intent = new Intent("android.media.action.IMAGE_CAPTURE");
        // Intent intent = new Intent(Intent.ACTION_CALL, Uri.parse("tel:" + number));
        // intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        // Start android service.
        //  Toast.makeText(this, "Invoke background service onStartCommand method.", Toast.LENGTH_LONG).show();
        Toast.makeText(mReactContext, "started", Toast.LENGTH_LONG).show();
        //  Log.d("MyActivity","I shouldn't be here");
        Intent startServiceIntent = new Intent(mReactContext, MyBackgroundService.class);
        startServiceIntent.putExtra("status","");
        mReactContext.startService(startServiceIntent);

        // mReactContext.startActivity(intent);
    }

    @ReactMethod
    void disableDialNumber(String number) {
        Intent startServiceIntent = new Intent(mReactContext, MyBackgroundService.class);
        startServiceIntent.putExtra("status","stop");
        mReactContext.startService(startServiceIntent);

        // mReactContext.startActivity(intent);
    }

    // @Override
    // protected void onActivityResult(int requestCode, int resultCode, Intent data) {    
    //     if (resultCode == RESULT_OK) {
    //         if (requestCode == 1) {
    //             String filePath = uriFilePath.getPath(); // Here is path of your captured image, so you can create bitmap from it, etc.
    //         }
    //     }
    // }

    /**
    * @param encryptedText Text to be decrypted(from JS layer)
    */
    @ReactMethod
    public void notifyAndroid(Promise promise) {
        try {
            promise.resolve(Notify.build(mReactContext)); // return decryptedText
        } catch (Exception e) {
            promise.reject("DECRYPTION_FAILED", "Decryption Failed");
        }
    }
    @ReactMethod
    public void getLastLocation(Promise promise) {

        try {
            fusedLocationClient.getLastLocation()
                    .addOnSuccessListener(new OnSuccessListener<Location>() {
                        @Override
                        public void onSuccess(Location location) {
                            // GPS location can be null if GPS is switched off
                            if (location != null) {
                                 WritableMap map = Arguments.createMap();
                                 map.putString("lat", String.valueOf(location.getLatitude()));
                                 map.putString("long", String.valueOf(location.getLongitude()));
                                // onLocationChanged(location);
                                promise.resolve(map); // return decryptedText
                                // System.out.println(location);
                                Toast.makeText(mReactContext, "Location Success method called" + location.getLongitude(), Toast.LENGTH_LONG).show();
                            }
                        }
                    })
                    .addOnFailureListener(new OnFailureListener() {
                        @Override
                        public void onFailure(@NonNull Exception e) {
                            promise.reject("DECRYPTION_FAILED", "Failed Location");
                            Toast.makeText(mReactContext, "Location Failure method called", Toast.LENGTH_LONG).show();
                        }
                    });

           
        } catch (Exception e) {
            promise.reject("DECRYPTION_FAILED", "Failed Location");
        }

        // fusedLocationClient.requestLocationUpdates(locationRequest,locationCallback, null);

        // Get last known recent location using new Google Play Services SDK (v11+)
        // FusedLocationProviderClient locationClient = getFusedLocationProviderClient(mReactContext);

        // fusedLocationClient.getLastLocation()
        //             .addOnSuccessListener(new OnSuccessListener<Location>() {
        //                 @Override
        //                 public void onSuccess(Location location) {
        //                     // GPS location can be null if GPS is switched off
        //                     if (location != null) {
        //                         // onLocationChanged(location);
        //                         Toast.makeText(mReactContext, "Location Success method called", Toast.LENGTH_LONG).show();
        //                     }
        //                 }
        //             })
        //             .addOnFailureListener(new OnFailureListener() {
        //                 @Override
        //                 public void onFailure(@NonNull Exception e) {
        //                     Toast.makeText(mReactContext, "Location Failure method called", Toast.LENGTH_LONG).show();
        //                 }
        //             });
    }

}