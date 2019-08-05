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
		page: null
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