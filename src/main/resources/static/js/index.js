$(function(){
	initAgenda();
});

function initAgenda() {
	// Keyboard shortcuts
	$(document).keydown(function(e) {
		// Ignore if typing in input field
		if ($(e.target).is('input, textarea')) return;

		switch(e.key) {
			case 'a':
				e.preventDefault();
				$('#addTaskModal').modal('show');
				break;
			case 't':
				e.preventDefault();
				goToToday();
				break;
			case 'w':
				e.preventDefault();
				setViewMode('week');
				break;
			case 'm':
				e.preventDefault();
				setViewMode('month');
				break;
			case '/':
				e.preventDefault();
				$('#searchInput').focus();
				break;
			case '?':
				e.preventDefault();
				$('#helpModal').modal('show');
				break;
			case 'r':
				e.preventDefault();
				refreshAgenda();
				break;
			case 'Escape':
				$('.modal').modal('hide');
				break;
		}
	});

	// Filter buttons
	$('.filter-bar .btn-group .btn').click(function() {
		$('.filter-bar .btn-group .btn').removeClass('active');
		$(this).addClass('active');

		const filter = $(this).data('filter');
		filterTasks(filter);
	});

	// Search functionality
	$('#searchInput').on('input', function() {
		const searchTerm = $(this).val().toLowerCase();
		searchTasks(searchTerm);
	});

	// View mode buttons
	$('#todayBtn').click(function() {
		goToToday();
		setActiveViewButton(this);
	});

	$('#weekBtn').click(function() {
		setViewMode('week');
		setActiveViewButton(this);
	});

	$('#monthBtn').click(function() {
		setViewMode('month');
		setActiveViewButton(this);
	});

	// Task item interactions
	$(document).on('click', '.agenda-item', function() {
		toggleTaskStatus(this);
	});

	// Add task functionality
	$('#addTaskBtn').click(function() {
		addNewTask();
	});

	// Set today's date as default
	const today = new Date().toISOString().split('T')[0];
	$('#taskDate').val(today);
}

function filterTasks(filter) {
	$('.agenda-item').show();

	switch(filter) {
		case 'done':
			$('.agenda-item:not(.done)').hide();
			break;
		case 'todo':
			$('.agenda-item.done').hide();
			break;
		case 'all':
		default:
			// Show all items
			break;
	}

	// Hide empty day entries
	$('.day-entry').each(function() {
		const visibleItems = $(this).find('.agenda-item:visible').length;
		if (visibleItems === 0) {
			$(this).hide();
		} else {
			$(this).show();
		}
	});
}

function searchTasks(searchTerm) {
	if (!searchTerm) {
		$('.agenda-item').show();
		$('.day-entry').show();
		return;
	}

	$('.agenda-item').each(function() {
		const title = $(this).find('.item-title').text().toLowerCase();
		const tags = $(this).find('.tag').map(function() {
			return $(this).text().toLowerCase();
		}).get().join(' ');

		const matches = title.includes(searchTerm) || tags.includes(searchTerm);

		if (matches) {
			$(this).show();
		} else {
			$(this).hide();
		}
	});

	// Hide empty day entries
	$('.day-entry').each(function() {
		const visibleItems = $(this).find('.agenda-item:visible').length;
		if (visibleItems === 0) {
			$(this).hide();
		} else {
			$(this).show();
		}
	});
}

function goToToday() {
	// Scroll to today's date or highlight it
	const today = new Date();
	const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
						'July', 'August', 'September', 'October', 'November', 'December'];

	const todayText = `${dayNames[today.getDay()]} ${today.getDate()} ${monthNames[today.getMonth()]} ${today.getFullYear()}`;

	// Find and highlight today's section
	$('.day-header h4').each(function() {
		if ($(this).text().includes(today.getDate().toString()) &&
			$(this).text().includes(monthNames[today.getMonth()])) {
			$(this).closest('.day-entry')[0].scrollIntoView({ behavior: 'smooth' });
			$(this).addClass('highlight-today');
			setTimeout(() => $(this).removeClass('highlight-today'), 2000);
		}
	});
}

function setViewMode(mode) {
	// This would typically filter the agenda view by time period
	// For now, we'll just show a message
	console.log(`Switched to ${mode} view`);

	// In a full implementation, this would:
	// - Filter tasks by date range
	// - Adjust the display format
	// - Update the visible time period
}

function setActiveViewButton(activeBtn) {
	$('.agenda-controls .btn').removeClass('btn-primary').addClass('btn-outline-secondary');
	$(activeBtn).removeClass('btn-outline-secondary btn-outline-primary').addClass('btn-primary');
}

function toggleTaskStatus(taskElement) {
	const $task = $(taskElement);

	if ($task.hasClass('done')) {
		// Change from DONE to TODO
		$task.removeClass('done').addClass('todo');
		$task.find('.todo-keyword').removeClass('done-keyword').addClass('todo-keyword').text('TODO');
	} else {
		// Change from TODO to DONE
		$task.removeClass('todo').addClass('done');
		$task.find('.todo-keyword').removeClass('todo-keyword').addClass('done-keyword').text('DONE');
	}
}

function addNewTask() {
	const title = $('#taskTitle').val();
	const date = $('#taskDate').val();
	const startTime = $('#taskStartTime').val();
	const endTime = $('#taskEndTime').val();
	const status = $('#taskStatus').val();
	const tags = $('#taskTags').val();

	if (!title) {
		alert('Please enter a task title');
		return;
	}

	// Create time display
	let timeDisplay = '';
	if (startTime && endTime) {
		timeDisplay = `${startTime}-${endTime}`;
	} else if (startTime) {
		timeDisplay = startTime;
	} else {
		timeDisplay = '00:00';
	}

	// Create new task HTML
	const statusClass = status.toLowerCase() === 'done' ? 'done' : 'todo';

	// Parse tags
	const tagElements = tags ? tags.split(',').map(tag =>
		`<span class="tag">:${tag.trim()}:</span>`
	).join('') : '';

	const taskHTML = `
		<div class="agenda-item ${statusClass}">
			<div class="item-time">${timeDisplay}</div>
			<div class="item-content">
				<span class="todo-keyword ${status.toLowerCase() === 'done' ? 'done-keyword' : ''}">${status}</span>
				<span class="item-title">${title}</span>
				<span class="item-tags">${tagElements}</span>
			</div>
		</div>
	`;

	// Find the appropriate day entry or create a new one
	const taskDate = new Date(date);
	const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
						'July', 'August', 'September', 'October', 'November', 'December'];

	const dayText = `${dayNames[taskDate.getDay()]}   ${taskDate.getDate()} ${monthNames[taskDate.getMonth()]} ${taskDate.getFullYear()}`;

	// Look for existing day entry
	let dayEntry = null;
	$('.day-header h4').each(function() {
		if ($(this).text().includes(taskDate.getDate().toString()) &&
			$(this).text().includes(monthNames[taskDate.getMonth()])) {
			dayEntry = $(this).closest('.day-entry');
		}
	});

	if (dayEntry) {
		// Add to existing day
		dayEntry.find('.agenda-items').append(taskHTML);
	} else {
		// Create new day entry
		const newDayHTML = `
			<div class="day-entry">
				<div class="day-header">
					<h4>${dayText}</h4>
				</div>
				<div class="agenda-items">
					${taskHTML}
				</div>
			</div>
		`;
		$('.agenda-view').append(newDayHTML);
	}

	// Clear form and close modal
	$('#addTaskModal form')[0].reset();
	$('#addTaskModal').modal('hide');

	// Set today's date as default for next task
	const today = new Date().toISOString().split('T')[0];
	$('#taskDate').val(today);
}

function refreshAgenda() {
	// In a real application, this would reload data from the server
	console.log('Refreshing agenda...');
	location.reload();
}

// Add CSS class for today highlight
$('<style>')
	.prop('type', 'text/css')
	.html(`
		.highlight-today {
			background-color: #fff3cd !important;
			border-color: #ffeaa7 !important;
			animation: highlight 2s ease-out;
		}
		@keyframes highlight {
			0% { background-color: #fff3cd; }
			100% { background-color: #f0f8ff; }
		}
	`)
	.appendTo('head');