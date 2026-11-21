import React, { useState } from 'react';
import { Download, Smartphone, ExternalLink, Check, ArrowRight, Copy, Share2 } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useSEO } from '../hooks/useSEO';

const DEFAULT_PUBLIC_URL = 'https://myersglobalpathways.com';
const SHARED_APP_URL = 'https://ais-pre-saa2rmiodr5wkzyfy3ta55-809350026367.asia-east1.run.app';

export const DownloadAppPage: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const [installMessage, setInstallMessage] = useState<string | null>(null);
  const [downloadingKit, setDownloadingKit] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const isDevPreview =
    typeof window !== 'undefined' &&
    (window.location.hostname.includes('ais-dev-') || window.location.hostname === 'localhost');

  const publicShareBase =
    typeof window !== 'undefined' && !isDevPreview && window.location.origin.startsWith('https://')
      ? window.location.origin
      : SHARED_APP_URL;

  const publicDownloadPageUrl = `${publicShareBase}/download-app`;

  const [pwaSiteUrl, setPwaSiteUrl] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.origin.startsWith('https://') && !window.location.origin.includes('ais-dev-')) {
      return window.location.origin;
    }
    return DEFAULT_PUBLIC_URL;
  });

  useSEO({
    title: 'Download App & Android APK | Myers Global Pathways',
    description:
      'Install the Myers Global Pathways mobile app on Android, iPhone, or desktop, or download the Android APK project kit.',
    canonicalPath: '/download-app',
  });

  const pwaBuilderUrl = `https://www.pwabuilder.com/reportcard?site=${encodeURIComponent(pwaSiteUrl.trim() || DEFAULT_PUBLIC_URL)}`;
  const androidKitDownloadUrl = '/api/download/android-apk-kit';

  const handleInstallClick = async () => {
    setInstallMessage(null);
    const accepted = await install();
    if (accepted) {
      setInstallMessage('Myers Global Pathways has been installed on your device.');
    }
  };

  const handleCopyPublicLink = async () => {
    try {
      await navigator.clipboard.writeText(publicDownloadPageUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      setCopiedLink(false);
    }
  };

  const handleDownloadKit = async () => {
    setDownloadingKit(true);
    setDownloadStatus(null);
    try {
      let response = await fetch(androidKitDownloadUrl);
      if (!response.ok) {
        response = await fetch('/downloads/myers-global-pathways-android-apk-kit.zip');
      }
      if (!response.ok) {
        throw new Error('Download failed');
      }
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'myers-global-pathways-android-apk-kit.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
      setDownloadStatus('Download started: myers-global-pathways-android-apk-kit.zip');
    } catch {
      setDownloadStatus('Could not start automatic download. Use the direct file link below.');
    } finally {
      setDownloadingKit(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#181A1F] pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-12 text-left">

        {/* Page Header */}
        <div className="max-w-2xl space-y-4 pt-6">
          <p className="text-sm text-[#A63A24] font-medium">
            Mobile app and Android APK
          </p>
          <h1 className="text-4xl sm:text-5xl font-medium tracking-[-0.025em] text-[#181A1F] leading-[1.1]">
            Install Myers Global Pathways on your phone
          </h1>
          <p className="text-base text-[#4F535C] leading-relaxed">
            Use Myers Global Pathways as a standalone full-screen mobile app with offline access, or package it as an Android APK for direct distribution and Google Play.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleCopyPublicLink}
              className="px-4 py-2 rounded-lg bg-white border border-[#181A1F]/[0.14] hover:border-[#A63A24] hover:text-[#A63A24] text-xs font-medium text-[#181A1F] inline-flex items-center gap-2 transition-ui cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#A63A24]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Public download link copied' : 'Copy public download link'}</span>
            </button>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Install the Myers Global Pathways app here: ${publicDownloadPageUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-white border border-[#181A1F]/[0.14] hover:border-[#A63A24] hover:text-[#A63A24] text-xs font-medium text-[#181A1F] inline-flex items-center gap-2 transition-ui"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share via WhatsApp</span>
            </a>
          </div>

          {isDevPreview && (
            <p className="p-3 rounded-xl bg-[#EFECE4] border border-[#181A1F]/[0.08] text-xs text-[#4F535C] leading-relaxed">
              <strong className="font-medium text-[#181A1F]">Publishing note:</strong> You are currently viewing the private development preview. To make this download page and APK kit link public for anyone without signing in, click <strong className="font-medium text-[#181A1F]">Share / Deploy</strong> in the top-right corner of the workspace.
            </p>
          )}
        </div>

        {/* Option 1: Direct Install (PWA) */}
        <section className="rounded-2xl bg-white border border-[#181A1F]/[0.08] p-6 lg:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#181A1F]/[0.08]">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-mono text-[#A63A24]">01</span>
              <h2 className="text-2xl font-medium tracking-[-0.015em] text-[#181A1F]">
                Instant app install (Android, iPhone, and desktop)
              </h2>
              <p className="text-sm text-[#4F535C] leading-relaxed">
                Installs directly to your home screen with its own app icon, full-screen window, and cached pages — no app store download required.
              </p>
            </div>

            <div className="shrink-0">
              {isInstalled ? (
                <div className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-[#EFECE4] border border-[#181A1F]/[0.08] text-sm font-medium text-[#181A1F]">
                  <Check className="w-4 h-4 text-[#A63A24]" />
                  <span>App installed</span>
                </div>
              ) : isInstallable ? (
                <button
                  type="button"
                  onClick={handleInstallClick}
                  className="px-6 py-3 rounded-lg bg-[#A63A24] hover:bg-[#8C2F1C] text-white text-sm font-medium transition-ui inline-flex items-center gap-2 cursor-pointer"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Install app now</span>
                </button>
              ) : (
                <span className="inline-block px-4 py-2 rounded-lg bg-[#F7F5F0] border border-[#181A1F]/[0.08] text-xs text-[#4F535C]">
                  {isIOS ? 'Use Safari Share menu' : isAndroid ? 'Use Chrome menu -> Install app' : 'Open in Chrome or Edge to install'}
                </span>
              )}
            </div>
          </div>

          {installMessage && (
            <p className="p-3 rounded-lg bg-[#F7F5F0] border border-[#181A1F]/[0.08] text-sm text-[#181A1F]">
              {installMessage}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#4F535C]">
            <div className="p-4 rounded-xl bg-[#F7F5F0] border border-[#181A1F]/[0.08] space-y-2">
              <p className="font-medium text-[#181A1F]">On Android (Chrome / Edge)</p>
              <ol className="space-y-1 list-decimal list-inside leading-relaxed">
                <li>Open this page in Chrome on your Android phone.</li>
                <li>Tap <strong className="font-medium text-[#181A1F]">Install app now</strong> above, or tap the browser menu (⋮).</li>
                <li>Select <strong className="font-medium text-[#181A1F]">Install app</strong> or <strong className="font-medium text-[#181A1F]">Add to Home screen</strong>.</li>
              </ol>
            </div>

            <div className="p-4 rounded-xl bg-[#F7F5F0] border border-[#181A1F]/[0.08] space-y-2">
              <p className="font-medium text-[#181A1F]">On iPhone or iPad (Safari)</p>
              <ol className="space-y-1 list-decimal list-inside leading-relaxed">
                <li>Open this page in Safari.</li>
                <li>Tap the <strong className="font-medium text-[#181A1F]">Share</strong> icon in the bottom bar.</li>
                <li>Tap <strong className="font-medium text-[#181A1F]">Add to Home Screen</strong>, then <strong className="font-medium text-[#181A1F]">Add</strong>.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Option 2 & 3: Android APK Packaging & Direct Download */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Downloadable Android Studio / GitHub Actions APK Build Kit */}
          <section className="rounded-2xl bg-white border border-[#181A1F]/[0.08] p-6 lg:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#A63A24]">02</span>
              <h2 className="text-xl font-medium tracking-[-0.01em] text-[#181A1F]">
                Download Android APK build kit (.zip)
              </h2>
              <p className="text-sm text-[#4F535C] leading-relaxed">
                Pre-configured Android Studio and Gradle project (<span className="font-mono text-xs text-[#181A1F]">com.myersglobalpathways.app</span>) with launcher icons, document upload support, WhatsApp/email intents, and a GitHub Actions workflow that builds a downloadable <span className="font-mono text-xs text-[#181A1F]">.apk</span> in the cloud.
              </p>
              <ul className="pt-2 space-y-1 text-xs text-[#4F535C]">
                <li>— Native Android wrapper with pull-to-refresh and back navigation</li>
                <li>— Full file-upload support for WAEC/WASSCE & passport files</li>
                <li>— Includes automated GitHub Actions APK workflow</li>
              </ul>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleDownloadKit}
                disabled={downloadingKit}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#181A1F] hover:bg-[#2C2F38] disabled:opacity-60 text-white text-sm font-medium transition-ui inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{downloadingKit ? 'Preparing download...' : 'Download Android APK kit (.zip)'}</span>
              </button>
              {downloadStatus && (
                <p className="text-xs text-[#4F535C]">{downloadStatus}</p>
              )}
              <div>
                <a
                  href="/downloads/myers-global-pathways-android-apk-kit.zip"
                  download="myers-global-pathways-android-apk-kit.zip"
                  className="text-xs text-[#6E727D] hover:text-[#A63A24] underline underline-offset-2 transition-ui"
                >
                  Direct static file link (.zip)
                </a>
              </div>
            </div>
          </section>

          {/* Cloud Signed APK Generator via PWABuilder */}
          <section className="rounded-2xl bg-white border border-[#181A1F]/[0.08] p-6 lg:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#A63A24]">03</span>
              <h2 className="text-xl font-medium tracking-[-0.01em] text-[#181A1F]">
                Generate a signed .apk / .aab online
              </h2>
              <p className="text-sm text-[#4F535C] leading-relaxed">
                After publishing your app publicly, enter your live public URL below to generate a signed Android APK or Google Play bundle directly in your browser using PWABuilder.
              </p>
              <div className="pt-2 space-y-1">
                <label htmlFor="pwa-site-url" className="block text-xs font-medium text-[#181A1F]">
                  Published website URL
                </label>
                <input
                  id="pwa-site-url"
                  type="url"
                  value={pwaSiteUrl}
                  onChange={(e) => setPwaSiteUrl(e.target.value)}
                  placeholder="https://myersglobalpathways.com"
                  className="w-full px-3 py-2 rounded-lg bg-[#F7F5F0] border border-[#181A1F]/[0.14] text-xs font-mono text-[#181A1F] focus:outline-none focus:border-[#A63A24]"
                />
              </div>
            </div>

            <div>
              <a
                href={pwaBuilderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-transparent hover:bg-[#F7F5F0] text-[#181A1F] border border-[#181A1F]/[0.14] text-sm font-medium transition-ui inline-flex items-center justify-center gap-2"
              >
                <span>Open in PWABuilder</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </section>

        </div>

        {/* App Metadata Summary */}
        <section className="rounded-2xl bg-[#EFECE4] border border-[#181A1F]/[0.08] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-[#4F535C]">
          <div className="flex items-center gap-4">
            <img
              src="/pwa-192x192.png"
              alt="Myers Global Pathways app icon"
              className="w-12 h-12 rounded-xl border border-[#181A1F]/[0.08] shrink-0"
            />
            <div>
              <p className="font-medium text-[#181A1F]">Myers Global Pathways</p>
              <p className="text-xs text-[#6E727D] font-mono">
                com.myersglobalpathways.app · v1.0.0 · Standalone PWA + Android Kit
              </p>
            </div>
          </div>

          <a
            href="/manifest.webmanifest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[#A63A24] hover:text-[#8C2F1C] inline-flex items-center gap-1 transition-ui shrink-0"
          >
            <span>Inspect web manifest</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </section>

      </div>
    </div>
  );
};

export default DownloadAppPage;
