import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var studentTbody = document.getElementById('student');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var inputSearchBox21 = document.getElementById("search-box2.1");
var inputSearchBox22 = document.getElementById("search-box2.2");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredids(); };
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);
totalCreditElm.innerHTML = "Total Cr\u00E9ditos: " + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    courses.forEach(function (c) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + c.name + "</td>\n                           <td>" + c.professor + "</td>\n                           <td>" + c.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInTable(student) {
    student.forEach(function (s) {
        var trElement = document.createElement("tbody");
        trElement.innerHTML = "<tr>\n        <td> C\u00F3digo </td>                       \n        <td> " + s.codigo + "</td>      \n    </tr>\n    <tr>\n        <td>C\u00E9dula</td>\n        <td>" + s.cedula + "</td>\n    </tr>\n    <tr>\n        <td>Edad</td>\n        <td>" + s.edad + " A\u00F1os</td>\n    </tr>\n    <tr>\n        <td>Direcci\u00F3n</td>\n        <td>" + s.direccion + "</td>\n    </tr>\n    <tr>\n        <td>Tel\u00E9fono</td>\n        <td>" + s.telefono + "</td>\n    </tr>";
        studentTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByCredids() {
    var cLow = parseInt(inputSearchBox21.value);
    var cHigh = parseInt(inputSearchBox22.value);
    cLow = (cLow == null) ? 0 : cLow;
    cHigh = (cHigh == null) ? 25 : cHigh;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(cLow, cHigh, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCredits(cLow, cHigh, courses) {
    return cLow > cHigh ? dataCourses : courses.filter(function (c) { return (c.credits >= cLow && c.credits <= cHigh); });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
