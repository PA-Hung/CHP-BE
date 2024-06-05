export const ADMIN_ROLE = "SUPER_ADMIN";
export const USER_ROLE = "NORMAL_USER";

export const INIT_PERMISSIONS = [
    {
        "_id": "648ab6d3fa16b294212e4033",
        "name": "Create User",
        "apiPath": "/api/v1/users",
        "method": "POST",
        "module": "USERS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "phone": "0933634933"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:59:31.898Z",
        "updatedAt": "2023-06-15T06:59:31.898Z",
        "__v": 0
    },
    {
        "_id": "648ab6e7fa16b294212e4038",
        "name": "Get User by Id",
        "apiPath": "/api/v1/users/:id",
        "method": "GET",
        "module": "USERS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "phone": "0933634933"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:59:51.041Z",
        "updatedAt": "2023-06-15T06:59:51.041Z",
        "__v": 0
    },
    {
        "_id": "648ab6fdfa16b294212e403d",
        "name": "Get User with paginate",
        "apiPath": "/api/v1/users",
        "method": "GET",
        "module": "USERS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "phone": "0933634933"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T07:00:13.364Z",
        "updatedAt": "2023-06-15T07:00:13.364Z",
        "__v": 0
    },
    {
        "_id": "648ab719fa16b294212e4042",
        "name": "Update User",
        "apiPath": "/api/v1/users/:id",
        "method": "PATCH",
        "module": "USERS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "phone": "0933634933"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T07:00:41.934Z",
        "updatedAt": "2023-06-15T07:00:41.934Z",
        "__v": 0
    },
    {
        "_id": "648ab728fa16b294212e4047",
        "name": "Delete User",
        "apiPath": "/api/v1/users/:id",
        "method": "DELETE",
        "module": "USERS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "phone": "0933634933"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T07:00:56.274Z",
        "updatedAt": "2023-06-15T07:00:56.274Z",
        "__v": 0
    },
    {
        "_id": "648ab750fa16b294212e404c",
        "name": "Upload Single File",
        "apiPath": "/api/v1/files/upload",
        "method": "POST",
        "module": "FILES",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "phone": "0933634933"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T07:01:36.923Z",
        "updatedAt": "2023-06-15T07:01:36.923Z",
        "__v": 0
    },
    {
        "_id": "648ad59adafdb9754f40b881",
        "name": "Create a permission",
        "apiPath": "/api/v1/permissions",
        "method": "POST",
        "module": "PERMISSIONS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "phone": "0933634933"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:10:50.946Z",
        "updatedAt": "2023-06-15T09:10:50.946Z",
        "__v": 0
    },
    {
        "_id": "648ad5aedafdb9754f40b886",
        "name": "Fetch Permission with paginate",
        "apiPath": "/api/v1/permissions",
        "method": "GET",
        "module": "PERMISSIONS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "phone": "0933634933"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:11:10.914Z",
        "updatedAt": "2023-06-15T09:11:10.914Z",
        "__v": 0
    },
    {
        "_id": "648ad5c5dafdb9754f40b88b",
        "name": "Fetch permission by id",
        "apiPath": "/api/v1/permissions/:id",
        "method": "GET",
        "module": "PERMISSIONS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "phone": "0933634933"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:11:33.234Z",
        "updatedAt": "2023-06-15T09:11:33.234Z",
        "__v": 0
    },
    {
        "_id": "648ad5d4dafdb9754f40b890",
        "name": "Update a permission",
        "apiPath": "/api/v1/permissions/:id",
        "method": "PATCH",
        "module": "PERMISSIONS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "phone": "0933634933"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:11:48.081Z",
        "updatedAt": "2023-06-15T09:11:48.081Z",
        "__v": 0
    },
    {
        "_id": "648ad5ebdafdb9754f40b895",
        "name": "Delete a permission",
        "apiPath": "/api/v1/permissions/:id",
        "method": "DELETE",
        "module": "PERMISSIONS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "phone": "0933634933"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:12:11.323Z",
        "updatedAt": "2023-06-15T09:12:11.323Z",
        "__v": 0
    },
    {
        "_id": "648ad613dafdb9754f40b89a",
        "name": "Create Role",
        "apiPath": "/api/v1/roles",
        "method": "POST",
        "module": "ROLES",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "phone": "0933634933"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:12:51.974Z",
        "updatedAt": "2023-06-15T09:12:51.974Z",
        "__v": 0
    },
    {
        "_id": "648ad622dafdb9754f40b89f",
        "name": "Fetch roles with paginate",
        "apiPath": "/api/v1/roles",
        "method": "GET",
        "module": "ROLES",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "phone": "0933634933"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:13:06.618Z",
        "updatedAt": "2023-06-15T09:13:06.618Z",
        "__v": 0
    },
    {
        "_id": "648ad630dafdb9754f40b8a6",
        "name": "Fetch role by id",
        "apiPath": "/api/v1/roles/:id",
        "method": "GET",
        "module": "ROLES",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "phone": "0933634933"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:13:20.853Z",
        "updatedAt": "2023-06-15T09:13:20.853Z",
        "__v": 0
    },
    {
        "_id": "648ad640dafdb9754f40b8ab",
        "name": "Update Role",
        "apiPath": "/api/v1/roles/:id",
        "method": "PATCH",
        "module": "ROLES",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "phone": "0933634933"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:13:36.836Z",
        "updatedAt": "2023-06-15T09:13:36.836Z",
        "__v": 0
    },
    {
        "_id": "648ad650dafdb9754f40b8b0",
        "name": "Delete a Role",
        "apiPath": "/api/v1/roles/:id",
        "method": "DELETE",
        "module": "ROLES",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "phone": "0933634933"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:13:52.798Z",
        "updatedAt": "2023-06-15T09:13:52.798Z",
        "__v": 0
    },

    // mới thêm vào accommodation

    {
        "_id": "660cf3270158ef1253845187",
        "name": "Xem lưu trú",
        "apiPath": "/api/v1/accommodation",
        "method": "GET",
        "module": "ACCOMMODATION",
        "createdBy": {
            "_id": "660cf0300158ef1253845120",
            "phone": "0933634933"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2024-04-03T06:11:51.755Z",
        "updatedAt": "2024-04-03T06:20:38.973Z",
        "__v": 0
    },
    {
        "_id": "660cf55f0158ef1253845208",
        "name": "Tạo lưu trú",
        "apiPath": "/api/v1/accommodation",
        "method": "POST",
        "module": "ACCOMMODATION",
        "createdBy": {
            "_id": "660cf0300158ef1253845120",
            "phone": "0933634933"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2024-04-03T06:21:19.951Z",
        "updatedAt": "2024-04-03T06:21:19.951Z",
        "__v": 0
    },
    {
        "_id": "660cf5930158ef125384520d",
        "name": "Xoá lưu trú",
        "apiPath": "/api/v1/accommodation/:id",
        "method": "DELETE",
        "module": "ACCOMMODATION",
        "createdBy": {
            "_id": "660cf0300158ef1253845120",
            "phone": "0933634933"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2024-04-03T06:22:11.632Z",
        "updatedAt": "2024-04-03T06:22:11.632Z",
        "__v": 0
    },
    {
        "_id": "660cf9150158ef12538453a6",
        "name": "Cập nhật lưu trú",
        "apiPath": "/api/v1/accommodation/:id",
        "method": "PATCH",
        "module": "ACCOMMODATION",
        "createdBy": {
            "_id": "660cf0300158ef1253845120",
            "phone": "0933634933"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2024-04-03T06:37:09.152Z",
        "updatedAt": "2024-04-03T06:37:09.152Z",
        "__v": 0
    },
    {
        "_id": "660d0101f65224802dc4c895",
        "name": "Import Excel",
        "apiPath": "/api/v1/excel/import",
        "method": "IMPORT",
        "module": "EXCEL",
        "createdBy": {
            "_id": "660cf0300158ef1253845120",
            "phone": "0933634933"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2024-04-03T07:10:57.489Z",
        "updatedAt": "2024-04-03T07:11:49.292Z",
        "__v": 0,
    },
    {
        "_id": "660d0126f65224802dc4c89a",
        "name": "Export Excel",
        "apiPath": "/api/v1/excel/export",
        "method": "EXPORT",
        "module": "EXCEL",
        "createdBy": {
            "_id": "660cf0300158ef1253845120",
            "phone": "0933634933"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2024-04-03T07:11:34.219Z",
        "updatedAt": "2024-04-03T07:16:05.475Z",
        "__v": 0,
    },
    // apartment
    {
        "_id": "6618cf600aaa5505ea6be647",
        "name": "Xem căn hộ",
        "apiPath": "/api/v1/apartment",
        "method": "GET",
        "module": "APARTMENT",
        "createdBy": {
            "_id": "660cf0300158ef1253845120",
            "phone": "0933634933"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2024-04-12T06:06:24.625Z",
        "updatedAt": "2024-04-12T06:06:24.625Z",
        "__v": 0
    },
    {
        "_id": "6618cf840aaa5505ea6be650",
        "name": "Tạo căn hộ",
        "apiPath": "/api/v1/apartment",
        "method": "POST",
        "module": "APARTMENT",
        "createdBy": {
            "_id": "660cf0300158ef1253845120",
            "phone": "0933634933"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2024-04-12T06:07:00.367Z",
        "updatedAt": "2024-04-12T06:07:00.367Z",
        "__v": 0
    },
    {
        "_id": "6618cfa80aaa5505ea6be655",
        "name": "Xoá căn hộ",
        "apiPath": "/api/v1/apartment/:id",
        "method": "DELETE",
        "module": "APARTMENT",
        "createdBy": {
            "_id": "660cf0300158ef1253845120",
            "phone": "0933634933"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2024-04-12T06:07:36.003Z",
        "updatedAt": "2024-04-12T06:07:36.003Z",
        "__v": 0
    },
    {
        "_id": "6618cfc20aaa5505ea6be65a",
        "name": "Cập nhật căn hộ",
        "apiPath": "/api/v1/apartment/:id",
        "method": "PATCH",
        "module": "APARTMENT",
        "createdBy": {
            "_id": "660cf0300158ef1253845120",
            "phone": "0933634933"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2024-04-12T06:08:02.978Z",
        "updatedAt": "2024-04-12T06:08:02.978Z",
        "__v": 0
    },

    // dashboard
    {
        "_id": "662739eb0f8019f6acef289f",
        "name": "Xem thống kê dashboard",
        "apiPath": "/api/v1/accommodation/dashboard",
        "method": "GET",
        "module": "DASHBOARD",
        "createdBy": {
            "_id": "660cf0300158ef1253845120",
            "phone": "0933634933"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2024-04-03T06:11:51.755Z",
        "updatedAt": "2024-04-03T06:20:38.973Z",
        "__v": 0
    },

]