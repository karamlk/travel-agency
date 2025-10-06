<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\SignUpRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class SignUpController extends Controller
{
    public function __invoke(SignUpRequest $request)
    {
        $validated = $request->validated();
        
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password'])
        ]);

        $user->roles()->attach(Role::where('name', 'customer')->value('id'));
        $device = substr($request->userAgent() ?? 'Unknown_device', 0, 255);

        return response()->json([
            'message' => 'user created successfully',
            'access_token' => $user->createToken($device)->plainTextToken,
        ], 200);
    }
}
