package com.map;
import android.app.Service;
import android.content.Intent;
import android.app.PendingIntent;
import android.os.IBinder;
import android.widget.Toast;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Notification;

public class MyBackgroundService extends Service {

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
        super.onCreate();
    }
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
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
        return START_STICKY;
//        super.onStartCommand(intent, flags, startId);
//        return START_STICKY;
    }
    @Override
    public void onDestroy() {
        super.onDestroy();
        stopForeground(true);
        Toast.makeText(this, "Invoke background service onDestroy method.", Toast.LENGTH_LONG).show();
    }
}