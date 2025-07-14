<?php
$consumer_key = "qkio1BGGYAXTu2JOfm7XSXNruoZsrqEW";
$consumer_secret = "osGQ364R49cXKeOYSpaOnT++rHs=";

$url = "https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
curl_setopt($ch, CURLOPT_USERPWD, $consumer_key . ":" . $consumer_secret);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Accept: application/json"
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, '');

$response = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    echo "CURL Error: " . curl_error($ch);
} else {
    echo "HTTP Code: " . $httpcode . "<br>";
    echo "Response: " . $response;
}

curl_close($ch);
?>
