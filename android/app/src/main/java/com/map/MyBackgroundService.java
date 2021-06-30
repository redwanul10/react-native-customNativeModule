package com.map;
import android.app.Service;
import android.content.Intent;
import android.content.Context;
import android.app.PendingIntent;
import android.os.IBinder;
import android.widget.Toast;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Notification;


import android.os.Handler;

public class MyBackgroundService extends Service {

  private Context mReactContext;
  private Handler handler;
  private Runnable runnableCode;
 
    public MyBackgroundService() {

    }
    @Override
    public IBinder onBind(Intent intent) {
        // TODO: Return the communication channel to the service.
        throw new UnsupportedOperationException("Not yet implemented");
    }
    @Override
    public void onCreate() {
        Toast.makeText(this, "Invoke background service onCreate method.", Toast.LENGTH_LONG).show();
        mReactContext = this;
        
        super.onCreate();
    }
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {

            String status = intent.getExtras().getString("status");
        if(status.equals("stop")){

        // if(intent.getStringExtras("status") != null){
         Toast.makeText(this, "Stop Service", Toast.LENGTH_LONG).show();
         stopSelf();
         return START_NOT_STICKY;
        }else{

        

        Toast.makeText(this, "Invoke background service onStartCommand method.", Toast.LENGTH_LONG).show();

//        Variable
        String NOTIFICATION_CHANNEL_ID = "com.example.andy.myapplication";
        String channelName = "My Background Service";

//        Notification channel
        NotificationChannel chan = new NotificationChannel(NOTIFICATION_CHANNEL_ID, channelName, NotificationManager.IMPORTANCE_NONE);

//        Pass notification Channel in Notification Manager
        NotificationManager manager = (NotificationManager) getSystemService(this.NOTIFICATION_SERVICE);
        manager.createNotificationChannel(chan);

//        Create Notification Intent
        Intent notificationIntent = new Intent(this, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, notificationIntent, 0);


//        Build Notification
        Notification notification = new Notification.Builder(this,NOTIFICATION_CHANNEL_ID)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentTitle("My Awesome App")
                .addAction(R.mipmap.ic_launcher, "button1",pendingIntent)
                .addAction(R.mipmap.ic_launcher, "button2",pendingIntent)
                .addAction(R.mipmap.ic_launcher, "button3",pendingIntent)
                .setContentIntent(pendingIntent).build();

        startForeground(1337, notification);


        // Create the Handler object (on the main thread by default)
        handler = new Handler();
        // Define the code block to be executed
        runnableCode = new Runnable() {
        @Override
        public void run() {
        // Do something here on the main thread
                Toast.makeText(mReactContext, "background Service Interval", Toast.LENGTH_LONG).show();
     
        // Repeat this the same runnable code block again another 2 seconds
        // 'this' is referencing the Runnable object
                 handler.postDelayed(this, 10000);
        }
        };
        // Start the initial runnable task by posting through the handler
        handler.post(runnableCode);

        return START_STICKY;
//        super.onStartCommand(intent, flags, startId);
//        return START_STICKY;
        }
    }
    @Override
    public void onDestroy() {
        super.onDestroy();
        stopForeground(true);
        // Removes pending code execution
        handler.removeCallbacks(runnableCode);
        Toast.makeText(this, "Invoke background service onDestroy method.", Toast.LENGTH_LONG).show();
    }
}