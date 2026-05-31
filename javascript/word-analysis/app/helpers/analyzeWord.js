function analyzeWord(str){
    const vowels="aeiouAeiou"
    let vCount=0;
    let cCount=0;
    for(let char of str){
        if(/[a-zA-Z]/.test(char)){
            if(vowels.includes(char)){
                vCount++;
            }
            else{
                cCount++;
            }
        }
    }
    return{
        length:str.length,
        vowels:vCount,
        consonants:cCount
};
}
export default analyzeWord;