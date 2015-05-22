@ECHO OFF

set FILEKEYSTORE=release.keystore
set STOREPASS=provisoryKey1
set KEYPASS=provisoryKey1

echo.
echo This generate a new file called "%FILEKEYSTORE%" that is the sign, if exit it prompt you if you want ovewride it.
echo (ctrl+c to cancel)
echo.

del %FILEKEYSTORE% /P

keytool -genkey -v -keystore %FILEKEYSTORE% -alias androidreleasekey -keyalg RSA -keysize 2048 -validity 14000 -keypass %KEYPASS% -storepass %STOREPASS%