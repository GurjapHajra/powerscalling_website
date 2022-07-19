
let inp_num = document.getElementById("chars_num");

inp_num.addEventListener("change", resize_tab)

//cell containing names and power_level
let names = [];
let power_levels = [];
let photo_link=[];


// array containing strings of names and int for power level
let Rnames = [];
let Rpower_level = [];
let Rphoto_links=[];



function resize_tab(){
    let characters = parseInt(inp_num.value);

    let table = document.getElementById("in-table")

    let n = names.length;
    //adding rows
    if(characters == names.length){
        return;
    }else if(characters>n){
        for(let i = 0;i<(characters-n);i++){
            let row = table.insertRow();
            let cell1 = row.insertCell();
            let cell2 = row.insertCell();
            let cell3 = row.insertCell();

            let newInp = document.createElement("input");
            let newNum = document.createElement("input");
            newNum.type = "number";
            newNum.min = "1";
            let newLink = document.createElement("input");

            cell1.append(newInp)
            cell2.append(newNum)
            cell3.append(newLink);

            names.push(cell1);
            power_levels.push(cell2);
            photo_link.push(cell3);
        }
    //removes rows
    }else if(characters<n){
        for(let i = 0;i<(n-characters);i++){
            //removes from the cell
            names.pop();
            power_levels.pop();
            photo_link.pop();

            //reomves extra tags
            document.getElementsByTagName("tr")[n-i].remove();
        }
    }
}

let generateB = document.getElementById("generator");

generateB.addEventListener("click", get_data);

function get_data(){
    let characters = parseInt(inp_num.value);

    for(let i = 0;i<characters;i++){
        Rnames[i] = names[i].querySelector("input").value;
        Rpower_level[i] = parseInt(power_levels[i].querySelector("input").value);
        Rphoto_links[i] = photo_link[i].querySelector("input").value;
    }

    let prepared = preparedata(Rpower_level,Rnames,Rphoto_links);

    Rpower_level = prepared[0];
    Rnames = prepared[1];
    Rphoto_links = prepared[2];

    generate(Rnames,Rpower_level,Rphoto_links);
    
}

function removePrev(){
    //removing previous images
    let images = document.getElementsByTagName('img');
    let l = images.length;
    for (let i = 0; i < l; i++) {
        images[0].parentNode.removeChild(images[0]);
    }

    //removing previous ticks
    let ticks = document.getElementsByClassName("tick");
    let len = ticks.length;
    for(let i = 0;i<len;i++){
        ticks[0].parentNode.removeChild(ticks[0]);
    }

    //removing previous names
    let nam = document.getElementsByClassName("name");
    len = nam.length;
    for(let i = 0;i<len;i++){
        nam[0].parentNode.removeChild(nam[0]);
    }
    nam = document.getElementsByClassName("name2");
    len = nam.length;
    for(let i = 0;i<len;i++){
        nam[0].parentNode.removeChild(nam[0]);
    }

    //removes all the ticks
    let marks = document.getElementsByClassName("marker");
    len = marks.length;
    for(let i = 0;i<len;i++){
        marks[0].parentNode.removeChild(marks[0]);
    }
    let marks2 = document.getElementsByClassName("marker2");
    len = marks2.length;
    for(let i = 0;i<len;i++){
        marks2[0].parentNode.removeChild(marks2[0]);
    }

    //remove center line


}

function generate(Pnames,Ppower_level,Pphoto_links){

    removePrev();

    let src = document.getElementById("scroll");
    let characters = Pnames.length;

    for(let i = 0;i<characters;i++){
        
        //adding the image
        let img = document.createElement("img");
        img.src = Pphoto_links[i];
        if(i%2==0){
            img.classList.add("block");
        }else{
            img.classList.add("block2");
        }
            img.style.left = powerToPosition(Ppower_level[i])-45+"px";
        src.appendChild(img);

        //adding names on top of picture
        let namer = document.createElement("span");
        namer.innerText = Pnames[i];
        if(i%2==0){
            namer.classList.add("name");
        }else{
            namer.classList.add("name2");
        }
        namer.style.left = powerToPosition(Ppower_level[i])-45+"px";
        src.appendChild(namer);

        //adding position ticks
        let tick = document.createElement("div");
        if(i%2==0){    
            tick.classList.add("marker");
        }else{
            tick.classList.add("marker2");
        }
            tick.style.left = powerToPosition(Ppower_level[i])-1+"px";
        src.appendChild(tick);
    }

    //generate the scale
    tickLenth(Math.max(...Ppower_level)*4);

}

function tickLenth(length){
    //removing the ticks
    let ticks = document.getElementsByClassName("tick");
    for(let i = 0;i<ticks.length;i++){
        ticks[0].parentNode.removeChild(ticks[0])
    }

    //adding ticks
    let howmany = powerToPosition(length)/100;

    let src = document.getElementById("scroll");
    for(let i = 1;i<howmany;i++){
        let tick = document.createElement("div");
        tick.classList.add("tick");
        tick.style.left = (100*i)-2+"px";

        if(i>80){
            tick.style.backgroundColor = "magenta";
        }
        else if(i>50){
            tick.style.backgroundColor = "lightgreen";
        }else if(i>20){
            tick.style.backgroundColor = "cyan";
        }

        src.appendChild(tick);
    }

    let line = document.getElementById("center_line");
    line.style.width = powerToPosition(length)+"px";

}

function powerToPosition(power){
    if(power==0){
        return 0;
    }
    return (((Math.log(power)/Math.log(2))+1)*100)+"";
}

function preparedata(main,second,third){
    let n = main.length;
        
    for(let i = 0; i < n; i++) {
        // Finding the smallest number in the subarray
        let min = i;
        for(let j = i+1; j < n; j++){
            if(main[j] < main[min]) {
                min=j; 
            }
         }
         if (min != i) {
             // Swapping the elements
             let tmp = main[i];
             main[i] = main[min];
             main[min] = tmp;
             
             tmp = second[i];
             second[i] = second[min];
             second[min] = tmp;
             
             tmp = third[i];
             third[i] = third[min];
             third[min] = tmp;
        }
    }

    return [main,second,third];
}

// presets

let main3 = document.getElementById("main3");
main3.addEventListener("click",main3F);

let dbz = document.getElementById("dbz");
dbz.addEventListener("click",dbzF);

function main3F(){
    charNames = ["Naruto","Goku","Saitama"];
    charPowerLevel = [3000000,12500000000000000000000000,12000000000000000000];
    charphoto = ["https://c.tenor.com/Zsfov4ddSpoAAAAd/naruto-kurama.gif",
    "https://lh3.googleusercontent.com/icjFapcWFhNKlHxcPAyGs9rGBllQjD-Py-usMZI3z8X5V0oxnU2KPJx--hokcjd1oE1n7xzT5URB79I_Z-HjUJNtCTGKuhaoyo_O=w600",
    "https://i0.wp.com/68.media.tumblr.com/906592d8142a163297571e08d9e6fe07/tumblr_nzb3gjhogK1tndn6wo1_500.gif"];

    let prepared = preparedata(charPowerLevel,charNames,charphoto);

    charPowerLevel = prepared[0];
    charNames = prepared[1];
    charphoto = prepared[2];

    generate(charNames,charPowerLevel,charphoto);
}

function dbzF(){
    charNames = ["Goku","Jiren","Vegito","Android 17","Goten","Krillin","Frieza","Trunks","Piccolo","Gohan","Vegeta","Bulma","Roshi","Beerus","Whis","Vados"];
    charPowerLevel = [12500000000000000000000000,12100000000000000000000000,10000000000000000000000000,40000000000000000000,32000000000
                    ,4000000000,100000000000000000000,6000000000000000000000,8250000000000000,92000000000000000000,9500000000000000000000
                    ,12, 139,54000000000000000000000000,90000000000000000000000000,90000000000000000000000000];
    charphoto = ["https://lh3.googleusercontent.com/icjFapcWFhNKlHxcPAyGs9rGBllQjD-Py-usMZI3z8X5V0oxnU2KPJx--hokcjd1oE1n7xzT5URB79I_Z-HjUJNtCTGKuhaoyo_O=w600",
                "https://qph.cf2.quoracdn.net/main-qimg-1c3a7320c15aeacaf19b3debc5ff92b9",
                "https://c.tenor.com/90xMHO5sC6EAAAAC/vegito-power-up.gif",
                "https://c.tenor.com/FvbOmdiRE2AAAAAC/android17-dbz.gif",
                "https://c.tenor.com/Vqv9Ffk3yy8AAAAd/goten-ball.gif",
                "https://pa1.narvii.com/6275/1d00892aa0c08410deb8777f6dddc42ac01c3b18_hq.gif",
                "https://qph.cf2.quoracdn.net/main-qimg-a22ba817b915992f813911a92f8b6fea",
                "https://64.media.tumblr.com/db28cb37b9f3dda75ad701bad1cb5cab/tumblr_ogyblb1wqS1ujwg5zo1_500.gifv",
                "https://i.pinimg.com/originals/04/d5/50/04d550d27693ea4c4be6b2ddd270b6eb.gif",
                "https://media4.giphy.com/media/SRZuUDhEPZcReTJhFn/giphy.gif",
                "https://thumbs.gfycat.com/BoldWeightyFalcon-size_restricted.gif",
                "https://c.tenor.com/nti8ApdZtxEAAAAC/bulma-dragon-ball.gif",
                "https://thumbs.gfycat.com/DirectValuableIndianrhinoceros-size_restricted.gif",
                "https://steamuserimages-a.akamaihd.net/ugc/1800856233303871999/A07E625177495D13E32C3352F2AC9460B73AE058/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
                "https://pm1.narvii.com/6503/8cb8dd0d6af99d7008b7d32acfd91103f777641d_hq.jpg",
                "https://wallpapercave.com/wp/wp6846679.jpg"];


    let prepared = preparedata(charPowerLevel,charNames,charphoto);

    charPowerLevel = prepared[0];
    charNames = prepared[1];
    charphoto = prepared[2];

    generate(charNames,charPowerLevel,charphoto);
}

//yes ansh, you're gay