$(document).ready(function() {
    $('#action_buttons').attr('colspan', 4);
    var table = $('#data-table-elvistek-store').DataTable();
    var data = table
        .column( 0 )
        .data()
        .sort();

    $('.row:first-child').attr('style', 'width: 1080px !important; margin: auto');
    $('.row:last-child').attr('style', 'width: 1080px !important; margin: auto');
  });
