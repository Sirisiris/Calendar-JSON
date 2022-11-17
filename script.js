let monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  
  let currentDate = new Date();
  let currentDay = currentDate.getDate();
  let monthNumber = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  
  let dates = document.getElementById("dates");
  let month = document.getElementById("month");
  let year = document.getElementById("year");
  
  let prevMonthDOM = document.getElementById("prev-month");
  let nextMonthDOM = document.getElementById("next-month");
  
  month.textContent = monthNames[monthNumber];
  year.textContent = currentYear.toString();
  
  prevMonthDOM.addEventListener("click", () => previousMonth());
  nextMonthDOM.addEventListener("click", () => nextMonth());
  
  // Pintar calendario
  
  const writeMonth = (month) => {
    for (let i = firstDay(); i > 0; i--) {
      dates.innerHTML += ` <div class="calendar__date calendar__last-days">
              ${getTotalDays(monthNumber - 1) - (i - 1)}
          </div>`;
    }
    for (let i = 1; i <= getTotalDays(month); i++) {
        dates.innerHTML += ` <div class="calendar__date ">${i}</div>`;
    }
  };
  
  // Calcular el mes entero
  
  const getTotalDays = (month) => {
    if (month === -1) month = 11;
  
    if (
      month == 0 ||
      month == 2 ||
      month == 4 ||
      month == 6 ||
      month == 7 ||
      month == 9 ||
      month == 11
    ) {
      return 31;
    } else if (month == 3 || month == 5 || month == 8 || month == 10) {
      return 30;
    } else {
      return leapYear() ? 29 : 28;
    }
  };
  
  
  // Calcula año bisiesto
  
  const leapYear = () => {
    return (
      (currentYear % 100 !== 0 && currentYear % 4 === 0) ||
      currentYear % 400 === 0
    );
  };
  
  // Calcula en que cae primer dia del mes
  
  const firstDay = () => {
    let start = new Date(currentYear, monthNumber, 1);
    return start.getDay() - 1 === -1 ? 6 : start.getDay() - 1;
  };
  
  // Mes actual
  
  const setNewDate = () => {
      currentDate.setFullYear(currentYear, monthNumber, currentDay);
      month.textContent = monthNames[monthNumber];
      year.textContent = currentYear.toString();
      dates.textContent = "";
      writeMonth(monthNumber);
    };
    
    writeMonth(monthNumber);
  
  // Calcula mes anterior
  
  const previousMonth = () => {
    if (monthNumber !== 0) {
      monthNumber--;
    } else {
      monthNumber = 11;
      currentYear--;
    }
  
    setNewDate();
  };
  
  // Calcula mes siguiente
  
  const nextMonth = () => {
    if (monthNumber !== 11) {
      monthNumber++;
    } else {
      monthNumber = 0;
      currentYear++;
    }
  
    setNewDate();
  };
  
  let calendar = document.getElementById('calendar')
  
  async function getEvents() {
      const response = await fetch('calendar.json');
      const events = await response.json();
      console.log(events); 
      //pinta la lista de eventos en array
      printEvents(events);
  }
  getEvents();
    
    //convierte la fecha de unix a hora
    function convertirUnixAHora(unix) {
      const milliseconds = unix * 1000 // 1575909015000
      const dateObject = new Date(milliseconds)
      const humanDateFormat = dateObject.toLocaleString() //2019-12-9 10:30:15
      
      dateObject.toLocaleString("en-US", {weekday: "long"}) // Monday
      dateObject.toLocaleString("en-US", {month: "long"}) // December
      dateObject.toLocaleString("en-US", {day: "numeric"}) // 9
      dateObject.toLocaleString("en-US", {year: "numeric"}) // 2019
      dateObject.toLocaleString("en-US", {hour: "numeric"}) // 10 AM
      dateObject.toLocaleString("en-US", {minute: "numeric"}) // 30
      dateObject.toLocaleString("en-US", {second: "numeric"}) // 15
      dateObject.toLocaleString("en-US", {timeZoneName: "short"}) // 12/9/2019, 10:30:15 AM CST
  
      //pinta las fechas formateadas
      console.log(humanDateFormat) 
      return humanDateFormat
    }
    
    function printEvents(events) {
    
      events.forEach((item) => {
        const row = document.querySelector(".calendar__event");
        row.innerHTML = `
        <td>${item.user}</td>
        <td>${item.event}</td>
        <td>${convertirUnixAHora(item.datestart)}</td>
        <td>${convertirUnixAHora(item.dateend)}</td>
        `
        calendar.appendChild(row)

    })}