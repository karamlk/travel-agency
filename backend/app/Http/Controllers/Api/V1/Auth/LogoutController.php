<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = $request->user();

        $user->currentAccessToken()->delete();

        return response()->json(['message' => 'LogOut Successfully']);
    }
}
