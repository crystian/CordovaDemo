@ECHO OFF
set FOLDER=.
set FILENAME=android-release
set STOREPASS=provisoryLala
set KEYPASS=provisoryLala

jarsigner -verbose -digestalg SHA1 -sigalg MD5withRSA -keystore release.keystore "%FOLDER%\%FILENAME%-unsigned.apk" androidreleasekey -storepass %STOREPASS% -keypass %KEYPASS%
jarsigner -verify "%FOLDER%\%FILENAME%-unsigned.apk" -keystore release.keystore
zipalign -v 4 "%FOLDER%\%FILENAME%-unsigned.apk" "%FOLDER%\%FILENAME%.apk"
