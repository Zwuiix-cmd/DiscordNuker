@echo off
title DiscordNuker - By Zwuiix-cmd#0001

if exist node_modules\ (
  node index.js
  pause
  exit
) else (
  npm i node-bash-title fs fetch prompt-sync colors gradient-string discord.js
  echo Succesfully installed!
  echo Please re-run this file.
  pause
  exit
)