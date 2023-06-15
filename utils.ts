import BLEPeripheral from 'react-native-ble-peripheral';
import CryptoAesCbc from 'react-native-crypto-aes-cbc';
import {Buffer} from 'buffer';

function textToBase64(text: string) {
  return Buffer.from(text, 'utf-8').toString('base64');
}

function bytesToHexString(bytes: number[]) {
  return Array.from(bytes, number => number.toString(16).padStart(2, '0')).join(
    '',
  );
}

function textToBytes(text: string) {
  let temp = Array.from(Buffer.from(text, 'utf8'));
  console.log(temp);
  return temp;
}

const AESDecrypt = (ciphertext: number[]) => {
  let secretKey = '1111111111111111';
  let iv = '1111111111111111';

  CryptoAesCbc.decryptByHex(
    textToBase64(iv),
    textToBase64(secretKey),
    bytesToHexString(ciphertext),
    '128',
  )
    // .then(decryptString => {
    //   console.log('GOKS: ', decryptString);
    //   BLEPeripheral.writeCharacteristic(
    //     '19b10010-e8f2-537e-4f6c-d104768a1215',
    //     textToBytes(decryptString as string),
    //   );
    // })
    .catch(console.log);
};
