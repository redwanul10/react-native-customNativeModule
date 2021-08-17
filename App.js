import React, {useState, useRef} from 'react';
import {
  Button,
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  NativeModules,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter,
} from 'react-native-bluetooth-escpos-printer';
import Col from './components/Col';
import Row from './components/Row';

let receipt =
  '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';

let options = {
  width: 40,
  height: 30,
  gap: 20,
  direction: BluetoothTscPrinter.DIRECTION.FORWARD,
  reference: [0, 0],
  tear: BluetoothTscPrinter.TEAR.ON,
  sound: 0,
  text: [
    {
      text: 'I am a testing txt',
      x: 20,
      y: 0,
      fonttype: BluetoothTscPrinter.FONTTYPE.SIMPLIFIED_CHINESE,
      rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
      xscal: BluetoothTscPrinter.FONTMUL.MUL_1,
      yscal: BluetoothTscPrinter.FONTMUL.MUL_1,
    },
    {
      text: '你在说什么呢?',
      x: 20,
      y: 50,
      fonttype: BluetoothTscPrinter.FONTTYPE.SIMPLIFIED_CHINESE,
      rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
      xscal: BluetoothTscPrinter.FONTMUL.MUL_1,
      yscal: BluetoothTscPrinter.FONTMUL.MUL_1,
    },
  ],
  qrcode: [
    {
      x: 20,
      y: 96,
      level: BluetoothTscPrinter.EEC.LEVEL_L,
      width: 3,
      rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
      code: 'show me the money',
    },
  ],
  barcode: [
    {
      x: 120,
      y: 96,
      type: BluetoothTscPrinter.BARCODETYPE.CODE128,
      height: 40,
      readable: 1,
      rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
      code: '1234567890',
    },
  ],
  image: [
    {
      x: 160,
      y: 160,
      mode: BluetoothTscPrinter.BITMAP_MODE.OVERWRITE,
      width: 60,
      image: receipt,
    },
  ],
};

const App = () => {
  const captureRef = useRef();
  const [imgSrc, setImgSrc] = useState('');
  const [devices, setDevices] = useState([
    {address: '18:E8:29:48:EF:BC', name: 'UCK'},
    {address: 'C8:16:DA:8A:A0:EA', name: 'realme C12'},
    {address: '29:E3:60:7E:52:C6', name: 'CAR-BT'},
  ]);

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <Button
        title="Print"
        style={[styles.button, styles.buttonOpen]}
        onPress={() => {
          // NativeModules?.Encryptor.encrypt("")
          NativeModules?.Encryptor.thermalPrinter(imgSrc)
            .then(() => {
              alert('success');
            })
            .catch(err => {
              alert('therm error');
            });
        }}></Button>

      <Button
        title="capture"
        style={[styles.button, styles.buttonOpen, {marginTop: 20}]}
        onPress={() => {
          captureRef.current
            .capture()
            .then(uri => {
              // console.log('do something with ', uri);
              alert('success');
              setImgSrc(uri);
            })
            .catch(err => {
              console.log(err);
            });
        }}></Button>

      <ViewShot
        style={{backgroundColor: 'white'}}
        ref={captureRef}
        options={{result: 'base64', format: 'jpg', quality: 0.9, width: 554}}>
        <View>
          <Text
            style={{
              fontSize: 23,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            Akij Food & Beverage Ltd
          </Text>

          <View style={{alignItems: 'center', marginTop: 10, marginBottom: 20}}>
            <Text> Akij House #198, Bir Uttam Mir Shawkat Sarak</Text>
            <Text> Tejgaon, Dhaka-1208</Text>
            <Text> Helpdesk: 01877721520</Text>
          </View>

          <View style={{paddingLeft: 15}}>
            <Text style={styles.dText}>দোকানের নাম : Vai Vai Store</Text>
            <Text style={styles.dText}>ঠিকানা : মোহাম্মদপুর</Text>
            <Text style={styles.dText}>নাম্বার : ০১৬৩১৮৩৮৮৬০</Text>
            <Text style={styles.dText}>রুট : মোহাম্মদপুর</Text>
          </View>

          <View style={{marginTop: 20}}>
            <Row>
              <Col width="10%">
                <Text style={styles.heading}>Sl</Text>
              </Col>
              <Col width="50%">
                <Text style={styles.heading}>Product</Text>
              </Col>
              <Col width="20%">
                <Text style={styles.heading}>Pcs</Text>
              </Col>
              <Col width="20%">
                <Text style={styles.heading}>Price</Text>
              </Col>
            </Row>
            <Row>
              <Col width="10%">
                <Text style={styles.productTxt}>১</Text>
              </Col>
              <Col width="50%">
                <Text style={styles.productTxt}>মোজো ১৫০ মিলি</Text>
              </Col>
              <Col width="20%">
                <Text style={styles.productTxt}>১৫</Text>
              </Col>
              <Col width="20%">
                <Text style={styles.productTxt}>১৫</Text>
              </Col>
            </Row>
            <Row>
              <Col width="10%">
                <Text style={styles.productTxt}>১</Text>
              </Col>
              <Col width="50%">
                <Text style={styles.productTxt}>মোজো ১৫০ মিলি</Text>
              </Col>
              <Col width="20%">
                <Text style={styles.productTxt}>১৫</Text>
              </Col>
              <Col width="20%">
                <Text style={styles.productTxt}>১৫</Text>
              </Col>
            </Row>
            <Row>
              <Col width="10%">
                <Text style={styles.productTxt}>১</Text>
              </Col>
              <Col width="50%">
                <Text style={styles.productTxt}>মোজো ১৫০ মিলি</Text>
              </Col>
              <Col width="20%">
                <Text style={styles.productTxt}>১৫</Text>
              </Col>
              <Col width="20%">
                <Text style={styles.productTxt}>১৫</Text>
              </Col>
            </Row>
            <Row>
              <Col width="10%">
                <Text style={styles.productTxt}>১</Text>
              </Col>
              <Col width="50%">
                <Text style={styles.productTxt}>মোজো ১৫০ মিলি</Text>
              </Col>
              <Col width="20%">
                <Text style={styles.productTxt}>১৫</Text>
              </Col>
              <Col width="20%">
                <Text style={styles.productTxt}>১৫</Text>
              </Col>
            </Row>
            <Row>
              <Col width="10%">
                <Text style={styles.productTxt}>১</Text>
              </Col>
              <Col width="50%">
                <Text style={styles.productTxt}>মোজো ১৫০ মিলি</Text>
              </Col>
              <Col width="20%">
                <Text style={styles.productTxt}>১৫</Text>
              </Col>
              <Col width="20%">
                <Text style={styles.productTxt}>১৫</Text>
              </Col>
            </Row>
            <Row>
              <Col width="10%">
                <Text style={styles.productTxt}>১</Text>
              </Col>
              <Col width="50%">
                <Text style={styles.productTxt}>মোজো ১৫০ মিলি</Text>
              </Col>
              <Col width="20%">
                <Text style={styles.productTxt}>১৫</Text>
              </Col>
              <Col width="20%">
                <Text style={styles.productTxt}>১৫</Text>
              </Col>
            </Row>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginVertical: 5,
              }}></View>

            <Row>
              <Col width="60%">
                <Text
                  style={[styles.heading, {textAlign: 'left', paddingLeft: 5}]}>
                  মোট অর্ডার
                </Text>
              </Col>
              <Col width="20%">
                <Text style={[styles.productTxt]}>২০০</Text>
              </Col>
              <Col width="20%">
                <Text style={[styles.productTxt]}>৩৫০০</Text>
              </Col>
            </Row>
            <Row>
              <Col width="60%">
                <Text
                  style={[styles.heading, {textAlign: 'left', paddingLeft: 5}]}>
                  মোট ডিসকাউন্ট
                </Text>
              </Col>
              <Col width="20%">
                <Text style={[styles.heading]}></Text>
              </Col>
              <Col width="20%">
                <Text style={[styles.productTxt]}>০.০০</Text>
              </Col>
            </Row>

            <Row>
              <Col width="60%">
                <Text
                  style={[styles.heading, {textAlign: 'left', paddingLeft: 5}]}>
                  মোট প্রদেয় পরিমান
                </Text>
              </Col>
              <Col width="20%">
                <Text style={[styles.heading]}></Text>
              </Col>
              <Col width="20%">
                <Text style={[styles.productTxt]}>৩৫০০</Text>
              </Col>
            </Row>
          </View>
        </View>
      </ViewShot>

      {imgSrc ? (
        <Image
          resizeMode="contain"
          style={{width: 200, height: 200}}
          source={{uri: `data:image/jpeg;base64,${imgSrc}`}}
        />
      ) : null}
    </ScrollView>
  );
};

// const print = text => {};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  dText: {fontSize: 16, marginBottom: 5, fontWeight: 'bold'},
  heading: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productTxt: {
    fontSize: 15,
    marginBottom: 5,
    textAlign: 'center',
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default App;
