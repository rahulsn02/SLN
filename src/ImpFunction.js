export function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ':00'+' ' + ampm;
    return strTime;
  }


 export const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');
  
    let [hours, minutes] = time.split(':');
  
    if (hours === '12') {
      hours = '00';
    }
  
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
  
    return `${hours}:${minutes}`;
  }


  export function diffTime(time1,time2) {
    var hour1 = time1.split(':')[0];
    var hour2 = time2.split(':')[0];
    var min1 = time1.split(':')[1];
    var min2 = time2.split(':')[1];
  
    var diff_hour = hour2 - hour1;
    var diff_min = min2 - min1;
    if (diff_hour<0) {
        diff_hour+= 24;
    }
    if (diff_min<0) {
        diff_min+=60;
        diff_hour--;
    } else if(diff_min>=60){
        diff_min-=60;
        diff_hour++;
    }
    return [diff_hour,diff_min]
  }
  