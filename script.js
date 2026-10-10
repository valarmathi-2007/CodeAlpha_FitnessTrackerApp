let data = JSON.parse(localStorage.getItem('fitData')) || [];
let chart;

function addData(){
  let entry = {
    exercise: document.getElementById('exercise').value,
    steps: parseInt(document.getElementById('steps').value)||0,
    calories: parseInt(document.getElementById('calories').value)||0,
    minutes: parseInt(document.getElementById('minutes').value)||0,
    date: new Date().toLocaleDateString()
  };
  data.push(entry);
  localStorage.setItem('fitData', JSON.stringify(data));
  updateUI();
  document.getElementById('steps').value='';document.getElementById('calories').value='';document.getElementById('minutes').value='';
}

function updateUI(){
  let totalSteps = data.reduce((a,b)=>a+b.steps,0);
  let totalCal = data.reduce((a,b)=>a+b.calories,0);
  let totalWork = data.reduce((a,b)=>a+b.minutes,0);
  document.getElementById('totalSteps').innerText=totalSteps;
  document.getElementById('totalCal').innerText=totalCal;
  document.getElementById('totalWork').innerText=totalWork;
  document.getElementById('progressBar').style.width = Math.min((totalSteps/10000)*100,100)+'%';

  document.getElementById('logList').innerHTML = data.slice(-5).reverse().map(d=>`<div class="log"><span>${d.exercise} - ${d.date}</span><span>${d.steps} steps</span></div>`).join('');

  let ctx = document.getElementById('weeklyChart');
  if(chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.slice(-7).map(d=>d.date),
      datasets: [{label:'Steps', data: data.slice(-7).map(d=>d.steps), backgroundColor:'#6c5ce7'}]
    }
  });
}
updateUI();