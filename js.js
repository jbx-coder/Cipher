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
        cleartext=hanziToReversibleNumber(document.getElementById('userInput').value, 32)
        changeto()
        document.getElementById('output').innerHTML=ciphertext  
    }else{
        clearall()
        ciphertext=document.getElementById('userInput').value
        changeback()
        document.getElementById('output').innerHTML=numberToReversibleHanzi(cleartext) 
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





function hanziToReversibleNumber(text, totalDigits = 16) {
  // 将字符串转换为字节数组
  const encoder = new TextEncoder();
  const bytes = encoder.encode(text);
  
  // 将字节数组转换为大整数
  let bigInt = 0n;
  for (let i = 0; i < bytes.length; i++) {
    bigInt = (bigInt << 8n) | BigInt(bytes[i]);
  }
  
  // 转换为十进制字符串
  let numStr = bigInt.toString(10);
  
  // 补全到指定位数
  return numStr.padStart(totalDigits, '0');
}

function numberToReversibleHanzi(numStr) {
  // 去除前导零
  numStr = numStr.replace(/^0+/, '') || '0';
  
  // 转换为大整数
  const bigInt = BigInt(numStr);
  
  // 转换为字节数组
  const bytes = [];
  let n = bigInt;
  while (n > 0n) {
    bytes.unshift(Number(n & 0xffn));
    n = n >> 8n;
  }
  
  // 解码为字符串
  const decoder = new TextDecoder();
  return decoder.decode(new Uint8Array(bytes));
}
