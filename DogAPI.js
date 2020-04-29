const nextButton = document.getElementById("change-dog")  //button
const dogName = document.getElementById("dog-name")       //Select bar
const dogNumber = document.getElementById("dog-number")   //dog number
let   nowSelected = "sheepdog"
let   currentNumber = 1
const container = document.getElementById("box")




//リスト作り用のコード

function getList() {
fetch("https://dog.ceo/api/breeds/list/all")
  .then((res)=>{
    return res.json()　// 結果を json として読み込む   
  })
  .then((data)=>{
    console.log(data) //JSON File
    // console.log(Object.keys(data.message)) //dogList in JSON file (message)

    const dogList = Object.keys(data.message) //dogList はキーの配列になる。


    for(i=0; i<=dogList.length; i++){

      
      const type = dogList[i];

      if(data.message[type].length == 0) {    //ifを使ってサブタイプがある場合とない場合で分けたい
                                              //サブタイプなし
        dogOption = document.createElement("option");
        dogOption.value = type;
        dogOption.textContent = type; 
        dogName.appendChild(dogOption);
      }
      
      else {                                    //サブタイプあり
        for (j=0; j < data.message[type].length; j++){
          subList = data.message[type];
          subType = subList[j];
            
          dogOption = document.createElement("option");
          dogOption.value = subType + "-" + type;
          dogOption.textContent = subType + "-" + type; 
          dogName.appendChild(dogOption);
        
        }
      } 
    }
  })
}

//画像取得
function getDog(breed){
   
   fetch("https://dog.ceo/api/breed/" + breed + "/images/random")
    .then((res)=>{
      return res.json()　// 結果を json として読み込む
    })
    .then((data)=>{
      const dogImage = document.createElement("img")
      dogImage.src = data.message　// 画像を表示する
      container.append(dogImage)
    })
  }
 
function nameChange(){                          //犬を変更
  let theName = dogName.options[dogName.selectedIndex];
  nowSelected = theName.textContent
  console.log(nowSelected);
}

dogNumber.onchange = function(option){     //犬の数を変える（まだ実装していない）
  currentNumber = option.value;
  console.log()
}

nextButton.onclick = function(){　　//ボタン
  getDog(nowSelected);
}

window.onload = function(){
  getList();
  getDog(nowSelected);
}




