Logo assets

Source artwork (supplied by the company) lives OUTSIDE this folder so the
multi-megabyte original is never served to visitors:
  assets-source/logo/ammon-qatar-logo-source.png — RGB on a white background.

Generated from it by `npm run assets:logo` (scripts/process-logo.mjs):
  ammon-qatar-logo.png       900x615  stacked lockup, transparent background
  ammon-qatar-logo-wide.png  939x220  horizontal lockup (mark + wordmark) — used in the site header
  ammon-qatar-mark.png   512x443  the "A" mark only, transparent — for square/compact uses
  ammon-qatar-plate.png  320x320  the lockup on a white rounded plate — used on dark surfaces (footer)
  ../../app/icon.png     512x512  app icon (mark on brand navy)
  ../../app/favicon.ico   32x32   browser favicon

To replace the logo: drop the new artwork into assets-source/logo/ and run `npm run assets:logo`.
Keep the aspect ratios above, or update the width/height props where the files are used.
Never stretch the logo; every usage sets an explicit width and height.

Brand colours sampled from the artwork:
  royal blue  #001c55  (deep)  /  #002667  (mid)  /  #003887  (light)
  gold        #8a5a12  (deep)  /  #b8862b  (mid)  /  #d3a852  (light)
