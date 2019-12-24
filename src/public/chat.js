$(function(){
    var socket = io.connect("http://localhost:3000")

    var message = $("#message")
    var category=$('#category')
    var username = $("#username")
    var send_message = $("#send_message")
    var messages_display = $("#messages_display") 
    send_message.click(function(){
    
        function column(x) {
            let matrix = new Array(x);
            for (let index = 0; index < matrix.length; index++) {
                matrix[index] = new Array(x);
            }
            return matrix;
        }
       socket.emit('change_username', {username :username.val()})
       
     
       var result=''
       if(category.val()=='caesar'){
        var str=message.val()
        
         
        let decoded = {
          a: 'n', b: 'o', c: 'p',
          d: 'q', e: 'r', f: 's',
          g: 't', h: 'u', i: 'v',
          j: 'w', k: 'x', l: 'y',
          m: 'z', n: 'a', o: 'b',
          p: 'c', q: 'd', r: 'e',
          s: 'f', t: 'g', u: 'h',
          v: 'i', w: 'j', x: 'k',
          y: 'l', z: 'm'    
        }
        
      
        str = str.toLowerCase();
        
        
      
        for(let i = 0 ; i < str.length; i++){
        result+= decoded[str[i]];
        }
        
       }
       else if(category.val()=='column')
       {
           
        let newText =message.val().toLowerCase();
        
        let matrixnumber = 0;
        for (let index = 0; ; index++) {
            const indexPow = Math.pow(index, 2)
            if (newText.length <= indexPow) {
                matrixnumber = index;
                break;
            }
        }

        let matrix = column(matrixnumber);
     
        let numberOfNewText = 0;
        for (let row = 0; row < matrixnumber; row++) {
            for (let column = 0; column < matrixnumber; column++) {
                matrix[row][column] = newText[numberOfNewText];
                numberOfNewText++;
            }
        }

        for (let row = 0; row < matrixnumber; row++) {
            for (let column = 0; column < matrixnumber; column++) {
                if (matrix[column][row]) {
                    result += matrix[column][row];
                } else {
                    result += " ";
                }
            }
        }
       }
       else if(category.val()=='polybius'){
       
        var str=category.val()
        let newText = message.val()
        
         let polybius =    [[" /a", "b", "c/ç", "d", "e"],
                                ["f", "g/ğ", "h", "ı/i", "j"],
                                ["k", "l", "m", "n", "o/ö"],
                                ["p", "q", "r", "s/ş", "t"],
                                ["u/ü", "v", "w/x", "y", "~/z"]]

        let encryption = (letter) => {
            polybius.forEach((row, rowkey) => {
                row.forEach((column, columnkey) => {
                    let letterSplit = column.split("/");
                    letterSplit.forEach((Letter, Letterkey) => {
                        if (letter === Letter) {
                            
                            result += (rowkey + 1).toString() + Letterkey.toString() + (columnkey + 1).toString();
                        }
                    });
                });
            });
        }
        for (const letter of newText) {
            encryption(letter);
        }
         

       }

       else if(category.val()=='çit')
       {
        let newText = message.val().toLowerCase();
        let singleLetter = '';
        let doubleLetter = '';
       
        for (let i = 0; i < newText.length; i++) {
            const letter = newText[i];
            if (i % 2 === 0) {
                singleLetter += letter;
            } else {
                doubleLetter += letter;
            }
        }

        for (let i = 0; i < (newText.length) / 2; i++) {
            if (singleLetter[i]) {
                result += singleLetter[i];
            }
        }
        for (let i = 0; i < (newText.length) / 2; i++) {
            if (doubleLetter[i]) {
                result += doubleLetter[i];
            }
        }
       } 
       socket.emit('new_message', {message :result})
    })
   

    socket.on("new_message", (data) => {
    
       messages_display.append("<p class='message'>" + data.username + ": " +data.message + "</p>") 
    })

 
});