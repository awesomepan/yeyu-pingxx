package com.pingplusplus.react;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.Window;
import com.pingplusplus.android.Pingpp;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * @author dong {hwongrex@gmail.com}
 * @date 2016/12/7
 * @time 下午1:50
 */

public class PingppActivity extends Activity {

  @Override protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    requestWindowFeature(Window.FEATURE_NO_TITLE);
    String charge = getIntent().getStringExtra("charge");
    Pingpp.createPayment(this, charge);
  }

  @Override protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);

    JSONObject json = new JSONObject();
    try {
      json.put("pay_result", data.getStringExtra("pay_result"));
      json.put("error_msg", data.getStringExtra("error_msg"));
      json.put("extra_msg", data.getStringExtra("extra_msg"));
    } catch (JSONException e) {
    } catch (Exception e) {}
    PingppModule.mResultCallback.invoke(json.toString());
    finish();
  }
}
