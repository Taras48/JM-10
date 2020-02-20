$(document).ready(function () {

    getTable();

    //modal form
    $(document).on('click', '#editUserBtn', function () {

        $("#updateUserId").val($(this).closest("tr").find("#tableId").text());


        $("#updateUserId").prop("disabled", true);

        $("#updateUserName").val($(this).closest("tr").find("#tableName").text());

        $("#updateUserPass").hide();
        $("#updateUserPass").val($(this).closest("tr").find("#tablePass").text());

        var role = $(this).closest("tr").find("#tableRole").text();
        var admin = "admin";
        if (role == admin) {
            $('#updateUserRole option:contains("admin")').prop("selected", true);
        } else {
            $('#updateUserRole option:contains("user")').prop("selected", true);
        }

        $("#updateUserMess").val($(this).closest("tr").find("#tableMess").text());
    });

    //addForm
    $("#addFormUser").click(function (event) {
        event.preventDefault();
        addForm();
        $(':input', '#addForm').val('');

    });

    function addForm() {

        var user = {
            'name': $("#addName").val(),
            'password': $("#addPassword").val(),
            'role': $("#addRole").val(),
            'message': $("#addMessage").val()
        };

        $.ajax({

                type: 'POST',
                url: "/admin/add",

                contentType: 'application/json;',
                data: JSON.stringify(user),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                async: true,
                cache: false,
                complete:
                    function () {
                        getTable();
                        $("#home-tab").tab('show');
                    }
            }
        );
    }
    ;

//updateForm
    $("#updateFormUser").click(function (event) {
        event.preventDefault();
        updateForm();
        $("#editUser").modal('toggle');
        $("#home-tab").tab('show');

    });

    function updateForm() {
        var user = {
            'id': $("#updateUserId").val(),
            'name': $("#updateUserName").val(),
            'password': $("#updateUserPass").val(),
            'role': $("#updateUserRole").val(),
            'message': $("#updateUserMess").val()
        };

        $.ajax({

            type: 'PUT',
            url: "/admin/update",

            contentType: 'application/json;',
            data: JSON.stringify(user),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            async: true,
            cache: false,
            dataType: 'JSON',
            complete:
                function () {
                    getTable();
                    $("#home-tab").tab('show');
                }
        });

    };

//deleteForm
    $(document).on('click', '#deleteUser', function () {
        var id = $(this).closest("tr").find("#tableId").text();
        deleteUser(id);

    });

    function deleteUser(id) {
        $.ajax({

            type: 'delete',
            url: "/admin/delete",

            contentType: 'application/json;',
            data: JSON.stringify(id),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            async: true,
            cache: false,
            dataType: 'JSON',
            complete:
                function () {
                    getTable();
                    $("#home-tab").tab('show');
                }
        });

    };

//from table
    function getTable() {

        $.ajax({
            type: 'GET',
            url: "/admin/all",

            contentType: 'application/json;',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            async: true,
            cache: false,
            dataType: 'JSON',
            success: function (listUsers) {
                var htmlTable = "";
                $("#UserTable tbody").empty();

                for (var i = 0; i < listUsers.length; i++) {
                    if (listUsers[i].roles.length > 1) {
                        var htmlRole = listUsers[i].roles[0].role + '-' + listUsers[i].roles[1].role;
                    } else {
                        var htmlRole = listUsers[i].roles[0].role
                    }
                    htmlTable += ('<tr id="list">');
                    htmlTable += ('<td id="tableId">' + listUsers[i].id + '</td>');
                    htmlTable += ('<td id="tableName">' + listUsers[i].name + '</td>');
                    htmlTable += ('<td id="tableMess">' + listUsers[i].message + '</td>');
                    htmlTable += ('<td id="tablePass">' + listUsers[i].password + '</td>');
                    htmlTable += ('<td id="tableRole">' + htmlRole + '</td>');
                    htmlTable += ('<td><button id="editUserBtn"  class="btn btn-sm btn-info" type="button" data-toggle="modal"' +
                        ' data-target="#editUser">Edit</button></td>');
                    htmlTable += ('<td><button id="deleteUser" class="btn btn-sm btn-info" type="button">Delete</button></td>');
                    htmlTable += ('</tr>');
                }

                $("#UserTable tbody").append(htmlTable);
            }

        });
    };

})
;

