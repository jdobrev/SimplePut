import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {postData} from './src/utils';

import {API, useAPIs} from './src/useAPIs';

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
};

const Input = (props: TextInput['props']) => (
  <TextInput style={styles.textInput} {...props} />
);

const ShowAlert = (msg: string) =>
  Alert.alert(msg, '', [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const {apis, apiFuncs} = useAPIs();
  const [canEditEndpoint, setCanEditEndpoint] = useState(false);

  const onClickPut = (api: API) => {
    postData(api.url, api.data)
      .then(() => {
        ShowAlert('success');
        // apiFuncs.clearData(api.id);
      })
      .catch(e => ShowAlert(`нешо се объркА :(`));
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <Button title="add new" onPress={apiFuncs.add} color={'green'} />
      <ScrollView horizontal={true} pagingEnabled={true}>
        {apis.map((a, index) => (
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.screenContainer}
            key={a.id}>
            <KeyboardAvoidingView behavior="position">
              {/* <Text key={a.id}>{a.title}</Text> */}

              <Section title="metric_name">
                <Input
                  value={a.data.metric_name}
                  onChangeText={t =>
                    apiFuncs.update(a.id, {
                      ...a,
                      data: {...a.data, metric_name: t},
                    })
                  }
                />
              </Section>
              <Section title="metric_value">
                <Input
                  value={a.data.metric_value}
                  onChangeText={t =>
                    apiFuncs.update(a.id, {
                      ...a,
                      data: {...a.data, metric_value: t},
                    })
                  }
                />
              </Section>
              <Section title="endpoint">
                {canEditEndpoint ? (
                  <View style={{flexDirection: 'row'}}>
                    <Input
                      value={a.url}
                      onChangeText={t => apiFuncs.update(a.id, {...a, url: t})}
                    />
                    <Button
                      title="close"
                      onPress={() => setCanEditEndpoint(false)}
                      // color="green"
                    />
                  </View>
                ) : (
                  <Button
                    color="grey"
                    title={a.url || 'edit endpoint'}
                    onPress={() => setCanEditEndpoint(true)}
                  />
                )}
              </Section>
              <Section title="operations">
                <Button
                  title="put"
                  onPress={() => onClickPut(a)}
                  color="green"
                />
                <Button
                  title="delete"
                  onPress={() => apiFuncs.delete(a.id)}
                  color="red"
                />
              </Section>
              <Text>{`${index + 1}/${apis.length}`}</Text>
            </KeyboardAvoidingView>
          </ScrollView>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 50,
  },
  sectionContainer: {
    marginTop: 10,
    paddingHorizontal: 24,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  textInput: {
    borderColor: 'grey',
    marginVertical: 2,
    borderWidth: 1,
    height: 50,
    flex: 1,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'blue',
  },
});

export default App;
