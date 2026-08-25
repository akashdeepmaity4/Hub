$css = Invoke-WebRequest -Uri "http://localhost:5000/static/css/style.css" -UseBasicParsing -TimeoutSec 5
Write-Output "CSS STATUS: $($css.StatusCode) LEN: $($css.Content.Length)"
$js = Invoke-WebRequest -Uri "http://localhost:5000/static/js/main.js" -UseBasicParsing -TimeoutSec 5
Write-Output "JS STATUS: $($js.StatusCode) LEN: $($js.Content.Length)"
$img = Invoke-WebRequest -Uri "http://localhost:5000/asset/homescreen.png" -UseBasicParsing -TimeoutSec 5
Write-Output "ASSET STATUS: $($img.StatusCode) LEN: $($img.Content.Length)"
