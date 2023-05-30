const dom = {
    calendar:document.getElementById('calendar'),
    year:document.getElementById('year')
}

const year = new Date().getFullYear()
dom.year.innerHTML = year

function isLeap(year){
    if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) {
        return 1
    }
    return 0
}

const months = [
    {
        title: 'Happy<br>New Year',
        name: 'January',
        days: 31,
    },
    {
        title: 'Happy<br>Very Cold',
        name: 'February',
        days: 28 + isLeap(year),
    },
    {
        title: 'Happy<br>Women Day',
        name: 'March',
        days: 31,
    },
    {
        title: 'Happy<br>Clowns',
        name: 'April',
        days: 30,
    },
    {
        title: 'Happy<br>Graduation',
        name: 'May',
        days: 31
    },
    {
        title: 'Happy<br>Summer',
        name: 'June',
        days: 30,
    },
    {
        title: 'Happy<br>July Morning',
        name: 'July',
        days: 31,
    },
    {
        title: 'Happy<br>Very Hot',
        name: 'August',
        days: 31,
    },
    {
        title: 'Happy<br>Shool',
        name: 'September',
        days: 30,
    },
    {
        title: 'Happy<br>Halloween',
        name: 'October',
        days: 31,
    },
    {
        title: 'Happy<br>Salles 11',
        name: 'November',
        days: 30,
    },
    {
        title: 'Happy<br>Cristmas',
        name: 'December',
        days: 31,
    },
]

const holidays = [
    [1, 0, 2023],
    [3, 2, 2023],
    [1, 4, 2023],
    [6, 4, 2023],
    [24, 4, 2023],
    [6, 8, 2023],
    [22, 9, 2023],
    [1, 10, 2023],
    [24, 11, 2023],
    [31, 11, 2023]
]

function isHoliday(day, month, year, cell){
    let isHolyday = false

   ////if (cell % 7 == 0 || (cell+1) % 7 == 0) {return true}
    holidays.forEach((date) => {
        if(date[0] == day && date[1] == month && date[2] == year){
            isHolyday = true
        }
    })
    return isHolyday
}

function renderCalendar(year){
    for (let i=0; i < 12; i++){
      renderMonth(i, year)
    }
}
renderCalendar(year)

function renderMonth(monthIdx, year){
    const month = months[monthIdx]
    const monthHeadString = buildMonthHead(month.title, month.name)
    const monthWeekDayNamesString = buildWeekDaysNames()
    const monthDates = buildDates(year, monthIdx, month.days)
    const monthBox = document.createElement('div')
    monthBox.className = 'month'
    const monthContentHTML = []

    monthContentHTML.push(monthHeadString)
    monthContentHTML.push(['<div class="month__content">'])
      monthContentHTML.push(monthWeekDayNamesString)
      monthContentHTML.push(monthDates)
    monthContentHTML.push('</div>')

    monthBox.innerHTML = monthContentHTML.join('')
    dom.calendar.appendChild(monthBox)

}


function buildMonthHead(title, monthName) {
  return`
  <div class="month__title">${title}</div>
  <div class="month__name">${monthName}</div>
`
}

function buildWeekDaysNames(){
    const weekDayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
    const daysNames = []
    for (let i=0; i < 7; i++){
        const dayNameTag = `<div class="month__date month__date_accent">${weekDayNames[i]}</div>`
        daysNames.push(dayNameTag)
    }
    return daysNames.join('')
}

function buildDates(year, month, daysCount ){
    const date = new Date(year, month, 1)
    const datesHTML = []
    const weekDayStart = date.getDay()
    let i = 1
    let day = 1
    while(day <= daysCount) {
        let dateHTML;
        if (i < weekDayStart || weekDayStart == 0 && i < 7){
            dateHTML = buildDate('')
            datesHTML.push(dateHTML)
            i++
        } else {
            const isHoly = isHoliday(day, month, year, i)
            dateHTML = buildDate(day, isHoly)
            datesHTML.push(dateHTML)
            day++
        }
        i++
    }
    return datesHTML.join('')
}

function buildDate(content, isAccent = false) {
    const cls = isAccent ? 'month__date month__date_accent' : 'month__date'
    return `<div class="${cls}">${content}</div>`
}