<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SendingEmailController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->group(function () {
    Route::get('/IP', [SendingEmailController::class, 'gitip']);
    Route::post('/Register/store', [SendingEmailController::class, 'store']);
    Route::post('/login', [SendingEmailController::class, 'login']);

    Route::get('/GetUserList', [SendingEmailController::class, 'GetUserList']);
    Route::get('/GetChatBotDetails', [SendingEmailController::class, 'GetChatBotDetails']);
    Route::get('/GetUsers', [SendingEmailController::class, 'GetUsers']);

    Route::post('/GetChatBotDetail', [SendingEmailController::class, 'GetChatBotDetail']);

    Route::post('/TestCreateFriendCon', [SendingEmailController::class, 'TestCreateFriendCon']);

    Route::post('/ToNotepad', [SendingEmailController::class, 'ToNotepad']);

// });