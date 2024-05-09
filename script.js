const CLASSSEARCH_API_URL = 'https://emerson-fleming.github.io/CS-ClassSearch.json';
const colors = ["#b8ace4", "#209cbc", "#b8f4fc", "#68ccd4", "#60841c", "#b0cc84", "#ffd46c", "#f8ac14", "#f88c34", "#ff6c0c", "#ff5434", "#ffc4c4"];
const graphContainer = document.getElementById("graph-container");
let ClassSearch = null;
let filterInfo = { time: "", freq: "", number: "", component: "", dept: "CSE" };

const dummyData = [{
    "_id": "6629882437b470447336051c",
    "college": "BUS",
    "acadorg": "R1150",
    "subject": "CSE",
    "catalog": "2013",
    "section": "1002",
    "title": "Machine Learning",
    "component": "LEC",
    "session": "1",
    "classnbr": "20195",
    "instructionmode": "P",
    "classdays": "MW",
    "classstarttime": "8.0",
    "classendtime": "9.15",
    "startdate": "1/22/24",
    "enddate": "5/7/24",
    "room": "AB 106",
    "instructorlastname": "Do",
    "instructorfirstname": "Chuong",
    "roomcapacity": "208",
    "enrollmentcapacity": "200",
    "currentenrollment": "98",
    "waitlistcapacity": "999",
    "waitlisttotal": "0",
    "combined": "No",
    "classstat": "A",
    "prgrssunt": "3.0",
    "acadgroup": "120"
},
    {
        "_id": "6629882437b470447336051a",
        "college": "BUS",
        "acadorg": "R1150",
        "subject": "ACC",
        "catalog": "2051",
        "section": "1002",
        "title": "Financial Accounting",
        "component": "LEC",
        "session": "1",
        "classnbr": "20198",
        "instructionmode": "P",
        "classdays": "MW",
        "classstarttime": "15.0",
        "classendtime": "16.15",
        "startdate": "1/22/24",
        "enddate": "5/7/24",
        "room": "AB 106",
        "instructorlastname": "Do",
        "instructorfirstname": "Chuong",
        "roomcapacity": "208",
        "enrollmentcapacity": "200",
        "currentenrollment": "98",
        "waitlistcapacity": "999",
        "waitlisttotal": "0",
        "combined": "No",
        "classstat": "A",
        "prgrssunt": "3.0",
        "acadgroup": "120"
    },
    {
        "_id": "6629882437b470447336051b",
        "college": "BUS",
        "acadorg": "R1150",
        "subject": "ART",
        "catalog": "2601",
        "section": "1002",
        "title": "Art class",
        "component": "LEC",
        "session": "1",
        "classnbr": "20198",
        "instructionmode": "P",
        "classdays": "F",
        "classstarttime": "9.0",
        "classendtime": "10.15",
        "startdate": "1/22/24",
        "enddate": "5/7/24",
        "room": "AB 106",
        "instructorlastname": "Do",
        "instructorfirstname": "Chuong",
        "roomcapacity": "208",
        "enrollmentcapacity": "200",
        "currentenrollment": "98",
        "waitlistcapacity": "999",
        "waitlisttotal": "0",
        "combined": "No",
        "classstat": "A",
        "prgrssunt": "3.0",
        "acadgroup": "120"
    },
    {
        "_id": "6629882437b470447336051d",
        "college": "BUS",
        "acadorg": "R1150",
        "subject": "CSE",
        "catalog": "2901",
        "section": "1002",
        "title": "Full Stack",
        "component": "LEC",
        "session": "1",
        "classnbr": "20198",
        "instructionmode": "P",
        "classdays": "MTW",
        "classstarttime": "10.0",
        "classendtime": "11.15",
        "startdate": "1/22/24",
        "enddate": "5/7/24",
        "room": "AB 106",
        "instructorlastname": "Do",
        "instructorfirstname": "Chuong",
        "roomcapacity": "208",
        "enrollmentcapacity": "200",
        "currentenrollment": "98",
        "waitlistcapacity": "999",
        "waitlisttotal": "0",
        "combined": "No",
        "classstat": "A",
        "prgrssunt": "3.0",
        "acadgroup": "120"
    },
    {
        "_id": "6629882437b470447336051e",
        "college": "BUS",
        "acadorg": "R1150",
        "subject": "ACC",
        "catalog": "8201",
        "section": "1002",
        "title": "Big Data",
        "component": "LEC",
        "session": "1",
        "classnbr": "20198",
        "instructionmode": "P",
        "classdays": "TR",
        "classstarttime": "15.0",
        "classendtime": "17.15",
        "startdate": "1/22/24",
        "enddate": "5/7/24",
        "room": "AB 106",
        "instructorlastname": "Do",
        "instructorfirstname": "Chuong",
        "roomcapacity": "208",
        "enrollmentcapacity": "200",
        "currentenrollment": "98",
        "waitlistcapacity": "999",
        "waitlisttotal": "0",
        "combined": "No",
        "classstat": "A",
        "prgrssunt": "3.0",
        "acadgroup": "120"
    },
    {
        "_id": "6629882437b470447336051f",
        "college": "BUS",
        "acadorg": "R1150",
        "subject": "ELE",
        "catalog": "20441",
        "section": "1002",
        "title": "ELECTRICAL",
        "component": "IND",
        "session": "1",
        "classnbr": "20198",
        "instructionmode": "P",
        "classdays": "MW",
        "classstarttime": "12.0",
        "classendtime": "15.15",
        "startdate": "1/22/24",
        "enddate": "5/7/24",
        "room": "AB 106",
        "instructorlastname": "Doll",
        "instructorfirstname": "dfdf",
        "roomcapacity": "208",
        "enrollmentcapacity": "200",
        "currentenrollment": "98",
        "waitlistcapacity": "999",
        "waitlisttotal": "0",
        "combined": "No",
        "classstat": "A",
        "prgrssunt": "3.0",
        "acadgroup": "120"
    }
];

const rows = 7;
const columns = 12;
for (let i = 1; i <= rows * columns; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    graphContainer.appendChild(box);
}

function plotEvent(w, h, x, y, color, classInfo) {
    const event = document.createElement("div");
    const uniqueClass = "event-" + classInfo._id;
    event.className = uniqueClass;
    const nameOfClass = classInfo.title;
    const classNumber = classInfo.classNumber;
    const section = classInfo.section;
    const daysTime = classInfo.day + ", " + classInfo.classstarttime + "-" + classInfo.classendtime;
    const room = classInfo.room;
    const instructor = classInfo.instructorfirstname + " " + classInfo.instructorlastname;

    event.id = "classes"
    event.style.width = w + "px";
    event.style.height = h + "px";
    event.style.left = x + "px";
    event.style.top = y + "px";
    event.style.backgroundColor = color;
    event.style.border = "0.1px black solid";

    const info = document.createElement("div");
    info.className = "info";
    info.innerHTML = classInfo.title.split(" ").slice(0, 2).join(" ");
    event.appendChild(info);
    graphContainer.appendChild(event);

    $(document).ready(function () {
        $('.' + uniqueClass).popup({
            html: `<div><div><div><strong>${nameOfClass}</strong></div><div><strong>Class: </strong>${classNumber}</div><div><strong>Section: </strong>${section}</div><div><strong>Days & Times: </strong> ${daysTime}</div><div><strong>Room: </strong>${room}</div><div><strong>Instructor: </strong>${instructor}</div></div></div>`,
        });
    });
}

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response error');
        const data = await response.json();
        if (data === undefined) throw new Error('Data is undefined');
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function fetchAndHandleData() {
    const apiUrl = CLASSSEARCH_API_URL;
    const fetchedData = await fetchData(apiUrl);
    if (fetchedData !== null) return fetchedData;
    else console.log('Failed to fetch data or data is undefined.');
}

// Call the async function
// fetchAndHandleData().then(data => {
//   ClassSearch = data
//   FormatClass(filterInfo);
// });

ClassSearch = dummyData;

$(document).ready(function () {
    $("#timeDropdown").dropdown({
        onChange: function (value, text, $selectedItem) {
            filterInfo.time = value;
        },
        forceSelection: false,
        selectOnKeydown: false,
        showOnFocus: false,
        on: "hover",
    });

    $("#freqDropdown").dropdown({
        onChange: function (value, text, $selectedItem) {
            filterInfo.freq = value;
        },
        forceSelection: false,
        selectOnKeydown: false,
        showOnFocus: false,
        on: "hover",
    });

    $("#typeDropdown").dropdown({
        onChange: function (value, text, $selectedItem) {
            filterInfo.component = value;
        },
        forceSelection: false,
        selectOnKeydown: false,
        showOnFocus: false,
        on: "hover",
    });
});
$(document).ready(function () {
    $("#numberInput").on("change", function () {
        var value = $(this).val();
        filterInfo.number = value;
    });
});

$(document).ready(function () {
    $("#departmentInput").on("change", function () {
        var value = $(this).val();
        filterInfo.dept = value;
    });
});

$("#filterButton").click(function () {
    FormatClass(filterInfo);
});

// Disable/Enable filter button. 
$(document).ready(function () {
    $("#departmentInput").on("input", function (event) {
        const typedValue = $(this).val();
        // $("#filterButton").prop("disabled", typedValue.length === 0);
    });
});


function FormatClass(filterInfo) {
    const splitedObjects = splitObject(ClassSearch).flat();
    const filterData = useFilter(splitedObjects, filterInfo);
    const addPixelData = calculatePixelData(filterData);
    const overlaps = overlappingCondition(addPixelData);
    renderClasses(overlaps);
}

ClassSearch && FormatClass(filterInfo);

function useFilter(data, filterInfo) {
    const events = document.querySelectorAll('[class^="event-"]');
    Array.from(events).forEach(function (event) {
        event.remove(); // Removes each element
    });

    const filtered = data.filter((item) => {
        const deptFilter =
            filterInfo.dept !== ""
                ? filterInfo.dept === item.department
                : true;
        const timeFilter =
            filterInfo.time !== ""
                ? filterInfo.time.includes(item.classstarttime.slice(-2))
                : true;
        const dayFilter =
            filterInfo.freq !== ""
                ? filterInfo.freq.split(",").includes(item.Day)
                : true;
        const numberFilter =
            filterInfo.number !== ""
                ? item.classNumber === filterInfo.number
                : true;
        const typeFilter =
            filterInfo.component !== ""
                ? filterInfo.component.includes(item.component)
                : true;
        return deptFilter & timeFilter && dayFilter && numberFilter && typeFilter;
    });

    return filtered;
}

function calculatePixelData(splitedObjects) {
    return splitedObjects.map((obj) => {
        const height = obj.classstarttime && calculateHeight(obj.classstarttime, obj.classendtime);
        const top = getTop(height, obj.classstarttime);
        const left = getLeft(obj.day);
        const width = 113;
        const border = "0.3px black solid";
        return {
            ...obj,
            height,
            top,
            left,
            width,
            border,
        };
    });
}

function renderClasses(addPixelData) {
    addPixelData.forEach((data, i) => {
        // plotEvent(width, height, left(x-axis), top(y-axis), color, className)
        plotEvent(
            data.width,
            data.height,
            data.left,
            data.top,
            data.Color,
            data
        );
    });
}

function overlappingCondition(data) {
    const overlapCheck = eventsOverlap(data);
    const compressData = overlapCheck.map((oc) => {
        if (oc.length > 1) {
            const compressedData = compressEvent(oc);
            return compressedData;
        } else return oc;
    });
    return compressData.flat();
}

function compressEvent(classData) {
    const sizeOfADay = 113; // Parameter Constant
    const leftOfFullClass = classData[0].left;
    const numberOfOverlap = classData.length;
    const centerOfBox = sizeOfADay / numberOfOverlap / 2;
    const firstPoint = leftOfFullClass - sizeOfADay / 2;
    let odd = 0;

    for (let i = 0; i < numberOfOverlap; i++) {
        odd += 1;
        classData[i].width = sizeOfADay / numberOfOverlap;
        classData[i].left = firstPoint + centerOfBox * (odd + i);
    }
    return classData;
}

function getTop(height, startTime) {
    const durationFromStart = calculateDuration("8:00AM", startTime);
    const halfHeight = height / 2;
    const tTop = (durationFromStart * 57.68) / 60; // Formula to find the tTop
    const contant = 1.01;
    const top = (tTop + halfHeight) * contant; // Formula to calculate the y-axis
    return top;
}

function getLeft(day) {
    const leftOfMonday = 171;
    switch (day) {
        case "M":
            return leftOfMonday;
        case "T":
            return leftOfMonday + 115;
        case "W":
            return leftOfMonday + 115 * 2 - 1;
        case "R":
            return leftOfMonday + 115 * 3 - 1;
        case "F":
            return leftOfMonday + 115 * 4 - 2;
        default:
            return null;
    }
}
function calculateHeight(start, end) {
    const classDuration = calculateDuration(start, end);
    const constant = 1.03;
    const height = classDuration * (56 / 60) * constant; // Formula to calculate the height
    return height;
}

function calculateDuration(start, end) {
    const startTime = parseTime(start);
    const endTime = parseTime(end);
    const durationMs = endTime?.getTime() - startTime?.getTime();
    const durationMinutes = durationMs / (1000 * 60);
    return durationMinutes;
}

function parseTime(timeString) {
    if (!timeString) return null;
    const [hourMinute, ampm] = timeString.split(/(?=[AP]M)/);
    const [hour, minute] = hourMinute.split(":");
    let hours = parseInt(hour);
    const minutes = parseInt(minute);
    if (ampm === "PM" && hours < 12) {
        hours += 12;
    }
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
}

function splitObject(restructureClassSearch) {
    return restructureClassSearch.map((originalObj) => {
        const days = originalObj.classdays.split("");
        const startTime = convertTo12HourFormat(originalObj.classstarttime);
        const endTime = convertTo12HourFormat(originalObj.classendtime);
        const colorIndex = classColorIndex(originalObj.component);
        const color = colors[colorIndex];


        const splitObject = days.map((day) => {
            return {
                _id: originalObj._id,
                college: originalObj.college,
                acadorg: originalObj.acadorg,
                department: originalObj.subject,
                section: originalObj.section,
                title: originalObj.title,
                component: originalObj.component,
                session: originalObj.session,
                classnbr: originalObj.classnbr,
                instructionmode: originalObj.instructionmode,
                day: day,
                classstarttime: startTime,
                classendtime: endTime,
                classNumber: originalObj.catalog,
                startdate: originalObj.startdate,
                enddate: originalObj.enddate,
                room: originalObj.room,
                instructorfirstname: originalObj.instructorfirstname,
                instructorlastname: originalObj.instructorlastname,
                roomcapacity: originalObj.roomcapacity,
                enrollmentcapacity: originalObj.enrollmentcapacity,
                currentenrollment: originalObj.currentenrollment,
                waitlistcapacity: originalObj.waitlistcapacity,
                waitlisttotal: originalObj.waitlisttotal,
                combined: originalObj.combined,
                classstat: originalObj.classstat,
                prgrssunt: originalObj.prgrssunt,
                acadgroup: originalObj.acadgroup,
                Color: color,
            };
        });

        return splitObject;
    });
}

function eventsOverlap(data) {
    const overlappingClasses = [];
    for (let i = 0; i < data.length; i++) {
        let foundOverlap = false;
        for (let j = 0; j < overlappingClasses.length; j++) {
            const overlapGroup = overlappingClasses[j];
            const overlap = overlapGroup.find(
                (classObj) => classObj.day === data[i].day
            );
            if (overlap) {
                const start1 = convertToISO8601(overlap.classstarttime);
                const end1 = convertToISO8601(overlap.classendtime);
                const start2 = convertToISO8601(data[i].classstarttime);
                const end2 = convertToISO8601(data[i].classendtime);

                if (
                    (start1 < end2 && end1 > start2) ||
                    (start2 < end1 && end2 > start1)
                ) {
                    overlapGroup.push(data[i]);
                    foundOverlap = true;
                    break;
                }
            }
        }
        if (!foundOverlap) {
            overlappingClasses.push([data[i]]);
        }
    }
    return overlappingClasses;
}

// Function to convert time from 24-hour format to 12-hour format
function convertTo12HourFormat(time) {
    const [hours, minutes] = time.split('.');
    let period = 'AM';

    if (parseInt(hours) >= 12) {
        period = 'PM';
    }

    let hourIn12HourFormat = parseInt(hours) % 12;
    hourIn12HourFormat = hourIn12HourFormat === 0 ? 12 : hourIn12HourFormat;

    return `${hourIn12HourFormat}:${minutes.padStart(2, '0')}${period}`;
}

function convertToISO8601(timeString) {
    if (!timeString) return null;
    // Split the time string into hours, minutes, and AM/PM
    const splitedTime =
        timeString.length > 1
            ? timeString.slice(0, -2) + " " + timeString.slice(-2)
            : timeString;
    const [time, period] = splitedTime.split(" ");
    const [hours, minutes] = time.split(":").map(Number);

    // Handle case for 12-hour clock
    let adjustedHours = hours;
    if (period.toLowerCase() === "pm" && hours < 12) {
        adjustedHours += 12;
    } else if (period.toLowerCase() === "am" && hours === 12) {
        adjustedHours = 0;
    }
    // Create a new Date object and set the time
    const date = new Date();
    date.setUTCHours(adjustedHours); // Set hours in UTC
    date.setUTCMinutes(minutes); // Set minutes in UTC
    date.setUTCSeconds(0); // Set seconds in UTC
    // Return the ISO 8601 formatted string in UTC
    return date.toISOString();
}

function classColorIndex(classType) {
    switch (classType) {
        case "DIS":
            return 1;
        case "IND":
            return 2;
        case "LAB":
            return 3;
        case "LEC":
            return 4;
        case "PEX":
            return 5;
        default:
            return 0;
    }
}