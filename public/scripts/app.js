$(() => {
	// Add tooltip functionality
	$('.icon').tooltip();

	// Clicking on issue row takes user to show page
	$('tr').click(event => {
		const $row = $(event.currentTarget);
		const issueId = $row.children('.id').text();
		window.location.href += `/issues/${issueId}`;
	});
});
