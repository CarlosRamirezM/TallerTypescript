import { Course } from './course.js';
import { Student } from './student.js';

import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentTbody: HTMLElement = document.getElementById('student')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBox21: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box2.1")!;
const inputSearchBox22: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box2.2")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByCredids();

renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);

totalCreditElm.innerHTML = `Total Créditos: ${getTotalCredits(dataCourses)}`

function renderCoursesInTable(courses: Course[]): void {
  courses.forEach(c => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${c.name}</td>
                           <td>${c.professor}</td>
                           <td>${c.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderStudentInTable(student: Student[]): void {
  student.forEach(s => {
    let trElement = document.createElement("tbody");
    trElement.innerHTML = `<tr>
        <td> Código </td>                       
        <td> ${s.codigo}</td>      
    </tr>
    <tr>
        <td>Cédula</td>
        <td>${s.cedula}</td>
    </tr>
    <tr>
        <td>Edad</td>
        <td>${s.edad} Años</td>
    </tr>
    <tr>
        <td>Dirección</td>
        <td>${s.direccion}</td>
    </tr>
    <tr>
        <td>Teléfono</td>
        <td>${s.telefono}</td>
    </tr>`;
    studentTbody.appendChild(trElement);
  });
}

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterByCredids() { 
  let cLow : number = parseInt(inputSearchBox21.value);
  let cHigh : number = parseInt(inputSearchBox22.value);
  cLow = (cLow == null) ? 0 : cLow;
  cHigh = (cHigh == null) ? 25 : cHigh;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCredits(cLow, cHigh, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function searchCourseByCredits(cLow: number, cHigh: number, courses: Course[]) {
    return cLow>cHigh? dataCourses: courses.filter(c => (c.credits >= cLow && c.credits <= cHigh) );
}

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}