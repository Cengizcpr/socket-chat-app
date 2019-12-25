
$(function(){
    var socket = io.connect("http://localhost:3000")

    var message = $("#message")
    var category=$('#category')
    var username = $("#username")
    var send_message = $("#send_message")
    var decoded_message=$("#decoded_message")
    var messages_display = $("#messages_display") 
    var messages_display2 = $("#messages_display2") 
    let pass_message=''
 
 
    decoded_message.click(function(){
        function column(x) {
            let matrix = new Array(x);
            for (let index = 0; index < matrix.length; index++) {
                matrix[index] = new Array(x);
            }
            return matrix;
        }
        
        if(category.val()=='polybius'){
            let newText = pass_message.toLowerCase();
            let codeText = '';
            let polybius = [[" /a", "b", "c/ç", "d", "e"],
            ["f", "g/ğ", "h", "ı/i", "j"],
            ["k", "l", "m", "n", "o/ö"],
            ["p", "q", "r", "s/ş", "t"],
            ["u/ü", "v", "w/x", "y", "~/z"]]
            var matrixPosition
            var textPosition
            let encryption = (letter) => {
                polybius.forEach((row, rowkey) => {
                    row.forEach((column, columnkey) => {
                        let letterSplit = column.split("/");
                        letterSplit.forEach((Letter, Letterkey) => {
                            matrixPosition = (rowkey + 1).toString() + Letterkey.toString() + (columnkey + 1).toString()
                            if (letter === matrixPosition) {
                                codeText += Letter;
                                
                            }
                        });
                    });
                });
            }
            for (let textNum = 0; textNum < (newText.length) / 3; textNum++) {
                textPosition = ''
                for (let letterNum = textNum * 3; letterNum < (textNum * 3 + 3); letterNum++) {
                    textPosition += newText[letterNum]
                }
                encryption(textPosition)
            }
          

            messages_display2.append("<p class='message'>" +"Çözümlenmiş Mesaj"  + ": "+codeText + "</p>") 
            

              
        }
        else if(category.val()=="vigenere")
        {
            let alfabe = [
                [" ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z"],
                ["a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " "],
                ["b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a"],
                ["c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b"],
                ["ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c"],
                ["d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç"],
                ["e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d"],
                ["f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e"],
                ["g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f"],
                ["ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g"],
                ["h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ"],
                ["ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h"],
                ["i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı"],
                ["j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i"],
                ["k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j"],
                ["l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k"],
                ["m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l"],
                ["n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m"],
                ["o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n"],
                ["ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o"],
                ["p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö"],
                ["q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p"],
                ["r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q"],
                ["s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r"],
                ["ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s"],
                ["t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş"],
                ["u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t"],
                ["ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u"],
                ["v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü"],
                ["w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v"],
                ["x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w"],
                ["y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x"],
                ["z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y"]
            ]
            let column = [" ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z"];
            let row = [" ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z"];
            let newText = pass_message.toLowerCase();
            let anahtarkelime = "daimagüvenlihaberleşin";
            let anahtaruzunlugu = 22;
            let numberOfRow = 0;
            let numberOfColumn = 0;
            let codeText = '';
    
            let satırFonksiyon = (keyword) => {
    
                row.forEach((Letter, key) => {
                    if (Letter === keyword) {
                        numberOfRow = key;
                    }
                });
    
            }
    
            let sütun = (letter) => {
    
                alfabe[numberOfRow].forEach((Letter, key) => {
                    if (Letter === letter) {
                        numberOfColumn = key
                    }
                })
    
            }
    
            let decoder = (letter, keyword) => {
                satırFonksiyon(keyword);
                sütun(letter);
                codeText += column[numberOfColumn];
            }
    
            for (let i = 0; i < newText.length; i++) {
                decoder(newText[i], anahtarkelime[i % anahtaruzunlugu]);
            }
            messages_display2.append("<p class='message'>" +"Çözümlenmiş Mesaj"  + ": "+codeText + "</p>") 

        }
        else if(category.val()=="çit"){
            let newText = pass_message.toLowerCase();
            let codeTexta = '';
            let midPoint = Math.round(newText.length / 2)
            for (let index = 0; index < midPoint; index++) {
    
                if (newText[midPoint + index] !== undefined) {
                    codeTexta += newText[index] + newText[midPoint + index]
                } else {
                    codeTexta += newText[index]
                }
    
            }
            messages_display2.append("<p class='message'>" +"Çözümlenmiş Mesaj"  + ": "+ codeTexta + "</p>") 


        }
        else if(category.val()=='caesar'){
            var str=pass_message
            var result=''

         
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
            messages_display2.append("<p class='message'>" +"Çözümlenmiş Mesaj"  + ": "+ result + "</p>") 

        }
        else if(category.val()=="column")
        {
           
            let codeTexta ="";
            let newText = pass_message.toLowerCase();
           
        let numberOfMatrix = 0;
        for (let index = 0; ; index++) {
            const indexPow = Math.pow(index, 2)
            if (newText.length <= indexPow) {
                numberOfMatrix = index;
                break;
            }
        }

        let matrix = column(numberOfMatrix);
       
        let numberOfNewText = 0;
        for (let column = 0; column < numberOfMatrix; column++) {
            for (let row = 0; row < numberOfMatrix; row++) {
                matrix[row][column] = newText[numberOfNewText];
                numberOfNewText++;
            }
        }
        for (let row = 0; row < numberOfMatrix; row++) {
            for (let column = 0; column < numberOfMatrix; column++) {
                if (matrix[row][column] && matrix[row][column] !== '~') {
                    codeTexta += matrix[row][column];
                }
            }
        } 
        
        messages_display2.append("<p class='message'>" +"Çözümlenmiş Mesaj"  + ": "+ codeTexta + "</p>") 

        }

    })
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
       else if(category.val()=='vigenere'){
        let alfabe = [
            [" ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z"],
            ["a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " "],
            ["b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a"],
            ["c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b"],
            ["ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c"],
            ["d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç"],
            ["e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d"],
            ["f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e"],
            ["g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f"],
            ["ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g"],
            ["h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ"],
            ["ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h"],
            ["i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı"],
            ["j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i"],
            ["k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j"],
            ["l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k"],
            ["m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l"],
            ["n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m"],
            ["o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n"],
            ["ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o"],
            ["p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö"],
            ["q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p"],
            ["r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q"],
            ["s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r"],
            ["ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s"],
            ["t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş"],
            ["u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t"],
            ["ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u"],
            ["v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü"],
            ["w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v"],
            ["x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w"],
            ["y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x"],
            ["z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y"]
        ]
        let column = [" ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z"];
        let row = [" ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z"];
        let newText = message.val().toLowerCase();
        let anahtarkelime = "daimagüvenlihaberleşin"
        let anahtaruzunlugu = 22;
        let numberOfRow = 0;
        let numberOfColumn = 0;
       

        let satırFonksiyon = (letter) => {

            row.forEach((Letter, key) => {
                if (Letter === letter) {
                    numberOfRow = key;
                }
            });

        }

        let sütun = (keyword) => {

            column.forEach((Letter, key) => {
                if (Letter === keyword) {
                    numberOfColumn = key;
                }
            });

        }

        let encryption = (letter, keyword) => {
            satırFonksiyon(letter);
            sütun(keyword);
            result += alfabe[numberOfRow][numberOfColumn];
        }

        for (let i = 0; i < newText.length; i++) {
            encryption(newText[i], anahtarkelime[i % anahtaruzunlugu]);
        }
       } 
       socket.emit('new_message', {message :result})
    })
   

    socket.on("new_message", (data) => {
    pass_message=data.message
   
       messages_display.append("<p class='message'>" + data.username + ": " +data.message + "</p>") 
    })

 
});