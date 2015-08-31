$(document).ready(function(e){
	var drawDailyCalendar = function(day, month, year) {
	    var hoursInDay = [
	      	            '00:00', 
	      	            '01:00', 
	      	            '02:00', 
	      	            '03:00', 
	      	            '04:00', 
	      	            '05:00', 
	      	            '06:00', 
	      	            '07:00', 
	      	            '08:00', 
	      	            '09:00', 
	      	            '10:00', 
	      	            '11:00',
	      	            '12:00',
	      	            '13:00',
	      	            '14:00',
	      	            '15:00',
	      	            '16:00',
	      	            '17:00',
	      	            '18:00',
	      	            '19:00',
	      	            '20:00',
	      	            '21:00',
	      	            '22:00',
	      	            '23:00',
	      	        ];
	      		
	      		$.ajax({
	              	type: "POST",
	              	url: "/calendar/daily",
	              	data: {
	              		'day': day,
	          			'month': month,
	          			'year': year,
	          		},
	              	success: function(response) {
	              		$('.daily-table tbody').empty();
	              		var parsed_response = JSON.parse(response);
	              		var jobs = parsed_response.jobs;
	              		var monthName = parsed_response.monthName;
	              		$('.center-toolbar').text(monthName + ' ' + year);
	              		$('.monthly-view').hide();
	              		$('.weekly-view').hide();
	            		$('.weekly-table-view tbody').empty();
	              		$('.daily-view').show();
	              		$('#day').val(day);
	              		$('#month').val(month);
	              		$('#year').val(year);
	              		$('#day-daily-view').text(month + '/' + day);
	              		var i = 0;
	              		hoursInDay.forEach(function(hour) {
	              			$('.daily-table tbody').append('<tr><td class="daily-view-td">' + hour + '</td><td class="daily-view-td" id=' + i + '></td></tr>');
	              			for(var key in jobs) {
	              				if (jobs.hasOwnProperty(key)) {
	              					var job = jobs[key];
	              				}
	              				if (job['time'] == hour) {
	              					$('#' + i).append('<a href="jobs/details/' + job.job_code + '"><div class="with-job">' + job.service_provider_user_first_name + ' ' + job.service_provider_user_last_name + ' in ' + job.full_address + '</div></a>');
	      	        			}
	              				
	              			}
	              			i++;
	              		});
	                  },
	                  error: function(response){
	                  	$('.monthly-view').hide();
	              		$('.daily-view').show();
	      	        },
	              	dataType: 'html',
	              });
	}
	
	var drawWeeklyCalendar = function(day, month, year) {
		var hoursInDay = [
		      	            '00:00', 
		      	            '01:00', 
		      	            '02:00', 
		      	            '03:00', 
		      	            '04:00', 
		      	            '05:00', 
		      	            '06:00', 
		      	            '07:00', 
		      	            '08:00', 
		      	            '09:00', 
		      	            '10:00', 
		      	            '11:00',
		      	            '12:00',
		      	            '13:00',
		      	            '14:00',
		      	            '15:00',
		      	            '16:00',
		      	            '17:00',
		      	            '18:00',
		      	            '19:00',
		      	            '20:00',
		      	            '21:00',
		      	            '22:00',
		      	            '23:00',
		      	        ];
		
		$.ajax({
          	type: "POST",
          	url: "/calendar/weekly",
          	data: {
          		'day': day,
      			'month': month,
      			'year': year,
      		},
          	success: function(response) {
          		$('#current-view').val('weekly-view');
          		$('.weekly-table-view tbody').empty();
          		$('.weekly-table-view thead th').each(function() {
          			$(this).text($(this).text().substring(0, 4));
          		});
          		var parsed_response = JSON.parse(response);
          		var jobs = parsed_response.jobs;
          		var sunday = parsed_response[0].sunday;
          		var monday = parsed_response[0].monday;
          		var tuesday = parsed_response[0].tuesday;
          		var wednesday = parsed_response[0].wednesday;
          		var thursday = parsed_response[0].thursday;
          		var friday = parsed_response[0].friday;
          		var saturday = parsed_response[0].saturday;
          		$('.center-toolbar').text('Week of ' + sunday.substring(5) + ' to ' + saturday.substring(5));
          		$('.monthly-view').hide();
          		$('.daily-view').hide();
          		$('.daily-table tbody').empty();
          		$('.weekly-view').show();
          		$('#day').val(day);
          		$('#month').val(month);
          		$('#year').val(year);
          		var i = 1;
          		var j = 0;
          		for(var key in parsed_response[0]) {
          			var date = parsed_response[0][key].substring(5);
          			$('#week_' + i).text($('#week_' + i).text() + ' ' + date);
          			i++;
          		}
          		hoursInDay.forEach(function(hour) {
          			$('.weekly-table-view tbody').append(
          				'<tr><td class="weekly-view-td">' + hour + '</td> \
          				<td class="weekly-view-td"><input type="hidden" value="' + sunday + '" class="hidden-date"><input type="hidden" value="' + hour + '" class="hidden-hour"></td> \
          				<td class="weekly-view-td"><input type="hidden" value="' + monday + '" class="hidden-date"><input type="hidden" value="' + hour + '" class="hidden-hour"></td> \
          				<td class="weekly-view-td"><input type="hidden" value="' + tuesday + '" class="hidden-date"><input type="hidden" value="' + hour + '" class="hidden-hour"></td> \
          				<td class="weekly-view-td"><input type="hidden" value="' + wednesday + '" class="hidden-date"><input type="hidden" value="' + hour + '" class="hidden-hour"></td> \
          				<td class="weekly-view-td"><input type="hidden" value="' + thursday + '" class="hidden-date"><input type="hidden" value="' + hour + '" class="hidden-hour"></td> \
          				<td class="weekly-view-td"><input type="hidden" value="' + friday + '" class="hidden-date"><input type="hidden" value="' + hour + '" class="hidden-hour"></td> \
          				<td class="weekly-view-td"><input type="hidden" value="' + saturday + '" class="hidden-date"><input type="hidden" value="' + hour + '" class="hidden-hour"></td></tr>'
          			);
          		});
      			$('.weekly-view-td').each(function() {
      				var currentHour = $(this).find('.hidden-hour').val();
      				var currentDay = $(this).find('.hidden-date').val();
      				for(var key in jobs) {
          				if (jobs.hasOwnProperty(key)) {
          					var job = jobs[key];
          				}
          				if ((job['time'] == currentHour) && (job['date'] == currentDay)) {
          					$(this).append('<a href="jobs/details/' + job.job_code + '"><div class="with-job-week">' + job.service_provider_user_first_name + ' ' + job.service_provider_user_last_name + ' in ' + job.full_address + '</div></a>');
  	        			}
          			}
      			});
          		
              },
              error: function(response){
              	$('.monthly-view').hide();
          		$('.daily-view').show();
  	        },
          	dataType: 'html',
          });
	}
	
	$('#weekly-button').on('click', function(e) {
		e.stopImmediatePropagation();
		$('#current-view').val('weekly-view');
		var day = $('#day').val();
		var month = $('#month').val();
		var year = $('#year').val();
		drawWeeklyCalendar(day, month, year);
	});
	
	$('#daily-button').on('click', function(e) {
		e.stopImmediatePropagation();
		$('#current-view').val('daily-view');
		var day = $('#day').val();
		var month = $('#month').val();
		var year = $('#year').val();
		drawDailyCalendar(day, month, year);
	});
	
	$('#monthly-button').on('click', function(e) {
		e.stopImmediatePropagation();
		$('#current-view').val('monthly-view');
		$('.daily-view').hide();
		$('.weekly-view').hide();
		$('.weekly-table-view tbody').empty();
		$('.daily-table tbody').empty();
		var month = $('#month').val();
		var year = $('#year').val();
		$('.monthly-view').show();
		drawMonthlyCalendar(month, year);
	});
	
	
	var drawMonthlyCalendar = function(month, year) {
		$.ajax({
	     	type: "POST",
	     	url: "/calendar/changemonth",
	     	data: {
	     		'month': month,
	     		'year': year,
	     	},
	     	success: function(response) {
	     		$('.weekly-table tbody').empty();
	     		var parsedResponse = JSON.parse(response);
	     		var numberOfWeeks = Math.ceil(parsedResponse['daysInMonth'] / 7);
	     		$('#day').val('01');
	     		$('#month').val(month);
	    		$('#year').val(year);
	     		$('.center-toolbar').text(parsedResponse['month'] + ' ' + parsedResponse['year']);
	     		var jobs = parsedResponse['jobs'];
	     		var firstDayOfMonth = parsedResponse['firstDayOfCurrentMonth'];
	     		var daysInMonth = parsedResponse['daysInMonth'];
				var daysInNumber = {'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6};
				var dayIndex = daysInNumber[firstDayOfMonth];
				var day = 1;
				var row = "";
				for (var i = 0; i < numberOfWeeks + 1; i++) {
					row += '<tr>';
					for(var j = 0; j <= 6; j++) {
						row += '<td class="day-cont">';
						if (day <= daysInMonth && (i > 0 || j >= dayIndex)) {
							row += '<span>' + day + '</span>';
							for(var key in jobs) {
								if (jobs.hasOwnProperty(key)) {
		        					var job = jobs[key];
		        				}
								if (job['day'] == day) {
									row += '<a href="jobs/details/' + job['job_code'] + '"><div class="job-scheduled">' + job['calendar_details'] + '</div></a>';
								}
							}
							day += 1;
						}
					row += '</td>';
					}
				row += '</tr>';
				$('.weekly-table tbody').append(row);
				row = "";
				}
	     	},
	         error: function(response){
		        },
	     	dataType: 'html',
	     });
	}
	
	var nextMonth = function(currentMonth, currentYear) {
		var month;
		var year;
		if (parseInt(currentMonth) < 1 || parseInt(currentMonth) > 12) {
			return false;
		}
		if (currentMonth === '12') {
			month = 1;
			year = parseInt(currentYear) + 1;
		} else {
			month = parseInt(currentMonth) + 1; 
			year = parseInt(currentYear);
		}
		drawMonthlyCalendar(month, year);
	}
	
	var previousMonth = function(currentMonth, currentYear) {
		var month;
		var year;
		if (parseInt(currentMonth) < 1 || parseInt(currentMonth) > 12) {
			return false;
		}
		if (currentMonth === '1') {
			month = 12;
			year = parseInt(currentYear) - 1;
		} else {
			month = parseInt(currentMonth) - 1; 
			year = parseInt(currentYear);
		}
		drawMonthlyCalendar(month, year);
	}
	
	var nextDay = function(day, month, year) {
		if ($.inArray(month, ['01', '03', '05', '07', '08', '10', '12']) > -1 && (day > '30')) {
			if (month === '12') {
				year = parseInt(year) + 1;
				day = 1;
				month = 1;
			} else {
				month = parseInt(month) + 1;
				day = 1;
			}
		} else if ($.inArray(month, ['04', '06', '09', '11']) > -1 && (day > '29')) {
			day = 1;
			month = parseInt(month) + 1;
		} else if ((month === '02') && (parseInt(year) % 4 === 0) && day > 29) {
			month = parseInt(month) + 1;
			day = 1;
		} else if ((month === '02') && (parseInt(year) % 4 !== 0) && day > 28) {
			month = parseInt(month) + 1;
			day = 1;
		} else {
			day = parseInt(day) + 1;
		}
		drawDailyCalendar(day, month, year);
	}
	
	var previousDay = function(day, month, year) {
		if (day === '01' && month === '01') {
			day = '31';
			year = String(parseInt(year) - 1);
			month = '12';
		} else if ((day === '01') && $.inArray(month, ['08']) > -1) {
			day = '31';
			month = parseInt(month) - 1;
		} else if ((day === '01') && $.inArray(month, ['05', '07', '10', '12']) > -1) {
			day = '30';
			month = parseInt(month) - 1;
		} else if ((day === '01') && $.inArray(month, ['02', '04', '06', '09', '11']) > -1) {
			day = '31';
			month = parseInt(month) - 1;
		} else if ((day === '01') && (month === '03') && (parseInt(year) % 4 === 0)) {
			day = '29';
			month = parseInt(month) - 1;
		} else if ((day === '01') && (month === '03')) {
			day = '28';
			month = parseInt(month) - 1;
		} else {
			day = parseInt(day) - 1;
		}
		drawDailyCalendar(day, month, year);
	}
	
	var nextWeek = function(day, month, year) {
		if ($.inArray(month, ['01', '03', '05', '07', '08', '10', '12']) > -1 && (day > '24')) {
			if (month === '12') {
				year = parseInt(year) + 1;
				day = 1 + (parseInt(day) - 24);
				month = 1;
			} else {
				month = parseInt(month) + 1;
				day = 1 + (parseInt(day) - 24);
			}
		} else if ($.inArray(month, ['04', '06', '09', '11']) > -1 && (day > '23')) {
			day = 1 + (parseInt(day) - 24);
			month = parseInt(month) + 1;
		} else if ((month === '02') && (parseInt(year) % 4 === 0) && day > 23) {
			month = parseInt(month) + 1;
			day = 1 + (parseInt(day) - 24);
		} else if ((month === '02') && (parseInt(year) % 4 !== 0) && day > 22) {
			month = parseInt(month) + 1;
			day = 1 + (parseInt(day) - 24);
		} else {
			day = 7 + (parseInt(day));
		}
		drawWeeklyCalendar(day, month, year);
	}
	
	var previousWeek = function(day, month, year) {
		if (day < '07' && month === '01') {
			day = String(31 + (parseInt(day) - 7));
			year = String(parseInt(year) - 1);
			month = '12';
		} else if ((day < '07') && $.inArray(month, ['08']) > -1) {
			day = String(31 + (parseInt(day) - 7));
			month = parseInt(month) - 1;
		} else if ((day < '07') && $.inArray(month, ['05', '07', '10', '12']) > -1) {
			day = String(30 + (parseInt(day) - 7));
			month = parseInt(month) - 1;
		} else if ((day < '07') && $.inArray(month, ['02', '04', '06', '09', '11']) > -1) {
			day = String(31 + (parseInt(day) - 7));
			month = parseInt(month) - 1;
		} else if ((day < '07') && (month === '03') && (parseInt(year) % 4 === 0)) {
			day = String(29 + (parseInt(day) - 7));
			month = parseInt(month) - 1;
		} else if ((day < '07') && (month === '03')) {
			day = String(29 + (parseInt(day) - 7));
			month = parseInt(month) - 1;
		} else {
			day = parseInt(day) - 7;
		}
		drawWeeklyCalendar(day, month, year);
	}
	
	$('#back').on('click', function(e) {
		e.stopImmediatePropagation();
		var currentDay = $('#day').val();
		var currentMonth = $('#month').val();
		var currentYear = $('#year').val();
		var currentView = $('#current-view').val();
		if (currentView === 'monthly-view') {
			previousMonth(currentMonth, currentYear);
		} else if (currentView === 'daily-view') {
			previousDay(currentDay, currentMonth, currentYear);
		} else if (currentView === 'weekly-view') {
			previousWeek(currentDay, currentMonth, currentYear);
		}
	});
	
	$('#forward').on('click', function(e) {
		e.stopImmediatePropagation();
		var currentDay = $('#day').val();
		var currentMonth = $('#month').val();
		var currentYear = $('#year').val();
		var currentView = $('#current-view').val();
		if (currentView === 'monthly-view') {
			nextMonth(currentMonth, currentYear);
		} else if (currentView === 'daily-view') {
			nextDay(currentDay, currentMonth, currentYear);
		} else if (currentView === 'weekly-view') {
			nextWeek(currentDay, currentMonth, currentYear);
		}
	});
	
	$('.today-button').on('click', function(e) {
		e.stopImmediatePropagation();
		var currentView = $('#current-view').val();
		var date = new Date();
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		if (currentView === 'monthly-view') {
			drawMonthlyCalendar(month, year);
		} else if (currentView === 'weekly-view') {
			drawWeeklyCalendar(day, month, year);
		} else if (currentView === 'daily-view') {
			drawDailyCalendar(day, month, year);
		}
	});
	
	$(document).on('click','td.day-cont', function(e) {
		e.stopImmediatePropagation();
		$('td').removeClass('current-day');
		$(this).addClass('current-day');
		var currentDay = $(this).find('span').text();
		if (currentDay < 1){
			return false;
		}
		$('#day').val(currentDay);
	});
});
