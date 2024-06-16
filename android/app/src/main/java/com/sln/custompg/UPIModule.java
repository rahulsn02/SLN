package com.sln.custompg;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;
import android.widget.Toast;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import static android.content.ContentValues.TAG;

public class UPIModule extends ReactContextBaseJavaModule {
    private Promise promiseUpi;
    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            Log.d(TAG, "onActivityResult: requestCode: " + requestCode);
            Log.d(TAG, "onActivityResult: resultCode: " + resultCode);
            if (promiseUpi != null) {
                if (data != null) {
                    String res = data.getStringExtra("response");
                    Log.d(TAG, "UPI Payment Response: " + res); // Debugging line to check the response
                    promiseUpi.resolve(res);
                } else {
                    Log.d(TAG, "UPI Payment Failed: Data is null"); // Debugging line for null data
                    promiseUpi.reject("Failed", "Data is null");
                }
            }
        }
    };

    public UPIModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return "UPI";
    }

    @ReactMethod
    public void openLink(String url, final Promise promise) {
        Activity currentActivity = getCurrentActivity();
        promiseUpi = promise;
        Uri uri = Uri.parse(url);
        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
        Log.d(TAG, "Opening UPI Link: " + url); // Debugging line to check the URL
        currentActivity.startActivityForResult(intent, 1);
    }
}
