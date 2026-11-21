import fs from 'fs';
import os from 'os';
import path from 'path';
import { execFileSync } from 'child_process';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');
const downloadsDir = path.join(publicDir, 'downloads');
fs.mkdirSync(downloadsDir, { recursive: true });

const standardSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="112" fill="#A63A24"/>
  <rect x="28" y="28" width="456" height="456" rx="88" fill="none" stroke="#F7F5F0" stroke-opacity="0.18" stroke-width="6"/>
  <path d="M128 364V156h40l88 124 88-124h40v208h-38V220l-72 102h-36l-72-102v144h-38z" fill="#F7F5F0"/>
  <circle cx="256" cy="116" r="14" fill="#F7F5F0"/>
</svg>`);

// Full-bleed maskable SVG with 18% safe-zone padding on all sides
const maskableSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="#A63A24"/>
  <g transform="translate(96, 96) scale(0.625)">
    <path d="M128 364V156h40l88 124 88-124h40v208h-38V220l-72 102h-36l-72-102v144h-38z" fill="#F7F5F0"/>
    <circle cx="256" cy="116" r="14" fill="#F7F5F0"/>
  </g>
</svg>`);

async function main() {
  await sharp(standardSvg).resize(192, 192).png().toFile(path.join(publicDir, 'pwa-192x192.png'));
  await sharp(standardSvg).resize(512, 512).png().toFile(path.join(publicDir, 'pwa-512x512.png'));
  await sharp(maskableSvg).resize(512, 512).png().toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));
  await sharp(maskableSvg).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));

  const mipmapBuffers = {
    'mipmap-mdpi': await sharp(maskableSvg).resize(48, 48).png().toBuffer(),
    'mipmap-hdpi': await sharp(maskableSvg).resize(72, 72).png().toBuffer(),
    'mipmap-xhdpi': await sharp(maskableSvg).resize(96, 96).png().toBuffer(),
    'mipmap-xxhdpi': await sharp(maskableSvg).resize(144, 144).png().toBuffer(),
    'mipmap-xxxhdpi': await sharp(maskableSvg).resize(192, 192).png().toBuffer(),
  };

  // Use the official production domain (can be changed to any deployed URL in MainActivity.java)
  const appUrl = 'https://myersglobalpathways.com';
  const zipPath = path.join(downloadsDir, 'myers-global-pathways-android-apk-kit.zip');
  const stageDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mgp-android-kit-'));

  const archive = {
    append(content, { name }) {
      const target = path.join(stageDir, name);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, content);
    },
    async finalize() {
      if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
      execFileSync('python3', [
        '-c',
        `import os, sys, zipfile
root, out = sys.argv[1], sys.argv[2]
with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as zf:
    for dirpath, _, filenames in os.walk(root):
        for fn in sorted(filenames):
            full = os.path.join(dirpath, fn)
            zf.write(full, os.path.relpath(full, root))`,
        stageDir,
        zipPath,
      ]);
      fs.rmSync(stageDir, { recursive: true, force: true });
    },
  };
  const done = Promise.resolve();

  archive.append(`pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}
rootProject.name = "MyersGlobalPathways"
include ":app"
`, { name: 'settings.gradle' });

  archive.append(`plugins {
    id 'com.android.application' version '8.5.2' apply false
}
`, { name: 'build.gradle' });

  archive.append(`org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8
android.useAndroidX=true
android.nonTransitiveRClass=true
`, { name: 'gradle.properties' });

  archive.append(`plugins {
    id 'com.android.application'
}

android {
    namespace 'com.myersglobalpathways.app'
    compileSdk 34

    defaultConfig {
        applicationId "com.myersglobalpathways.app"
        minSdk 24
        targetSdk 34
        versionCode 1
        versionName "1.0.0"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }
}

dependencies {
    implementation 'androidx.appcompat:appcompat:1.7.0'
    implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0'
    implementation 'androidx.browser:browser:1.8.0'
}
`, { name: 'app/build.gradle' });

  archive.append(`<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher"
        android:supportsRtl="true"
        android:theme="@style/Theme.MyersGlobalPathways"
        android:usesCleartextTraffic="false">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|screenSize|keyboardHidden">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
`, { name: 'app/src/main/AndroidManifest.xml' });

  archive.append(`package com.myersglobalpathways.app;

import android.annotation.SuppressLint;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

public class MainActivity extends AppCompatActivity {
    private static final String START_URL = "${appUrl}";
    private WebView webView;
    private SwipeRefreshLayout swipeRefreshLayout;
    private ValueCallback<Uri[]> filePathCallback;

    private final ActivityResultLauncher<Intent> fileChooserLauncher =
        registerForActivityResult(new ActivityResultContracts.StartActivityForResult(), result -> {
            if (filePathCallback == null) return;
            Uri[] results = null;
            if (result.getResultCode() == RESULT_OK && result.getData() != null) {
                Uri dataUri = result.getData().getData();
                if (dataUri != null) {
                    results = new Uri[]{ dataUri };
                }
            }
            filePathCallback.onReceiveValue(results);
            filePathCallback = null;
        });

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        swipeRefreshLayout = new SwipeRefreshLayout(this);
        webView = new WebView(this);
        swipeRefreshLayout.addView(webView);
        setContentView(swipeRefreshLayout);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                String scheme = uri.getScheme();
                String host = uri.getHost() != null ? uri.getHost() : "";

                if ("mailto".equals(scheme) || "tel".equals(scheme) || host.contains("wa.me") || host.contains("whatsapp.com")) {
                    try {
                        startActivity(new Intent(Intent.ACTION_VIEW, uri));
                    } catch (ActivityNotFoundException ignored) {}
                    return true;
                }
                return false;
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                swipeRefreshLayout.setRefreshing(false);
            }
        });

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> callback, FileChooserParams params) {
                if (filePathCallback != null) {
                    filePathCallback.onReceiveValue(null);
                }
                filePathCallback = callback;
                try {
                    fileChooserLauncher.launch(params.createIntent());
                } catch (ActivityNotFoundException e) {
                    filePathCallback = null;
                    return false;
                }
                return true;
            }
        });

        swipeRefreshLayout.setOnRefreshListener(() -> webView.reload());
        webView.loadUrl(START_URL);
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
`, { name: 'app/src/main/java/com/myersglobalpathways/app/MainActivity.java' });

  archive.append(`<resources>
    <string name="app_name">Myers Global Pathways</string>
</resources>
`, { name: 'app/src/main/res/values/strings.xml' });

  archive.append(`<resources>
    <color name="surface_canvas">#F7F5F0</color>
    <color name="accent_terracotta">#A63A24</color>
    <color name="ink_primary">#181A1F</color>
</resources>
`, { name: 'app/src/main/res/values/colors.xml' });

  archive.append(`<resources>
    <style name="Theme.MyersGlobalPathways" parent="Theme.AppCompat.Light.NoActionBar">
        <item name="android:statusBarColor">@color/surface_canvas</item>
        <item name="android:windowLightStatusBar">true</item>
        <item name="colorPrimary">@color/accent_terracotta</item>
        <item name="colorAccent">@color/accent_terracotta</item>
    </style>
</resources>
`, { name: 'app/src/main/res/values/themes.xml' });

  archive.append(`# Keep WebView JS bridge classes intact
`, { name: 'app/proguard-rules.pro' });

  for (const [folder, buf] of Object.entries(mipmapBuffers)) {
    archive.append(buf, { name: `app/src/main/res/${folder}/ic_launcher.png` });
  }

  archive.append(`name: Build Myers Global Pathways Android APK

on:
  push:
    branches: [ main, master ]
  workflow_dispatch:

jobs:
  build-apk:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'

      - name: Set up Gradle
        uses: gradle/actions/setup-gradle@v4
        with:
          gradle-version: '8.7'

      - name: Build Debug APK
        run: gradle assembleDebug

      - name: Upload APK Artifact
        uses: actions/upload-artifact@v4
        with:
          name: MyersGlobalPathways-APK
          path: app/build/outputs/apk/debug/app-debug.apk
`, { name: '.github/workflows/build-apk.yml' });

  archive.append(`# Myers Global Pathways — Android APK Build Kit

Package ID: com.myersglobalpathways.app
Default App URL: ${appUrl}

## Option 1: Build an APK automatically on GitHub (no Android Studio needed)
1. Create a new GitHub repository and upload the extracted files from this ZIP.
2. Open the Actions tab and run "Build Myers Global Pathways Android APK".
3. Download MyersGlobalPathways-APK (app-debug.apk) from the completed workflow artifacts.

## Option 2: Build locally with Android Studio
1. Open this extracted folder in Android Studio.
2. Let Gradle sync complete.
3. Click Build -> Build Bundle(s) / APK(s) -> Build APK(s).
4. To point to your custom domain (https://myersglobalpathways.com), update START_URL in app/src/main/java/com/myersglobalpathways/app/MainActivity.java.
`, { name: 'README.md' });

  await archive.finalize();
  await done;

  const stats = fs.statSync(zipPath);
  console.log('Generated PNG icons & Android APK kit:', stats.size, 'bytes');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
