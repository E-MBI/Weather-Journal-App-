// Create a new date instance dynamically with JS
let d = new Date();
let newDate =
  d.getMonth() + //month
  1 +
  "." +
  d.getDate() + //date
  "." +
  d.getFullYear() + //get year
  " " +
  "& Time" +
  " " +
  d.getHours() + //get tiem
  ":" +
  d.getSeconds(); //get seconds
//Api key
const Api_K = "8bd0fc95a29ef88582fd1ce5bebd98e4";
console.log(Api_K);
// when click on btn the parent contianer of content weather will apper
const Parent_cont = document.querySelector("#entryHolder");
//here we hidden the parent
Parent_cont.style.display = "none";
//select the button of generate
let generate_btn = document.querySelector("#generate");
console.log(generate_btn);
//after then add event for this button when user click over it ,will do somthing is get frist Zip-code and sen it with external api
generate_btn.addEventListener("click", async () => {
  // selected the ZIP-code input and get the value form it
  let zip_c = document.getElementById("zip").value;
  console.log(zip_c);
  // selected the feelings text-area and get the value form it
  let feelings = document.getElementById("feelings").value;
  console.log(feelings);

  if (!zip_c && typeof feelings !== "string") {
    alert("please enter valid zip code");
    return false;
  }

  try {
    //url of zip code  of status currnt weather && and temp with (c')=>
    const URl_currnt = `https://api.openweathermap.org/data/2.5/weather?zip=${zip_c},&appid=${Api_K}&units=metric`;
    //using fetch function to send req and get res for url as a parameter
    const res = await fetch(URl_currnt);
    //console.log(res);
    //after then converting the data form unreadable secreen to readable data bay function.json
    const conver_data = await res.json(); //that will return Object container inside it Objcets about country that user entered it's zip code
    //print to ensure form it in console screen
    console.log(conver_data.main.temp); //that will print the tempreture
    //let temp in a variable to use it after then more time
    const temp_c = conver_data.main.temp;
    console.log(temp_c);

    // ***********************
    // when click on btn the parent contianer of content weather will apper
    Parent_cont.style.display = "block";
    console.log(Parent_cont);
    // *************************
    //callback function that post data
    await postDate(temp_c, feelings);

    //callback fuction that get final dat
    await Up_to_ui();

    // *************************
    //use here ! try and catch to find error if it founded
  } catch (error) {
    //then print it into the console.log secreen
    console.log(error + "**");
  }
});

// ************************************
//function of post datat
async function postDate(temp, feelings) {
  await fetch("/setTempData", {
    method: "POST",
    //hint the data the return for you consider json data
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      date: newDate, //this return the new date
      temp: temp, //this return the tempreture of country
      feelings: feelings, //this return the feelings that user entery on text area
    }),
  });
}
// ************************************
//Post the data into UI
async function Up_to_ui() {
  //call get endpoint to return data
  const Node_Res = await fetch("/getTempData");
  //converting Node respons to json data
  const F_data = await Node_Res.json();
  console.log(F_data);
  //selcted the ui input that showing data inside it
  //dive that we show date inside it
  const date_ui = document.querySelector("#date");
  console.log(date_ui);
  //dive that we show temperture inside it
  const temp_ui = document.querySelector("#temp");
  console.log(temp_ui);
  //dive that we show feelings  inside it
  const feelings_ui = document.querySelector("#feel");
  console.log(feelings_ui);

  //show date with use template litral and get date form object F_data
  date_ui.innerHTML = `  <span class ="cont_sp" > The Date :</span>   ${F_data.date}`;
  // ************************
  //show date with use template litral and get date form object F_data
  temp_ui.innerHTML = `  <span class ="cont_sp" > The Temperture :</span>   ${F_data.temp} C' `;
  // ************************
  //show date with use template litral and get date form object F_data
  feelings_ui.innerHTML = `  <span class ="cont_sp" > YOU Feel:</span>   ${F_data.feelings}`;
}
