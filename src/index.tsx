<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="https://picsum.photos/64" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
    <meta name="theme-color" content="#ffffff" />
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="description" content="AppHome - Your Web App Store" />
    <link rel="manifest" href="/manifest.json" />
    <title>AppHome</title>
    
    <script src="https://cdn.tailwindcss.com"></script>

    <style>
      body {
        -webkit-tap-highlight-color: transparent;
        background-color: #f8fafc;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      }
      
      #initial-loader {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        background-color: #f8fafc;
      }
      .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #e2e8f0;
        border-top: 4px solid #3b82f6;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  </head>
  <body>
    <div id="root">
      <div id="initial-loader">
        <div class="spinner"></div>
      </div>
    </div>

    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>