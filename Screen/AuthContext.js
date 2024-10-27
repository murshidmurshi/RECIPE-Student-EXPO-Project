import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext();

export const  AuthProvider = ({ children }) => {
    const [getItem, setGetItem] = useState([])
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)


    console.log('Hello this is from AuthContext...');
    console.log(token, 'Token in  AuthContext...');

    const GetData = async () => {
        // await AsyncStorage.removeItem('Register')
        let initialValue = await AsyncStorage.getItem('Register');
        // Parse the JSON string
        let parsedInitialValue = await JSON.parse(initialValue) || [];
        setGetItem(parsedInitialValue)
        console.log(parsedInitialValue, 'All Data inside Context');

    }

    const Logout=async()=>{
        await AsyncStorage.removeItem('Token')
        setToken(null)
        console.log('Token Removed successfully...');
    }


    const IsLoggedIn = async () => {
        let checkToken = await AsyncStorage.getItem('Token');

        // Parse the JSON string
        let parseToken = await JSON.parse(checkToken) || null;
        setToken(parseToken)
        setLoading(false)
        console.log(parseToken, 'Token inside Context ');
    }

    useEffect(() => {
        IsLoggedIn()
    }, [])


    return (
        <>
            <AuthContext.Provider value={{ token,loading, getItem, setGetItem, GetData,setToken,Logout }}>
                {children}
            </AuthContext.Provider>

        </>
    )
}