export const sortAscAlpha = (data)=>{
return data.sort((a,b)=>{
    if(a.name>b.name){
         return 1
        }
    else if(a.name<b.name) {
            return -1
        } 
    return 0
});
}
export const sortDescAlpha = (data)=>{
    return data.sort((a,b)=>{
        if(a.name<b.name){
             return 1
            }
        else if(a.name>b.name) {
                return -1
            } 
        return 0
    });
}
export const sortAscRating = (data)=>{
    return data.sort((a,b)=>Number.parseInt(a.rating) - Number.parseInt(b.rating) )
}
export const sortDescRating = (data)=>{
    return data.sort((a,b)=>b.rating - a.rating)
}
