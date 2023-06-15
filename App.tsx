import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {
  Button,
  withTheme,
  Appbar,
  Portal,
  Modal,
  Card,
  Text,
} from 'react-native-paper';

import BLEPeripheral from 'react-native-ble-peripheral';

function App({theme, children}: any): JSX.Element {
  const {colors} = theme;
  const [connectDisabled, setConnectDisabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    BLEPeripheral.addService('19b10010-e8f2-537e-4f6c-d104768a1213', true);
    BLEPeripheral.addCharacteristicToService(
      '19b10010-e8f2-537e-4f6c-d104768a1213',
      '19b10010-e8f2-537e-4f6c-d104768a1215',
      1 | 16,
      1 | 2 | 8,
    );
    BLEPeripheral.addCharacteristicToService(
      '19b10010-e8f2-537e-4f6c-d104768a1213',
      '19b10010-e8f2-537e-4f6c-d104768a1217',
      1 | 16,
      1 | 2 | 8,
    );

    BLEPeripheral.start(false)
      .then((res: any) => {
        console.log(res);
      })
      .catch((error: any) => {
        console.log(error);
      });

    return () => {
      BLEPeripheral.stop().then(console.log);
    };
  }, []);

  const handleOpenLock = () => {
    setConnectDisabled(true);
    BLEPeripheral.stop().then((res: string) => {
      console.log(res);
      BLEPeripheral.start(true).then((res: string) => {
        console.log(res);
        setTimeout(() => {
          BLEPeripheral.stop().then((res: string) => {
            console.log(res);
            BLEPeripheral.start(false).then((res: string) => {
              console.log(res);
            });
            setConnectDisabled(false);
          });
        }, 5000);
      });
    });
  };

  return (
    <>
      <Appbar mode="large">
        <Appbar.Content title="BlueGuard" />
        <Appbar.Action
          icon="information-outline"
          onPress={() => setModalVisible(true)}
        />
      </Appbar>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: colors?.background,
          padding: 30,
        }}>
        <Text style={{color: colors?.text, marginTop: '70%', fontSize: 30}}>
          Status
        </Text>
        <Text style={{color: colors?.text, fontSize: 25}}>
          {connectDisabled ? 'Mencoba membuka Lock...' : 'Siap'}
        </Text>
        <Button
          elevation={5}
          icon="lock-open"
          mode="contained"
          disabled={connectDisabled}
          style={{
            width: 300,
            height: 300,
            borderRadius: 150,
            marginTop: 80,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          loading={connectDisabled}
          contentStyle={{
            width: 300,
            height: 300,
            borderRadius: 150,
          }}
          labelStyle={{fontSize: 30}}
          onPress={handleOpenLock}>
          {connectDisabled ? '' : 'BUKA'}
        </Button>
      </View>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={{
            margin: 40,
          }}>
          <Card>
            <Card.Title
              title="Informasi Key"
              subtitle="Bagikan informasi ini ke administrator sistem"
            />
            <Card.Content>
              <Text
                style={{
                  color: colors?.text,
                  fontFamily: 'monospace',
                  marginTop: 20,
                }}>
                {'KEY ID  : AAFE5341435F30303031310000000000'}
              </Text>
              <Text
                style={{
                  color: colors?.text,
                  fontFamily: 'monospace',
                  marginBottom: 20,
                }}>
                {'AES KEY : 31313131313131313131313131313131'}
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => setModalVisible(false)}>Ok</Button>
            </Card.Actions>
          </Card>
        </Modal>
      </Portal>
    </>
  );
}

export default withTheme(App);
