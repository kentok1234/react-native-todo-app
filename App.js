import 'react-native-get-random-values'
import uuid from 'react-native-uuid';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Pressable, TextInput, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useFonts } from 'expo-font'
import { useCallback, useState } from 'react';
import { FlashList } from '@shopify/flash-list'
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import Header from './components/Header';
import Task from './components/Task';
import ModalTask from './components/ModalTask';
import CheckboxTask from './components/CheckboxTask';

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
  const [tasks, setTask] = useState([])
  const [selectedTask, setSelectedTask] = useState()

  const closeModal = () => {
    setModalVisible(false)
  }

  const renderItemsIncomplete = ({ item }) => {

    return (
      <View>
        <CheckboxTask
          key={item.id}
          title={item.title}
          category={item.category}
          isFinish={item.isFinish}
          onSelect={setSelectedTask}
        />
      </View>
    )
  }
  const renderItemsCompleted = ({ item }) => {
    return (
      <View>
        <CheckboxTask
          key={item.id}
          title={item.title}
          category={item.category}
          isFinish={item.isFinish}
          onSelect={setSelectedTask}
        />
      </View>
    )
  }


  const addTask = async () => {

    try {
      const task = {
        id: uuid.v4(),
        title: nameTask,
        category: category,
        isFinish: false,
      }
      if (tasks.length === 0) {
        await AsyncStorage.setItem('task', JSON.stringify([task]))
      } else {
        await AsyncStorage.setItem('task', JSON.stringify(tasks.concat(task)))
      }
    } catch (e) {
      alert('Error while add task: ' + e)
    }

    setCategory(null)
    setNameTask(null)
    setModalVisible(false)
  }

  const getTask = async () => {
    try {
      let value = await AsyncStorage.getItem('task')
      if (value) {
        value = JSON.parse(value)
        setTask(value)
      }
    } catch (e) {
      alert(e)
      console.log(e)
    }
  }

  const updateData = async () => {
    try {
      const data = await AsyncStorage.getItem('task')
      const dataParse = JSON.parse(data)

      const updateData = dataParse.map(item => {
        if (item.title === selectedTask.title) {
          return {
            ...item,
            isFinish: !item.isFinish
          }
        }

        return item
      })

      setSelectedTask()

      await AsyncStorage.setItem('task', JSON.stringify(updateData))
      setTask(updateData)
    } catch (e) {
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

  if (!!selectedTask) {
    updateData()
  }

  const lengthIncomplete = tasks.filter(task => !task.isFinish).length
  const lengthCompleted = tasks.filter(task => task.isFinish).length

  return (
    <SafeAreaView onLayout={onLayoutRootView}>
      <View style={styles.container}>
        <Header lengthIncomplete={lengthIncomplete} lengthCompleted={lengthCompleted} />
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>

          <Task title='Incomplete' setSelectedTask={setSelectedTask}>
            <FlashList
              data={tasks.filter(taskIncom => !taskIncom.isFinish)}
              renderItem={renderItemsIncomplete}
              ListEmptyComponent={() => (
                <Text style={{ color: '#DADADA', fontSize: 18, fontFamily: 'Inter-Medium' }}>There is no task.</Text>
              )}
              estimatedItemSize={5}
            />
          </Task>
          <Task title='Completed' setSelectedTask={setSelectedTask}>
            <FlashList
              data={tasks.filter(taskComp => taskComp.isFinish)}
              renderItem={renderItemsCompleted}
              ListEmptyComponent={() => (
                <Text style={{ color: '#DADADA', fontSize: 18, fontFamily: 'Inter-Medium' }}>There is no task.</Text>
              )}
              estimatedItemSize={5}
            />
          </Task>

        </ScrollView>
      </View>
      <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
        <MaterialsIcon name='add' color='white' size={30} />
      </Pressable>
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
              <Picker placeholder='Category' selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)} re>
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
