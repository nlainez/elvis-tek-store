jQuery(function($){
  $(document).ready(function() {
    $('#action_buttons').attr('colspan',4);
    $('#data-table-elvistek-store').DataTable({
      "pagingType": "full_numbers",
      "paging": true
    });
  });
});