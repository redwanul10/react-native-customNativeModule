package com.map;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import android.util.Log;

public class EncryptionPackage implements ReactPackage {

@Override
public List<ViewManager> createViewManagers(
  ReactApplicationContext reactContext
) {
    return Collections.emptyList();
}

@Override
public List<NativeModule> createNativeModules(
      ReactApplicationContext reactContext
) {
    List<NativeModule> modules = new ArrayList<>();
    // Register the encryption module
    modules.add(new EncryptionModule(reactContext));
    return modules;
  }
}