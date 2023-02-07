const date = new Date();

let initilizeDate = {
    row: 6, /*min value */
    currentYear: date.getFullYear(),
    currentMonth: date.getMonth() + 1,
    currentDay: date.getDate(),
    currentDateFormat: formatDate(new Date()),
    calenderList: []
}


const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");



prevBtn.onclick = () =>{

    console.log(getPreviousMonthDateFormat());

    fillCalenderList();
}

nextBtn.onclick = () =>{

    console.log(getNextMonthDateFormat()); 
    
    fillCalenderList();
}

function getPreviousMonthDateFormat()
{
    if(initilizeDate.currentMonth == 1)
    {
        initilizeDate.currentMonth = 12;
        initilizeDate.currentYear--;
    }
    else
    {
        initilizeDate.currentMonth--;
    }

    initilizeDate.currentDateFormat = initilizeDate.currentYear + "-" + pairNbrFormat(initilizeDate.currentMonth) + "-" + "01";

    return initilizeDate.currentYear + "-" + pairNbrFormat(initilizeDate.currentMonth) + "-" + "01";
}

function getNextMonthDateFormat(){

    if(initilizeDate.currentMonth == 12)
    {
        initilizeDate.currentMonth = 1;
        initilizeDate.currentYear++;
    }
    else
    {
        initilizeDate.currentMonth++;
    }

    initilizeDate.currentDateFormat = initilizeDate.currentYear + "-" + pairNbrFormat(initilizeDate.currentMonth) + "-" + "01";

    return initilizeDate.currentYear + "-" + pairNbrFormat(initilizeDate.currentMonth) + "-" + "01";
}

fillCalenderList()

function fillCalenderList()
{
    //clear
    initilizeDate.calenderList.length=0;

    //get the current Month index
    let currentMonthFirstDayIndex =  getDateByOption({type: "GET_CURRENT_MONTH_FIRST_DAY_INDEX", payload: initilizeDate.currentDateFormat});
    
    //initilize date system to see if we are at the current month
    const dateSys = new Date();
    const currentDate = new Date(initilizeDate.currentDateFormat);

    //we need "lastPrevMonthDay" and "lastPrevMonthDayIndex" to add previous day in calender
    const lastPrevMonthDay = getDateByOption({type:"LAST_PREV_MONTH_DAY", payload: initilizeDate.currentDateFormat});
    const lastPrevMonthDayIndex = getDateByOption({type:"LAST_PREV_MONTH_DAY_INDEX", payload: initilizeDate.currentDateFormat});

    //we need "lastDayOfCurrentMonth" add current
    const lastDayOfCurrentMonth = getDateByOption({type: "GET_CURRENT_MONTH_LAST_DAY", payload: initilizeDate.currentDateFormat});

    

    //if the first day of current Month = 0 that's means we don't have to add the last days of previous month to calender
    if (currentMonthFirstDayIndex == 0) {

        if (compareTwoDates(currentDate, dateSys)) {
        
            // const date = new Date();
            // const currentDay = date.getDate();

            //fill the current Month
            for (let i = 1; i <= lastDayOfCurrentMonth; i++) {
                
                i == dateSys.getDate() ?  initilizeDate.calenderList.push(createElementFromHTML(`<div id="${i}" class="today" >${i}</div>`)) : 
                initilizeDate.calenderList.push(createElementFromHTML(`<div id="${i}">${i}</div>`));
                
            }

            //fill the next Month
            const diff = (initilizeDate.row) * 7 - lastDayOfCurrentMonth; //"7 == week"
    
            for (let i = 1; i <= diff; i++) {
                if(initilizeDate.calenderList.length < (initilizeDate.row * 7 ))
                {
                    
                    initilizeDate.calenderList.push(createElementFromHTML(`<div id="${i}" class="next-month-day" >${i}</div>`))
                }
            }

            //update DOM
            const parent = document.getElementById("days");
            parent.innerHTML = "";//clear
            initilizeDate.calenderList.forEach(list => {
                parent.append(list);
            });
            //updateCalenderDOM(parent, initilizeDate.calenderList);
            
        }
        else
        {
            //other month has no prev month
            //console.log("test this ",initilizeDate.currentDate);

            //fill the current Month
            for (let i = 1; i <= lastDayOfCurrentMonth; i++) {
                
                initilizeDate.calenderList.push(createElementFromHTML(`<div id="${i}">${i}</div>`));
                
            }

            //fill the next Month
            const diff = (initilizeDate.row) * 7 - lastDayOfCurrentMonth; //"7 == week"
    
            for (let i = 1; i <= diff; i++) {
                
                if(initilizeDate.calenderList.length < (initilizeDate.row * 7 ))
                {
                    initilizeDate.calenderList.push(createElementFromHTML(`<div id="${i}" class="next-month-day" >${i}</div>`))
                }
            }

            //update DOM
            const parent = document.getElementById("days");
            parent.innerHTML = "";//clear
            initilizeDate.calenderList.forEach(list => {
                parent.append(list);
            });
        }

    }
    else{

        
        //if this condition is true mean's that we are in the current date and also not the begginig of the month "is not sunday"
        if (compareTwoDates(currentDate, dateSys)) {
            
            //add previous month to calender list
            for (let i = lastPrevMonthDay - lastPrevMonthDayIndex; i <= lastPrevMonthDay; i++) {
                
                initilizeDate.calenderList.push(createElementFromHTML(`<div id="${i}" class="prev-month-day" >${i}</div>`));
            }

            //fill the current month
            for (let i = 1; i <= lastDayOfCurrentMonth; i++) {
                
                i == dateSys.getDate() ?  initilizeDate.calenderList.push(createElementFromHTML(`<div id="${i}" class="today" >${i}</div>`)) : 
                initilizeDate.calenderList.push(createElementFromHTML(`<div id="${i}">${i}</div>`));

            
            }

            //fill the next month
            const diff = (initilizeDate.row) * 7 - lastDayOfCurrentMonth; //"7 == week"
    
            for (let i = 1; i <= diff; i++) {
                if(initilizeDate.calenderList.length < (initilizeDate.row * 7 ))
                {
                    initilizeDate.calenderList.push(createElementFromHTML(`<div id="${i}" class="next-month-day" >${i}</div>`))
                }    
            }

            //test
            const parent = document.getElementById("days");
                parent.innerHTML = "";//clear
                initilizeDate.calenderList.forEach(list => {
                parent.append(list);
            });

        }
        else
        {
            //add previous month to calender list
            for (let i = lastPrevMonthDay - lastPrevMonthDayIndex; i <= lastPrevMonthDay; i++) {
                
                initilizeDate.calenderList.push(createElementFromHTML(`<div id="${i}" class="prev-month-day" >${i}</div>`));
            }

            //fill the current month
            for (let i = 1; i <= lastDayOfCurrentMonth; i++) {
                
                initilizeDate.calenderList.push(createElementFromHTML(`<div id="${i}">${i}</div>`));
                
            }

            //fill the next month
            const diff = (initilizeDate.row) * 7 - lastDayOfCurrentMonth; //"7 == week"
    
            for (let i = 1; i <= diff; i++) {

                if(initilizeDate.calenderList.length < (initilizeDate.row * 7 ))
                {
                    initilizeDate.calenderList.push(createElementFromHTML(`<div id="${i}" class="next-month-day" >${i}</div>`))
                }
            }

            //test
            const parent = document.getElementById("days");
                parent.innerHTML = "";//clear
                initilizeDate.calenderList.forEach(list => {
                parent.append(list);
            });
        }

    }

    var navigationTitle = document.getElementById("month-year-title");
    navigationTitle.innerHTML = printNavigationMonthAndYear(initilizeDate.currentYear, initilizeDate.currentMonth)
}


//function to print month and year in navigation
function printNavigationMonthAndYear(year,month) {

    //all Month names
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    

    return monthNames[month - 1] + " " + year;

}

console.log( printNavigationMonthAndYear(initilizeDate.currentYear, initilizeDate.currentMonth));

//
function getDateByOption(action)
{
    // all options
    const options = ["GET_CURRENT_YEAR", "GET_CURRENT_MONTH", "GET_CURRENT_DAY_NAME", 
        "GET_CURRENT_DAY_NUMBER", "GET_CURRENT_TIME"
    ];

    //intialize the date
    var date = new Date(action.payload);


    //all Month names
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    //all day of week
    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
    "Sunday"];


    switch (action.type) 
    {
        case "GET_CURRENT_YEAR":
            return new Date(action.payload).getFullYear();
    
        case "GET_CURRENT_MONTH_NAME":
            return monthNames[date.getMonth()];

        case "GET_CURRENT_DAY_NAME":
            return dayNames[date.getDay() - 1]; 
            
        case "GET_CURRENT_DAY_NUMBER":
            return date.getDate();
        
        case "GET_CURRENT_TIME":
                return pairNbrFormat(date.getHours()) + " : " + pairNbrFormat(date.getMinutes());
        case "GET_CURRENT_MONTH_FIRST_DAY_INDEX":
                //return first day index of current Month
                /*add data to param* new Date("2022-10-15")*/ 
                const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

                return firstDay.getDay();

        case "GET_CURRENT_MONTH_LAST_DAY":  
                const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            return lastDay.getDate();
        case "GET_CURRENT_MONTH_LAST_DAY_INDEX":  
                const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            return lastDayIndex.getDay();

        case "LAST_PREV_MONTH_DAY":
            date.setDate(0);
            return  date.getDate();

        case "LAST_PREV_MONTH_DAY_INDEX":
            date.setDate(0);
            return  date.getDay();
        default:
            break;
    }

}

//function to add 0 to number exmple :: 1 ==> 02
function pairNbrFormat(nbr) {
    return (nbr < 10) ? '0' + nbr.toString() : nbr.toString();
}

//compare two dates
function compareTwoDates(date1, date2)
{
    if(date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth())
    {
        return true;
    }
    else
    {
        return false;
    }

}


//function to print date as year-month-day
function formatDate(datePlaceHolder)
{
    //if we pace new Date in place holder that's mean we whant the current date
    var date = datePlaceHolder;
    var month = date.getUTCMonth() + 1; //months from 1-12
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();

    return newdate = year + "-" + pairNbrFormat(month) + "-" + pairNbrFormat(day);
}


//function to change string to an element
function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}

//update DOM
document.getElementById("month-year-title").setAttribute("current-date",initilizeDate.currentDateFormat);

const navigationTitle = document.getElementById("month-year-title");


setInterval(function () {
    document.getElementById("time").innerHTML = getDateByOption({type:"GET_CURRENT_TIME",payload:new Date()});
}, 2000); 

document.getElementById("date").innerHTML = getDateByOption({type:"GET_CURRENT_DAY_NAME",payload:new Date()}) + ", " +
    getDateByOption({type:"GET_CURRENT_MONTH_NAME",payload:new Date()}) + " " + pairNbrFormat(getDateByOption({type:"GET_CURRENT_DAY_NUMBER",payload:new Date()}));


