$ErrorActionPreference='Stop'
$taskNode=Get-Command node -ErrorAction SilentlyContinue
if(-not $taskNode){Write-Host 'Node.js is required to run the local website. Install Node.js 22 or newer once, then reopen this launcher.';Read-Host 'Press Enter';exit 1}
$taskUrl='http://127.0.0.1:8765/'
try{$taskHealth=Invoke-RestMethod ($taskUrl+'__pl300_offline_health') -TimeoutSec 2}catch{$taskHealth=$null}
if($taskHealth.app -ne 'PL300 Offline'){
 Start-Process -FilePath $taskNode.Source -ArgumentList 'server.mjs' -WorkingDirectory $PSScriptRoot -WindowStyle Hidden
 for($taskTry=0;$taskTry -lt 20;$taskTry++){try{$taskHealth=Invoke-RestMethod ($taskUrl+'__pl300_offline_health') -TimeoutSec 1;if($taskHealth.app -eq 'PL300 Offline'){break}}catch{};Start-Sleep -Milliseconds 250}
}
if($taskHealth.app -ne 'PL300 Offline'){throw 'The offline site could not start. Port 8765 may be in use.'}
$taskEdge='C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
if(Test-Path -LiteralPath $taskEdge){Start-Process -FilePath $taskEdge -ArgumentList $taskUrl}else{Start-Process $taskUrl}
