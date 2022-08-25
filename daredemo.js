const form=document.getElementById('form');
const id=document.getElementById('input');
const ul=document.getElementById('ul');

//local storageからデータを取得する。JSON.parse を施すことでJSの配列として扱うことが出来る
const todos =JSON.parse(localStorage.getItem("todos"));

//todosに何かしらデータが格納されていたら、処理を行う
if (todos){
    todos.forEach(todo =>{
        //liタグを呼び出す
        add(todo);
    })
}

// form id="form"に作用する。
//event.preventDefaultは入力フォームに入力される度、defaultでwebページがF5されてしまう。それをキャンセルするモノ
//console.log(input.value);は入力された文字をconsoleに出力する
form.addEventListener("submit",function(event){
    event.preventDefault();
    //console.log(input.value);
    add(); //下記のadd関数で処理を行う
});

function add(todo){
    let todoText =input.value;

    if (todo){
        todoText = todo.text;
    }
    //文字数が0文字以上であるならば処理
    if (todoText){
        //liタグを作成する
        const li = document.createElement("li");
        //入力された文字を全て文字列と見なし出力する
        li.innerText = todoText;
        //classList API を用いてクラスを追加(list-group-itemというHTMLクラスを追加)
        li.classList.add("list-group-item");
        //todoが存在==local storageにデータがある 且つ todo.completedも存在していた場合 処理
        if (todo && todo.completed){
            li.classList.add("text-decoration-line-through");
        }

        // ＜＜削除する処理 contextmenuで右クリックすれば関数が発動する。＞＞
        li.addEventListener("contextmenu",function(event){
            //右クリックした際に出るメニューバーの非表示にする
            event.preventDefault();
            //liのデータを削除する
            li.remove();
            //savaDtaも更新
            saveDate();
        });

        //完了した印を出力
        li.addEventListener("click",function(){
            //liにクラス名があれば、クラス名を除去し、クラス名がなければ追加
            //text-decoration-line-throughはbootstrapで横線を出力させる処理
            li.classList.toggle("text-decoration-line-through");
            saveDate();
        })



        //ユーザーが入力した情報をliタグとして追加
        ul.appendChild(li);
        //入力しエンターを押す度、フォームには空文字を充てる
        input.value = "";
        saveDate();
    }
}

function saveDate(){
    //liタグにdocumentのデータが入っている。listsの格納
    const lists =document.querySelectorAll("li");
    let todos = [];

    //listsに格納されているデータに対して同じ処理をする
    lists.forEach(list => {
        //横線が付いていた項目がある状態でF5しても横線が消えないようにするための処理。オブジェクト(辞書的なモノ？)
        let todo ={
            text: list.innerText,
            completed:list.classList.contains("text-decoration-line-through")
        };
        //todosというリストに格納する
        todos.push(todo);
    });
    //local storageにデータを保存する localStorage.setItem('キー','値') / データを取得した時はlocalStorage.getItem('キー')
    localStorage.setItem("todos", JSON.stringify(todos));
}




