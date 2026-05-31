function unpack(obj){
    let res="";
    for(const ch in obj){
        res+=ch.repeat(obj[ch])
        // for(i=0;i<obj[ch];i++){
        //     res+=ch;
        // }
    }
    return res;
}

console.log(unpack({a:3,b:2,c:1}));

function sti(str){
    const obj={};
    for(let i=0;i<str.length;i++){
        const char=str[i];
        if(char in obj){
           obj[char].push(i);
        }
        
        else{
            obj[char]=[i];
        }
        
    }
    return obj;
}

console.log(sti("dctddcdt"))

function sti2(obj){
    const str=[];
    for(const i in obj){
        // obj[i].forEach(ele => {
        //     str[ele]=i;
        // });
        for(let j=0;j<obj[i].length;j++){
            // console.log(obj[i][j]);
            const arr=obj[i];
            // console.log(i);
            // str[arr[j]]=i;
            str[obj[i][j]]=i
            // console.log(str);
            //  console.log(i);
        }

    }
    return str.join('');
}

console.log(sti2({ d: [ 0, 3, 4, 6 ], c: [ 1, 5 ], t: [ 2, 7 ] }))


function test1(str){
    const obj={};
    for(let i=0;i<str.length;i++){
        if(str[i] in obj){
            obj[str[i]].push(i);
        }
        else{
            obj[str[i]]=[i];
        }
    }
    return obj;
}
console.log(test1("dctddcdt"));


function test2(obj){
    const arr=[];
    for(const ar in obj){
        for(const ele of obj[ar]){
            arr[ele]=ar;
        }
    }
    return arr.join("");
}
console.log(test2({ d: [ 0, 3, 4, 6 ], c: [ 1, 5 ], t: [ 2, 7 ] }))

