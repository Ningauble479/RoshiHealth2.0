import Axios from 'axios'

//Pass the URL for the axios call. What type of call it is. And the data being passed if there is any
export default async (url, type, Data) => {
    switch(type){
        case 'GET':
            let {data} = await Axios.get(url)
            return data
        break;
        case 'POST':
            let {dataPost} = await Axios.post(url, Data)
            return dataPost
        break;
        default:
            return 'Idk what this is'

    }
}