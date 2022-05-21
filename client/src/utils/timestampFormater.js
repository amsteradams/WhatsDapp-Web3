export default function timestampFormater(timestamp){
   let date = new Date(timestamp * 1000);
   let today = new Date();
   if(
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
    ){
        let result = date.getHours() + ':' + date.getMinutes();
        return result;
    }else{
        let result = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
        return result;
    }
    
}