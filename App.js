import 'react-native-get-random-values'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Pressable, TextInput, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useFonts } from 'expo-font'
import { useCallback, useState } from 'react';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4, validate } from 'uuid'
import * as SplashScreen from 'expo-splash-screen';
import Header from './components/Header';
import Task from './components/Task';
import ModalTask from './components/ModalTask';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('./assets/fonts/Inter-Bold.otf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.otf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.otf')
  })

  const [modalVisible, setModalVisible] = useState(false)
  const [category, setCategory] = useState(null)
  const [nameTask, setNameTask] = useState(null)
  const [completed, setCompleted] = useState([])
  const [incomplete, setIncomplete] = useState([])

  const closeModal = () => {
    setModalVisible(false)
  }

  let data = []

  const addTask = () => {
    const task = {
      id: uuidv4(),
      title: nameTask,
      category: category,
      isFinish: false,
    }

    if (data.length === 0) {
      AsyncStorage.setItem('task', JSON.stringify([task]))
    }

    setCategory(null)
    setNameTask(null)
    setModalVisible(false)
  }

  const getTask = async () => {
    try {
      const value = await AsyncStorage.getItem('task')

      if (value) {
        data = JSON.parse(value)

        console.log(data)

        const dataIncomplete = data.length > 0 ? data.filter(tasku => !tasku.isFinish) : []

        // setIncomplete(dataIncomplete)
        // setCompleted(data.length > 0 ? data.filter(tasku => !tasku.isFinish) : [])
      }


      console.log(incomplete)
      console.log(completed)
    } catch (e) {
      alert(e)
      console.log(e)
    }
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }

    getTask()
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }



  return (
    <SafeAreaView onLayout={onLayoutRootView}>
      <View style={styles.container}>
        <Header lengthCompleted={completed} lengthIncomplete={incomplete} />
        <Task title='Incomplete' items={data} />
        <Task title='Completed' items={data} />
        <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
          <MaterialsIcon name='add' color='white' size={30} />
        </Pressable>
      </View>
      <ModalTask isVisible={modalVisible} onClose={closeModal} title='Add Task'>
        <View style={styles.modalContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Task'
              keyboardType='ascii-capable'
              style={styles.input}
              value={nameTask}
              onChangeText={setNameTask}
              autoFocus
            />
            <View style={styles.inputPicker}>
              <Picker placeholder='Category' selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)}>
                <Picker.Item label='Category' value='category' enabled={false} fontFamily='Inter-Bold' style={{ fontSize: 14, }} />
                <Picker.Item label='Finance' value='finance' style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, }} />
                <Picker.Item label='Wedding' value='wedding' style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, }} />
                <Picker.Item label='Other' value='other' style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, }} />
              </Picker>
            </View>
          </View>
          <Pressable style={[nameTask && category ? styles.buttonModalValid : styles.buttonModalNotValid]} onPress={addTask} disabled={(!nameTask || !category)}>
            <Text style={{ color: 'white', fontFamily: 'Inter-SemiBold' }}>Add</Text>
          </Pressable>
        </View>
      </ModalTask>
      <StatusBar style='auto' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#141419',
    paddingHorizontal: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#473FA0',
    borderColor: '#515CC6',
    borderWidth: 2,
    borderRadius: 28,
    bottom: 30,
    height: 56,
    justifyContent: 'center',
    width: 56,
    position: 'absolute',
    right: 30,
  },
  modalContainer: {
    marginTop: 20,
    marginBottom: 40,
    flex: 1,
  },
  input: {
    borderRadius: 6,
    backgroundColor: '#fff',
    padding: 6,
  },
  inputPicker: {
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  buttonModalValid: {
    backgroundColor: '#473FA0',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  buttonModalNotValid: {
    backgroundColor: '#6D68A1',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  inputContainer: {
    gap: 10,
    flex: 1,
  }
});
