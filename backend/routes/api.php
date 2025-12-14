<?php
// routes/api.php

use Illuminate\Support\Facades\Route;

Route::get('/example', function () {
    return response()->json(['message' => 'Hello from the backend!']);
});
