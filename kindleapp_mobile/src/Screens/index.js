import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity,Platform, StatusBar } from 'react-native'
import React, { useState } from 'react';
import mainContainer from './Main.Container'
import ViewPager from '@react-native-community/viewpager';


const KindleMain = () => {
    const { content, selectOneFile } = mainContainer()
    const generateBookParts = (book) => {
        const NUM_OF_LINES = 25;
        const CPL = 11;
        const bookPartsLength = Math.round(book.length / CPL * NUM_OF_LINES);
        const bookPartsList = [];
        let bookPart = book;
        for (let i = 1; i <= bookPartsLength; i++) {
            if (bookPart.slice(0, CPL * NUM_OF_LINES) != "") {
                bookPartsList.push(
                    <View style={styles.viewStyle} key={i}>
                        <Text style={styles.textContent}>{bookPart.slice(0, CPL * NUM_OF_LINES)}</Text>
                        <Text style={styles.pageNumberStyle}>Page {i}</Text>
                    </View>
                );
                bookPart = bookPart.slice(CPL * NUM_OF_LINES);
            }
        }
        return bookPartsList;
    }

    return (
        <View
            collapsable={false}
            style={styles.container}
        >
            <TouchableOpacity 
            style={styles.btn}
            onPress={selectOneFile}>
                <Text style={styles.btnlbl}>Select Book</Text>
            </TouchableOpacity>
            {content == null ? <Text style={{textAlign:'center'}}>No book selected</Text> : 
            <ViewPager style={styles.viewPager} initialPage={0}>
            {generateBookParts(content)}
           </ViewPager>
            }
        </View>
    );

}

export default KindleMain

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:Platform.OS === 'android' ? StatusBar.currentHeight : 42
    },
    viewPager: {
        flex: 1,
    },
    viewStyle: {
        padding: 10,
    },
    textContent: {
        fontSize: 17,
        textAlign: 'justify',
    },
    pageNumberStyle: {
        fontSize: 20,
        color: 'gray',
        alignSelf: 'flex-end',
    },
    btn:{
        backgroundColor:"pink",
        padding:10,
        alignItems:'center'
    },
    btnlbl:{
        fontWeight:'bold',
        fontSize:18,
        color:'black'
    }
});
