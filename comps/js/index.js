// Vue
var MainVue = new Vue({
	el: '#app-container',
	data: {
		urlParams: null,
		pagesPossible: [
			'index',
			'schedule',
			'expenses',
			'employees',
			'children'
		],
		page: null,
		expenses: {
			chartDataMain: {
				infant: 20,
				toddler: 35,
				preschool: 15,
				school_age: 3,
				other: 8
			}
		}
	},
	methods: {
		UpdatePage: function(newPage) {
			MainVue.page = newPage;
			SetUrlPageParam(newPage);
		}
	}
});

// OnLoad Run
window.addEventListener('load', function() {
	GetUrlParams();
	SetPageFromUrlParam();
	LoadExpenseChart();
});

function GetUrlParams() {
	var urlParams = new URLSearchParams(window.location.search);
	var entries = urlParams.entries();
	var entriesDict = {};
	var entriesArray = Array.from(entries);
	entriesArray.forEach(function(entry) {
		entriesDict[entry[0]] = entry[1];
	});
	MainVue.urlParams = entriesDict;
}

function SetPageFromUrlParam() {
	if (MainVue.urlParams.page && MainVue.pagesPossible.includes(MainVue.urlParams.page)) {
		MainVue.UpdatePage(MainVue.urlParams.page);
	}
	else {
		MainVue.UpdatePage('index');
	}
}

function SetUrlPageParam(newPage = '') {
	if (newPage && newPage !== 'index') {
		history.replaceState(null, 'CCM - ' + newPage, window.location.origin + window.location.pathname + '?page=' + newPage.toLowerCase());
	}
	else {
		history.replaceState(null, 'CCM', window.location.origin + window.location.pathname);
	}
}

function LoadExpenseChart() {
	var ctx = document.getElementById('expenses-chart-content').getContext('2d');
	var expensesChartMain = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: ['Infant', 'Toddler', 'Preschool', 'School Age', 'Other'],
			datasets: [{
				label: 'Dollars Spent',
				data: [
					MainVue.expenses.chartDataMain.infant,
					MainVue.expenses.chartDataMain.toddler,
					MainVue.expenses.chartDataMain.preschool,
					MainVue.expenses.chartDataMain.school_age,
					MainVue.expenses.chartDataMain.other
				],
				// backgroundColor: [
				// 	'rgba(255, 99, 132, 0.2)',
				// 	'rgba(54, 162, 235, 0.2)',
				// 	'rgba(255, 206, 86, 0.2)',
				// 	'rgba(75, 192, 192, 0.2)',
				// 	'rgba(153, 102, 255, 0.2)',
				// 	'rgba(255, 159, 64, 0.2)'
				// ],
				// borderColor: [
				// 	'rgba(255, 99, 132, 1)',
				// 	'rgba(54, 162, 235, 1)',
				// 	'rgba(255, 206, 86, 1)',
				// 	'rgba(75, 192, 192, 1)',
				// 	'rgba(153, 102, 255, 1)',
				// 	'rgba(255, 159, 64, 1)'
				// ],
				backgroundColor: [
					'#7CA2D6',
					'#7CA2D6',
					'#7CA2D6',
					'#7CA2D6',
					'#7CA2D6',
					'#7CA2D6'
				],
				borderColor: [
					'#2B384A',
					'#2B384A',
					'#2B384A',
					'#2B384A',
					'#2B384A',
					'#2B384A'
				],
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			},
			maintainAspectRatio: false,
			legend: {
				display: false
			},
			title: {
				display: true,
				text: 'Expenses Over Last 30 Days By Room',
				fontColor: '#2B384A',
				fontSize: 14,
				padding: 20
			}
		}
	});
}