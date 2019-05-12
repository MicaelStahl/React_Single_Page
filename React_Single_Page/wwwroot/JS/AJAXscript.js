"use strict";

$(document).ready(function () {
    $.ajax({
        url: '/JSON/GetCars',
        method: 'GET',
        data: '{}',
        success: function (data) {
            var rows = '';
            if (data != null || data.length != 0) {
                for (var i = 0; i < data.length; i++) {
                    rows += '<tr class="table-row">';
                    rows += '<td>' + data[i].modelName + '</td>';
                    rows += '<td>' + data[i].brand + '</td>';
                    rows += '<td>' + data[i].color + '</td>';
                    rows += '<td>' + data[i].productionYear + '</td>';
                    rows += '<td>';
                    rows += '<a href="/Cars/Edit/' + data[i].id + '" class="btn btn-warning">Edit</a>';
                    rows += '<a href="/Cars/Details/' + data[i].id + '" class="btn btn-primary">Details</a>';
                    rows += '<a href="/Cars/Delete/' + data[i].id + '" class="btn btn-danger">Delete</a>';
                    rows += '</td>';
                    rows += '</tr>';
                }
                $('#carsList').append(rows);
            }
            else {
                rows += '<td>' + "There's no cars available. Either update list or considering adding some." + '</td>';
                $('#carsList').append(rows);
            }

        },
        error: function (status) {
            if (status.toString === 'notfound') {
                console.log(status.toString)
            }
            else if (status.toString === 'badrequest') {
                console.log(status.toString)
            }
            else {
                console.log('error: ' + status.toString)
            }
        }
    })
})