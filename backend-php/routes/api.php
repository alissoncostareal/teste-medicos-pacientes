    <?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\MedicoController;

Route::prefix('v1')->group(function () {
    Route::get('/medicos', [MedicoController::class, 'index']);
    Route::post('/medicos', [MedicoController::class, 'store']);
    Route::get('/medicos/{id}', [MedicoController::class, 'show']);
    Route::put('/medicos/{id}', [MedicoController::class, 'update']);
    Route::delete('/medicos/{id}', [MedicoController::class, 'destroy']);
});
