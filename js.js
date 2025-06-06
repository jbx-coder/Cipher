type=1
to=[3,6,8,4,2,9,1,7,5,0]
back=[9,6,4,0,3,8,1,7,2,5]
cleartext=""
ciphertext=""
function getback(){
    for(let i = 0;i<=9;i++){
        back[to[i]]=i
    }
    return back
}
function change(){
    to=[
        (to[9]+1)%10,
        (to[0]+1)%10,
        (to[1]+1)%10,
        (to[2]+1)%10,
        (to[3]+1)%10,
        (to[4]+1)%10,
        (to[5]+1)%10,
        (to[6]+1)%10,
        (to[7]+1)%10,
        (to[8]+1)%10
    ]
    getback()
    return to
}



function changeto(){
    to=[3,6,8,4,2,9,1,7,5,0]
    back=[9,6,4,0,3,8,1,7,2,5]
    for(let i=0;i<cleartext.length;i++){
        a=to[cleartext.charAt(i)]
        ciphertext=ciphertext+a
        change()
    }
    return ciphertext
}
function changeback(){
    to=[3,6,8,4,2,9,1,7,5,0]
    back=[9,6,4,0,3,8,1,7,2,5]
    for(let i=0;i<ciphertext.length;i++){
        a=back[ciphertext.charAt(i)]
        cleartext=cleartext+a
        change()
    }
    return cleartext
}

function gettext() {
    if(type<2){
        clearall()
        cleartext=document.getElementById('userInput').value
        changeto()
        document.getElementById('output').innerHTML=ciphertext  
    }else{
        clearall()
        ciphertext=document.getElementById('userInput').value
        changeback()
        document.getElementById('output').innerHTML=cleartext 
    }
    
    
}

function clearall(){
    to=[3,6,8,4,2,9,1,7,5,0]
    back=[9,6,4,0,3,8,1,7,2,5]
    cleartext=""
    ciphertext=""
    document.getElementById('output').innerHTML=""
}

function changetype(){
    if (type<2){
        type=2
        document.getElementById('button1').innerHTML="解密"
    }else{
        type=1
        document.getElementById('button1').innerHTML="加密"
    }
}