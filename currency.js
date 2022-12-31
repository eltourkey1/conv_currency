let top_select = document.querySelector("#top-select");
let top_input = document.querySelector("#top-input");

let bottom_select = document.querySelector("#bottom-select");
let bottom_input = document.querySelector("#bottom-input");

//aoi from site :freecurrencyapi

fetch("https://api.freecurrencyapi.com/v1/latest?apikey=Ew3lPt8PB4rPsHoDFh0w9sSqKAAWtzDZGxXQOscw")
    .then((result) => {
        let data = result.json();
        console.log(data)
        return data
    }).then((p) => {
        console.log(p);
        for (let key in p.data) {
            let options = document.createElement("option");
            options.innerHTML = key;
            options.setAttribute("value", `${p.data[key]}`);
            let clone = options.cloneNode(true);
            // clone options to used it in two boxes in one time
            top_select.appendChild(options);
            bottom_select.appendChild(clone);

        };
        // get values of currency in bottom box if enter number in  top box vice versa
        top_select.addEventListener("change", () => {
            total_value_in_bottom_box()
            total_value_in_top_box()
        });
        bottom_select.addEventListener("change", () => {
            total_value_in_top_box()
            total_value_in_bottom_box()
        });
        top_input.addEventListener("change", total_value_in_top_box);
        bottom_input.addEventListener("change", total_value_in_bottom_box);
        // keyup event :to update data automatic when you right in input box
        top_input.addEventListener("keyup", total_value_in_top_box);
        bottom_input.addEventListener("keyup", total_value_in_bottom_box);



        //functions
        ///function to convert value of top box and put result in bottom box
        function total_value_in_top_box() {
            let value_of_final_currency = ((+top_input.value) * (+bottom_select.value / +top_select.value));
            bottom_input.value = value_of_final_currency;
        }
        ///function to convert value of bottom box and put result in top box
        function total_value_in_bottom_box() {
            let value_of_final_currency = ((+bottom_input.value) * (+top_select.value / +bottom_select.value));
            top_input.value = value_of_final_currency;
        }

        ///////////////////////////
    }).catch((er) => {
        console.log(Error("problem in api link"))
    });