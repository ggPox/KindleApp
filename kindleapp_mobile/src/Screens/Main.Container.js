import { StyleSheet, Text, View } from 'react-native'
import {useState} from 'react'
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
const Main = () => {
    const [content, setContent] = useState(null) 
    const readFile = async (path) => {
        RNFS.readFile(path).then(res => {
            setContent(res)
          })
            .catch(err => {
              console.log(err.message, err.code);
            });
      };

    const selectOneFile = async () => {
        try {
          const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.plainText],
          });
          readFile(res[0].uri)
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
            alert('Canceled');
          } else {
            alert('Unknown Error: ' + JSON.stringify(err));
            throw err;
          }
        }
      };
  return  {
    content,
    selectOneFile
  }
}

export default Main

const styles = StyleSheet.create({})