<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\LoginFormRequest;
use App\Http\Requests\RegisterFormRequest;

class AuthController extends Controller
{
    use ApiResponse;

    public function signup(RegisterFormRequest $request){
        $data = $request->validated();
        $data['password'] =Hash::make($request['password']);
        User::create($data);
        return $this->success(null,'Register success',Response::HTTP_OK);
    }

    public function login(LoginFormRequest $request){
        if (!Auth::attempt($request->all())) {
            return $this->error("Incorrect email or password", Response::HTTP_UNAUTHORIZED);
        }
        return $this->success(
            ['token' => auth()->user()->createToken('API Token')->plainTextToken]
            ,'Login success',
            Response::HTTP_OK
        );
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return $this->success(null,'Logout success',Response::HTTP_OK);
    }


}
